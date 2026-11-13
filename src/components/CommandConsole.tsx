import React, { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore.js';
import { SocialPlatform } from '../types/index.js';
import { TRANSLATIONS } from '../i18n/translations.js';
import { Sparkles, CornerDownLeft, Square, Send, Video, Globe } from 'lucide-react';

const InstagramGradientIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F58529" />
        <stop offset="50%" stopColor="#DD2A7B" />
        <stop offset="100%" stopColor="#8134AF" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#igGrad)"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#igGrad)"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#igGrad)"></line>
  </svg>
);

export const CommandConsole: React.FC = () => {
  const {
    uiLanguage,
    textLanguage,
    setTextLanguage,
    platform,
    setPlatform,
    topic,
    setTopic,
    variantsCount,
    setVariantsCount,
    suggestedAngles,
    selectedAngles,
    toggleAngle,
    detectedTone,
    isPregenerating,
    triggerPregeneration,
    isGenerating,
    startGeneration,
    cancelGeneration,
  } = useStore();

  const t = TRANSLATIONS[uiLanguage];
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea smoothly between 96px and 220px
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '96px';
      const scrollHeight = textareaRef.current.scrollHeight;
      const clampedHeight = Math.min(Math.max(scrollHeight, 96), 220);
      textareaRef.current.style.height = `${clampedHeight}px`;
    }
  }, [topic]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isGenerating && topic.trim()) {
        startGeneration();
      }
    }
  };

  const charCount = topic.length;

  const platformsConfig = [
    {
      id: 'telegram' as SocialPlatform,
      label: t.platformTelegram,
      icon: <Send size={15} color="#229ED9" />,
      color: '#229ED9',
      bgActive: '#F0F9FF',
      borderActive: '#BAE6FD',
    },
    {
      id: 'youtube' as SocialPlatform,
      label: t.platformYouTube,
      icon: <Video size={15} color="#E53935" />,
      color: '#E53935',
      bgActive: '#FEF2F2',
      borderActive: '#FECACA',
    },
    {
      id: 'instagram' as SocialPlatform,
      label: t.platformInstagram,
      icon: <InstagramGradientIcon size={15} />,
      color: '#C13584',
      bgActive: '#FDF2F8',
      borderActive: '#FBCFE8',
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '740px',
        margin: '0 auto',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
        transition: 'box-shadow 200ms ease',
      }}
    >
      {/* Top Progress Bar when pre-generating */}
      {isPregenerating && <div className="pregen-progress-bar" />}

      {/* Tier 1: Platform Selector Tabs with authentic platform styling */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          padding: '8px',
          gap: '8px',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-surface-subtle)',
        }}
      >
        {platformsConfig.map((p) => {
          const isActive = platform === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              style={{
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? p.color : 'var(--text-secondary)',
                backgroundColor: isActive ? p.bgActive : 'transparent',
                borderRadius: 'var(--radius-btn)',
                border: `1.5px solid ${isActive ? p.borderActive : 'transparent'}`,
                boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                transition: 'all 160ms ease',
              }}
            >
              <span>{p.icon}</span>
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tier 2: Textarea Input */}
      <div style={{ position: 'relative', backgroundColor: 'var(--bg-card)', padding: '16px 20px 38px 20px' }}>
        <textarea
          ref={textareaRef}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.textareaPlaceholder}
          style={{
            width: '100%',
            minHeight: '96px',
            maxHeight: '220px',
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
            fontSize: '15px',
            lineHeight: '1.6',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontFamily: 'var(--font-sans)',
          }}
        />

        {/* Bottom meta row inside textarea: Tone badge & Char count */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '16px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          <div>
            {detectedTone && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--accent-text)',
                  backgroundColor: 'var(--accent-muted)',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--accent-border)',
                }}
              >
                {t.tonePrefix}
                {detectedTone}
              </span>
            )}
          </div>

          <span
            style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              fontWeight: 500,
            }}
          >
            {charCount} {t.charCountSuffix}
          </span>
        </div>
      </div>

      {/* Tier 3: Pre-generation & Action Bar */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '14px 20px',
          backgroundColor: 'var(--bg-surface-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Suggested Angles / Context Enrichment */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', flex: 1 }}>
            <button
              onClick={() => triggerPregeneration()}
              disabled={isPregenerating || !topic.trim()}
              title={t.refineAngleBtn}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                color: topic.trim() ? 'var(--accent-primary)' : 'var(--text-muted)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-pill)',
                opacity: topic.trim() ? 1 : 0.6,
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Sparkles size={13} color="var(--accent-primary)" />
              <span>{isPregenerating ? t.refiningAngleBtn : t.refineAngleBtn}</span>
            </button>

            {suggestedAngles.map((angle, idx) => {
              const isSelected = selectedAngles.includes(angle);
              return (
                <button
                  key={idx}
                  onClick={() => toggleAngle(angle)}
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-card)',
                    border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                    color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                    transition: 'all 150ms ease',
                    boxShadow: 'var(--shadow-sm)',
                    maxWidth: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={angle}
                >
                  {isSelected ? '✓ ' : '+ '}
                  {angle}
                </button>
              );
            })}
          </div>

          {/* Configuration Right Controls: Text Language + Variants Count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Text Language Selector */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: 'var(--bg-card)',
                padding: '3px 8px',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-btn)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Globe size={13} color="var(--accent-primary)" />
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {t.textLanguageLabel}
              </span>
              <button
                onClick={() => setTextLanguage('ru')}
                style={{
                  fontSize: '11px',
                  fontWeight: textLanguage === 'ru' ? 700 : 500,
                  padding: '2px 7px',
                  borderRadius: '6px',
                  backgroundColor: textLanguage === 'ru' ? 'var(--accent-muted)' : 'transparent',
                  color: textLanguage === 'ru' ? 'var(--accent-primary)' : 'var(--text-muted)',
                }}
              >
                RU
              </button>
              <button
                onClick={() => setTextLanguage('uz')}
                style={{
                  fontSize: '11px',
                  fontWeight: textLanguage === 'uz' ? 700 : 500,
                  padding: '2px 7px',
                  borderRadius: '6px',
                  backgroundColor: textLanguage === 'uz' ? 'var(--accent-muted)' : 'transparent',
                  color: textLanguage === 'uz' ? 'var(--accent-primary)' : 'var(--text-muted)',
                }}
              >
                UZ
              </button>
            </div>

            {/* Variants Count Selector */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                backgroundColor: 'var(--bg-card)',
                padding: '3px',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-btn)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {[2, 3].map((num) => {
                const isSelected = variantsCount === num;
                return (
                  <button
                    key={num}
                    onClick={() => setVariantsCount(num)}
                    style={{
                      fontSize: '12px',
                      fontWeight: isSelected ? 600 : 500,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      color: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)',
                      backgroundColor: isSelected ? 'var(--accent-muted)' : 'transparent',
                      transition: 'all 120ms ease',
                    }}
                  >
                    {num} {t.variantsSuffix}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Row: Shortcut note & Primary Action Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '8px',
            borderTop: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {t.shortcutHint}
              <strong style={{ color: 'var(--text-secondary)' }}>Ctrl + Enter</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isGenerating ? (
              <button
                onClick={cancelGeneration}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '9px 18px',
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-btn)',
                  border: '1px solid #FCA5A5',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <Square size={13} fill="currentColor" />
                <span>{t.stopBtn}</span>
              </button>
            ) : (
              <button
                onClick={() => startGeneration()}
                disabled={!topic.trim()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  backgroundColor: topic.trim() ? 'var(--accent-primary)' : '#D8D4DF',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  borderRadius: 'var(--radius-btn)',
                  border: 'none',
                  cursor: topic.trim() ? 'pointer' : 'not-allowed',
                  boxShadow: topic.trim() ? '0 4px 14px rgba(35, 75, 131, 0.35)' : 'none',
                  transition: 'all 160ms ease',
                }}
                onMouseEnter={(e) => {
                  if (topic.trim()) {
                    e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (topic.trim()) {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <span>{t.generateBtn}</span>
                <CornerDownLeft size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
