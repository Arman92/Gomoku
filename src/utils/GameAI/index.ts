import { GameBoard } from "@gobang/utils/GameBoard";

export class GameAI {
  public evaluationCount: number = 0;
  private board: GameBoard;
  private winScore: number = 100000000;

  public constructor(board: GameBoard) {
    this.board = board;
  }

  public getWinScore(): number {
    return this.winScore;
  }
  public evaluateBoardForAI(board: GameBoard, playersTurn: boolean): number {
    this.evaluationCount++;

    let playerScore: number = this.getScore(board, true, playersTurn);
    const aiScore: number = this.getScore(board, false, playersTurn);

    if (playerScore === 0) playerScore = 1.0;

    return aiScore / playerScore;
  }
  public getScore(
    board: GameBoard,
    forPlayer: boolean,
    playersTurn: boolean
  ): number {
    const cells: number[][] = board.getCells();
    return (
      this.evaluateHorizontal(cells, forPlayer, playersTurn) +
      this.evaluateVertical(cells, forPlayer, playersTurn) +
      this.evaluateDiagonal(cells, forPlayer, playersTurn)
    );
  }

  public calculateNextMove(depth: number): number[] {
    // this.board.thinkingStarted();
    let move: number[] = new Array<number>(2);
    const startTime: number = new Date().getTime();
    // Check if any available move can finish the game
    let bestMove: any[] = this.searchWinningMove(this.board);
    if (bestMove && bestMove.length > 0) {
      console.log("Finisher!");
      move[0] = bestMove[1];
      move[1] = bestMove[2];
    } else {
      // If there is no such move, search the minimax tree with suggested depth.
      bestMove = this.minimaxSearchAB(
        depth,
        this.board,
        true,
        -1.0,
        this.getWinScore()
      );
      if (bestMove[1] == null) {
        move = [];
      } else {
        move[0] = bestMove[1];
        move[1] = bestMove[2];
      }
    }
    console.log(
      "Cases calculated: " +
        this.evaluationCount +
        " Calculation time: " +
        (new Date().getTime() - startTime) +
        " ms"
    );
    // this.board.thinkingFinished();

    this.evaluationCount = 0;

    return move;
  }

  /*
   * alpha : Best AI Move (Max)
   * beta : Best Player Move (Min)
   * returns: {score, move[0], move[1]}
   * */
  private minimaxSearchAB(
    depth: number,
    board: GameBoard,
    max: boolean,
    alpha: number,
    beta: number
  ): any[] {
    if (depth === 0) {
      return [this.evaluateBoardForAI(board, !max), null, null];
    }

    const allPossibleMoves: number[][] = this.generateMoves();

    if (allPossibleMoves.length === 0) {
      return [this.evaluateBoardForAI(board, !max), null, null];
    }

    let bestMove: any[] = new Array<any>(3);

    if (max) {
      bestMove[0] = -1.0;
      // Iterate for all possible moves that can be made.
      for (const move of allPossibleMoves) {
        // Create a temporary board that is equivalent to the current board
        const dummyBoard = GameBoard.clone(board);
        // Play the move to that temporary board without drawing anything
        dummyBoard.play({ row: move[1], column: move[0] }, true);

        // Call the minimax function for the next depth, to look for a minimum score.
        const tempMove: any[] = this.minimaxSearchAB(
          depth - 1,
          dummyBoard,
          !max,
          alpha,
          beta
        );

        // Updating alpha
        if (tempMove[0] > alpha) {
          // tslint:disable-next-line: no-parameter-reassignment
          alpha = tempMove[0];
        }
        // Pruning with beta
        if (tempMove[0] >= beta) {
          return tempMove;
        }
        if (tempMove[0] > bestMove[0]) {
          bestMove = tempMove;
          bestMove[1] = move[0];
          bestMove[2] = move[1];
        }
      }
    } else {
      bestMove[0] = 100000000.0;
      bestMove[1] = allPossibleMoves[0][0];
      bestMove[2] = allPossibleMoves[0][1];
      for (const move of allPossibleMoves) {
        const dummyBoard: GameBoard = GameBoard.clone(board);
        dummyBoard.play({ row: move[0], column: move[1] }, true);

        const tempMove = this.minimaxSearchAB(
          depth - 1,
          dummyBoard,
          !max,
          alpha,
          beta
        );

        // Updating beta
        if (tempMove[0] < beta) {
          // tslint:disable-next-line: no-parameter-reassignment
          beta = tempMove[0];
        }
        // Pruning with alpha
        if (tempMove[0] <= alpha) {
          return tempMove;
        }
        if (tempMove[0] < bestMove[0]) {
          bestMove = tempMove;
          bestMove[1] = move[0];
          bestMove[2] = move[1];
        }
      }
    }
    return bestMove;
  }

