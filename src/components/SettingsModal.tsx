import React, { useState } from 'react';
import { useStore } from '../store/useStore.js';
import { TRANSLATIONS } from '../i18n/translations.js';
import { X, Key, CheckCircle, ExternalLink } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const {
    uiLanguage,
    isSettingsOpen,
    setIsSettingsOpen,
    apiKey,
    setApiKey,
    model,
    setModel,
    hasServerKey,
    checkServerStatus,
  } = useStore();

  const t = TRANSLATIONS[uiLanguage];
  const [localKey, setLocalKey] = useState(apiKey);
  const [localModel, setLocalModel] = useState(model);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isSettingsOpen) return null;

  const handleSave = () => {
    setApiKey(localKey.trim());
    setModel(localModel.trim());
    setSaveSuccess(true);
    checkServerStatus();
    setTimeout(() => {
      setSaveSuccess(false);
      setIsSettingsOpen(false);
    }, 800);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsSettingsOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(36, 35, 49, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 60,
        }}
      />

      {/* Dialog */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '480px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-card)',
          boxShadow: '0 20px 50px rgba(36, 35, 49, 0.15)',
          zIndex: 61,
          overflow: 'hidden',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <Key size={16} color="var(--accent-primary)" />
            <h3
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}
            >
              {t.settingsTitle}
            </h3>
          </div>

          <button
            onClick={() => setIsSettingsOpen(false)}
            style={{ padding: '4px', color: 'var(--text-secondary)' }}
          >
            <X size={17} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {hasServerKey && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                borderRadius: 'var(--radius-btn)',
              }}
            >
              <CheckCircle size={15} color="#10B981" />
              <span style={{ fontSize: '13px', color: '#047857', fontWeight: 500 }}>
                {t.serverKeyActiveMsg}
              </span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {t.modelSelectLabel}
            </label>
            <select
              value={localModel}
              onChange={(e) => setLocalModel(e.target.value)}
              style={{
                padding: '10px 12px',
                backgroundColor: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-btn)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="gemini-3.5-flash-lite">Gemini 3.5 Flash Lite</option>
              <option value="gemini-3.8-flash">Gemini 3.8 Flash</option>
              <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
              <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {t.apiKeyInputLabel}
            </label>
            <input
              type="password"
              value={localKey}
              onChange={(e) => setLocalKey(e.target.value)}
              placeholder="AQ.Ab... / AIzaSy..."
              style={{
                padding: '10px 12px',
                backgroundColor: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-btn)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                outline: 'none',
              }}
            />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {t.apiKeyInputHint}
            </span>
          </div>

          <div
            style={{
              padding: '12px 14px',
              backgroundColor: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-btn)',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
            }}
          >
            {t.apiKeyNotice}
          </div>

          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--accent-primary)',
              textDecoration: 'none',
            }}
          >
            <span>{t.getKeyLink}</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 20px',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          <button
            onClick={() => setIsSettingsOpen(false)}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              backgroundColor: 'transparent',
              borderRadius: 'var(--radius-btn)',
            }}
          >
            {t.cancelBtn}
          </button>

          <button
            onClick={handleSave}
            style={{
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#FFFFFF',
              backgroundColor: saveSuccess ? '#10B981' : 'var(--accent-primary)',
              borderRadius: 'var(--radius-btn)',
              boxShadow: '0 2px 8px rgba(35, 75, 131, 0.3)',
              border: 'none',
              transition: 'all 160ms ease',
            }}
          >
            {saveSuccess ? t.savedBtn : t.saveBtn}
          </button>
        </div>
      </div>
    </>
  );
};
