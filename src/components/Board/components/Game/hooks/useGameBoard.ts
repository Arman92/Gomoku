import { useReducer, useCallback } from "react";
import { GameBoard, GameState, Cell } from "@gobang/utils/GameBoard";

/**
 * Actions that can be dispatched
 */
export type GameBoardAction = {
  type: "play" | "undo" | "reset";
  payload?: Cell;
};

/**
 * Reducer hook to manipulate game board state
 *
 * @param gameBoard  GameBoard instance
 *
 * @returns Array of two elements, first the GameState and the second a dispatch function
 */
export const useGameBoard = (
  gameBoard: GameBoard
): [GameState, React.Dispatch<GameBoardAction>] => {
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

        case "reset":
          gameBoard.reset();

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
