import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from "@material-ui/core";

import { FormRow } from "./styled";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  onNewGame: () => void;
};

const NewGameDialog = (props: DialogProps) => {
  const { open, onClose, onNewGame } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">Choose Game Options</DialogTitle>
      <DialogContent>
        <FormRow>
          <FormControl component="fieldset">
            <FormLabel component="legend">Play With</FormLabel>
            <RadioGroup aria-label="play-with" name="playWith">
              <FormControlLabel
                value="ai"
                control={<Radio />}
                label="Computer"
              />
              <FormControlLabel
                value="human"
                control={<Radio />}
                label="Human"
              />
            </RadioGroup>
          </FormControl>
        </FormRow>
        <FormRow>
          <FormControl component="fieldset">
            <FormLabel component="legend">Your Color</FormLabel>
            <RadioGroup aria-label="your-color" name="yourColor">
              <FormControlLabel
                value="black"
                control={<Radio />}
                label="Black"
              />
              <FormControlLabel
                value="white"
                control={<Radio />}
                label="White"
              />
            </RadioGroup>
          </FormControl>
        </FormRow>
        <FormRow>
          <FormControl component="fieldset">
            <FormLabel component="legend">Level of Difficulty</FormLabel>
            <RadioGroup aria-label="difficulty" name="difficulty">
              <FormControlLabel
                value="black"
                control={<Radio />}
                label="Black"
              />
              <FormControlLabel
                value="white"
                control={<Radio />}
                label="White"
              />
            </RadioGroup>
          </FormControl>
        </FormRow>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onNewGame} color="primary">
          Start Game
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGameDialog;
