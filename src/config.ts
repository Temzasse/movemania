import Constants from 'expo-constants';

type Config = {
  MAPBOX_PUBLIC_KEY: string;
};

export const config = Constants.expoConfig?.extra as Config;
