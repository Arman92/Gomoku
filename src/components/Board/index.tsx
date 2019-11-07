import React, { FC } from "react";

import { BoardContainer, ButtonContainer, Button } from "./styled";

const BoardComponent: FC = () => {
  const rows = 8;
  const columns = 8;

  const buttons: any[] = [];

  for (let i = 0; i < rows * columns; i++) {
    buttons.push(
      <ButtonContainer>
        <Button key={`btn-${i}`}/>
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
