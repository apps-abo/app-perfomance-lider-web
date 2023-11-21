import React from 'react';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';

interface IResponde  {
	error: string;
}

interface ErrorModalProps {
	open: boolean;
	onClose: () => void;
	messageError: IResponde | undefined;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
	open,
	onClose,
	messageError,
}) => {
	if (messageError?.error === 'null') {
		messageError.error = 'Erro interno no servidor, contate o desenvolvedor';
	}
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Erro</DialogTitle>
			<DialogContent>
				{messageError && (
					<DialogContentText>{messageError.error}</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Fechar</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ErrorModal;
