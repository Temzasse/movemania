import Mapbox from '@rnmapbox/maps';
import * as h3 from 'h3-js';

import { Tile } from '~game/types';

type Props = {
  tiles: Tile[];
};

export function Tiles({ tiles }: Props) {
  const features: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: tiles.map(({ h3Index, isCaptured }) => {
      const coordinates = h3
        .cellToBoundary(h3Index)
        .map(([lat, lng]) => [lng, lat] as [number, number]);

      return {
        type: 'Feature',
        geometry: { type: 'Polygon', coordinates: [coordinates] },
        properties: { isCaptured },
      };
    }),
  };

  return (
    <Mapbox.ShapeSource id="tiles" shape={features}>
      <Mapbox.FillLayer
        id="tile"
        style={{
          fillColor: '#fff500',
          fillOpacity: ['case', ['get', 'isCaptured'], 0.2, 0.05],
        }}
      />
      <Mapbox.LineLayer
        id="tile-line"
        style={{
          lineColor: '#fff500',
          lineOpacity: ['case', ['get', 'isCaptured'], 0.3, 0.1],
        }}
      />
    </Mapbox.ShapeSource>
  );
}
