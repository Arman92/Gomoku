import { useReducer, useCallback } from "react";
import { GameState, Cell } from "../types";
import { GameBoard } from "./GameBoard";

/**
 * Actions that can be dispatched
 */
type GameBoardAction = {
  type: "play" | "undo";
  payload?: Cell;
};

/**
 * Reducer hook to manipulate game board state
 *
 * @param rows  Number of rows of Game Board
 * @param columns  Number of columns of Game Board
 *
 * @returns Array of two elements, first the GameState and the second a dispatch function
 */
export const useGameBoard = (
  rows: number,
  columns: number
): [GameState, React.Dispatch<GameBoardAction>] => {
  //
  // Get a singleton instance of the GameBoard (creates an instance if it's first-time-call)
  const gameBoard = GameBoard.getInstance(rows, columns);

  //
  // Our reducer function to manipulate the states
  // We are using useCallback so we only create this reducer once during component's lifetime.
  const reducer = useCallback(
    (_state: GameState, action: GameBoardAction): GameState => {
      switch (action.type) {
        //
        // Play assigns a move into the state and changes the cells array and eventually switches the player's turn
        case "play":
          const cell = action.payload as Cell;
          gameBoard.play(cell);

          return gameBoard.getGameState();

        // Undo pops a move from the state's moves stack and undoes it in returning state
        // (literally sets the corresponding cell value to zero)
        // If there is no moves left, does nothing and returns the same state
        case "undo":
          gameBoard.undo();

          return gameBoard.getGameState();

        // throw an error
        default:
          throw new Error("Unsupported action type");
      }
    },
    [gameBoard]
  );

  return useReducer(reducer, gameBoard.getGameState());
};
