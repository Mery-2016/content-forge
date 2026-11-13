import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore.js';
import { SocialPlatform } from '../types/index.js';
import { TRANSLATIONS } from '../i18n/translations.js';
import { X, Search, Trash2, ArrowRight, Clock, Trash } from 'lucide-react';

export const HistoryDrawer: React.FC = () => {
  const {
    uiLanguage,
    history,
    isHistoryOpen,
    setIsHistoryOpen,
    loadHistoryRecord,
    deleteHistoryRecord,
    clearHistory,
  } = useStore();

  const t = TRANSLATIONS[uiLanguage];
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'all' | SocialPlatform>('all');

  // Close on Escape or Toggle with Ctrl+H
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isHistoryOpen) {
        setIsHistoryOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setIsHistoryOpen(!isHistoryOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHistoryOpen, setIsHistoryOpen]);

  if (!isHistoryOpen) return null;

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || item.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${day}.${month} ${hours}:${mins}`;
  };

  const getPlatformLabel = (p: SocialPlatform) => {
    if (p === 'telegram') return 'Telegram';
    if (p === 'youtube') return 'YouTube';
    return 'Instagram';
  };

  const getPlatformColor = (p: SocialPlatform) => {
    if (p === 'telegram') return '#229ED9';
    if (p === 'youtube') return '#E53935';
    return '#C13584';
  };

  const getPlatformBg = (p: SocialPlatform) => {
    if (p === 'telegram') return '#F0F9FF';
    if (p === 'youtube') return '#FEF2F2';
    return '#FDF2F8';
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsHistoryOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(36, 35, 49, 0.4)',
          backdropFilter: 'blur(3px)',
          zIndex: 50,
          transition: 'all 200ms ease',
        }}
      />

      {/* Slide-over Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '430px',
          backgroundColor: '#FFFFFF',
          borderLeft: '1px solid var(--border-default)',
          boxShadow: '-10px 0 35px rgba(36, 35, 49, 0.1)',
          zIndex: 51,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-surface-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} color="var(--accent-primary)" />
            <h3
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}
            >
              {t.historyTitle} ({history.length})
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {history.length > 0 && (
              <button
                onClick={() => {
                  if (confirm(t.clearHistoryConfirm)) {
                    clearHistory();
                  }
                }}
                title={t.clearHistoryTip}
                style={{
                  padding: '5px 8px',
                  color: 'var(--text-muted)',
                  borderRadius: 'var(--radius-btn)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#DC2626')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Trash size={14} />
              </button>
            )}
            <button
              onClick={() => setIsHistoryOpen(false)}
              style={{
                padding: '5px 8px',
                color: 'var(--text-secondary)',
                borderRadius: 'var(--radius-btn)',
              }}
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Search & Platform Filters */}
        <div
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Search bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              backgroundColor: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-btn)',
              padding: '8px 12px',
            }}
          >
            <Search size={14} color="var(--text-muted)" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
              }}
            />
          </div>

          {/* Platform Filters */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '6px',
            }}
          >
            {(['all', 'telegram', 'youtube', 'instagram'] as const).map((p) => {
              const isActive = platformFilter === p;
              const labels = {
                all: t.filterAll,
                telegram: 'Telegram',
                youtube: 'YouTube',
                instagram: 'Instagram',
              };
              return (
                <button
                  key={p}
                  onClick={() => setPlatformFilter(p)}
                  style={{
                    padding: '5px 0',
                    fontSize: '12px',
                    fontWeight: isActive ? 600 : 500,
                    borderRadius: 'var(--radius-btn)',
                    backgroundColor: isActive ? 'var(--accent-muted)' : 'var(--bg-surface-subtle)',
                    border: `1px solid ${isActive ? 'var(--accent-border)' : 'var(--border-subtle)'}`,
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    transition: 'all 120ms ease',
                  }}
                >
                  {labels[p]}
                </button>
              );
            })}
          </div>
        </div>

        {/* List of items */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '14px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            backgroundColor: 'var(--bg-surface-subtle)',
          }}
        >
          {filteredHistory.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: 'var(--text-muted)',
                fontSize: '13px',
              }}
            >
              {t.emptyHistory}
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-default)',
                  borderRadius: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 140ms ease',
                }}
              >
                {/* Meta Row: Date & Platform */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        backgroundColor: getPlatformBg(item.platform),
                        color: getPlatformColor(item.platform),
                        fontWeight: 700,
                      }}
                    >
                      {getPlatformLabel(item.platform)}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {item.variants.length} {t.historyVariantsCount}
                  </span>
                </div>

                {/* Topic preview */}
                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: '1.45',
                    color: 'var(--text-primary)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.topic}
                </p>

                {/* Actions: Restore & Delete */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <button
                    onClick={() => loadHistoryRecord(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--accent-primary)',
                      padding: '4px 10px',
                      backgroundColor: 'var(--accent-muted)',
                      borderRadius: 'var(--radius-btn)',
                    }}
                  >
                    <span>{t.openRecordBtn}</span>
                    <ArrowRight size={12} />
                  </button>

                  <button
                    onClick={() => deleteHistoryRecord(item.id)}
                    title={t.deleteRecordTip}
                    style={{
                      padding: '4px 8px',
                      color: 'var(--text-muted)',
                      borderRadius: 'var(--radius-btn)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#DC2626')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
