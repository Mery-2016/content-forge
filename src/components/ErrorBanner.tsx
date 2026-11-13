import React from 'react';
import { useStore } from '../store/useStore.js';
import { TRANSLATIONS } from '../i18n/translations.js';
import { AlertCircle, RotateCcw, X } from 'lucide-react';

export const ErrorBanner: React.FC = () => {
  const { uiLanguage, error, setError, startGeneration } = useStore();
  const t = TRANSLATIONS[uiLanguage];

  if (!error) return null;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '740px',
        margin: '16px auto',
        padding: '14px 18px',
        backgroundColor: '#FEF2F2',
        border: '1px solid #FECACA',
        borderRadius: 'var(--radius-input)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <AlertCircle size={18} color="#DC2626" />
        <div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#991B1B',
            }}
          >
            {t.errorTitle}
          </div>
          <div style={{ fontSize: '13px', color: '#B91C1C' }}>{error}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => startGeneration()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 600,
            borderRadius: 'var(--radius-btn)',
            boxShadow: '0 2px 6px rgba(220, 38, 38, 0.2)',
          }}
        >
          <RotateCcw size={13} />
          <span>{t.retryBtn}</span>
        </button>

        <button
          onClick={() => setError(null)}
          style={{
            padding: '5px',
            color: '#991B1B',
            borderRadius: 'var(--radius-btn)',
          }}
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
};
