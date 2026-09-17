import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext(null);

const FONT_STEPS = ['normal', 'large', 'x-large'];

function readStored(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — non-fatal, prefs just won't persist */
  }
}

export function AppProvider({ children }) {
  const [visitorRole, setVisitorRole] = useState(() => readStored('n79-role', ''));
  const [highContrast, setHighContrast] = useState(() => readStored('n79-contrast', 'off') === 'on');
  const [fontStep, setFontStep] = useState(() => {
    const stored = readStored('n79-font', 'normal');
    return FONT_STEPS.includes(stored) ? stored : 'normal';
  });

  useEffect(() => {
    document.documentElement.dataset.contrast = highContrast ? 'high' : 'normal';
    writeStored('n79-contrast', highContrast ? 'on' : 'off');
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.dataset.fontSize = fontStep;
    writeStored('n79-font', fontStep);
  }, [fontStep]);

  useEffect(() => {
    writeStored('n79-role', visitorRole);
  }, [visitorRole]);

  function cycleFontSize() {
    setFontStep((current) => {
      const idx = FONT_STEPS.indexOf(current);
      return FONT_STEPS[(idx + 1) % FONT_STEPS.length];
    });
  }

  const value = {
    visitorRole,
    setVisitorRole,
    highContrast,
    toggleHighContrast: () => setHighContrast((v) => !v),
    fontStep,
    cycleFontSize,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
