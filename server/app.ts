import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  pregenerateAngles,
  getGenAIClient,
  streamVariantFromGemini,
  streamMockVariant,
} from './gemini.js';
import { generateMockVariants } from './mockGenerator.js';
import { DEFAULT_ANGLES_RU, DEFAULT_ANGLES_UZ } from './prompts.js';
import { SocialPlatform, PostVariant, StreamChunkPayload } from '../src/types/index.js';

dotenv.config();

// Ensure local development on Windows SSL/leaf inspection does not break fetch
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(cors());
app.use(express.json());

// Serve production static files if dist exists
const distPath = path.resolve(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Status endpoint
app.get('/api/status', (req: Request, res: Response) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
  const activeModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
  res.json({
    status: 'ok',
    model: activeModel,
    hasServerKey: hasKey,
    timestamp: Date.now(),
  });
});

// Pregenerate angles endpoint
app.post('/api/pregenerate', async (req: Request, res: Response) => {
  try {
    const { topic, platform, apiKey, model, textLanguage = 'ru' } = req.body;
    if (!topic || typeof topic !== 'string') {
      res.status(400).json({ error: 'Поле topic обязательно' });
      return;
    }
    const targetPlatform: SocialPlatform = platform || 'telegram';
    const targetModel = model || process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
    const result = await pregenerateAngles(topic, targetPlatform, apiKey, targetModel, textLanguage);
    res.json(result);
  } catch (error: any) {
    console.error('Pregenerate endpoint error:', error);
    res.status(500).json({ error: error.message || 'Ошибка прегенерации' });
  }
});

// SSE Streaming Generation endpoint
app.post('/api/generate-stream', async (req: Request, res: Response) => {
  const { topic, platform, variantsCount = 3, selectedAngles = [], apiKey, model, textLanguage = 'ru' } = req.body;

  if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
    res.status(400).json({ error: 'Поле topic обязательно для генерации' });
    return;
  }

  const targetPlatform: SocialPlatform = platform || 'telegram';
  const targetModel = model || process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
  const count = Math.min(Math.max(Number(variantsCount) || 3, 1), 3);

  // Setup SSE Headers
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.socket?.setNoDelay(true);
  req.socket?.setTimeout(0);
  res.flushHeaders?.();

  let isClientConnected = true;
  req.on('close', () => {
    isClientConnected = false;
  });

  const sendSSE = (event: string, data: any) => {
    if (!isClientConnected) return;
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    // Flush if supported
    if (typeof (res as any).flush === 'function') {
      (res as any).flush();
    }
  };

  try {
    const ai = getGenAIClient(apiKey);
    const generationId = `gen-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    // Prepare angles
    const defaultAngles = textLanguage === 'uz' ? DEFAULT_ANGLES_UZ : DEFAULT_ANGLES_RU;
    const anglesToUse: string[] = [];
    for (let i = 0; i < count; i++) {
      if (selectedAngles[i] && selectedAngles[i].trim().length > 0) {
        anglesToUse.push(selectedAngles[i].trim());
      } else {
        anglesToUse.push(defaultAngles[i] || (textLanguage === 'uz' ? `Yo‘nalish ${i + 1}` : `Угол ${i + 1}`));
      }
    }

    let variants: PostVariant[] = [];

    const handleChunk = (chunk: StreamChunkPayload) => {
      sendSSE('chunk', chunk);
    };

    if (ai) {
      console.log(`[Stream] Generating with ${targetModel} for platform=${targetPlatform}, count=${count}, lang=${textLanguage}`);
      // Parallel generation for each variant
      const streamPromises = anglesToUse.map((angle, index) =>
        streamVariantFromGemini(ai, topic, targetPlatform, angle, index, handleChunk, targetModel, textLanguage)
      );
      variants = await Promise.all(streamPromises);
    } else {
      console.log(`[Stream] No Gemini key found; using realistic mock generator with stream physics, lang=${textLanguage}`);
      const mockList = generateMockVariants(topic, targetPlatform, count, anglesToUse, textLanguage);
      const streamPromises = mockList.map((variant, index) =>
        streamMockVariant(variant, index, handleChunk)
      );
      variants = await Promise.all(streamPromises);
    }

    if (isClientConnected) {
      sendSSE('done', {
        generationId,
        timestamp: Date.now(),
        variants,
      });
      res.end();
    }
  } catch (error: any) {
    console.error('Error during generation stream:', error);
    if (isClientConnected) {
      sendSSE('error', {
        message: error.message || 'ERR_STREAM_INTERRUPTED: Ошибка генерации контента',
      });
      res.end();
    }
  }
});

// SPA fallback for non-API routes in production
if (fs.existsSync(distPath)) {
  app.use((req: Request, res: Response, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

export default app;
