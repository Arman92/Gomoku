import React from "react";
import "jest-styled-components";

import { mount } from "enzyme";

import { StyledDialogContent } from "./styled";

describe("Game Finished Styled Components", () => {
  it("It should render StyledDialogContent correctly", () => {
    const styledDialogContentWrapper = mount(<StyledDialogContent />);
    expect(
      styledDialogContentWrapper.find(StyledDialogContent)
    ).toMatchSnapshot();

    expect(styledDialogContentWrapper).toHaveStyleRule(
      "overflow-y",
      `unset !important`
    );
  });
});
