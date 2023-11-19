import { isCoordInPolygon } from '~utils/location';
import { createPersistedStorage } from '~utils/persist';
import { Coordinate, Game, GamePhase, GameStats, Reward } from './types';
import { getReward } from './rewards';
import { createGame } from './utils';
import { MAX_CHESTS, MAX_COINS, MAX_GEMS, MAX_KEYS } from './constant';

export const game = createPersistedStorage<Game>('game', () => createGame());

export const useGame = game;

export function useGameStats() {
  const tiles = useGame((p) => p.tiles);

  const stats: GameStats = {
    coin: { collected: 0, max: MAX_COINS },
    gem: { collected: 0, max: MAX_GEMS },
    key: { collected: 0, max: MAX_KEYS },
    chest: { collected: 0, max: MAX_CHESTS },
  };

  tiles.forEach((tile) => {
    if (tile.isCaptured && tile.reward) {
      stats[tile.reward].collected += 1;
    }
  });

  return stats;
}

export function updateGameTiles(coordinate: Coordinate) {
  const { tiles, gameState, rewardState } = game.getState();

  let foundReward: Reward | null = null;

  const index = tiles.findIndex((tile) => {
    return isCoordInPolygon(coordinate, tile.h3Index);
  });

  // Nothing to update and no reward found
  if (index === -1) return;

  const tile = tiles[index];

  if (!tile.isCaptured) {
    const reward = getReward({ gameState, rewardState });

    tile.reward = reward;
    tile.isCaptured = true;

    // Show the found reward to user
    if (tile.reward) {
      foundReward = tile.reward;
    }
  }

  const newTiles = [...tiles];
  newTiles[index] = tile;

  game.setState((p) => ({ ...p, tiles: newTiles }));

  return foundReward;
}

export function updateGamePhase(phase: GamePhase) {
  game.setState((p) => ({ ...p, phase }));
}

export function resetGame() {
  game.setState(createGame());
}
