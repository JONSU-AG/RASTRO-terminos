// src/lib/widgetSync.js
// Sincroniza datos en tiempo real entre la aplicación web/Capacitor y los 5 Widgets de la pantalla de inicio de Android:
// 1. Contador de Examen (Fecha elegible y nombre de examen)
// 2. Racha Semanal (Lunes a Domingo)
// 3. Racha Diaria (Días consecutivos y si estudió hoy)
// 4. Recordatorio de Estudio (Objetivos y motivación)
// 5. Temporizador Pomodoro (Tiempo de enfoque y descansos)

import { Preferences } from '@capacitor/preferences';

export async function syncWidgetsData({ streak, weeklyDays, examName, examDate, examDays, studiedToday, pomodoroTime }) {
  try {
    const tasks = [];

    if (streak !== undefined && streak !== null) {
      tasks.push(Preferences.set({ key: 'rumbo_streak', value: String(streak) }));
      try { localStorage.setItem('rumbo_streak', String(streak)); } catch {}
    }

    if (weeklyDays !== undefined && weeklyDays !== null) {
      const daysVal = Array.isArray(weeklyDays) ? weeklyDays.join(',') : String(weeklyDays);
      tasks.push(Preferences.set({ key: 'rumbo_weekly_days', value: daysVal }));
      try { localStorage.setItem('rumbo_weekly_days', daysVal); } catch {}
    }

    if (examName) {
      tasks.push(Preferences.set({ key: 'rumbo_exam_name', value: String(examName) }));
      try { localStorage.setItem('rumbo_exam_name', String(examName)); } catch {}
    }

    if (examDate) {
      tasks.push(Preferences.set({ key: 'rumbo_exam_date', value: String(examDate) }));
      try { localStorage.setItem('rumbo_exam_date', String(examDate)); } catch {}
    }

    if (examDays !== undefined && examDays !== null) {
      tasks.push(Preferences.set({ key: 'rumbo_exam_days', value: String(examDays) }));
      try { localStorage.setItem('rumbo_exam_days', String(examDays)); } catch {}
    }

    if (studiedToday !== undefined && studiedToday !== null) {
      const studiedVal = studiedToday ? 'true' : 'false';
      tasks.push(Preferences.set({ key: 'rumbo_studied_today', value: studiedVal }));
      try { localStorage.setItem('rumbo_studied_today', studiedVal); } catch {}
    }

    if (pomodoroTime !== undefined && pomodoroTime !== null) {
      tasks.push(Preferences.set({ key: 'rumbo_pomodoro_time', value: String(pomodoroTime) }));
      try { localStorage.setItem('rumbo_pomodoro_time', String(pomodoroTime)); } catch {}
    }

    await Promise.all(tasks);

    // Si estamos en Android nativo, actualizar los widgets inmediatamente
    triggerNativeWidgetRefresh();
  } catch (err) {
    // Falla silenciosa si no está en entorno nativo
    console.debug('Widget sync notice (normal on web):', err);
  }
}

export function triggerNativeWidgetRefresh(theme) {
  try {
    if (window.NativeWidgetBridge && typeof window.NativeWidgetBridge.refreshWidgets === 'function') {
      window.NativeWidgetBridge.refreshWidgets(theme || '');
    }
  } catch (err) {
    // Normal en web
  }
}
