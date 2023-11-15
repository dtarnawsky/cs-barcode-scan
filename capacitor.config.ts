import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cs.ionic.barcode',
  appName: 'demo-barcode',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
