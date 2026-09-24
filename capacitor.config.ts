import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jonsuapps.rastro',
  appName: 'RASTRO',
  webDir: 'dist',
  backgroundColor: '#00000000',
  server: {
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
    loggingEnabled: false,
    appendUserAgent: 'RASTROAndroid',
    backgroundColor: '#F2F2F7'
  },
};

export default config;
