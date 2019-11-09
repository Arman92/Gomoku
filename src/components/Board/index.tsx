import React, { FC } from "react";

import { BoardContainer } from "./styled";
import Game from "./components/Game";

const BoardComponent: FC = () => {
  return (
    <BoardContainer>
      <Game />
      <button
        onClick={() => {
          // dispatchGameBoard({ type: "undo" });
        }}
      >
        Undo
      </button>
    </BoardContainer>
  );
};
export default BoardComponent;
