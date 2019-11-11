import React, { FC } from "react";
import { Dialog, Button, DialogActions, Typography } from "@material-ui/core";

import { StyledDialogContent } from "./styled";

type DialogProps = {
  open: boolean;
  content: string;
  onClose: () => void;
  onResetGame: () => void;
};

const GameEndDialog: FC<DialogProps> = (props: DialogProps) => {
  const { open, content, onClose, onResetGame } = props;

  return (
    <Dialog
      open={open}
      keepMounted={true}
      onClose={onClose}
      fullWidth={true}
      maxWidth="md"
      scroll="body"
    >
      <StyledDialogContent>
        <Typography variant="h2" component="h2">
          {content}
        </Typography>
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={onClose} size="large" color="primary">
          Dismiss
        </Button>
        <Button onClick={onResetGame} size="large" color="primary">
          New Game
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameEndDialog;
