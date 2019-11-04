import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useTheme } from '@material-ui/core/styles';

function ModalConfirm(Props) {
	const { visibleModal, setVisibleModal } = Props;
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	function handleClose() {
		setVisibleModal(false);
	}

	return (
		<Dialog
			fullScreen={fullScreen}
			open={visibleModal}
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogTitle
				id="responsive-dialog-title"
				style={{
					backgroundColor: '#000',
					color: '#FFF',
				}}
			>
				Confirmacion
			</DialogTitle>
			<DialogContent>
				<h5>{Props.textTitle}</h5>
			</DialogContent>
			<DialogActions className="dialogo">
				<Button onClick={handleClose} className="ui buttonGuardar" color="primary" autoFocus>
					Aceptar
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ModalConfirm;
