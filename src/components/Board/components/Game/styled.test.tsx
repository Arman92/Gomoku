import React from "react";
import "jest-styled-components";

import { mount } from "enzyme";

import { GameContainer, CellContainer } from "./styled";

describe("Game Styled Components", () => {
  it("It should render GameContainer correctly", () => {
    const length = 10;
    const gameContainerWrapper = mount(<GameContainer length={length} />);
    expect(gameContainerWrapper.find(GameContainer)).toMatchSnapshot();

    expect(gameContainerWrapper).toHaveStyleRule(
      "grid-template-rows",
      `repeat(${length},minmax(1rem,1fr))`
    );

    expect(gameContainerWrapper).toHaveStyleRule(
      "grid-template-columns",
      `repeat(${length},minmax(1rem,1fr))`
    );
  });

  it("It should render CellContainer correctly", () => {
    const length = 10;
    const cellContainerWrapper = mount(<CellContainer length={length} />);
    expect(cellContainerWrapper.find(CellContainer)).toMatchSnapshot();
  });
});
