import { create } from 'zustand';
import { SocialPlatform, PostVariant, GenerationRecord, SectionType, AppLanguage } from '../types/index.js';

const STORAGE_KEY_HISTORY = 'content_forge_history_v1';
const STORAGE_KEY_API_KEY = 'content_forge_api_key';
const STORAGE_KEY_MODEL = 'content_forge_model';
const STORAGE_KEY_UI_LANG = 'content_forge_ui_lang';
const STORAGE_KEY_TEXT_LANG = 'content_forge_text_lang';
const MAX_HISTORY_ITEMS = 100;

function loadStoredModel(): string {
  try {
    return localStorage.getItem(STORAGE_KEY_MODEL) || 'gemini-3.5-flash-lite';
  } catch {
    return 'gemini-3.5-flash-lite';
  }
}

function loadStoredUiLang(): AppLanguage {
  try {
    const val = localStorage.getItem(STORAGE_KEY_UI_LANG);
    return val === 'uz' ? 'uz' : 'ru';
  } catch {
    return 'ru';
  }
}

function loadStoredTextLang(): AppLanguage {
  try {
    const val = localStorage.getItem(STORAGE_KEY_TEXT_LANG);
    return val === 'uz' ? 'uz' : 'ru';
  } catch {
    return 'ru';
  }
}

function loadStoredHistory(): GenerationRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to parse history from localStorage', e);
    return [];
  }
}

function saveHistory(history: GenerationRecord[]) {
  try {
    const trimmed = history.slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save history to localStorage', e);
  }
}

function loadStoredApiKey(): string {
  try {
    return localStorage.getItem(STORAGE_KEY_API_KEY) || '';
  } catch {
    return '';
  }
}

interface AppState {
  // Languages
  uiLanguage: AppLanguage;
  textLanguage: AppLanguage;

  // Input & configuration
  platform: SocialPlatform;
  topic: string;
  variantsCount: number;
  suggestedAngles: string[];
  selectedAngles: string[];
  detectedTone: string | null;
  isPregenerating: boolean;

  // Generation & Streaming
  isGenerating: boolean;
  abortController: AbortController | null;
  variants: PostVariant[];
  activeVariantIndex: number;
  viewMode: 'tabs' | 'feed';
  error: string | null;

  // History & Drawer
  history: GenerationRecord[];
  isHistoryOpen: boolean;

  // Settings & Keys
  isSettingsOpen: boolean;
  apiKey: string;
  hasServerKey: boolean;
  model: string;

  // Tactical Copy Feedback
  copiedId: string | null;
  copyTimeoutId: any | null;

  // Actions
  setUiLanguage: (lang: AppLanguage) => void;
  setTextLanguage: (lang: AppLanguage) => void;
  setPlatform: (platform: SocialPlatform) => void;
  setTopic: (topic: string) => void;
  setVariantsCount: (count: number) => void;
  toggleAngle: (angle: string) => void;
  setActiveVariantIndex: (index: number) => void;
  setViewMode: (mode: 'tabs' | 'feed') => void;
  setIsHistoryOpen: (open: boolean) => void;
  setIsSettingsOpen: (open: boolean) => void;
  setApiKey: (key: string) => void;
  setModel: (model: string) => void;
  checkServerStatus: () => Promise<void>;
  setError: (error: string | null) => void;

  triggerPregeneration: () => Promise<void>;
  startGeneration: () => Promise<void>;
  cancelGeneration: () => void;
  copyText: (text: string, id: string) => Promise<boolean>;

  loadHistoryRecord: (record: GenerationRecord) => void;
  deleteHistoryRecord: (id: string) => void;
  clearHistory: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  uiLanguage: loadStoredUiLang(),
  textLanguage: loadStoredTextLang(),

  platform: 'telegram',
  topic: '',
  variantsCount: 3,
  suggestedAngles: [],
  selectedAngles: [],
  detectedTone: null,
  isPregenerating: false,

  isGenerating: false,
  abortController: null,
  variants: [],
  activeVariantIndex: 0,
  viewMode: 'tabs',
  error: null,

  history: loadStoredHistory(),
  isHistoryOpen: false,

  isSettingsOpen: false,
  apiKey: loadStoredApiKey(),
  hasServerKey: false,
  model: loadStoredModel(),

  copiedId: null,
  copyTimeoutId: null,

