import React, { FC, useState, useEffect, useMemo } from "react";
import { Button } from "@material-ui/core";

import {
  BoardContainer,
  GameContainer,
  RightContainer,
  Header,
  Content
} from "./styled";
import Game from "./components/Game";
import { useGameBoard } from "./components/Game/hooks/useGameBoard";
import GameFinishedDialog from "./components/GameFinishedDialog";
import NewGameDialog from "./components/NewGameDialog";

import { GameBoard, Player } from "@gobang/utils/GameBoard";

const BoardComponent: FC = () => {
  const length = 19;

  // Get a singleton instance of the GameBoard (creates an instance if it's first-time-call)
  const gameBoard: GameBoard = GameBoard.getInstance(length);

  const [gameFinishedDlgOpen, setGameFinishedDlgOpen] = useState(false);
  const [newGameDialogOpen, setNewGameDialogOpen] = useState(false);
  const [winner, setWinner] = useState<null | Player>(null);
  const [gameState, dispatchGameBoard] = useGameBoard(gameBoard);

  const onGameFinished = (gameWinner: Player) => {
    setGameFinishedDlgOpen(true);
    setWinner(gameWinner);
  };

  const onFinishedDlgClosed = () => {
    setGameFinishedDlgOpen(false);
  };

  const onNewGameDlgClosed = () => {
    setNewGameDialogOpen(false);
  };

  const onGameReset = () => {
    dispatchGameBoard({ type: "reset" });
    setGameFinishedDlgOpen(false);
  };

  const onNewGame = () => {};

  useEffect(() => {
    // Set the callback listeners
    gameBoard.onGameFinishedCallback = onGameFinished;
  });

  let dialogContent = "";
  if (gameState.finished) {
    if (winner === Player.BLACK) {
      dialogContent = "BLACK Player Wins!";
    } else if (winner === Player.WHITE) {
      dialogContent = "WHITE Player Wins!";
    } else {
      dialogContent = "Game Is TIE!";
    }
  }

  return (
    <BoardContainer>
      <GameFinishedDialog
        open={gameFinishedDlgOpen}
        content={dialogContent}
        onClose={onFinishedDlgClosed}
        onResetGame={onGameReset}
      />
      <NewGameDialog
        open={newGameDialogOpen}
        onClose={onNewGameDlgClosed}
        onNewGame={onNewGame}
      />
      <Header>
        <h1>Gobang</h1>
      </Header>
      {useMemo(
        () => (
          <Content>
            <GameContainer>
              <Game
                length={length}
                gameState={gameState}
                dispatchGame={dispatchGameBoard}
              />
            </GameContainer>
            <RightContainer>
              <Button
                variant="outlined"
                onClick={() => {
                  setNewGameDialogOpen(true);
                }}
              >
                New Game
              </Button>
              <Button
                variant="outlined"
                disabled={!gameState.lastPlayedCell}
                onClick={() => {
                  dispatchGameBoard({ type: "undo" });
                }}
              >
                Undo
              </Button>
            </RightContainer>
          </Content>
        ),
        [gameState]
      )}
    </BoardContainer>
  );
};
export default BoardComponent;
