import React from 'react';
import { useStore } from '../store/useStore.js';
import { PostCard } from './PostCard.js';
import { TRANSLATIONS } from '../i18n/translations.js';
import { LayoutList, Columns } from 'lucide-react';

export const ResultsSection: React.FC = () => {
  const {
    uiLanguage,
    variants,
    platform,
    activeVariantIndex,
    setActiveVariantIndex,
    viewMode,
    setViewMode,
    isGenerating,
  } = useStore();

  const t = TRANSLATIONS[uiLanguage];

  if (!variants || variants.length === 0) {
    return null;
  }

  const activeVariant = variants[activeVariantIndex] || variants[0];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '740px',
        margin: '32px auto 60px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      {/* Top Controls: Mode Switch & Status */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {t.resultsTitle}
          </h3>
          {isGenerating && (
            <span
              style={{
                color: 'var(--accent-primary)',
                backgroundColor: 'var(--accent-muted)',
                padding: '2px 10px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-primary)',
                  display: 'inline-block',
                }}
              />
              {t.generatingStatus}
            </span>
          )}
        </div>

        {/* View mode toggle: [ Вкладки | Лента ] */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-btn)',
            padding: '3px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <button
            onClick={() => setViewMode('tabs')}
            title={t.viewTabs}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: viewMode === 'tabs' ? 600 : 500,
              borderRadius: '8px',
              backgroundColor: viewMode === 'tabs' ? 'var(--accent-muted)' : 'transparent',
              color: viewMode === 'tabs' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              transition: 'all 120ms ease',
            }}
          >
            <Columns size={13} />
            <span>{t.viewTabs}</span>
          </button>

          <button
            onClick={() => setViewMode('feed')}
            title={t.viewFeed}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: viewMode === 'feed' ? 600 : 500,
              borderRadius: '8px',
              backgroundColor: viewMode === 'feed' ? 'var(--accent-muted)' : 'transparent',
              color: viewMode === 'feed' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              transition: 'all 120ms ease',
            }}
          >
            <LayoutList size={13} />
            <span>{t.viewFeed}</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar (if viewMode === 'tabs') */}
      {viewMode === 'tabs' && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}
        >
          {variants.map((v, i) => {
            const isActive = activeVariantIndex === i;
            return (
              <button
                key={v.id || i}
                onClick={() => setActiveVariantIndex(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 500,
                  borderRadius: 'var(--radius-btn)',
                  backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-card)',
                  border: `1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 2px 8px rgba(35, 75, 131, 0.25)' : 'var(--shadow-sm)',
                  transition: 'all 140ms ease',
                }}
              >
                <span>
                  {t.variantPrefix} {i + 1}
                </span>
                {v.angleTitle && (
                  <span
                    style={{
                      opacity: isActive ? 0.9 : 0.7,
                      fontWeight: 400,
                      fontSize: '11px',
                    }}
                  >
                    • {v.angleTitle.slice(0, 20)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Content Rendering: Tabs Mode vs Feed Mode */}
      {viewMode === 'tabs' ? (
        activeVariant && (
          <PostCard
            key={activeVariant.id || activeVariantIndex}
            variant={activeVariant}
            index={activeVariantIndex}
            platform={platform}
            isStreaming={isGenerating}
          />
        )
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {variants.map((v, i) => (
            <PostCard
              key={v.id || i}
              variant={v}
              index={i}
              platform={platform}
              isStreaming={isGenerating}
            />
          ))}
        </div>
      )}
    </div>
  );
};
