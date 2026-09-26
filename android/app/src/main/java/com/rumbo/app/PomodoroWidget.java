package com.rumbo.app;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;

public class PomodoroWidget extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        try {
            if (context == null || appWidgetManager == null || appWidgetIds == null) return;
            for (int appWidgetId : appWidgetIds) {
                WidgetHelper.updatePomodoro(context, appWidgetManager, appWidgetId);
            }
        } catch (Throwable ignored) {}
    }

    @Override
    public void onEnabled(Context context) {
    }

    @Override
    public void onDisabled(Context context) {
    }
}
