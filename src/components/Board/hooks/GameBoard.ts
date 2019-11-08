import { Cell, Player, CellValue, GameState } from "../types";

export class GameBoard {
  public static getInstance(rows: number, columns: number) {
    if (!GameBoard.instance) GameBoard.instance = new GameBoard(rows, columns);
    return GameBoard.instance;
  }

  private static instance: GameBoard | null = null;
  public readonly rows: number;
  public readonly columns: number;

  private cells: number[][] = [];
  private moves: Cell[] = [];
  private turn: Player = Player.BLACK;
  private winner: Player = Player.NONE;
  private winnerCells: Cell[] = [];

  private constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;

    this.clearCells();
  }

  public clearCells() {
    this.cells = [];

    for (let i = 0; i < this.rows; i++) {
      this.cells[i] = [];

      for (let j = 0; j < this.columns; j++) {
        this.cells[i][j] = CellValue.EMPTY;
      }
    }
  }

  public switchTurns(): void {
    this.turn = this.turn === Player.BLACK ? Player.WHITE : Player.BLACK;
  }

  public getCells(): number[][] {
    return this.cells;
  }

  public getCellValue(row: number, column: number): CellValue {
    return this.cells[row][column];
  }

  public play(cell: Cell): void {
    const { row, column } = cell;
    this.cells[row][column] = this.turn;
    this.moves.push({ row, column });
    this.checkIfWins(cell);
    this.switchTurns();
  }

  public undo(): void {
    const move = this.moves.pop();
    if (move) {
      this.cells[move.row][move.column] = CellValue.EMPTY;
    }
  }

  public getGameState(): GameState {
    return {
      cells: [...this.cells],
      winner: this.winner,
      winnerCells: this.winnerCells
    };
  }

  private checkIfWins(cell: Cell) {
    // first of all push the current cell as we know it's a winner:
    this.winnerCells = [cell];

    /* ----------- CHECK CURRENT ROW ------------- */
    // Check current row forward direction ->
    for (let i = cell.column + 1; i < this.columns; i++) {
      if (this.cells[cell.row][i] === this.turn) {
        this.winnerCells.push({ row: cell.row, column: i });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.winner = this.turn;
      return;
    }

    // Check current row backward direction <-
    for (let i = cell.column - 1; i >= 0; i--) {
      if (this.cells[cell.row][i] === this.turn) {
        this.winnerCells.push({ row: cell.row, column: i });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.winner = this.turn;
      return;
    }

    /* ----------- CHECK CURRENT COLUMN ------------- */
    // Check current column forward direction ->
    this.winnerCells = [cell];

    for (let i = cell.row + 1; i < this.rows; i++) {
      if (this.cells[i][cell.column] === this.turn) {
        this.winnerCells.push({ row: i, column: cell.column });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.winner = this.turn;
      return;
    }

    // Check current column backward direction <-
    for (let i = cell.row - 1; i >= 0; i--) {
      if (this.cells[i][cell.column] === this.turn) {
        this.winnerCells.push({ row: i, column: cell.column });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.winner = this.turn;
      return;
    }

    /* ----------- CHECK MAJOR DIAGONAL [  ╲  ] ------------- */
    this.winnerCells = [cell];

    // Helper function
    const max = (x: number, y: number) => {
      return x > y ? x : y;
    };

    for (let i = 1; i < max(this.rows, this.columns); i++) {
      if (cell.row + i >= this.rows || cell.column + i >= this.columns) {
        break;
      }

      if (this.cells[cell.row + i][cell.column + i] === this.turn) {
        this.winnerCells.push({ row: cell.row + i, column: cell.column + i });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.winner = this.turn;
      return;
    }

    for (let i = 1; i < max(cell.row, cell.column); i++) {
      if (cell.row - i < 0 || cell.column - i < 0) {
        break;
      }

      if (this.cells[cell.row - i][cell.column - i] === this.turn) {
        this.winnerCells.push({ row: cell.row - i, column: cell.column - i });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.winner = this.turn;
      return;
    }

    //
    //
    /* ----------- CHECK MINOR DIAGONAL [  ╱  ] ------------- */
    this.winnerCells = [cell];

    for (let i = 1; i < max(this.rows, this.columns); i++) {
      if (cell.row - i < 0 || cell.column + i > this.columns) {
        break;
      }

      if (this.cells[cell.row - i][cell.column + i] === this.turn) {
        this.winnerCells.push({ row: cell.row - i, column: cell.column + i });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.winner = this.turn;
      return;
    }

    for (let i = 1; i < max(this.rows, this.columns); i++) {
      if (cell.row + i >= this.rows || cell.column - i < 0) {
        break;
      }

      if (this.cells[cell.row + i][cell.column - i] === this.turn) {
        this.winnerCells.push({ row: cell.row + i, column: cell.column - i });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.winner = this.turn;
      return;
    }
  }
}
