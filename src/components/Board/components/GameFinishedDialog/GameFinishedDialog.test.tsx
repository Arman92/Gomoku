import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";

import { GameFinishedDialog } from "./index";
import { DialogActions, Typography } from "@material-ui/core";

configure({ adapter: new Adapter() });

describe("<GameFinishedDialog />", () => {
  let wrapper: any;
  const content = "Some Content";

  beforeEach(() => {
    wrapper = shallow(
      <GameFinishedDialog
        open={true}
        content={content}
        onClose={() => {}}
        onResetGame={() => {}}
      />
    );
  });

  it("should have 2 buttons", () => {
    expect(wrapper.find(DialogActions).children()).toHaveLength(2);
  });

  it("should have correct content", () => {
    expect(wrapper.find(Typography).text()).toEqual(content);
  });
});
