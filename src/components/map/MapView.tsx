import { ReactNode } from 'react';
import Mapbox from '@rnmapbox/maps';

type Props = {
  children: ReactNode;
  initialLocation: [number, number];
  followUserLocation: boolean;
};

export function MapView({
  children,
  initialLocation,
  followUserLocation,
}: Props) {
  return (
    <Mapbox.MapView
      style={{ flex: 1 }}
      styleURL="mapbox://styles/mapbox/dark-v11"
      scaleBarEnabled={false}
    >
      <Mapbox.Camera
        defaultSettings={{ zoomLevel: 15, centerCoordinate: initialLocation }}
        followUserLocation={followUserLocation}
        followZoomLevel={15}
      />
      <Mapbox.UserLocation renderMode={Mapbox.UserLocationRenderMode.Native} />
      {children}
    </Mapbox.MapView>
  );
}
