import React, { FC, useState, useCallback } from "react";

import { BoardContainer, ButtonContainer, Button } from "./styled";
import { useGameBoard } from "./hooks/useGameBoard";
import { Player } from "./types";

const BoardComponent: FC = () => {
  const [rows, setRows] = useState(8);
  const [columns, setColumns] = useState(8);
  const [gameBoard, dispatchGameBoard] = useGameBoard(rows, columns);

  const buttonClickCallback = useCallback(
    event => {
      // Efficiently extract row and column from clicked button
      // (There is other react-ways of doing this, but they will create a callback for each and every button)
      const row = parseInt(event.target.dataset.row, 10);
      const column = parseInt(event.target.dataset.column, 10);

      dispatchGameBoard({ type: "play", payload: { row, column } });
    },
    [gameBoard]
  );

  const buttons: any[] = [];
  for (let i = 0; i < rows; i = i + 1) {
    for (let j = 0; j < columns; j = j + 1) {
      let className = "btn-free";
      if (gameBoard.cells[i][j] === 1) className = "btn-selected-1";
      else if (gameBoard.cells[i][j] === 2) {
        className = "btn-selected-2";
      }

      buttons.push(
        <ButtonContainer rows={rows} columns={columns} key={`btn-${i}-${j}`}>
          <Button
            className={className}
            onClick={buttonClickCallback}
            data-row={i}
            data-column={j}
          />
        </ButtonContainer>
      );
    }
  }

  return (
    <div>
      {gameBoard.winner !== Player.NONE ? (
        <div style={{ marginTop: "50px", fontSize: "20px" }}>
          Player wins {gameBoard.winner}
        </div>
      ) : null}
      <BoardContainer rows={rows} columns={columns}>
        {buttons}
      </BoardContainer>
      <button
        onClick={() => {
          dispatchGameBoard({ type: "undo" });
        }}
      >
        Undo
      </button>
    </div>
  );
};

export default BoardComponent;
