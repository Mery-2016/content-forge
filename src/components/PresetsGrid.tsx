import React from 'react';
import { useStore } from '../store/useStore.js';
import { SocialPlatform } from '../types/index.js';
import { TRANSLATIONS } from '../i18n/translations.js';
import { ArrowUpRight, Send, Video } from 'lucide-react';

const InstagramGradientIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
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
      <linearGradient id="presetIgGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F58529" />
        <stop offset="50%" stopColor="#DD2A7B" />
        <stop offset="100%" stopColor="#8134AF" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#presetIgGrad)"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#presetIgGrad)"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#presetIgGrad)"></line>
  </svg>
);

export const PresetsGrid: React.FC = () => {
  const { uiLanguage, setTopic, setPlatform, triggerPregeneration } = useStore();
  const t = TRANSLATIONS[uiLanguage];

  const presets = [
    {
      id: '01',
      badge: t.preset1Badge,
      badgeColor: '#229ED9',
      badgeBg: '#F0F9FF',
      title: t.preset1Title,
      platform: 'telegram' as SocialPlatform,
      icon: <Send size={15} color="#229ED9" />,
      topic: t.preset1Topic,
    },
    {
      id: '02',
      badge: t.preset2Badge,
      badgeColor: '#C13584',
      badgeBg: '#FDF2F8',
      title: t.preset2Title,
      platform: 'instagram' as SocialPlatform,
      icon: <InstagramGradientIcon size={15} />,
      topic: t.preset2Topic,
    },
    {
      id: '03',
      badge: t.preset3Badge,
      badgeColor: '#E53935',
      badgeBg: '#FEF2F2',
      title: t.preset3Title,
      platform: 'youtube' as SocialPlatform,
      icon: <Video size={15} color="#E53935" />,
      topic: t.preset3Topic,
    },
  ];

  const handleSelectPreset = (preset: typeof presets[0]) => {
    setPlatform(preset.platform);
    setTopic(preset.topic);
    setTimeout(() => {
      triggerPregeneration();
    }, 100);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '740px',
        margin: '32px auto 0 auto',
      }}
    >
      <div
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span>{t.presetsTitle}</span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
        }}
      >
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset)}
            style={{
              textAlign: 'left',
              padding: '16px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px',
              boxShadow: 'var(--shadow-card)',
              transition: 'all 180ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    backgroundColor: preset.badgeBg,
                  }}
                >
                  {preset.icon}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: preset.badgeColor,
                    backgroundColor: preset.badgeBg,
                    padding: '2px 8px',
                    borderRadius: '9999px',
                  }}
                >
                  {preset.badge}
                </span>
              </div>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </div>

            <div>
              <h4
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                }}
              >
                {preset.title}
              </h4>
              <p
                style={{
                  fontSize: '12px',
                  lineHeight: '1.45',
                  color: 'var(--text-secondary)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {preset.topic}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
