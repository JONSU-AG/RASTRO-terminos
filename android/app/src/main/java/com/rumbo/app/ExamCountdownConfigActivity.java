package com.rumbo.app;

import android.app.Activity;
import android.app.DatePickerDialog;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Toast;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

public class ExamCountdownConfigActivity extends Activity {

    private int mAppWidgetId = AppWidgetManager.INVALID_APPWIDGET_ID;
    private EditText mEditExamName;
    private EditText mEditExamDate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Set the result to CANCELED. This will cause the widget host to cancel
        // out of the widget placement if the user presses the back button.
        setResult(RESULT_CANCELED);

        setContentView(R.layout.activity_exam_countdown_config);

        // Find the widget id from the intent
        Intent intent = getIntent();
        Bundle extras = intent.getExtras();
        if (extras != null) {
            mAppWidgetId = extras.getInt(
                    AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);
        }

        mEditExamName = findViewById(R.id.edit_exam_name);
        mEditExamDate = findViewById(R.id.edit_exam_date);

        // Load existing or default values
        SharedPreferences prefs = WidgetHelper.getPrefs(this);
        String currentName = prefs.getString(WidgetHelper.KEY_EXAM_NAME + "_" + mAppWidgetId, 
                prefs.getString(WidgetHelper.KEY_EXAM_NAME, WidgetHelper.DEFAULT_EXAM_NAME));
        String currentDate = prefs.getString(WidgetHelper.KEY_EXAM_DATE + "_" + mAppWidgetId,
                prefs.getString(WidgetHelper.KEY_EXAM_DATE, WidgetHelper.DEFAULT_EXAM_DATE));

        mEditExamName.setText(currentName);
        mEditExamDate.setText(currentDate);

        // Setup preset buttons
        Button btnPreset1 = findViewById(R.id.btn_preset_ceprunsa1);
        btnPreset1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mEditExamName.setText("CEPRUNSA I FASE 2027");
                mEditExamDate.setText("2026-07-05");
            }
        });

        Button btnPreset2 = findViewById(R.id.btn_preset_ceprunsa2);
        btnPreset2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mEditExamName.setText("CEPRUNSA II FASE 2027");
                mEditExamDate.setText("2026-10-18");
            }
        });

        Button btnPreset3 = findViewById(R.id.btn_preset_ordinario);
        btnPreset3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mEditExamName.setText("ORDINARIO I FASE 2027");
                mEditExamDate.setText("2026-08-30");
            }
        });

        // DatePicker dialog button
        Button btnPickDate = findViewById(R.id.btn_pick_date);
        View.OnClickListener pickDateListener = new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showDatePicker();
            }
        };
        btnPickDate.setOnClickListener(pickDateListener);
        mEditExamDate.setOnClickListener(pickDateListener);

        // Save Button
        Button btnSave = findViewById(R.id.btn_save_config);
        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                saveAndFinish();
            }
        });
    }

    private void showDatePicker() {
        Calendar cal = Calendar.getInstance();
        try {
            String curr = mEditExamDate.getText().toString().trim();
            if (!curr.isEmpty()) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
                cal.setTime(sdf.parse(curr));
            }
        } catch (Exception ignored) {}

        DatePickerDialog dialog = new DatePickerDialog(this, new DatePickerDialog.OnDateSetListener() {
            @Override
            public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
                String formatted = String.format(Locale.US, "%04d-%02d-%02d", year, month + 1, dayOfMonth);
                mEditExamDate.setText(formatted);
            }
        }, cal.get(Calendar.YEAR), cal.get(Calendar.MONTH), cal.get(Calendar.DAY_OF_MONTH));

        dialog.show();
    }

    private void saveAndFinish() {
        String name = mEditExamName.getText().toString().trim();
        String date = mEditExamDate.getText().toString().trim();

        if (name.isEmpty()) {
            name = "EXAMEN DE ADMISIÓN";
        }
        if (date.isEmpty()) {
            date = WidgetHelper.DEFAULT_EXAM_DATE;
        }

        Context context = ExamCountdownConfigActivity.this;
        SharedPreferences.Editor editor = WidgetHelper.getPrefs(context).edit();
        
        // Save widget-specific and global
        if (mAppWidgetId != AppWidgetManager.INVALID_APPWIDGET_ID) {
            editor.putString(WidgetHelper.KEY_EXAM_NAME + "_" + mAppWidgetId, name);
            editor.putString(WidgetHelper.KEY_EXAM_DATE + "_" + mAppWidgetId, date);
        }
        editor.putString(WidgetHelper.KEY_EXAM_NAME, name);
        editor.putString(WidgetHelper.KEY_EXAM_DATE, date);
        editor.apply();

        // Update the widget
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        if (mAppWidgetId != AppWidgetManager.INVALID_APPWIDGET_ID) {
            WidgetHelper.updateExamCountdown(context, appWidgetManager, mAppWidgetId);
        } else {
            WidgetHelper.refreshAllWidgets(context);
        }

        Toast.makeText(context, "¡Fecha de examen guardada en el widget!", Toast.LENGTH_SHORT).show();

        // Make sure we pass back the original appWidgetId
        Intent resultValue = new Intent();
        resultValue.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, mAppWidgetId);
        setResult(RESULT_OK, resultValue);
        finish();
    }
}
