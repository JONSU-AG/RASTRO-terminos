package com.rumbo.app;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;

public class WeeklyStreakWidget extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            WidgetHelper.updateWeeklyStreak(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        int[] appWidgetIds = appWidgetManager.getAppWidgetIds(
                new android.content.ComponentName(context, WeeklyStreakWidget.class));
        for (int appWidgetId : appWidgetIds) {
            WidgetHelper.updateWeeklyStreak(context, appWidgetManager, appWidgetId);
        }
    }
}
