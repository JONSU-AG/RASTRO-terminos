package com.rumbo.app;

import android.content.Intent;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginHandle;
import ee.forgr.capacitor.social.login.ModifiedMainActivityForSocialLoginPlugin;
import ee.forgr.capacitor.social.login.SocialLoginPlugin;

public class MainActivity extends BridgeActivity implements ModifiedMainActivityForSocialLoginPlugin {

    public class NativeWidgetBridge {
        @android.webkit.JavascriptInterface
        public void refreshWidgets(String activeTheme) {
            try {
                if (activeTheme != null && !activeTheme.trim().isEmpty()) {
                    android.content.SharedPreferences prefs = WidgetHelper.getPrefs(MainActivity.this);
                    prefs.edit().putString("rumbo_active_theme", activeTheme.trim()).apply();
                }
                WidgetHelper.refreshAllWidgets(MainActivity.this);
            } catch (Throwable ignored) {}
        }
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            if (this.bridge != null && this.bridge.getWebView() != null) {
                this.bridge.getWebView().addJavascriptInterface(new NativeWidgetBridge(), "NativeWidgetBridge");
            }
            WidgetHelper.refreshAllWidgets(this);
            handleWidgetDestination(getIntent());
        } catch (Throwable e) {
            // Protección contra cierres inesperados
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        try {
            if (this.bridge != null && this.bridge.getWebView() != null) {
                this.bridge.getWebView().addJavascriptInterface(new NativeWidgetBridge(), "NativeWidgetBridge");
            }
            WidgetHelper.refreshAllWidgets(this);
        } catch (Throwable ignored) {}
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        try {
            WidgetHelper.refreshAllWidgets(this);
            handleWidgetDestination(intent);
        } catch (Throwable ignored) {}
    }

    private void handleWidgetDestination(Intent intent) {
        if (intent == null) return;
        try {
            final String destination = intent.getStringExtra("widget_destination");
            if (destination == null || destination.trim().isEmpty()) return;

            Runnable dispatch = () -> {
                try {
                    if (this.bridge != null && this.bridge.getWebView() != null) {
                        if ("pomodoro".equalsIgnoreCase(destination)) {
                            this.bridge.getWebView().evaluateJavascript(
                                "window.dispatchEvent(new CustomEvent('rastro_open_pomodoro'));", null);
                        } else {
                            this.bridge.getWebView().evaluateJavascript(
                                "window.location.hash = '#/" + destination + "';", null);
                        }
                    }
                } catch (Throwable ignored) {}
            };

            runOnUiThread(() -> {
                try {
                    if (this.bridge != null && this.bridge.getWebView() != null) {
                        this.bridge.getWebView().postDelayed(dispatch, 600);
                        this.bridge.getWebView().postDelayed(dispatch, 1500);
                    }
                } catch (Throwable ignored) {}
            });
        } catch (Throwable ignored) {}
    }

    @Override
    public void IHaveModifiedTheMainActivityForTheUseWithSocialLoginPlugin() {
        // Marcador exigido por @capgo/capacitor-social-login para usar scopes (Drive).
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        // Reenvia el resultado de autorizacion de Google (scopes como Drive) al plugin.
        // handleAuthorizationIntent ignora los requestCode fuera de su rango.
        if (this.bridge == null) return;
        try {
            PluginHandle handle = this.bridge.getPlugin("SocialLogin");
            if (handle == null) return;
            Plugin plugin = handle.getInstance();
            if (plugin instanceof SocialLoginPlugin) {
                ((SocialLoginPlugin) plugin).handleGoogleLoginIntent(requestCode, data);
            }
        } catch (Exception ignored) {}
    }
}
