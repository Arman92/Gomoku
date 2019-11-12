import { GameAI } from "utils/GameAI";
import {
  Cell,
  Player,
  CellValue,
  GameState,
  Opponent,
  Difficulty
} from "./types";

/**
 * Game Board handler that stores game state and handles moves, player turns and more!
 */
export class GameBoard {
  /**
   * Gets the Singleton instance of GameBoard.
   * creates a fresh instance if it's called for the first time
   *
   * @param length  Number of cells in a row or column of Game Board
   *
   * @returns Singleton instance of GameBoard
   */
  public static getInstance(length: number): GameBoard {
    if (
      !GameBoard.instance ||
      (GameBoard.instance && length !== GameBoard.instance.length)
    ) {
      GameBoard.instance = new GameBoard(length);
    }
    return GameBoard.instance;
  }

  public static clone(instance: GameBoard): GameBoard {
    const newInstance = new GameBoard(instance.getLength());

    for (let i = 0; i < instance.length; i++) {
      for (let j = 0; j < instance.length; j++) {
        newInstance.cells[i][j] = instance.cells[i][j];
      }
    }
    newInstance.turn = instance.turn;
    newInstance.moves = [...instance.moves];
    newInstance.finished = instance.finished;
    newInstance.winner = instance.winner;
    newInstance.winnerCells = [...instance.winnerCells];
    newInstance.emptyCellsCount = instance.emptyCellsCount;
    newInstance.opponent = instance.opponent;
    newInstance.playerColor = instance.playerColor;

    return newInstance;
  }

  private static instance: GameBoard | null = null;
  public readonly length: number;

  public onGameFinishedCallback: ((winner: Player) => void) | null = null;
  public onAIStartEndCallback: ((thinking: boolean) => void) | null = null;

  private cells: number[][] = [];
  private moves: Cell[] = [];
  private finished: boolean = false;
  private turn: Player = Player.BLACK;
  private winner: Player = Player.NONE;
  private winnerCells: Cell[] = [];
  private emptyCellsCount: number = 0;
  private opponent: Opponent = Opponent.HUMAN;
  private playerColor: Player = Player.WHITE;
  private difficulty: Difficulty = Difficulty.MEDIUM;
  private ai: GameAI | null = null;

  private constructor(length: number) {
    this.length = length;

    this.clearCells();
  }

  /**
   * Re-creates the 'cells' with 'empty' values
   */
  public clearCells() {
    this.cells = [];
    this.moves = [];
    this.winnerCells = [];
    this.emptyCellsCount = this.length * this.length;

    for (let i = 0; i < this.length; i++) {
      this.cells[i] = [];

      for (let j = 0; j < this.length; j++) {
        this.cells[i][j] = CellValue.EMPTY;
      }
    }
  }

  /**
   * Get the cells of the game board.
   *
   * @returns The cells matrix of game board
   */
  public getCells(): number[][] {
    return this.cells;
  }

  /**
   * Get the length of the game board.
   *
   * @returns The lentgh of game matrix (No of cells in each row or column)
   */
  public getLength(): number {
    return this.length;
  }

  /**
   * Switches the Player turn (e.g. from Player.WHITE to Player.BLACK and vice versa)
   */
  public switchTurns(): void {
    this.turn = this.turn === Player.BLACK ? Player.WHITE : Player.BLACK;
  }

  /**
   * Play the specified cell for current Player,
   *
   * @remarks
   * Sets the specified cell value to the current Player, adds this move to the 'moves' stack and immediately
   * checks if this move makes this player the Winner!
   *
   * @param cell  The cell that player wants to make his own
   */
  public play(cell: Cell, isAI?: boolean): void {
    const { row, column } = cell;

    if (this.opponent === Opponent.COMPUTER) {
      // Determine the color of AI Player
      this.cells[row][column] = isAI
        ? this.playerColor === Player.WHITE
          ? Player.BLACK
          : Player.WHITE
        : this.playerColor;
    } else {
      // If it's a normal two player game, just use turn value to fill the cell.
      this.cells[row][column] = this.turn;
    }

    this.moves.push({ row, column });
    this.emptyCellsCount--;
    this.checkIfWins(cell);
    this.switchTurns();

    if (
      this.opponent === Opponent.COMPUTER &&
      !isAI &&
      this.ai &&
      !this.finished
    ) {
      let difficultyValue: number;

      // Set the difficulty level according to the selected value
      switch (this.difficulty) {
        case Difficulty.NOVICE:
        default:
          difficultyValue = 3;
          break;
        case Difficulty.MEDIUM:
          difficultyValue = 4;
          break;
        case Difficulty.EXPERT:
          difficultyValue = 5;
          break;
      }

      if (this.onAIStartEndCallback) this.onAIStartEndCallback(true);

      setTimeout(() => {
        if (this.ai) {
          const aiMove = this.ai.calculateNextMove(difficultyValue);
          this.play({ row: aiMove[0], column: aiMove[1] }, true);
          if (this.onAIStartEndCallback) this.onAIStartEndCallback(false);
        }
      }, 1);
    }
  }

  /**
   * Undo the last move of Game
   *
   * @remarks
   * Sets the last changed cell's value to Empty, switches the player turn and resets the winning statuses.
   *
   */
  public undo(undoingAIMovement?: boolean): void {
    const move = this.moves.pop();
    if (move) {
      this.cells[move.row][move.column] = CellValue.EMPTY;
      this.winner = Player.NONE;
      this.winnerCells = [];
      this.switchTurns();
      this.finished = false;
      this.emptyCellsCount++;

      // If we're playing against the AI, we should undo the AI's movement too.
      if (this.opponent === Opponent.COMPUTER && !undoingAIMovement) {
        this.undo(true);
      }
    }
  }
  /**
   * Resets the state for a new Game
   *
   *
   */
  public reset(): void {
    this.finished = false;
    this.clearCells();
    this.winner = Player.NONE;
    if (this.opponent === Opponent.HUMAN) this.turn = Player.BLACK;
  }