  setUiLanguage: (lang) => {
    try {
      localStorage.setItem(STORAGE_KEY_UI_LANG, lang);
    } catch {}
    const { uiLanguage, textLanguage } = get();
    // If textLanguage was matching uiLanguage, keep them in sync
    if (textLanguage === uiLanguage) {
      try {
        localStorage.setItem(STORAGE_KEY_TEXT_LANG, lang);
      } catch {}
      set({ uiLanguage: lang, textLanguage: lang });
    } else {
      set({ uiLanguage: lang });
    }
  },

  setTextLanguage: (lang) => {
    try {
      localStorage.setItem(STORAGE_KEY_TEXT_LANG, lang);
    } catch {}
    set({ textLanguage: lang });
  },

  setPlatform: (platform) => {
    set({ platform });
    // If there is a topic, re-run pregeneration if needed
    const { topic } = get();
    if (topic.trim().length > 5) {
      get().triggerPregeneration();
    }
  },

  setTopic: (topic) => set({ topic }),
  setVariantsCount: (variantsCount) => set({ variantsCount }),

  toggleAngle: (angle) => {
    const { selectedAngles } = get();
    if (selectedAngles.includes(angle)) {
      set({ selectedAngles: selectedAngles.filter((a) => a !== angle) });
    } else {
      set({ selectedAngles: [...selectedAngles, angle] });
    }
  },

  setActiveVariantIndex: (index) => set({ activeVariantIndex: index }),
  setViewMode: (viewMode) => set({ viewMode }),
  setIsHistoryOpen: (isHistoryOpen) => set({ isHistoryOpen }),
  setIsSettingsOpen: (isSettingsOpen) => set({ isSettingsOpen }),

  setApiKey: (apiKey) => {
    try {
      localStorage.setItem(STORAGE_KEY_API_KEY, apiKey);
    } catch {}
    set({ apiKey });
  },

  setModel: (model) => {
    try {
      localStorage.setItem(STORAGE_KEY_MODEL, model);
    } catch {}
    set({ model });
  },

