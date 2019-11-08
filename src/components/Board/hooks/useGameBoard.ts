import { useReducer } from "react";

// Actions that can be dispatched
export type GameBoardAction = {
  type: "play" | "undo";
  payload?: {
    row: number;
    column: number;
  };
};

// Our game board state type
type GameBoardState = {
  cells: number[];
  moves: Array<{ row: number; column: number }>;
  turn: 1 | 2;
};

// Initialize function that creates a fresh game board state
const init = ({
  rows,
  columns
}: {
  rows: number;
  columns: number;
}): GameBoardState => {
  return {
    cells: new Array(rows * columns).fill(0),
    moves: [],
    turn: 1
  };
};

// reducer hook to manipulate game board state
export const useGameBoard = (
  rows: number,
  columns: number
): [GameBoardState, React.Dispatch<GameBoardAction>] => {
  const reducer = (
    state: GameBoardState,
    action: GameBoardAction
  ): GameBoardState => {
    switch (action.type) {
      //
      // Play assigns a move into the state and changes the cells array and eventually switches the player's turn
      case "play":
        const { row, column } = action.payload as any;

        const newCells = [...state.cells];
        newCells[row * columns + column] = state.turn;
        state.moves.push({ row, column });

        return {
          ...state,
          cells: newCells,
          turn: state.turn === 1 ? 2 : 1
        };

      // Undo pops a move from the state's moves stack and undoes it in returning state
      // (literally sets the corresponding cell value to zero)
      // If there is no moves left, does nothing and returns the same state
      case "undo":
        const move = state.moves.pop();
        if (move) {
          state.cells[move.row * columns + move.column] = 0;
          return {
            ...state,
            turn: state.turn === 1 ? 2 : 1
          };
        }
        return state;

      default:
        throw new Error("Unsupported action type");
    }
  };

  return useReducer(reducer, { rows, columns }, init);
};
