import React, { FC } from "react";

import { BoardContainer, ButtonContainer, Button } from "./styled";

const BoardComponent: FC = () => {
  const rows = 15;
  const columns = 15;

  const buttons: any[] = [];

  for (let i = 0; i < rows * columns; i++) {
    buttons.push(
      <ButtonContainer rows={rows} columns={columns} key={`btn-${i}`}>
        <Button />
      </ButtonContainer>
    );
  }

  return (
    <BoardContainer rows={rows} columns={columns}>
      {buttons}
    </BoardContainer>
  );
};

export default BoardComponent;
