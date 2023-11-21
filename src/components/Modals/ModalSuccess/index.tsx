import React from 'react';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';


interface ErrorModalProps {
	open: boolean;
	onClose: () => void;
	mensagem: string;
}

const ModalSuccess: React.FC<ErrorModalProps> = ({
	open,
	onClose,
	mensagem,
}) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Sucesso!</DialogTitle>
			<DialogContent>
				{mensagem && (
					<DialogContentText>{mensagem}</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Fechar</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ModalSuccess;
