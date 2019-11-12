import React, { FC, useState, useEffect, useMemo } from "react";
import { Button } from "@material-ui/core";

import {
  BoardContainer,
  GameContainer,
  RightContainer,
  Header,
  Content
} from "./styled";
import { Game } from "./components/Game";
import { useGameBoard } from "./components/Game/hooks/useGameBoard";
import { GameFinishedDialog } from "./components/GameFinishedDialog";
import { NewGameDialog } from "./components/NewGameDialog";

import {
  GameBoard,
  Player,
  Difficulty,
  Opponent
} from "@gobang/utils/GameBoard";

const BoardComponent: FC = () => {
  const length = 19;

  const [aiThinking, setAIThinking] = useState(false);
  const [gameFinishedDlgOpen, setGameFinishedDlgOpen] = useState(false);
  const [newGameDialogOpen, setNewGameDialogOpen] = useState(true);
  const [winner, setWinner] = useState<null | Player>(null);

  // Get a singleton instance of the GameBoard (creates an instance if it's first-time-call)
  const gameBoard: GameBoard = GameBoard.getInstance(length);

  const [gameState, dispatchGameBoard] = useGameBoard(gameBoard);

  // Callback when game is finished (tie or win)
  const onGameFinished = (gameWinner: Player) => {
    setGameFinishedDlgOpen(true);
    setWinner(gameWinner);
  };

  // Callback when game is finished (tie or win)
  const onAIThinkingChanged = (thinking: boolean) => {
    setAIThinking(thinking);
    dispatchGameBoard({ type: "requestState" });
  };

  // Callback to close the game finished dialog
  const onFinishedDlgClosed = () => {
    setGameFinishedDlgOpen(false);
  };

  // Callback to close the New Game dialog
  const onNewGameDlgClosed = () => {
    setNewGameDialogOpen(false);
  };

  // Callback to reset game (Play again the same game)
  const onGameReset = () => {
    dispatchGameBoard({ type: "reset" });
    setGameFinishedDlgOpen(false);
  };

  // Callback to start a new game with new criteria
  const onNewGame = (
    opponent: Opponent,
    playerColor: Player,
    difficulty: Difficulty
  ) => {
    gameBoard.setOpponent(opponent);
    gameBoard.setPlayerColor(playerColor);
    gameBoard.setDifficulty(difficulty);
    dispatchGameBoard({ type: "reset" });
  };

  useEffect(() => {
    // Set the callback listeners
    gameBoard.onGameFinishedCallback = onGameFinished;
    gameBoard.onAIStartEndCallback = onAIThinkingChanged;
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
        {aiThinking ? <span>Thinking...</span> : null}
      </Header>
      {useMemo(() => {
        return (
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
                onClick={() => {
                  dispatchGameBoard({ type: "reset" });
                }}
              >
                Start Over
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
        );
      }, [gameState, dispatchGameBoard])}
    </BoardContainer>
  );
};
export default BoardComponent;
