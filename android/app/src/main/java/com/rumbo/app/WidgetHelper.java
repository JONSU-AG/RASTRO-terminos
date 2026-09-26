package com.rumbo.app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.widget.RemoteViews;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class WidgetHelper {

    public static final String PREFS_NAME = "CapacitorStorage";
    public static final String KEY_STREAK = "rumbo_streak";
    public static final String KEY_EXAM_NAME = "rumbo_exam_name";
    public static final String KEY_EXAM_DATE = "rumbo_exam_date";
    public static final String KEY_EXAM_DAYS = "rumbo_exam_days";
    public static final String KEY_WEEKLY_DAYS = "rumbo_weekly_days"; // e.g. "1,2,3,4"
    public static final String KEY_STUDIED_TODAY = "rumbo_studied_today";
    public static final String KEY_POMODORO_TIME = "rumbo_pomodoro_time";

    // Default Exam: Examen de Admisión general
    public static final String DEFAULT_EXAM_NAME = "EXAMEN DE ADMISIÓN";
    public static final String DEFAULT_EXAM_DATE = "2026-08-30";

    public static PendingIntent createOpenAppPendingIntent(Context context, String destination) {
        Intent intent = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());
        if (intent == null) {
            intent = new Intent(context, MainActivity.class);
        }
        intent.setPackage(context.getPackageName());
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        intent.putExtra("from_widget", true);
        if (destination != null) {
            intent.putExtra("widget_destination", destination);
        }

        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }

        return PendingIntent.getActivity(context, destination != null ? destination.hashCode() : 0, intent, flags);
    }

    public static PendingIntent createOpenAppPendingIntent(Context context) {
        return createOpenAppPendingIntent(context, null);
    }

    public static SharedPreferences getPrefs(Context context) {
        return context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }

    public static int getStreak(Context context) {
        try {
            String val = getPrefs(context).getString(KEY_STREAK, "1");
            return Math.max(1, Integer.parseInt(val));
        } catch (Exception e) {
            return 1;
        }
    }

    public static long calculateDaysUntilExam(Context context, int appWidgetId) {
        try {
            SharedPreferences prefs = getPrefs(context);
            String manualDays = prefs.getString(KEY_EXAM_DAYS, "");
            if (manualDays != null && !manualDays.trim().isEmpty()) {
                long d = Long.parseLong(manualDays.trim());
                if (d >= 0) return d;
            }

            String dateStr = prefs.getString(KEY_EXAM_DATE + "_" + appWidgetId, 
                    prefs.getString(KEY_EXAM_DATE, DEFAULT_EXAM_DATE));
            if (dateStr == null || dateStr.isEmpty()) {
                dateStr = DEFAULT_EXAM_DATE;
            }
            if (dateStr.contains("T")) {
                dateStr = dateStr.split("T")[0];
            }

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
            Date examDate = sdf.parse(dateStr);
            if (examDate != null) {
                long diffMillis = examDate.getTime() - System.currentTimeMillis();
                long days = diffMillis / (1000 * 60 * 60 * 24);
                return Math.max(0, days);
            }
        } catch (Exception ignored) {
        }
        return 75; // Fallback
    }

    public static String getExamName(Context context, int appWidgetId) {
        try {
            SharedPreferences prefs = getPrefs(context);
            String name = prefs.getString(KEY_EXAM_NAME + "_" + appWidgetId, 
                    prefs.getString(KEY_EXAM_NAME, DEFAULT_EXAM_NAME));
            if (name != null && !name.trim().isEmpty()) {
                return name.trim();
            }
        } catch (Exception ignored) {}
        return DEFAULT_EXAM_NAME;
    }

    // Función para adaptar dinámicamente el tema del widget según la preferencia activa en la App
    public static void applyThemeToWidget(Context context, RemoteViews views, int rootId, int titleId, int subId) {
        try {
            SharedPreferences prefs = getPrefs(context);
            String theme = prefs.getString("rumbo_active_theme", "dark");
            if (theme == null) theme = "dark";

            int bgDrawable;
            int titleColor;
            int subColor;

            if (theme.contains("light-warm") || theme.contains("beige") || theme.equals("warm")) {
                bgDrawable = R.drawable.widget_bg_warm;
                titleColor = 0xFF1E293B;
                subColor = 0xFF64748B;
            } else if (theme.contains("guinda-light")) {
                bgDrawable = R.drawable.widget_bg_light;
                titleColor = 0xFF4A0E17;
                subColor = 0xFF7F1D1D;
            } else if (theme.contains("coraje-dark")) {
                bgDrawable = R.drawable.widget_bg_coraje;
                titleColor = 0xFFFFFFFF;
                subColor = 0xFFCBD5E1;
            } else if (theme.contains("coraje")) {
                bgDrawable = R.drawable.widget_bg_warm;
                titleColor = 0xFF2D1810;
                subColor = 0xFF5C3828;
            } else if (theme.contains("light") || theme.contains("google")) {
                bgDrawable = R.drawable.widget_bg_light;
                titleColor = 0xFF0F172A;
                subColor = 0xFF475569;
            } else if (theme.contains("guinda")) {
                bgDrawable = R.drawable.widget_bg_guinda;
                titleColor = 0xFFFFFFFF;
                subColor = 0xFFCBD5E1;
            } else {
                bgDrawable = R.drawable.widget_bg_dark;
                titleColor = 0xFFFFFFFF;
                subColor = 0xFF94A3B8;
            }

            if (rootId != 0) {
                views.setInt(rootId, "setBackgroundResource", bgDrawable);
            }
            if (titleId != 0) {
                views.setTextColor(titleId, titleColor);
            }
            if (subId != 0) {
                views.setTextColor(subId, subColor);
            }
        } catch (Exception ignored) {}
    }

    // 1. Widget de Contador de Examen con Fecha Elegible
    public static void updateExamCountdown(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_exam_countdown);

        long days = calculateDaysUntilExam(context, appWidgetId);
        String examName = getExamName(context, appWidgetId);

        views.setTextViewText(R.id.widget_exam_name, examName);
        views.setTextViewText(R.id.widget_exam_days, String.valueOf(days));
        views.setTextViewText(R.id.widget_exam_subtitle, "Toca para practicar en el Simulador (Ajustes para cambiar fecha)");

        // Aplicar tema dinámico
        applyThemeToWidget(context, views, R.id.widget_countdown_root, R.id.widget_exam_name, R.id.widget_exam_subtitle);
        SharedPreferences prefs = getPrefs(context);
        String theme = prefs.getString("rumbo_active_theme", "dark");
        if (theme != null && (theme.contains("light") || theme.contains("warm") || theme.contains("beige"))) {
            views.setTextColor(R.id.widget_exam_days, 0xFF0F172A);
        } else {
            views.setTextColor(R.id.widget_exam_days, 0xFFF8FAFC);
        }

        // Alternar mascotas dinámicamente entre Artyon y Orstty
        int mascotRes = (days % 2 == 0) ? R.drawable.mascot_orstty_study : R.drawable.mascot_artyon_content;
        views.setImageViewResource(R.id.widget_exam_mascot, mascotRes);

        // Click on root opens app (Simulador)
        PendingIntent pendingIntent = createOpenAppPendingIntent(context, "simulador");
        views.setOnClickPendingIntent(R.id.widget_countdown_root, pendingIntent);

        // Click on settings gear opens ExamCountdownConfigActivity to change date!
        Intent configIntent = new Intent(context, ExamCountdownConfigActivity.class);
        configIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        configIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent configPendingIntent = PendingIntent.getActivity(context, appWidgetId, configIntent, flags);
        views.setOnClickPendingIntent(R.id.widget_btn_settings, configPendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    // 2. Widget de Racha Semanal
    public static void updateWeeklyStreak(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_weekly_streak);

        int streak = getStreak(context);
        views.setTextViewText(R.id.widget_streak_days, streak + " DÍAS DE RACHA");

        String message;
        if (streak >= 7) {
            message = streak + " días sin parar. Tu meta de admisión está más cerca";
        } else if (streak >= 3) {
            message = "Gran constancia. Mantén tu racha activa hoy";
        } else {
            message = "Completa tu lección de hoy para subir tu racha";
        }
        views.setTextViewText(R.id.widget_streak_message, message);

        // Aplicar tema dinámico
        applyThemeToWidget(context, views, R.id.widget_weekly_root, 0, R.id.widget_streak_message);

        Calendar cal = Calendar.getInstance();
        int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
        int mondayBasedToday = (dayOfWeek == Calendar.SUNDAY) ? 7 : (dayOfWeek - 1);

        int[] dayViewIds = {
            R.id.day_indicator_1,
            R.id.day_indicator_2,
            R.id.day_indicator_3,
            R.id.day_indicator_4,
            R.id.day_indicator_5,
            R.id.day_indicator_6,
            R.id.day_indicator_7
        };

        SharedPreferences prefs = getPrefs(context);
        String weeklyStr = prefs.getString(KEY_WEEKLY_DAYS, "");

        for (int i = 0; i < 7; i++) {
            int dayNum = i + 1;
            boolean isActive = false;
            if (weeklyStr != null && weeklyStr.contains(String.valueOf(dayNum))) {
                isActive = true;
            } else if (streak > 0 && dayNum <= mondayBasedToday && (mondayBasedToday - dayNum) < streak) {
                isActive = true;
            }

            if (dayNum == mondayBasedToday) {
                views.setInt(dayViewIds[i], "setBackgroundResource", R.drawable.widget_day_today);
                views.setTextColor(dayViewIds[i], 0xFFFFFFFF);
            } else if (isActive) {
                views.setInt(dayViewIds[i], "setBackgroundResource", R.drawable.widget_day_active);
                views.setTextColor(dayViewIds[i], 0xFFFFFFFF);
            } else {
                views.setInt(dayViewIds[i], "setBackgroundResource", R.drawable.widget_day_inactive);
                views.setTextColor(dayViewIds[i], 0xFF94A3B8);
            }
        }

        // Mascot icon on weekly widget: alternar entre Orstty y Artyon según racha
        int mascotRes = (streak % 2 == 0) ? R.drawable.mascot_orstty_happy : R.drawable.mascot_artyon_content;
        views.setImageViewResource(R.id.widget_weekly_mascot, mascotRes);

        PendingIntent pendingIntent = createOpenAppPendingIntent(context, "aprender");
        views.setOnClickPendingIntent(R.id.widget_weekly_root, pendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    // 3. Widget de Racha Diaria
    public static void updateDailyStreak(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_daily_streak);

        int streak = getStreak(context);
        views.setTextViewText(R.id.widget_daily_streak_number, String.valueOf(streak));

        // Aplicar tema dinámico
        applyThemeToWidget(context, views, R.id.widget_daily_root, 0, R.id.widget_daily_message);
        SharedPreferences prefs = getPrefs(context);
        String theme = prefs.getString("rumbo_active_theme", "dark");
        if (theme != null && (theme.contains("light") || theme.contains("warm") || theme.contains("beige"))) {
            views.setTextColor(R.id.widget_daily_streak_number, 0xFF0F172A);
        } else {
            views.setTextColor(R.id.widget_daily_streak_number, 0xFFFFFFFF);
        }

        boolean studiedToday = prefs.getBoolean(KEY_STUDIED_TODAY, false);

        if (studiedToday) {
            views.setTextViewText(R.id.widget_daily_status_badge, "Racha asegurada hoy");
            views.setTextColor(R.id.widget_daily_status_badge, 0xFF10B981);
            views.setTextViewText(R.id.widget_daily_message, "Excelente constancia. Toca para seguir acumulando progreso");
            views.setImageViewResource(R.id.widget_daily_mascot, R.drawable.mascot_orstty_happy);
        } else {
            views.setTextViewText(R.id.widget_daily_status_badge, "En progreso • Falta hoy");
            views.setTextColor(R.id.widget_daily_status_badge, 0xFFF59E0B);
            views.setTextViewText(R.id.widget_daily_message, "Resuelve una lección hoy en Aprender y asegura tu racha");
            views.setImageViewResource(R.id.widget_daily_mascot, R.drawable.mascot_artyon_content);
        }

        PendingIntent pendingIntent = createOpenAppPendingIntent(context, "aprender");
        views.setOnClickPendingIntent(R.id.widget_daily_root, pendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    // Mini Streak con layout propio optimizado
    public static void updateMiniStreak(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_mini_streak);

        int streak = getStreak(context);
        views.setTextViewText(R.id.widget_mini_streak_number, String.valueOf(streak));
        views.setTextViewText(R.id.widget_mini_message, "Entra a practicar hoy y protege tu racha");

        applyThemeToWidget(context, views, R.id.widget_mini_root, 0, R.id.widget_mini_message);
        SharedPreferences prefs = getPrefs(context);
        String theme = prefs.getString("rumbo_active_theme", "dark");
        if (theme != null && (theme.contains("light") || theme.contains("warm") || theme.contains("beige"))) {
            views.setTextColor(R.id.widget_mini_streak_number, 0xFF0F172A);
        } else {
            views.setTextColor(R.id.widget_mini_streak_number, 0xFFFFFFFF);
        }

        PendingIntent pendingIntent = createOpenAppPendingIntent(context, "aprender");
        views.setOnClickPendingIntent(R.id.widget_mini_root, pendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    // 4. Widget de Recordatorio de Estudio
    public static void updateStudyReminder(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_study_reminder);

        Calendar cal = Calendar.getInstance();
        int hour = cal.get(Calendar.HOUR_OF_DAY);

        String title;
        String body;

        if (hour < 12) {
            title = "Sesión matutina de estudio";
            body = "Meta del día: Resuelve 10 preguntas de repaso o revisa un resumen clave.";
        } else if (hour < 19) {
            title = "Momento de practicar en Aprender";
            body = "Aprovecha la tarde: Entrena en el simulacro y refuerza tus materias prioritarias.";
        } else {
            title = "Sesión nocturna de repaso";
            body = "Haz un test de 15 preguntas antes de descansar para afianzar la memoria.";
        }

        views.setTextViewText(R.id.widget_reminder_title, title);
        views.setTextViewText(R.id.widget_reminder_body, body);

        // Aplicar tema dinámico
        applyThemeToWidget(context, views, R.id.widget_reminder_root, R.id.widget_reminder_title, R.id.widget_reminder_body);

        PendingIntent pendingIntent = createOpenAppPendingIntent(context, "aprender");
        views.setOnClickPendingIntent(R.id.widget_reminder_root, pendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    // 5. Widget de Temporizador Pomodoro
    public static void updatePomodoro(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_pomodoro);

        SharedPreferences prefs = getPrefs(context);
        String customTime = prefs.getString(KEY_POMODORO_TIME, "25:00");

        views.setTextViewText(R.id.widget_pomodoro_time, customTime);
        views.setTextViewText(R.id.widget_pomodoro_mode, "TÉCNICA POMODORO");
        views.setTextViewText(R.id.widget_pomodoro_cycles, "25m Estudio • 5m Descanso");
        views.setTextViewText(R.id.widget_pomodoro_action, "Toca para iniciar sesión Pomodoro");

        // Alternar mascotas entre Artyon y Orstty
        Calendar cal = Calendar.getInstance();
        int hour = cal.get(Calendar.HOUR_OF_DAY);
        int mascotRes = (hour % 2 == 0) ? R.drawable.mascot_artyon_content : R.drawable.mascot_orstty_study;
        views.setImageViewResource(R.id.widget_pomodoro_mascot, mascotRes);

        // Aplicar tema dinámico
        applyThemeToWidget(context, views, R.id.widget_pomodoro_root, 0, R.id.widget_pomodoro_action);
        String theme = prefs.getString("rumbo_active_theme", "dark");
        if (theme != null && (theme.contains("light") || theme.contains("warm") || theme.contains("beige"))) {
            views.setTextColor(R.id.widget_pomodoro_time, 0xFF0F172A);
        } else {
            views.setTextColor(R.id.widget_pomodoro_time, 0xFFFFFFFF);
        }

        PendingIntent pendingIntent = createOpenAppPendingIntent(context, "pomodoro");
        views.setOnClickPendingIntent(R.id.widget_pomodoro_root, pendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    // Actualizar todos los widgets a la vez
    public static void refreshAllWidgets(Context context) {
        if (context == null) return;
        try {
            AppWidgetManager manager = AppWidgetManager.getInstance(context);
            if (manager == null) return;

            // 1. Contador Examen
            try {
                ComponentName countdownName = new ComponentName(context, ExamCountdownWidget.class);
                int[] countdownIds = manager.getAppWidgetIds(countdownName);
                if (countdownIds != null) {
                    for (int id : countdownIds) {
                        updateExamCountdown(context, manager, id);
                    }
                }
            } catch (Throwable ignored) {}

            // 2. Racha Semanal
            try {
                ComponentName weeklyName = new ComponentName(context, WeeklyStreakWidget.class);
                int[] weeklyIds = manager.getAppWidgetIds(weeklyName);
                if (weeklyIds != null) {
                    for (int id : weeklyIds) {
                        updateWeeklyStreak(context, manager, id);
                    }
                }
            } catch (Throwable ignored) {}

            // 3. Racha Diaria
            try {
                ComponentName dailyName = new ComponentName(context, DailyStreakWidget.class);
                int[] dailyIds = manager.getAppWidgetIds(dailyName);
                if (dailyIds != null) {
                    for (int id : dailyIds) {
                        updateDailyStreak(context, manager, id);
                    }
                }
            } catch (Throwable ignored) {}

            // Mini Streak legacy
            try {
                ComponentName miniName = new ComponentName(context, MiniStreakWidget.class);
                int[] miniIds = manager.getAppWidgetIds(miniName);
                if (miniIds != null) {
                    for (int id : miniIds) {
                        updateMiniStreak(context, manager, id);
                    }
                }
            } catch (Throwable ignored) {}

            // 4. Recordatorio
            try {
                ComponentName reminderName = new ComponentName(context, StudyReminderWidget.class);
                int[] reminderIds = manager.getAppWidgetIds(reminderName);
                if (reminderIds != null) {
                    for (int id : reminderIds) {
                        updateStudyReminder(context, manager, id);
                    }
                }
            } catch (Throwable ignored) {}

            // 5. Pomodoro
            try {
                ComponentName pomodoroName = new ComponentName(context, PomodoroWidget.class);
                int[] pomodoroIds = manager.getAppWidgetIds(pomodoroName);
                if (pomodoroIds != null) {
                    for (int id : pomodoroIds) {
                        updatePomodoro(context, manager, id);
                    }
                }
            } catch (Throwable ignored) {}
        } catch (Throwable ignored) {}
    }
}
