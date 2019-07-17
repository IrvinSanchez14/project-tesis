import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
		},
	},
}))(TableRow);

const useStyles2 = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
		overflowX: 'auto',
	},
	table: {
		minWidth: 500,
	},
}));

const lista = [];

export default function ModalTable(Props) {
	const { visibleModalTable, setVisibleModalTable } = Props;

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const classes2 = useStyles2();

	function handleClose() {
		setVisibleModalTable(false);
	}

	const local = JSON.parse(localStorage.getItem('listaExistente'))
		? JSON.parse(localStorage.getItem('listaExistente'))
		: [];

	function listaEnviada() {
		lista.push({
			fecha: '2019-09-06',
			lista: local,
			sucursal: 'volcan',
			encargado: '1',
		});
		console.log(lista);
	}

	return (
		<Dialog
			fullScreen={fullScreen}
			open={visibleModalTable}
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogTitle
				id="responsive-dialog-title"
				style={{
					backgroundColor: '#39215E',
					color: '#FFF',
				}}
			>
				{'LISTA EXISTENTE'}
			</DialogTitle>
			<DialogContent>
				<Paper className={classes2.root}>
					<Table className={classes2.table}>
						<TableHead>
							<TableRow>
								<StyledTableCell>Producto</StyledTableCell>
								<StyledTableCell>Porcion</StyledTableCell>
								<StyledTableCell>Cantidad</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{local.map(row => (
								<StyledTableRow key={row.nombre}>
									<StyledTableCell>{row.nombre}</StyledTableCell>
									<StyledTableCell>{row.porcion}</StyledTableCell>
									<StyledTableCell>{row.cantidad}</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancelar
				</Button>
				<Button onClick={listaEnviada} color="primary" autoFocus>
					Enviar Lista
				</Button>
			</DialogActions>
		</Dialog>
	);
}
