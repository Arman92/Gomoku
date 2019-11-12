import React, { FC, useCallback } from "react";

import { GameContainer, CellContainer, CellButton } from "./styled";
import { Player, GameState } from "utils/GameBoard";
import { GameBoardAction } from "./hooks/useGameBoard";

type GameProps = {
  length: number;
  gameState: GameState;
  dispatchGame: React.Dispatch<GameBoardAction>;
};

const GameComponent: FC<GameProps> = (props: GameProps) => {
  const { length, gameState, dispatchGame } = props;

  const cellClickHandler = useCallback(
    event => {
      // Efficiently extract row and column from clicked button
      // (There is other react-ways of doing this, but they will create a callback for each and every button)
      const row = parseInt(event.target.dataset.row, 10);
      const column = parseInt(event.target.dataset.column, 10);

      dispatchGame({ type: "play", payload: { row, column } });
    },
    [dispatchGame]
  );

  const buttons: any[] = [];

  for (let i = 0; i < length; i = i + 1) {
    for (let j = 0; j < length; j = j + 1) {
      let className = "btn-free";
      if (gameState.cells[i][j] === Player.WHITE) {
        className = "btn-selected-white";
      } else if (gameState.cells[i][j] === Player.BLACK) {
        className = "btn-selected-black";
      }

      // If game has a winner, highlight the winner row's cells
      if (gameState.winner !== Player.NONE) {
        gameState.winnerCells.forEach(winnerCell => {
          if (winnerCell.row === i && winnerCell.column === j) {
            className += " btn-winner-cell";
          }
        });
      }

      // Everytime Highlight last move:
      const { lastPlayedCell } = gameState;
      if (
        lastPlayedCell &&
        lastPlayedCell.row === i &&
        lastPlayedCell.column === j
      ) {
        className += " btn-last-played";
      }

      buttons.push(
        <CellContainer length={length} key={`btn-${i}-${j}`}>
          <CellButton
            turn={gameState.turn}
            className={className}
            onClick={cellClickHandler}
            data-row={i}
            data-column={j}
            disabled={gameState.finished}
          />
        </CellContainer>
      );
    }
  }

  return <GameContainer length={length}>{buttons}</GameContainer>;
};

export default GameComponent;
