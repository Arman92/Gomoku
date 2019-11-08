import React, { FC, useState, useCallback } from "react";

import { BoardContainer, ButtonContainer, Button } from "./styled";

const BoardComponent: FC = () => {
  const [rows, setRows] = useState(4);
  const [columns, setColumns] = useState(4);
  const [turn, setTurn] = useState(1);
  const [gameBoard, setGameBoard] = useState(new Array(rows * columns).fill(0));

  const buttonClickCallback = useCallback(
    (row: number, column: number) => (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      gameBoard[row * columns + column] = turn;
      setGameBoard(gameBoard);
      setTurn(turn === 1 ? 2 : 1);
    },
    [turn, rows, columns]
  );

  const buttons: any[] = [];
  for (let i = 0; i < rows; i = i + 1) {
    for (let j = 0; j < columns; j = j + 1) {
      let className = "btn-free";
      if (gameBoard[i * columns + j] === 1) className = "btn-selected-1";
      else if (gameBoard[i * columns + j] === 2) className = "btn-selected-2";

      buttons.push(
        <ButtonContainer rows={rows} columns={columns} key={`btn-${i}-${j}`}>
          <Button className={className} onClick={buttonClickCallback(i, j)} />
        </ButtonContainer>
      );
    }
  }
  return (
    <BoardContainer rows={rows} columns={columns}>
      {buttons}
    </BoardContainer>
  );
};

export default BoardComponent;