  /**
   * Get the current state of Game Board
   *
   * @remarks
   * 'cells' array is cloned so React would 'know' it's a new state and triggers a re-render.
   *
   * @returns The current state of Game Board
   */
  public getGameState(): GameState {
    return {
      finished: this.finished,
      cells: [...this.cells],
      winner: this.winner,
      winnerCells: this.winnerCells,
      turn: this.turn,
      lastPlayedCell:
        this.moves.length > 0 ? this.moves[this.moves.length - 1] : undefined
    };
  }

  /**
   * Set the game Opponent (Human or AI)
   * @param opponent  The Opponent to set
   */
  public setOpponent(opponent: Opponent) {
    this.opponent = opponent;

    if (opponent === Opponent.COMPUTER) {
      this.ai = new GameAI(this);
    }
  }

  /**
   * Set the human player color in case of playing against the AI
   * @param playerColor  The Player Color to set for human player
   */
  public setPlayerColor(playerColor: Player) {
    this.playerColor = playerColor;
    this.turn = playerColor;
  }

  /**
   * Sets the AI depth search / difficulty
   * @param difficulty  The AI Difficulty
   */
  public setDifficulty(difficulty: Difficulty) {
    this.difficulty = difficulty;
  }

  /**
   * Gets called when the game is finished (Either a player wins or the Game is Tie)
   * @param cell  The last move the player has made.
   */
  private gameFinished(winner: Player) {
    this.finished = true;
    this.winner = winner;
    if (this.onGameFinishedCallback) this.onGameFinishedCallback(winner);
  }

  /**
   * Checks whether the last move has made the player winner of the game
   * First checks the row corresponding to the specified cell, if 5 cells are marked for this player
   * (including the passed cell itself) then current player wins the game. Otherwise checks the corresponding
   * column and diagonals (both Major [ ╲ ] and Minor [ ╱ ])
   * @param cell  The last move the player has made.
   */
  private checkIfWins(cell: Cell) {
    // first of all push the current cell as we know it's a winner:
    this.winnerCells = [cell];

    /* ----------- CHECK CURRENT ROW ------------- */
    // Check current row forward direction ->
    for (let i = cell.column + 1; i < this.length; i++) {
      if (this.cells[cell.row][i] === this.turn) {
        this.winnerCells.push({ row: cell.row, column: i });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.gameFinished(this.turn);
      return;
    }

    // Check current row backward direction <-
    for (let i = cell.column - 1; i >= 0; i--) {
      if (this.cells[cell.row][i] === this.turn) {
        this.winnerCells.push({ row: cell.row, column: i });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.gameFinished(this.turn);
      return;
    }

    /* ----------- CHECK CURRENT COLUMN ------------- */
    // Check current column forward direction ->
    this.winnerCells = [cell];

    for (let i = cell.row + 1; i < this.length; i++) {
      if (this.cells[i][cell.column] === this.turn) {
        this.winnerCells.push({ row: i, column: cell.column });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.gameFinished(this.turn);
      return;
    }

    // Check current column backward direction <-
    for (let i = cell.row - 1; i >= 0; i--) {
      if (this.cells[i][cell.column] === this.turn) {
        this.winnerCells.push({ row: i, column: cell.column });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.gameFinished(this.turn);
      return;
    }

    /* ----------- CHECK MAJOR DIAGONAL [  ╲  ] ------------- */
    this.winnerCells = [cell];

    // Helper function
    const max = (x: number, y: number) => {
      return x > y ? x : y;
    };

    for (let i = 1; i < max(this.length, this.length); i++) {
      if (cell.row + i >= this.length || cell.column + i >= this.length) {
        break;
      }

      if (this.cells[cell.row + i][cell.column + i] === this.turn) {
        this.winnerCells.push({ row: cell.row + i, column: cell.column + i });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.gameFinished(this.turn);
      return;
    }

    for (let i = 1; i < max(this.length, this.length); i++) {
      if (cell.row - i < 0 || cell.column - i < 0) {
        break;
      }

      if (this.cells[cell.row - i][cell.column - i] === this.turn) {
        this.winnerCells.push({ row: cell.row - i, column: cell.column - i });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.gameFinished(this.turn);
      return;
    }

    //
    //
    /* ----------- CHECK MINOR DIAGONAL [  ╱  ] ------------- */
    this.winnerCells = [cell];

    for (let i = 1; i < max(this.length, this.length); i++) {
      if (cell.row - i < 0 || cell.column + i > this.length) {
        break;
      }

      if (this.cells[cell.row - i][cell.column + i] === this.turn) {
        this.winnerCells.push({ row: cell.row - i, column: cell.column + i });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.gameFinished(this.turn);
      return;
    }

    for (let i = 1; i < max(this.length, this.length); i++) {
      if (cell.row + i >= this.length || cell.column - i < 0) {
        break;
      }

      if (this.cells[cell.row + i][cell.column - i] === this.turn) {
        this.winnerCells.push({ row: cell.row + i, column: cell.column - i });
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      this.gameFinished(this.turn);
      return;
    }

    //
    //
    /* ----------- CHECK IF GAME IS A TIE ------------- */
    if (this.emptyCellsCount === 0) {
      this.gameFinished(Player.NONE);
    }
  }
}
