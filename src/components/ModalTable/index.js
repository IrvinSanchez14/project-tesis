import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

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
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../api';

import './estilo.css';

import { actualizacionLista, listaLocal } from '../../containers/ListaExistente/actions';
import { listaExistente } from '../../containers/ListaExistente/selectors';
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

function ModalTable(Props) {
	const { visibleModalTable, setVisibleModalTable } = Props;

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const classes2 = useStyles2();
	const [valor, setValor] = useState(0);
	const [loading, setLoading] = React.useState(false);

	function handleClose() {
		setVisibleModalTable(false);
	}

	const local = JSON.parse(localStorage.getItem('listaExistente'))
		? JSON.parse(localStorage.getItem('listaExistente'))
		: [];

	const id = JSON.parse(localStorage.getItem('userInfo'));

	function listaEnviada() {
		const lista2 = {};
		lista2.lista = local;
		lista2.Sucursal = 1;
		lista2.UsuarioCreador = id.IdUsuario;
		setLoading(true);

		api.post('/ListaExistente/create.php', lista2).then(response => {
			localStorage.removeItem('listaExistente');
			setLoading(false);
			setVisibleModalTable(false);
		});
	}

	useEffect(() => {
		Props.actualizacionLista();
	}, []);

	function hey(e) {
		setValor(e.target.value);
		return valor;
	}

	function EditArrayLista(arrayId) {
		const newObjectList = Props.listaExistente.map((row, index) => {
			if (index === arrayId) {
				row = { ...row, Cantidad: valor, edit: 0 };
			}
			return row;
		});
		localStorage.setItem('listaExistente', JSON.stringify(newObjectList));
		Props.actualizacionLista();
	}

	function activateEditInput(arrayId) {
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Esta seguro `)) {
			const newObjectList = Props.listaExistente.map((row, index) => {
				if (index === arrayId) {
					row = { ...row, edit: 1 };
					setValor(row.Cantidad);
				}
				return row;
			});
			localStorage.setItem('listaExistente', JSON.stringify(newObjectList));
			Props.actualizacionLista();
		} else {
			return;
		}
	}

	function removeItemArra(index) {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Esta seguro de eliminarlo de la lista?')) {
			Props.listaExistente.splice(index, 1);
			localStorage.setItem('listaExistente', JSON.stringify(Props.listaExistente));
			Props.actualizacionLista();
		} else {
			return;
		}
	}

	return (
		<div>
			{Props.listaExistente ? (
				<Dialog
					fullScreen={fullScreen}
					open={visibleModalTable}
					onClose={handleClose}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle
						id="responsive-dialog-title"
						style={{
							backgroundColor: '#000',
							color: '#fff',
						}}
					>
						{'LISTA EXISTENTE'}
					</DialogTitle>
					<DialogContent>
						<Paper className={classes2.root}>
							<Table className={classes2.table}>
								<TableHead>
									<TableRow>
										<StyledTableCell
											style={{
												backgroundColor: '#FFF',
												color: '#000',
											}}
										>
											Producto
										</StyledTableCell>
										<StyledTableCell
											style={{
												backgroundColor: '#FFF',
												color: '#000',
											}}
										>
											Porcion
										</StyledTableCell>
										<StyledTableCell
											style={{
												backgroundColor: '#FFF',
												color: '#000',
											}}
										>
											Cantidad
										</StyledTableCell>
										<StyledTableCell
											style={{
												backgroundColor: '#FFF',
												color: '#000',
											}}
										>
											Acciones
										</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{Props.listaExistente.map((row, index) => {
										return (
											<StyledTableRow key={index}>
												<StyledTableCell>{row.NombreProducto}</StyledTableCell>
												<StyledTableCell>{row.NombrePorcion}</StyledTableCell>
												<StyledTableCell style={{ display: 'flex' }}>
													{row.edit === 0 ? (
														row.Cantidad
													) : (
														<Fragment>
															<input
																type="number"
																defaultValue={row.Cantidad}
																style={{
																	width: '52px',
																	margin: '8px',
																	textAlign: 'center',
																}}
																onChange={e => hey(e)}
															/>
															<button
																className="waves-effect waves-light btn"
																onClick={() => EditArrayLista(index)}
																style={{ backgroundColor: '#26a69a', color: '#FFF' }}
															>
																Guardar
															</button>
														</Fragment>
													)}
												</StyledTableCell>
												<StyledTableCell>
													<span
														className="spanAction"
														onClick={() => activateEditInput(index)}
													>
														<i className="fas fa-pen" />
													</span>
													{'  '}-{'  '}
													<span onClick={() => removeItemArra(index)} className="spanAction">
														<i className="fas fa-trash" />
													</span>
												</StyledTableCell>
											</StyledTableRow>
										);
									})}
								</TableBody>
							</Table>
						</Paper>
					</DialogContent>
					<DialogActions className="dialogo">
						<Button onClick={handleClose} className="ui buttonCancelar" color="primary">
							Cancelar
						</Button>
						<Button
							onClick={listaEnviada}
							color="primary"
							className="ui buttonGuardar"
							disabled={loading}
							autoFocus
						>
							Enviar Lista
						</Button>
						<div>{loading && <CircularProgress size={24} />}</div>
					</DialogActions>
				</Dialog>
			) : null}
		</div>
	);
}

export function mapStateToProps(state, props) {
	return {
		listaExistente: listaExistente(state, props),
	};
}

const actions = {
	actualizacionLista,
	listaLocal,
};

export default connect(
	mapStateToProps,
	actions
)(ModalTable);
