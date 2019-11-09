import React, { FC, useState, useCallback } from "react";

import { GameContainer, CellContainer, Button } from "./styled";
import { useGameBoard } from "./hooks/useGameBoard";
import { Player } from "@gobang/utils/GameBoard/types";

const GameComponent: FC = () => {
  const [rows] = useState(19);
  const [columns] = useState(19);
  const [gameBoard, dispatchGameBoard] = useGameBoard(rows, columns);

  const cellClickHandler = useCallback(
    event => {
      // Efficiently extract row and column from clicked button
      // (There is other react-ways of doing this, but they will create a callback for each and every button)
      const row = parseInt(event.target.dataset.row, 10);
      const column = parseInt(event.target.dataset.column, 10);

      dispatchGameBoard({ type: "play", payload: { row, column } });
    },
    [dispatchGameBoard]
  );

  const buttons: any[] = [];

  for (let i = 0; i < rows; i = i + 1) {
    for (let j = 0; j < columns; j = j + 1) {
      let className = "btn-free";
      if (gameBoard.cells[i][j] === Player.WHITE) {
        className = "btn-selected-white";
      } else if (gameBoard.cells[i][j] === Player.BLACK) {
        className = "btn-selected-black";
      }

      // If game has a winner
      if (gameBoard.winner !== Player.NONE) {
        gameBoard.winnerCells.forEach(winnerCell => {
          if (winnerCell.row === i && winnerCell.column === j) {
            className += " btn-winner-cell";
          }
        });
      }

      // Highlight last move:
      const { lastPlayedCell } = gameBoard;
      if (
        lastPlayedCell &&
        lastPlayedCell.row === i &&
        lastPlayedCell.column === j
      ) {
        className += " btn-last-played";
      }

      buttons.push(
        <CellContainer rows={rows} columns={columns} key={`btn-${i}-${j}`}>
          <Button
            turn={gameBoard.turn}
            className={className}
            onClick={cellClickHandler}
            data-row={i}
            data-column={j}
          />
        </CellContainer>
      );
    }
  }

  return (
    <GameContainer rows={rows} columns={columns}>
      {buttons}
    </GameContainer>
  );
};

export default GameComponent;
