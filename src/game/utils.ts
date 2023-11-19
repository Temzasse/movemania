import * as h3 from 'h3-js';
import { Coordinate, Game, Tile } from './types';

export function createGame(): Game {
  const game: Game = {
    tiles: [],
    phase: 'start',
    gameState: {
      totalTiles: 0,
      collectedTiles: 0,
      tilesToLevelUp: 15,
      tilesExtensionRation: 1.5,
      simultaneousPlayers: 1,
      boostEffect: 1.3,
      tilesCollectedSinceLastReward: 0,
      lastTileRation: 0.01,
      lastTilesRewardProbability: 1,
      probK: -70,
      consequentRewardProbability: 0.5,
    },
    rewardState: {
      coin: {
        name: 'coin',
        foundCount: 0,
        maxCount: 3,
      },
      gem: {
        name: 'gem',
        foundCount: 0,
        maxCount: 2,
      },
      chest: {
        name: 'chest',
        foundCount: 0,
        maxCount: 1,
        fixedProbability: 0.02,
      },
      key: {
        name: 'key',
        foundCount: 0,
        maxCount: 1,
        fixedProbability: 0.02,
      },
    },
  };

  // TODO: init tiles separately!
  // const gameLocation = moveCoordinateByKm({
  //   coordinate: initialLocation,
  //   km: 0,
  // });

  // const tiles = createTiles(gameLocation);

  // game.gameState.totalTiles = tiles.length;
  // game.tiles = tiles;

  return game;
}

function createTiles(gameLocation: Coordinate) {
  const tileSize = 10;

  const h3Index = h3.latLngToCell(
    gameLocation.latitude,
    gameLocation.longitude,
    tileSize
  );

  const tilesH3Indices = h3.gridDisk(h3Index, 7);

  const tiles: Tile[] = tilesH3Indices.map((h3Index) => {
    const coord = h3.cellToLatLng(h3Index);

    return {
      h3Index,
      isCaptured: false,
      reward: null,
      coordinate: {
        latitude: coord[0],
        longitude: coord[1],
      },
    };
  });

  return tiles;
}
