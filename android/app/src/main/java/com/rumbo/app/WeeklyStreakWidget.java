package com.rumbo.app;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;

public class WeeklyStreakWidget extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        try {
            if (context == null || appWidgetManager == null || appWidgetIds == null) return;
            for (int appWidgetId : appWidgetIds) {
                WidgetHelper.updateWeeklyStreak(context, appWidgetManager, appWidgetId);
            }
        } catch (Throwable ignored) {}
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        try {
            if (intent != null && "com.rumbo.app.ACTION_UPDATE_WIDGETS".equals(intent.getAction())) {
                AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
                int[] appWidgetIds = appWidgetManager.getAppWidgetIds(
                        new android.content.ComponentName(context, WeeklyStreakWidget.class));
                for (int appWidgetId : appWidgetIds) {
                    WidgetHelper.updateWeeklyStreak(context, appWidgetManager, appWidgetId);
                }
            }
        } catch (Throwable ignored) {}
    }
}
