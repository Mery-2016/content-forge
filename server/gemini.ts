import { GoogleGenAI } from '@google/genai';
import { SocialPlatform, PostVariant, SectionType, StreamChunkPayload, AppLanguage } from '../src/types/index.js';
import { getVariantSystemPrompt, getPregenerateSystemPrompt, DEFAULT_ANGLES_RU, DEFAULT_ANGLES_UZ } from './prompts.js';
import { generateMockVariants, generateMockPregenerate } from './mockGenerator.js';

export const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';

export function getGenAIClient(clientApiKey?: string): GoogleGenAI | null {
  const key = clientApiKey || process.env.GEMINI_API_KEY;
  if (!key || key.trim() === '' || key === 'undefined') {
    return null;
  }
  return new GoogleGenAI({ apiKey: key.trim() });
}

export async function pregenerateAngles(
  topic: string,
  platform: SocialPlatform,
  clientApiKey?: string,
  model: string = DEFAULT_MODEL,
  textLanguage: AppLanguage = 'ru'
): Promise<{ suggestedAngles: string[]; detectedTone: string }> {
  const ai = getGenAIClient(clientApiKey);
  if (!ai) {
    // Return realistic mock suggestions when key is not set
    return generateMockPregenerate(topic, platform, textLanguage);
  }

  try {
    const prompt = getPregenerateSystemPrompt(platform, textLanguage);
    const userPrompt =
      textLanguage === 'uz'
        ? `${prompt}\n\nFoydalanuvchi g‘oyasi / mavzusi:\n"${topic}"`
        : `${prompt}\n\nТема / идея пользователя:\n"${topic}"`;

    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    const parsed = JSON.parse(text);
    const defaultAngles = textLanguage === 'uz' ? DEFAULT_ANGLES_UZ : DEFAULT_ANGLES_RU;
    return {
      suggestedAngles: Array.isArray(parsed.suggestedAngles) ? parsed.suggestedAngles : defaultAngles,
      detectedTone: parsed.detectedTone || (textLanguage === 'uz' ? 'Amaliy, ekspertcha' : 'Практичный, экспертный'),
    };
  } catch (error) {
    console.error('Error calling Gemini for pregeneration:', error);
    return generateMockPregenerate(topic, platform, textLanguage);
  }
}

/**
 * Robust streaming parser that splits tokens into TITLE, BODY, CTA, TAGS
 */
export class VariantStreamParser {
  private variantIndex: number;
  private angleTitle: string;
  private currentSection: SectionType = 'TITLE';
  private buffer = '';
  private onChunk: (payload: StreamChunkPayload) => void;

  public title = '';
  public body = '';
  public cta = '';
  public rawTags = '';

  constructor(
    variantIndex: number,
    angleTitle: string,
    onChunk: (payload: StreamChunkPayload) => void
  ) {
    this.variantIndex = variantIndex;
    this.angleTitle = angleTitle;
    this.onChunk = onChunk;
  }

