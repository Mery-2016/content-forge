import React from 'react';
import { useStore } from '../store/useStore.js';
import { TRANSLATIONS } from '../i18n/translations.js';
import { Key, History, Sparkles, Globe } from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    uiLanguage,
    setUiLanguage,
    history,
    isHistoryOpen,
    setIsHistoryOpen,
    setIsSettingsOpen,
    hasServerKey,
    apiKey,
    model,
  } = useStore();

  const t = TRANSLATIONS[uiLanguage];
  const isKeyConfigured = Boolean(hasServerKey || (apiKey && apiKey.trim().length > 0));

  const formatModelLabel = (m: string) => {
    if (m.includes('3.5')) return 'Gemini 3.5 Flash Lite';
    if (m.includes('3.8')) return 'Gemini 3.8 Flash';
    if (m.includes('2.5-pro')) return 'Gemini 2.5 Pro';
    return 'Gemini Flash';
  };

  return (
    <header
      style={{
        minHeight: '60px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-default)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 24px',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      {/* Left: Brand Logo & Model Pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '9px',
              backgroundColor: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 3px 10px rgba(35, 75, 131, 0.25)',
            }}
          >
            <Sparkles size={18} />
          </div>
          <div>
            <span
              style={{
                fontSize: '17px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              ContentForge
            </span>
            <span
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                marginLeft: '6px',
                fontWeight: 500,
              }}
            >
              {t.brandSubtitle}
            </span>
          </div>
        </div>

        {/* Model & Status Badge */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          title={uiLanguage === 'uz' ? 'Modelni o‘zgartirish yoki kalitni sozlash' : 'Сменить модель или настроить ключ'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            padding: '5px 12px',
            backgroundColor: 'var(--accent-muted)',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--accent-border)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--accent-text)',
          }}
        >
          <div
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: isKeyConfigured ? '#10B981' : '#F59E0B',
              boxShadow: isKeyConfigured ? '0 0 6px rgba(16, 185, 129, 0.4)' : 'none',
            }}
          />
          <span>{formatModelLabel(model)}</span>
        </button>
      </div>

      {/* Right Controls: Language Switcher, API Key, History */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {/* UI Language Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-btn)',
            padding: '2px',
            gap: '2px',
          }}
        >
          <button
            onClick={() => setUiLanguage('ru')}
            style={{
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: uiLanguage === 'ru' ? 700 : 500,
              borderRadius: '8px',
              backgroundColor: uiLanguage === 'ru' ? 'var(--accent-primary)' : 'transparent',
              color: uiLanguage === 'ru' ? '#FFFFFF' : 'var(--text-secondary)',
              transition: 'all 120ms ease',
            }}
          >
            Русский
          </button>
          <button
            onClick={() => setUiLanguage('uz')}
            style={{
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: uiLanguage === 'uz' ? 700 : 500,
              borderRadius: '8px',
              backgroundColor: uiLanguage === 'uz' ? 'var(--accent-primary)' : 'transparent',
              color: uiLanguage === 'uz' ? '#FFFFFF' : 'var(--text-secondary)',
              transition: 'all 120ms ease',
            }}
          >
            O‘zbekcha
          </button>
        </div>

        {/* API Settings */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 13px',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-btn)',
            boxShadow: 'var(--shadow-sm)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
            e.currentTarget.style.color = 'var(--accent-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-default)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <Key size={14} />
          <span>{t.apiKeyBtn}</span>
        </button>

        {/* History Drawer Trigger */}
        <button
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            padding: '7px 14px',
            fontSize: '13px',
            fontWeight: 600,
            color: isHistoryOpen ? 'var(--accent-primary)' : 'var(--text-primary)',
            backgroundColor: isHistoryOpen ? 'var(--accent-muted)' : 'var(--bg-card)',
            border: `1px solid ${isHistoryOpen ? 'var(--accent-primary)' : 'var(--border-default)'}`,
            borderRadius: 'var(--radius-btn)',
            boxShadow: 'var(--shadow-sm)',
          }}
          onMouseEnter={(e) => {
            if (!isHistoryOpen) {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.color = 'var(--accent-primary)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isHistoryOpen) {
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }
          }}
        >
          <History size={14} />
          <span>{t.historyBtn}</span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              backgroundColor: 'var(--accent-muted)',
              color: 'var(--accent-primary)',
              padding: '1px 7px',
              borderRadius: '9999px',
            }}
          >
            {history.length}
          </span>
          <span
            style={{
              fontSize: '10px',
              color: 'var(--text-muted)',
              marginLeft: '2px',
            }}
          >
            ⌘H
          </span>
        </button>
      </div>
    </header>
  );
};
