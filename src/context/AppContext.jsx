import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext(null);

const FONT_STEPS = ['normal', 'large', 'x-large'];
const FONT_LABELS = { normal: 'A', large: 'A+', 'x-large': 'A++' };

function readLocal(key, fallback) {
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — preference just won't persist */
  }
}

function readSession(key) {
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(key, value) {
  try {
    if (value === null) window.sessionStorage.removeItem(key);
    else window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — session just won't persist a reload */
  }
}

export function AppProvider({ children }) {
  const [highContrast, setHighContrast] = useState(() => readLocal('n79-contrast', 'off') === 'on');
  const [fontStep, setFontStep] = useState(() => {
    const stored = readLocal('n79-font', 'normal');
    return FONT_STEPS.includes(stored) ? stored : 'normal';
  });
  const [visitor, setVisitor] = useState(() => readSession('n79-visitor'));

  useEffect(() => {
    document.documentElement.dataset.contrast = highContrast ? 'high' : 'normal';
    writeLocal('n79-contrast', highContrast ? 'on' : 'off');
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.dataset.fontSize = fontStep;
    writeLocal('n79-font', fontStep);
  }, [fontStep]);

  function cycleFontSize() {
    setFontStep((current) => {
      const idx = FONT_STEPS.indexOf(current);
      return FONT_STEPS[(idx + 1) % FONT_STEPS.length];
    });
  }

  function login(role, details) {
    const record = { role, ...details, since: Date.now() };
    setVisitor(record);
    writeSession('n79-visitor', record);
  }

  function logout() {
    setVisitor(null);
    writeSession('n79-visitor', null);
  }

  const value = {
    highContrast,
    toggleHighContrast: () => setHighContrast((v) => !v),
    fontStep,
    fontLabel: FONT_LABELS[fontStep],
    cycleFontSize,
    isAuthed: Boolean(visitor),
    visitor,
    displayName: visitor?.displayName ?? '',
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