  private searchWinningMove(board: GameBoard): any[] {
    const allPossibleMoves = this.generateMoves();
    const winningMove: any[] = new Array<any>(2);

    // Iterate for all possible moves
    for (const move of allPossibleMoves) {
      this.evaluationCount++;
      // Create a temporary board that is equivalent to the current board
      const dummyBoard: GameBoard = GameBoard.clone(board);
      // Play the move to that temporary board without drawing anything
      dummyBoard.play({ row: move[0], column: move[1] }, true);

      // If the white player has a winning score in that temporary board, return the move.
      if (this.getScore(dummyBoard, false, false) >= this.winScore) {
        winningMove[1] = move[0];
        winningMove[2] = move[1];
        return winningMove;
      }
    }
    return [];
  }

  private generateMoves(): number[][] {
    const moveList: any[] = [];

    const boardSize: number = this.board.getLength();
    const cells = this.board.getCells();

    // Look for cells that has at least one stone in an adjacent cell.
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (cells[i][j] > 0) continue;

        if (i > 0) {
          if (j > 0) {
            if (cells[i - 1][j - 1] > 0 || cells[i][j - 1] > 0) {
              moveList.push([i, j]);
              continue;
            }
          }
          if (j < boardSize - 1) {
            if (cells[i - 1][j + 1] > 0 || cells[i][j + 1] > 0) {
              moveList.push([i, j]);
              continue;
            }
          }
          if (cells[i - 1][j] > 0) {
            moveList.push([i, j]);
            continue;
          }
        }
        if (i < boardSize - 1) {
          if (j > 0) {
            if (cells[i + 1][j - 1] > 0 || cells[i][j - 1] > 0) {
              moveList.push([i, j]);
              continue;
            }
          }
          if (j < boardSize - 1) {
            if (cells[i + 1][j + 1] > 0 || cells[i][j + 1] > 0) {
              moveList.push([i, j]);
              continue;
            }
          }
          if (cells[i + 1][j] > 0) {
            moveList.push([i, j]);
            continue;
          }
        }
      }
    }

    return moveList;
  }

  private evaluateHorizontal(
    cells: number[][],
    forPlayer: boolean,
    isPlayersTurn: boolean
  ): number {
    let consecutive = 0;
    let blocks = 2;
    let score = 0;

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[0].length; j++) {
        if (cells[i][j] === (forPlayer ? 2 : 1)) {
          consecutive++;
        } else if (cells[i][j] === 0) {
          if (consecutive > 0) {
            blocks--;
            score += this.getConsecutiveSetScore(
              consecutive,
              blocks,
              forPlayer === isPlayersTurn
            );
            consecutive = 0;
            blocks = 1;
          } else {
            blocks = 1;
          }
        } else if (consecutive > 0) {
          score += this.getConsecutiveSetScore(
            consecutive,
            blocks,
            forPlayer === isPlayersTurn
          );
          consecutive = 0;
          blocks = 2;
        } else {
          blocks = 2;
        }
      }
      if (consecutive > 0) {
        score += this.getConsecutiveSetScore(
          consecutive,
          blocks,
          forPlayer === isPlayersTurn
        );
      }
      consecutive = 0;
      blocks = 2;
    }
    return score;
  }

  private evaluateVertical(
    cells: number[][],
    forPlayer: boolean,
    isPlayersTurn: boolean
  ): number {
    let consecutive = 0;
    let blocks = 2;
    let score = 0;

    for (let j = 0; j < cells[0].length; j++) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < cells.length; i++) {
        if (cells[i][j] === (forPlayer ? 2 : 1)) {
          consecutive++;
        } else if (cells[i][j] === 0) {
          if (consecutive > 0) {
            blocks--;
            score += this.getConsecutiveSetScore(
              consecutive,
              blocks,
              forPlayer === isPlayersTurn
            );
            consecutive = 0;
            blocks = 1;
          } else {
            blocks = 1;
          }
        } else if (consecutive > 0) {
          score += this.getConsecutiveSetScore(
            consecutive,
            blocks,
            forPlayer === isPlayersTurn
          );
          consecutive = 0;
          blocks = 2;
        } else {
          blocks = 2;
        }
      }
      if (consecutive > 0) {
        score += this.getConsecutiveSetScore(
          consecutive,
          blocks,
          forPlayer === isPlayersTurn
        );
      }
      consecutive = 0;
      blocks = 2;
    }
    return score;
  }

  private evaluateDiagonal(
    cells: number[][],
    forPlayer: boolean,
    isPlayersTurn: boolean
  ): number {
    let consecutive = 0;
    let blocks = 2;
    let score = 0;
    // From bottom-left to top-right diagonally
    for (let k = 0; k <= 2 * (cells.length - 1); k++) {
      const iStart = Math.max(0, k - cells.length + 1);
      const iEnd = Math.min(cells.length - 1, k);
      for (let i = iStart; i <= iEnd; ++i) {
        const j = k - i;

        if (cells[i][j] === (forPlayer ? 2 : 1)) {
          consecutive++;
        } else if (cells[i][j] === 0) {
          if (consecutive > 0) {
            blocks--;
            score += this.getConsecutiveSetScore(
              consecutive,
              blocks,
              forPlayer === isPlayersTurn
            );
            consecutive = 0;
            blocks = 1;
          } else {
            blocks = 1;
          }
        } else if (consecutive > 0) {
          score += this.getConsecutiveSetScore(
            consecutive,
            blocks,
            forPlayer === isPlayersTurn
          );
          consecutive = 0;
          blocks = 2;
        } else {
          blocks = 2;
        }
      }
      if (consecutive > 0) {
        score += this.getConsecutiveSetScore(
          consecutive,
          blocks,
          forPlayer === isPlayersTurn
        );
      }
      consecutive = 0;
      blocks = 2;
    }
    // From top-left to bottom-right diagonally
    for (let k = 1 - cells.length; k < cells.length; k++) {
      const iStart = Math.max(0, k);
      const iEnd = Math.min(cells.length + k - 1, cells.length - 1);
      for (let i = iStart; i <= iEnd; ++i) {
        const j = i - k;

        if (cells[i][j] === (forPlayer ? 2 : 1)) {
          consecutive++;
        } else if (cells[i][j] === 0) {
          if (consecutive > 0) {
            blocks--;
            score += this.getConsecutiveSetScore(
              consecutive,
              blocks,
              forPlayer === isPlayersTurn
            );
            consecutive = 0;
            blocks = 1;
          } else {
            blocks = 1;
          }
        } else if (consecutive > 0) {
          score += this.getConsecutiveSetScore(
            consecutive,
            blocks,
            forPlayer === isPlayersTurn
          );
          consecutive = 0;
          blocks = 2;
        } else {
          blocks = 2;
        }
      }
      if (consecutive > 0) {
        score += this.getConsecutiveSetScore(
          consecutive,
          blocks,
          forPlayer === isPlayersTurn
        );
      }
      consecutive = 0;
      blocks = 2;
    }
    return score;
  }
  private getConsecutiveSetScore(
    count: number,
    blocks: number,
    currentTurn: boolean
  ): number {
    const winGuarantee: number = 1000000;
    if (blocks === 2 && count < 5) return 0;
    switch (count) {
      case 5: {
        return this.winScore;
      }
      case 4: {
        if (currentTurn) return winGuarantee;
        if (blocks === 0) return winGuarantee / 4;
        return 200;
      }
      case 3: {
        if (blocks === 0) {
          if (currentTurn) return 50000;
          return 200;
        }
        if (currentTurn) return 10;
        return 5;
      }
      case 2: {
        if (blocks === 0) {
          if (currentTurn) return 7;
          return 5;
        }
        return 3;
      }
      case 1: {
        return 1;
      }
    }
    return this.winScore * 2;
  }
}
