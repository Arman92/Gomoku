import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { AppContainer } from "./styled";

import Board from "../Board";

const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what the font-size on the html element is.
    htmlFontSize: 10
  }
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Board />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
