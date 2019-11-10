import React, { FC } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';

import { StyledDialogContent, StyledButton } from './styled';

type DialogProps = {
	open: boolean;
	content: string;
	onClose: () => void;
};

const GameEndDialog: FC<DialogProps> = (props: DialogProps) => {
	const { open, onClose, content } = props;

	return (
		<Dialog
			open={open}
			keepMounted={true}
			onClose={onClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
			fullWidth={true}
			maxWidth="md"
		>
			<StyledDialogContent>
				<Typography variant="h1" component="h2">
					{content}
				</Typography>
			</StyledDialogContent>
			<DialogActions>
				<StyledButton onClick={onClose} size="large" color="primary">
					Dismiss
				</StyledButton>
				<StyledButton onClick={onClose} size="large" color="primary">
					New Game
				</StyledButton>
			</DialogActions>
		</Dialog>
	);
};

export default GameEndDialog;
