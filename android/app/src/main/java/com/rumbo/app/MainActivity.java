package com.rumbo.app;

import android.content.Intent;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginHandle;
import ee.forgr.capacitor.social.login.ModifiedMainActivityForSocialLoginPlugin;
import ee.forgr.capacitor.social.login.SocialLoginPlugin;

public class MainActivity extends BridgeActivity implements ModifiedMainActivityForSocialLoginPlugin {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WidgetHelper.refreshAllWidgets(this);
    }

    @Override
    public void onResume() {
        super.onResume();
        WidgetHelper.refreshAllWidgets(this);
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
