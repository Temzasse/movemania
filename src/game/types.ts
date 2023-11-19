export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type Reward = 'coin' | 'gem' | 'key' | 'chest';

export type Tile = {
  h3Index: string;
  isCaptured: boolean;
  reward: Reward | null;
  coordinate: Coordinate;
};

export type GamePhase = 'start' | 'play' | 'stats' | 'end';

export type GameStats = Record<Reward, { collected: number; max: number }>;

export type RewardState = {
  name: Reward;
  foundCount: number;
  maxCount: number;
  fixedProbability?: number;
};

export type GameState = {
  totalTiles: number;
  collectedTiles: number;
  tilesToLevelUp: number;
  tilesExtensionRation: number;
  simultaneousPlayers: number;
  boostEffect: number;
  tilesCollectedSinceLastReward: number;
  lastTileRation: number;
  lastTilesRewardProbability: number;
  probK: number;
  consequentRewardProbability: number;
};

export type Game = {
  tiles: Tile[];
  phase: GamePhase;
  gameState: GameState;
  rewardState: Record<Reward, RewardState>;
};
