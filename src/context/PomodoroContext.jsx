import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { soundEngine, SOUND_CATALOG } from '../lib/soundEffects';
import { syncWidgetsData } from '../lib/widgetSync';

const PomodoroContext = createContext(null);

export const POMODORO_MODES = {
  study: {
    id: 'study',
    name: 'Estudio',
    duration: 25 * 60, // 25 min
    color: '#A855F7',
    iconEmoji: '🧠',
    tip: '¡Cero distracciones! Concéntrate en resolver preguntas o repasar teoría.'
  },
  shortBreak: {
    id: 'shortBreak',
    name: 'Descanso Corto',
    duration: 5 * 60, // 5 min
    color: '#10B981',
    iconEmoji: '☕',
    tip: 'Estira las piernas, bebe un sorbo de agua y descansa la vista.'
  },
  longBreak: {
    id: 'longBreak',
    name: 'Descanso Largo',
    duration: 15 * 60, // 15 min
    color: '#38BDF8',
    iconEmoji: '✨',
    tip: '¡Excelente bloque completado! Desconecta y recarga energías para la siguiente sesión.'
  },
  custom: {
    id: 'custom',
    name: 'Personalizado',
    duration: 60, // 1 min inicial por defecto
    color: '#F59E0B',
    iconEmoji: '⚙️',
    tip: '¡Configura el tiempo exacto en minutos o segundos que prefieras para estudiar o probar!'
  }
};

export const DEFAULT_SOUNDS_BY_MODE = {
  study: 'campana_zen',
  shortBreak: 'campanillas_viento',
  longBreak: 'acordes_piano',
  custom: 'flauta_melodica'
};

const SOUNDS_STORAGE_KEY = 'rastro_pomodoro_sounds_by_mode_v1';

