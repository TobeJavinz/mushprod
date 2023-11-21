import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.betapeak.mushprod',
  appName: 'Mushprod App',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    SplashScreen:{
      launchDuration: 1500,
      showSpinner: false,
      androidSpinnerStyle: "small",
      iosSpinnerStyle: "small",
      splashFullScreen: true,
      splashImmersive: true,
    },
    LocalNotifications: {
      iconColor: "#488AFF",
    }
  },
};

export default config;
 