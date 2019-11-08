export type Cell = {
  row: number;
  column: number;
};

export type GameState = {
  cells: number[][];
  winnerCells?: Cell[];
  winner?: Player;
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
