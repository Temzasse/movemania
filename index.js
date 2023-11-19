import 'react-native-reanimated';
import Mapbox from '@rnmapbox/maps';
import { LogBox } from 'react-native';
import { registerRootComponent } from 'expo';

import App from './src/App';
import { config } from './src/config';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

Mapbox.setAccessToken(config.MAPBOX_PUBLIC_KEY);

registerRootComponent(App);
