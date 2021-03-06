export type Cell = {
  row: number;
  column: number;
};

export type GameState = {
  finished: boolean;
  cells: number[][];
  turn: Player;
  winnerCells: Cell[];
  winner: Player;
  lastPlayedCell: Cell | undefined;
};

export enum CellValue {
  EMPTY = 0,
  WHITE = 1,
  BLACK = 2
}

export enum Player {
  NONE = 0,
  WHITE = 1,
  BLACK = 2
}

export enum Opponent {
  COMPUTER = "ai",
  HUMAN = "human"
}

export enum Difficulty {
  NOVICE = "novice",
  MEDIUM = "medium",
  EXPERT = "expert"
}
