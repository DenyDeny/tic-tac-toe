export enum PLAYER_TURN {
  CROSS_TURN = 'Player x',
  ZERO_TURN = 'Player o',
}

export enum CELL_TYPE {
  EMPTY,
  CROSS,
  ZERO,
}

export interface GAME {
  board: CELL_TYPE[][],
  turn: PLAYER_TURN,
  isStarted: boolean,
  isFinished: boolean,
}