export const PomodoroProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeModeKey, setActiveModeKey] = useState('study');
  const [timeLeft, setTimeLeft] = useState(POMODORO_MODES.study.duration);

  // Configuraciones personalizadas unificadas (Estudio, Descanso Corto, Descanso Largo, Cantidad de Bloques)
  const [customStudyMinutes, setCustomStudyMinutes] = useState(() => {
    try { return parseInt(localStorage.getItem('rastro_pomo_study_min'), 10) || 25; } catch { return 25; }
  });
  const [customShortBreakMinutes, setCustomShortBreakMinutes] = useState(() => {
    try { return parseInt(localStorage.getItem('rastro_pomo_short_min'), 10) || 5; } catch { return 5; }
  });
  const [customLongBreakMinutes, setCustomLongBreakMinutes] = useState(() => {
    try { return parseInt(localStorage.getItem('rastro_pomo_long_min'), 10) || 20; } catch { return 20; }
  });
  const [customCyclesBeforeLongBreak, setCustomCyclesBeforeLongBreak] = useState(() => {
    try { return parseInt(localStorage.getItem('rastro_pomo_cycles'), 10) || 4; } catch { return 4; }
  });

  // Guardar ajustes personalizados en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rastro_pomo_study_min', String(customStudyMinutes));
      localStorage.setItem('rastro_pomo_short_min', String(customShortBreakMinutes));
      localStorage.setItem('rastro_pomo_long_min', String(customLongBreakMinutes));
      localStorage.setItem('rastro_pomo_cycles', String(customCyclesBeforeLongBreak));
    } catch {}
  }, [customStudyMinutes, customShortBreakMinutes, customLongBreakMinutes, customCyclesBeforeLongBreak]);

  // Seguimiento de minutos de estudio completados hoy
  const getTodayDateKey = () => {
    const d = new Date();
    return `rastro_pomodoro_today_${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}`;
  };

  const [todayStudiedMinutes, setTodayStudiedMinutes] = useState(() => {
    try {
      return parseInt(localStorage.getItem(getTodayDateKey()), 10) || 0;
    } catch {
      return 0;
    }
  });

  const addStudiedMinutes = useCallback((mins) => {
    if (!mins || mins <= 0) return;
    setTodayStudiedMinutes((prev) => {
      const next = prev + mins;
      try {
        localStorage.setItem(getTodayDateKey(), String(next));
      } catch {}
      return next;
    });
  }, []);

  // Compatibilidad con segundos personalizados para pruebas
  const [customMinutes, setCustomMinutes] = useState(0);
  const [customSeconds, setCustomSeconds] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [autoCycle, setAutoCycle] = useState(true);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sonido INDIVIDUAL para cada sección/modo de Pomodoro (Estudio, Descanso Corto, Descanso Largo, Personalizado)
  const [soundsByMode, setSoundsByMode] = useState(() => {
    try {
      const saved = localStorage.getItem(SOUNDS_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SOUNDS_BY_MODE, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_SOUNDS_BY_MODE;
  });

  // Guardar cambios de sonidos individuales en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SOUNDS_STORAGE_KEY, JSON.stringify(soundsByMode));
    } catch {}
  }, [soundsByMode]);

  // Obtener sonido actual del modo activo
  const currentSoundId = soundsByMode[activeModeKey] || DEFAULT_SOUNDS_BY_MODE[activeModeKey] || 'campana_zen';

  const setSoundForCurrentMode = useCallback((soundId) => {
    setSoundsByMode(prev => ({
      ...prev,
      [activeModeKey]: soundId
    }));
  }, [activeModeKey]);

  const setSoundForSpecificMode = useCallback((modeKey, soundId) => {
    setSoundsByMode(prev => ({
      ...prev,
      [modeKey]: soundId
    }));
  }, []);

  const playSoundForMode = useCallback((modeKey) => {
    if (!soundEnabled) return;
    const soundId = soundsByMode[modeKey] || DEFAULT_SOUNDS_BY_MODE[modeKey] || 'campana_zen';
    soundEngine.play(soundId);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([200, 100, 300]);
    }
  }, [soundEnabled, soundsByMode]);

  const switchMode = useCallback((modeKey) => {
    setActiveModeKey(modeKey);
    setIsRunning(false);
    if (modeKey === 'study') {
      setTimeLeft((customStudyMinutes || 25) * 60);
    } else if (modeKey === 'shortBreak') {
      setTimeLeft((customShortBreakMinutes || 5) * 60);
    } else if (modeKey === 'longBreak') {
      setTimeLeft((customLongBreakMinutes || 15) * 60);
    } else {
      setTimeLeft((customStudyMinutes || 25) * 60);
    }
  }, [customStudyMinutes, customShortBreakMinutes, customLongBreakMinutes]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    if (activeModeKey === 'study') {
      setTimeLeft((customStudyMinutes || 25) * 60);
    } else if (activeModeKey === 'shortBreak') {
      setTimeLeft((customShortBreakMinutes || 5) * 60);
    } else if (activeModeKey === 'longBreak') {
      setTimeLeft((customLongBreakMinutes || 15) * 60);
    } else {
      setTimeLeft((customStudyMinutes || 25) * 60);
    }
  }, [activeModeKey, customStudyMinutes, customShortBreakMinutes, customLongBreakMinutes]);

  const setPresetDuration = useCallback((minutes) => {
    const validMins = Math.max(1, Math.min(120, minutes));
    setCustomStudyMinutes(validMins);
    if (activeModeKey === 'study' || activeModeKey === 'custom') {
      setTimeLeft(validMins * 60);
      setIsRunning(false);
    }
  }, [activeModeKey]);

  const togglePlay = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const addSeconds = useCallback((secs) => {
    setTimeLeft(prev => Math.max(0, prev + secs));
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const minimize = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(true);
  }, []);

  const closeAndStop = useCallback(() => {
    setIsRunning(false);
    setIsOpen(false);
    setIsMinimized(false);
    if (activeModeKey === 'custom') {
      setTimeLeft((customStudyMinutes || 25) * 60);
    } else {
      setTimeLeft(POMODORO_MODES[activeModeKey]?.duration || 25 * 60);
    }
  }, [activeModeKey, customStudyMinutes]);

  const toggleModal = useCallback(() => {
    setIsOpen(prev => {
      if (!prev) setIsMinimized(false);
      return !prev;
    });
  }, []);

  // Escuchar eventos globales (Widget de Android o App Shortcuts) para abrir el Pomodoro
  useEffect(() => {
    const handleOpen = () => openModal();
    window.addEventListener('rastro_open_pomodoro', handleOpen);
    window.addEventListener('rumbo_open_pomodoro', handleOpen);
    return () => {
      window.removeEventListener('rastro_open_pomodoro', handleOpen);
      window.removeEventListener('rumbo_open_pomodoro', handleOpen);
    };
  }, [openModal]);

  // Tick principal del temporizador persistente en segundo plano
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Sonar alarma configurada individualmente para ESTE modo
          playSoundForMode(activeModeKey);

          if (autoCycle) {
            if (activeModeKey === 'study' || activeModeKey === 'custom') {
              addStudiedMinutes(customStudyMinutes || 25);
              const nextCycles = completedCycles + 1;
              setCompletedCycles(nextCycles);
              const targetCycles = activeModeKey === 'custom' ? (customCyclesBeforeLongBreak || 4) : 4;
              const isLong = nextCycles % targetCycles === 0;
              const nextMode = isLong ? 'longBreak' : 'shortBreak';
              setActiveModeKey(nextMode);
              const duration = activeModeKey === 'custom'
                ? (isLong ? (customLongBreakMinutes || 20) * 60 : (customShortBreakMinutes || 5) * 60)
                : POMODORO_MODES[nextMode].duration;
              return duration;
            } else {
              // Fin de descanso -> volver a Estudio o Personalizado
              const nextMode = 'study';
              setActiveModeKey(nextMode);
              return (customStudyMinutes || 25) * 60;
            }
          } else {
            if (activeModeKey === 'study' || activeModeKey === 'custom') {
              addStudiedMinutes(customStudyMinutes || 25);
            }
            setIsRunning(false);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isRunning,
    autoCycle,
    activeModeKey,
    completedCycles,
    customCyclesBeforeLongBreak,
    customLongBreakMinutes,
    customShortBreakMinutes,
    customStudyMinutes,
    playSoundForMode,
    addStudiedMinutes
  ]);

  // Sincronizar tiempo de Pomodoro con el Widget de Android
  useEffect(() => {
    const formatted = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;
    syncWidgetsData({ pomodoroTime: formatted });
  }, [timeLeft]);

  const activeMode = POMODORO_MODES[activeModeKey] || POMODORO_MODES.study;
  const currentModeDuration = activeModeKey === 'custom' 
    ? ((customStudyMinutes || 25) * 60)
    : activeMode.duration;
  const progressRatio = currentModeDuration > 0 ? Math.min(1, Math.max(0, 1 - timeLeft / currentModeDuration)) : 0;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatTime = (m, s) => {
    const minVal = typeof m === 'number' ? m : Math.floor(timeLeft / 60);
    const secVal = typeof s === 'number' ? s : (timeLeft % 60);
    return `${String(minVal).padStart(2, '0')}:${String(secVal).padStart(2, '0')}`;
  };

  const togglePomodoro = () => {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  };

  return (
    <PomodoroContext.Provider
      value={{
        isOpen,
        isMinimized,
        openModal,
        closeModal,
        minimize,
        closeAndStop,
        toggleModal,
        togglePomodoro,
        isPomodoroActive: isRunning,
        formatTime,
        minutes,
        seconds,
        activeModeKey,
        activeMode,
        timeLeft,
        isRunning,
        autoCycle,
        setAutoCycle,
        completedCycles,
        todayStudiedMinutes,
        setPresetDuration,
        soundEnabled,
        setSoundEnabled,
        soundsByMode,
        currentSoundId,
        setSoundForCurrentMode,
        setSoundForSpecificMode,
        playSoundForMode,
        switchMode,
        togglePlay,
        resetTimer,
        addSeconds,
        customStudyMinutes,
        setCustomStudyMinutes,
        customShortBreakMinutes,
        setCustomShortBreakMinutes,
        customLongBreakMinutes,
        setCustomLongBreakMinutes,
        customCyclesBeforeLongBreak,
        setCustomCyclesBeforeLongBreak,
        customMinutes,
        setCustomMinutes,
        customSeconds,
        setCustomSeconds,
        currentModeDuration,
        progressRatio
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error('usePomodoro debe usarse dentro de un PomodoroProvider');
  }
  return context;
};
