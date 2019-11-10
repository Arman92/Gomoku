import React, { FC, useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import {
  BoardContainer,
  GameContainer,
  RightContainer,
  Header,
  Content
} from "./styled";
import Game from "./components/Game";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BoardComponent: FC = () => {
  const [open, setOpen] = useState(false);

  const onGameFinished = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BoardContainer>
      <Header>
        <h1>Gobang</h1>
      </Header>
      <Content>
        <GameContainer>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={handleClose} color="primary">
                Agree
              </Button>
            </DialogActions>
          </Dialog>

          <Game onGameFinished={onGameFinished} />
        </GameContainer>
        <RightContainer>
          <Button
            variant="outlined"
            onClick={() => {
              // dispatchGameBoard({ type: "undo" });
            }}
          >
            New Game
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              // dispatchGameBoard({ type: "undo" });
            }}
          >
            Undo
          </Button>
        </RightContainer>
      </Content>
    </BoardContainer>
  );
};
export default BoardComponent;
