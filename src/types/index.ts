export type SocialPlatform = 'telegram' | 'youtube' | 'instagram';
export type AppLanguage = 'ru' | 'uz';

export interface PostVariant {
  id: string;
  angleTitle: string; // Например: "Кейс / Сторителлинг"
  title: string;      // Заголовок
  body: string;       // Основной текст
  cta: string;        // Призыв к действию
  hashtags: string[]; // Массив хэштегов
}

export interface GenerationRecord {
  id: string;
  createdAt: number;
  topic: string;
  platform: SocialPlatform;
  variants: PostVariant[];
}

export interface PregenerateRequest {
  topic: string;
  platform: SocialPlatform;
  apiKey?: string;
  model?: string;
  textLanguage?: AppLanguage;
}

export interface PregenerateResponse {
  suggestedAngles: string[];
  detectedTone: string;
}

export interface GenerateStreamRequest {
  topic: string;
  platform: SocialPlatform;
  variantsCount: number;
  selectedAngles?: string[];
  apiKey?: string;
  model?: string;
  textLanguage?: AppLanguage;
}

export type SectionType = 'TITLE' | 'BODY' | 'CTA' | 'TAGS';

export interface StreamChunkPayload {
  variantIndex: number;
  section: SectionType;
  text: string;
}

export interface StreamDonePayload {
  generationId: string;
  timestamp: number;
  variants?: PostVariant[];
}
