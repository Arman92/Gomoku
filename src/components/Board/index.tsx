import React, { FC, useState, useEffect } from 'react';

import { BoardContainer, GameContainer, RightContainer, Header, Content, StyledButton } from './styled';
import Game from './components/Game';
import Dialog from './components/Dialog';

import { GameBoard, Player } from '@gobang/utils/GameBoard';

const BoardComponent: FC = () => {
	const rows = 19;
	const columns = 19;
	const [ open, setOpen ] = useState(false);
	let gameBoard: GameBoard | null = null;

	const onGameFinished = (winner: Player) => {
		setOpen(true);
	};

	const handleDialogClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		// Get a singleton instance of the GameBoard (creates an instance if it's first-time-call)
		gameBoard = GameBoard.getInstance(rows, columns);
		// Set the callback listeners
		gameBoard.onGameFinishedCallback = onGameFinished;
	});

	let dialogContent = '';
	if (gameBoard != null) {
		if ((gameBoard as GameBoard).getGameState().winner === Player.BLACK) {
			dialogContent = 'BLACK Player Wins!';
		} else {
			dialogContent = 'WHITE Player Wins!';
		}
	}

	return (
		<BoardContainer>
			<Header>
				<h1>Gobang</h1>
			</Header>
			<Content>
				<GameContainer>
					<Dialog open={open} content={dialogContent} onClose={handleDialogClose} />
					{gameBoard ? (
						<Game rows={rows} columns={columns} gameBoard={gameBoard} />
					) : (
						<h2>Loading Game Board...</h2>
					)}
				</GameContainer>
				<RightContainer>
					<StyledButton
						variant="outlined"
						onClick={() => {
							// dispatchGameBoard({ type: "undo" });
						}}
					>
						New Game
					</StyledButton>
					<StyledButton
						variant="outlined"
						onClick={() => {
							// dispatchGameBoard({ type: "undo" });
						}}
					>
						Undo
					</StyledButton>
				</RightContainer>
			</Content>
		</BoardContainer>
	);
};
export default BoardComponent;
