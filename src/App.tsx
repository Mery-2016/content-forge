import React, { useEffect } from 'react';
import { useStore } from './store/useStore.js';
import { TRANSLATIONS } from './i18n/translations.js';
import { TopBar } from './components/TopBar.js';
import { CommandConsole } from './components/CommandConsole.js';
import { PresetsGrid } from './components/PresetsGrid.js';
import { ResultsSection } from './components/ResultsSection.js';
import { HistoryDrawer } from './components/HistoryDrawer.js';
import { SettingsModal } from './components/SettingsModal.js';
import { ErrorBanner } from './components/ErrorBanner.js';

export const App: React.FC = () => {
  const { uiLanguage, variants, isGenerating, checkServerStatus } = useStore();
  const t = TRANSLATIONS[uiLanguage];

  useEffect(() => {
    checkServerStatus();
  }, [checkServerStatus]);

  const hasResults = (variants && variants.length > 0) || isGenerating;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-canvas)',
        color: 'var(--text-primary)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Bar with Brand, Language Switcher, API Key, History */}
      <TopBar />

      {/* Main Container */}
      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: '820px',
          margin: '0 auto',
          padding: '30px 16px 60px 16px',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Welcome Header */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '26px',
            }}
          >
            <h1
              style={{
                fontSize: '28px',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                marginBottom: '8px',
              }}
            >
              {t.heroTitle}
            </h1>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--text-secondary)',
                maxWidth: '560px',
                margin: '0 auto',
                lineHeight: '1.5',
              }}
            >
              {t.heroSubtitle}
            </p>
          </div>

          {/* Command Console with Platform Tabs, Textarea, Text Language & Launch */}
          <CommandConsole />

          {/* Error Banner */}
          <ErrorBanner />

          {/* Empty State / Presets */}
          {!hasResults && <PresetsGrid />}

          {/* Results Section */}
          {hasResults && <ResultsSection />}
        </div>
      </main>

      {/* History Slide-over Drawer */}
      <HistoryDrawer />

      {/* Settings Modal */}
      <SettingsModal />
    </div>
  );
};
