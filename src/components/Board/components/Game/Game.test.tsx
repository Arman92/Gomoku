import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";

import Game from "./Game";
import { GameBoardAction } from "./hooks/useGameBoard";
import { GameBoard, Player } from "utils/GameBoard";
import { CellContainer, CellButton } from "./styled";

configure({ adapter: new Adapter() });

describe("<Game />", () => {
  let wrapper: any;
  let gameBoard: GameBoard;

  beforeEach(() => {
    gameBoard = GameBoard.getInstance(10);
    wrapper = shallow(
      <Game
        length={10}
        gameState={gameBoard.getGameState()}
        dispatchGame={(action: GameBoardAction) => {}}
      />
    );
  });

  it("should render length * length elements of CellContainers ", () => {
    expect(wrapper.find(CellContainer)).toHaveLength(
      gameBoard.getLength() * gameBoard.getLength()
    );
  });

  it("should render length * length elements of CellButtons ", () => {
    expect(wrapper.find(CellButton)).toHaveLength(
      gameBoard.getLength() * gameBoard.getLength()
    );
  });

  it("should render length * length elements of CellButtons ", () => {
    expect(wrapper.find(CellButton)).toHaveLength(
      gameBoard.getLength() * gameBoard.getLength()
    );
  });

  it("simulates click events", () => {
    const onButtonClick = sinon.spy();
    const btnWrapper = shallow(
      <CellContainer length={10}>
        <CellButton turn={Player.BLACK} onClick={onButtonClick} />
      </CellContainer>
    );
    btnWrapper.find(CellButton).simulate("click");
    expect(onButtonClick).toHaveProperty("callCount", 1);
  });
});
