import React, { FC, useState, useCallback } from 'react';

import { GameContainer, CellContainer, Button } from './styled';
import { useGameBoard } from './hooks/useGameBoard';
import { GameBoard, Player } from '@gobang/utils/GameBoard';

type GameProps = {
	rows: number;
	columns: number;
	gameBoard: GameBoard;
};

const GameComponent: FC<GameProps> = (props: GameProps) => {
	const { rows, columns, gameBoard } = props;

	const [ gameState, dispatchGameBoard ] = useGameBoard(gameBoard);

	const cellClickHandler = useCallback(
		(event) => {
			// Efficiently extract row and column from clicked button
			// (There is other react-ways of doing this, but they will create a callback for each and every button)
			const row = parseInt(event.target.dataset.row, 10);
			const column = parseInt(event.target.dataset.column, 10);

			dispatchGameBoard({ type: 'play', payload: { row, column } });
		},
		[ dispatchGameBoard ]
	);

	const buttons: any[] = [];

	for (let i = 0; i < rows; i = i + 1) {
		for (let j = 0; j < columns; j = j + 1) {
			let className = 'btn-free';
			if (gameState.cells[i][j] === Player.WHITE) {
				className = 'btn-selected-white';
			} else if (gameState.cells[i][j] === Player.BLACK) {
				className = 'btn-selected-black';
			}

			// If game has a winner
			if (gameState.winner !== Player.NONE) {
				gameState.winnerCells.forEach((winnerCell) => {
					if (winnerCell.row === i && winnerCell.column === j) {
						className += ' btn-winner-cell';
					}
				});
			}

			// Highlight last move:
			const { lastPlayedCell } = gameState;
			if (lastPlayedCell && lastPlayedCell.row === i && lastPlayedCell.column === j) {
				className += ' btn-last-played';
			}

			buttons.push(
				<CellContainer rows={rows} columns={columns} key={`btn-${i}-${j}`}>
					<Button
						turn={gameState.turn}
						className={className}
						onClick={cellClickHandler}
						data-row={i}
						data-column={j}
						disabled={gameState.finished}
					/>
				</CellContainer>
			);
		}
	}

	return (
		<GameContainer rows={rows} columns={columns}>
			{buttons}
		</GameContainer>
	);
};

export default GameComponent;