  checkServerStatus: async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        set({
          hasServerKey: Boolean(data.hasServerKey),
          model: data.model || get().model,
        });
      }
    } catch (e) {
      console.warn('Backend status check failed', e);
    }
  },

  setError: (error) => set({ error }),

  triggerPregeneration: async () => {
    const { topic, platform, apiKey, model, textLanguage, isPregenerating } = get();
    if (isPregenerating || !topic.trim()) return;

    set({ isPregenerating: true, error: null });

    try {
      const res = await fetch('/api/pregenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          platform,
          apiKey: apiKey || undefined,
          model,
          textLanguage,
        }),
      });

      if (!res.ok) {
        throw new Error(`Прегенерация вернула статус ${res.status}`);
      }

      const data = await res.json();
      set({
        suggestedAngles: data.suggestedAngles || [],
        detectedTone: data.detectedTone || null,
        isPregenerating: false,
      });
    } catch (err: any) {
      console.error('Pregeneration error:', err);
      set({ isPregenerating: false });
    }
  },

  startGeneration: async () => {
    const {
      topic,
      platform,
      variantsCount,
      selectedAngles,
      suggestedAngles,
      apiKey,
      model,
      textLanguage,
      isGenerating,
      abortController: oldAc,
    } = get();

    if (isGenerating) return;
    if (!topic.trim()) {
      set({ error: 'Пожалуйста, введите тему или идею для поста' });
      return;
    }

    if (oldAc) {
      oldAc.abort();
    }

    const abortController = new AbortController();

    // Prepare initial empty variants for streaming
    const anglesToUse: string[] = [];
    for (let i = 0; i < variantsCount; i++) {
      anglesToUse.push(
        selectedAngles[i] ||
          suggestedAngles[i] ||
          (i === 0 ? 'Экспертный / Прямой оффер' : i === 1 ? 'Сторителлинг / Кейс' : 'Провокационный / Разбор ошибки')
      );
    }

    const initialVariants: PostVariant[] = anglesToUse.map((angle, idx) => ({
      id: `draft-${idx}`,
      angleTitle: angle,
      title: '',
      body: '',
      cta: '',
      hashtags: [],
    }));

    set({
      isGenerating: true,
      abortController,
      variants: initialVariants,
      activeVariantIndex: 0,
      error: null,
    });

    try {
      const response = await fetch('/api/generate-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({
          topic: topic.trim(),
          platform,
          variantsCount,
          selectedAngles: anglesToUse,
          apiKey: apiKey || undefined,
          model,
          textLanguage,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Не удалось получить поток ответа (Stream not available)');
      }

      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let currentEvent = 'message';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) {
            // Empty line marks end of an SSE message block
            currentEvent = 'message';
            continue;
          }

          if (trimmed.startsWith('event:')) {
            currentEvent = trimmed.replace('event:', '').trim();
          } else if (trimmed.startsWith('data:')) {
            const jsonStr = trimmed.replace('data:', '').trim();
            try {
              const data = JSON.parse(jsonStr);

              // Match by currentEvent or by payload signature for resilience
              if (currentEvent === 'chunk' || (data.section && data.text !== undefined)) {
                const { variantIndex, section, text } = data;
                set((state) => {
                  const updated = [...state.variants];
                  const target = updated[variantIndex];
                  if (!target) return state;

                  const newTarget = { ...target };
                  if (section === 'TITLE') newTarget.title += text;
                  else if (section === 'BODY') newTarget.body += text;
                  else if (section === 'CTA') newTarget.cta += text;
                  else if (section === 'TAGS') {
                    const combined = (newTarget.hashtags.join(' ') + ' ' + text).trim();
                    newTarget.hashtags = combined
                      .split(/[\s,]+/)
                      .filter((t) => t.length > 0)
                      .map((t) => (t.startsWith('#') ? t : `#${t}`));
                  }

                  updated[variantIndex] = newTarget;
                  return { variants: updated };
                });
              } else if (currentEvent === 'done' || Array.isArray(data.variants)) {
                const finalVariants: PostVariant[] = data.variants || get().variants;
                const record: GenerationRecord = {
                  id: data.generationId || `gen-${Date.now()}`,
                  createdAt: data.timestamp || Date.now(),
                  topic: topic.trim(),
                  platform,
                  variants: finalVariants,
                };

                const updatedHistory = [record, ...get().history];
                saveHistory(updatedHistory);

                set({
                  variants: finalVariants,
                  history: updatedHistory,
                  isGenerating: false,
                  abortController: null,
                });
              } else if (currentEvent === 'error' || (data.error && !data.section)) {
                set({
                  error: data.message || data.error || 'Ошибка потоковой генерации',
                  isGenerating: false,
                  abortController: null,
                });
              }
            } catch (err) {
              console.warn('Failed to parse SSE data chunk:', jsonStr, err);
            }
          }
        }
      }

      // If stream finished and we are still in isGenerating, finalize safely
      if (get().isGenerating) {
        const currentVariants = get().variants;
        const record: GenerationRecord = {
          id: `gen-${Date.now()}`,
          createdAt: Date.now(),
          topic: topic.trim(),
          platform,
          variants: currentVariants,
        };
        const updatedHistory = [record, ...get().history];
        saveHistory(updatedHistory);
        set({
          isGenerating: false,
          abortController: null,
          history: updatedHistory,
        });
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Generation aborted by user');
      } else {
        console.error('Streaming generation failure:', err);
        set({
          error: err.message || 'ERR_STREAM_INTERRUPTED: Сбой соединения с сервером',
        });
      }
      set({ isGenerating: false, abortController: null });
    }
  },

  cancelGeneration: () => {
    const { abortController } = get();
    if (abortController) {
      abortController.abort();
    }
    set({ isGenerating: false, abortController: null });
  },

  copyText: async (text: string, id: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);

      const { copyTimeoutId } = get();
      if (copyTimeoutId) {
        clearTimeout(copyTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        set({ copiedId: null, copyTimeoutId: null });
      }, 1500);

      set({ copiedId: id, copyTimeoutId: timeoutId });
      return true;
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      return false;
    }
  },

  loadHistoryRecord: (record) => {
    set({
      topic: record.topic,
      platform: record.platform,
      variants: record.variants,
      variantsCount: record.variants.length,
      activeVariantIndex: 0,
      isHistoryOpen: false,
      error: null,
    });
  },

  deleteHistoryRecord: (id) => {
    const updated = get().history.filter((item) => item.id !== id);
    saveHistory(updated);
    set({ history: updated });
  },

  clearHistory: () => {
    saveHistory([]);
    set({ history: [] });
  },
}));
