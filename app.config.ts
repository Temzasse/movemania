import { ExpoConfig } from '@expo/config';

const MAPBOX_PRIVATE_KEY = process.env.MAPBOX_PRIVATE_KEY;
const MAPBOX_PUBLIC_KEY = process.env.MAPBOX_PUBLIC_KEY;

const config: ExpoConfig = {
  name: 'movemania',
  slug: 'movemania',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'dark',
  jsEngine: 'hermes',
  platforms: ['ios', 'android'],
  assetBundlePatterns: ['**/*'],
  icon: './src/assets/images/icon.png',
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffe000',
  },
  android: {
    package: 'com.movemania.app',
    adaptiveIcon: {
      foregroundImage: './src/assets/images/adaptive-icon.png',
      backgroundColor: '#000',
    },
  },
  ios: {
    bundleIdentifier: 'com.movemania.app',
    bitcode: false,
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      UIBackgroundModes: ['location', 'fetch'],
    },
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  extra: {
    MAPBOX_PUBLIC_KEY,
  },
  plugins: [
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission:
          'Allow $(PRODUCT_NAME) to use your location.',
      },
    ],
    [
      '@rnmapbox/maps',
      {
        RNMapboxMapsImpl: 'mapbox',
        RNMapboxMapsDownloadToken: MAPBOX_PRIVATE_KEY,
      },
    ],
  ],
};

export default config;
