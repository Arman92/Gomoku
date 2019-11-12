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

import { Player, Opponent, Difficulty } from "@gobang/utils/GameBoard";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  onNewGame: (
    opponent: Opponent,
    playerColor: Player,
    difficulty: Difficulty
  ) => void;
};

const NewGameDialog = (props: DialogProps) => {
  const { open, onClose, onNewGame } = props;
  const [opponent, setOpponent] = React.useState(Opponent.COMPUTER);
  const [color, setColor] = React.useState(Player.BLACK);
  const [difficulty, setDifficulty] = React.useState(Difficulty.MEDIUM);

  const handleOpponentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpponent(event.target.value as Opponent);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(parseInt(event.target.value, 10) as Player.BLACK);
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDifficulty(event.target.value as Difficulty);
  };

  const handleOnNewGame = () => {
    onNewGame(opponent, color, difficulty);
    onClose();
  };

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
            <RadioGroup
              aria-label="play-with"
              name="playWith"
              value={opponent}
              onChange={handleOpponentChange}
            >
              <FormControlLabel
                value={Opponent.COMPUTER}
                control={<Radio />}
                label="Computer"
              />
              <FormControlLabel
                value={Opponent.HUMAN}
                control={<Radio />}
                label="Human"
              />
            </RadioGroup>
          </FormControl>
        </FormRow>

        {/* Only show color selection if the opponent is AI */}
        {opponent === Opponent.COMPUTER ? (
          <>
            <FormRow>
              <FormControl component="fieldset">
                <FormLabel component="legend">Your Color</FormLabel>
                <RadioGroup
                  aria-label="your-color"
                  name="yourColor"
                  value={color}
                  onChange={handleColorChange}
                >
                  <FormControlLabel
                    value={Player.BLACK}
                    control={<Radio />}
                    label="Black"
                  />
                  <FormControlLabel
                    value={Player.WHITE}
                    control={<Radio />}
                    label="White"
                  />
                </RadioGroup>
              </FormControl>
            </FormRow>

            <FormRow>
              <FormControl component="fieldset">
                <FormLabel component="legend">Level of Difficulty</FormLabel>
                <RadioGroup
                  aria-label="difficulty"
                  name="difficulty"
                  value={difficulty}
                  onChange={handleDifficultyChange}
                >
                  <FormControlLabel
                    value={Difficulty.NOVICE}
                    control={<Radio />}
                    label="Novice"
                  />
                  <FormControlLabel
                    value={Difficulty.MEDIUM}
                    control={<Radio />}
                    label="Medium"
                  />
                  <FormControlLabel
                    value={Difficulty.EXPERT}
                    control={<Radio />}
                    label="Expert"
                  />
                </RadioGroup>
              </FormControl>
            </FormRow>
          </>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOnNewGame} color="primary">
          Start Game
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGameDialog;