  public feed(chunk: string) {
    this.buffer += chunk;

    const markers: { marker: string; section: SectionType }[] = [
      { marker: '[TITLE]', section: 'TITLE' },
      { marker: '[BODY]', section: 'BODY' },
      { marker: '[CTA]', section: 'CTA' },
      { marker: '[TAGS]', section: 'TAGS' },
    ];

    while (this.buffer.length > 0) {
      // Find the earliest marker in the buffer
      let earliestIndex = -1;
      let matchedMarker: { marker: string; section: SectionType } | null = null;

      for (const m of markers) {
        const idx = this.buffer.indexOf(m.marker);
        if (idx !== -1 && (earliestIndex === -1 || idx < earliestIndex)) {
          earliestIndex = idx;
          matchedMarker = m;
        }
      }

      if (earliestIndex !== -1 && matchedMarker) {
        // Emit text before the marker to the current section
        if (earliestIndex > 0) {
          const textBefore = this.buffer.slice(0, earliestIndex);
          this.appendText(this.currentSection, textBefore);
        }

        // Switch section and advance buffer past marker
        this.currentSection = matchedMarker.section;
        this.buffer = this.buffer.slice(earliestIndex + matchedMarker.marker.length);
        // Trim leading whitespace/newlines after marker
        this.buffer = this.buffer.replace(/^[\r\n\s]+/, '');
      } else {
        // Check if the buffer ends with a partial marker like '[', '[T', '[CTA'
        const possiblePartial = /\[[A-Z]{0,5}$/.exec(this.buffer);
        if (possiblePartial) {
          const safeLength = possiblePartial.index;
          if (safeLength > 0) {
            const safeText = this.buffer.slice(0, safeLength);
            this.appendText(this.currentSection, safeText);
            this.buffer = this.buffer.slice(safeLength);
          }
          break; // wait for more data to resolve marker
        } else {
          // No marker found, entire buffer belongs to current section
          this.appendText(this.currentSection, this.buffer);
          this.buffer = '';
        }
      }
    }
  }

  public finish(): PostVariant {
    if (this.buffer.length > 0) {
      this.appendText(this.currentSection, this.buffer);
      this.buffer = '';
    }

    const hashtags = this.rawTags
      .split(/[\s,]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
      .map((t) => (t.startsWith('#') ? t : `#${t}`));

    return {
      id: `variant-${Date.now()}-${this.variantIndex}`,
      angleTitle: this.angleTitle,
      title: this.title.trim(),
      body: this.body.trim(),
      cta: this.cta.trim(),
      hashtags: hashtags.length > 0 ? hashtags : ['#smm', '#контент'],
    };
  }

  private appendText(section: SectionType, text: string) {
    if (!text) return;
    if (section === 'TITLE') this.title += text;
    else if (section === 'BODY') this.body += text;
    else if (section === 'CTA') this.cta += text;
    else if (section === 'TAGS') this.rawTags += text;

    this.onChunk({
      variantIndex: this.variantIndex,
      section,
      text,
    });
  }
}

/**
 * Stream a single variant from Gemini API
 */
export async function streamVariantFromGemini(
  ai: GoogleGenAI,
  topic: string,
  platform: SocialPlatform,
  angleTitle: string,
  variantIndex: number,
  onChunk: (payload: StreamChunkPayload) => void,
  model: string = DEFAULT_MODEL,
  textLanguage: AppLanguage = 'ru'
): Promise<PostVariant> {
  const systemPrompt = getVariantSystemPrompt(platform, angleTitle, variantIndex, textLanguage);
  const parser = new VariantStreamParser(variantIndex, angleTitle, onChunk);

  try {
    const userPrompt =
      textLanguage === 'uz'
        ? `${systemPrompt}\n\nPost mavzusi / Tavsif:\n"${topic}"`
        : `${systemPrompt}\n\nТема поста / Описание:\n"${topic}"`;

    const streamResponse = await ai.models.generateContentStream({
      model,
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
    });

    for await (const chunk of streamResponse) {
      const text = chunk.text;
      if (text) {
        parser.feed(text);
      }
    }

    return parser.finish();
  } catch (error: any) {
    console.warn(`[Gemini API Warning] Model ${model} returned error (${error.message || error}). Falling back gracefully...`);
    const mockList = generateMockVariants(topic, platform, 3, [angleTitle], textLanguage);
    const fallbackVariant = mockList[variantIndex % mockList.length];
    return streamMockVariant(fallbackVariant, variantIndex, onChunk);
  }
}

/**
 * Stream a single mock variant with realistic typing delay
 */
export async function streamMockVariant(
  mockVariant: PostVariant,
  variantIndex: number,
  onChunk: (payload: StreamChunkPayload) => void
): Promise<PostVariant> {
  const sections: { section: SectionType; text: string }[] = [
    { section: 'TITLE', text: mockVariant.title },
    { section: 'BODY', text: mockVariant.body },
    { section: 'CTA', text: mockVariant.cta },
    { section: 'TAGS', text: mockVariant.hashtags.join(' ') },
  ];

  const delay = process.env.VERCEL ? 0 : 15;
  for (const item of sections) {
    // Stream in natural 1-2 word clusters
    const words = item.text.split(' ');
    for (let i = 0; i < words.length; i += 2) {
      const chunkText = words.slice(i, i + 2).join(' ') + (i + 2 < words.length ? ' ' : '');
      onChunk({
        variantIndex,
        section: item.section,
        text: chunkText,
      });
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  return mockVariant;
}
