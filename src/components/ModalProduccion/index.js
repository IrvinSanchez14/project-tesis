import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Table, Form } from 'semantic-ui-react';

import { fetchSucursal } from '../../containers/Sucursales/actions';
import { dataSucursal } from '../../containers/Sucursales/selectors';
import { dataDetalleProduccion } from '../../containers/CentroProduccion/selectors';
import { updateDetalleCantidad } from '../../containers/CentroProduccion/actions';

import api from '../../api';

const styles = {
	liDiv: {
		display: 'flex',
		flexDirection: 'row',
		margin: '5px',
	},
	liSpan: {
		padding: '5px',
	},
	liIcon: {
		padding: '8px',
		cursor: 'pointer',
	},
};

let list = [];
function ModalProduccion(Props) {
	const {
		visibleModal,
		setVisibleModal,
		arrays,
		fetchSucursal,
		dataSucursal,
		dataDetalleProduccion,
		updateDetalleCantidad,
	} = Props;
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [available, setAvailable] = useState(false);
	const [sucursal, setSucursal] = useState([]);
	const [porcionAdd, setPorcionAdd] = useState([]);
	const [inputCantidad, setInputCantidad] = useState(0);
	const [nombreSucursal, setNombreSucursal] = useState(0);
	const [showList, setShowList] = useState(false);
	const [nombreProducto, setNombreProducto] = useState('');
	const [nombrePorcion, setNombrePorcion] = useState('');
	const [idProduccion, setIdProduccion] = useState(0);
	const [index, setIndex] = useState(0);
	const [cantidadRedux, setCantidadRedux] = useState(0);

	function handleClose() {
		setVisibleModal(false);
		setPorcionAdd([]);
		setInputCantidad(0);
	}

	function crearPorcion(nameProduct, id, porcion, indice, cantidadOriginal) {
		fetchSucursal();
		setIdProduccion(id);
		setNombrePorcion(porcion);
		setAvailable(true);
		setNombreProducto(nameProduct);
		setCantidadRedux(cantidadOriginal);
		setIndex(indice);
	}

	useEffect(() => {
		if (!visibleModal) {
			setAvailable(false);
		}
	});

	function createPorcionAdd() {
		list.push({
			Cantidad: inputCantidad,
			IdProduccion: idProduccion,
			nombreProducto: nombreProducto,
			nombrePorcion: nombrePorcion,
			nombreSucursal: nombreSucursal,
			IdSucursal: sucursal,
			UsuarioCreador: 1,
		});
		setPorcionAdd(list);
		setCantidadRedux(dataDetalleProduccion[index].Cantidad);
		setShowList(true);
	}

	function handleChangeCantidad(e) {
		const cantidadIngresada = e.target.value;
		const total = cantidadRedux - cantidadIngresada;
		if (total < 0) {
			console.log('valor mayor que original', total);
		} else {
			setInputCantidad(e.target.value);
			updateDetalleCantidad(total, index);
			setShowList(false);
		}
	}
	function handleSelect(e) {
		const index = e.nativeEvent.target.selectedIndex;
		const name = e.nativeEvent.target[index].text;
		setSucursal(e.target.value);
		setNombreSucursal(name);
		setShowList(false);
	}

	function removeItemArra(index) {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Esta seguro de eliminarlo de la lista?')) {
			list.splice(index, 1);
			setShowList(false);
		} else {
			return setShowList(false);
		}
	}

	function sendListaProduccion() {
		console.log('enviando...');
		console.log(list);
		api.post('/Produccion/createNotaEnvio.php', {  Detalle: list })
		.then(response => {
			console.log(response)
		})
		.catch(error => {
			console.log(error);
		});
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
				{`Lote: ${arrays.lote}`}
			</DialogTitle>
			<DialogContent>
				<Table padded>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>ID</Table.HeaderCell>
							<Table.HeaderCell>Producto</Table.HeaderCell>
							<Table.HeaderCell>Cantidad</Table.HeaderCell>
							<Table.HeaderCell>Porcion</Table.HeaderCell>
							<Table.HeaderCell>Fecha de Vencimiento</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{dataDetalleProduccion
							? dataDetalleProduccion.map((detalle, index) => {
									return (
										<Table.Row
											key={detalle.IdProduccion}
											onClick={() => {
												crearPorcion(
													detalle.NombreProducto,
													detalle.IdProduccion,
													detalle.NombrePorcion,
													index,
													detalle.Cantidad
												);
											}}
											className="tabla-factura"
										>
											<Table.Cell>{detalle.IdProduccion}</Table.Cell>
											<Table.Cell>{detalle.NombreProducto}</Table.Cell>
											<Table.Cell>{detalle.Cantidad}</Table.Cell>
											<Table.Cell>{detalle.NombrePorcion}</Table.Cell>
											<Table.Cell>
												{moment(detalle.FechaVencimiento)
													.utc()
													.format('YYYY-MM-DD')}
											</Table.Cell>
										</Table.Row>
									);
							  })
							: null}
					</Table.Body>
				</Table>
				<hr />
				{available ? (
					<div>
						<div className="container22">
							<div>
								<div>
									<div>
										{dataSucursal ? (
											<select onChange={e => handleSelect(e)}>
												{dataSucursal.map(sucursal => {
													return (
														<option key={sucursal.IdSucursal} value={sucursal.IdSucursal}>
															{sucursal.Nombre}
														</option>
													);
												})}
											</select>
										) : null}
									</div>
									<div style={{ marginTop: '20px', paddingBottom: '10px' }}>
										<Form.Input
											fluid
											label="Cantidad"
											placeholder="Cantidad"
											value={inputCantidad}
											onChange={e => handleChangeCantidad(e)}
										/>
									</div>
								</div>
							</div>
							<div
								style={{
									backgroundColor: '#49990f',
									color: 'white',
									display: 'flex',
									justifyContent: 'center',
									flexDirection: 'column',
									textAlign: 'center',
									cursor: 'pointer',
								}}
								className="effectClick"
								onClick={() => createPorcionAdd()}
							>
								<h5>ADD</h5>
							</div>
						</div>
						<hr />
						<div>
							<ul>
								{showList
									? porcionAdd.map((result, index) => {
											return (
												<li key={index}>
													<div style={styles.liDiv}>
														<span style={styles.liSpan}>{result.nombreProducto}</span>
														<span style={styles.liSpan}>{result.Cantidad}</span>
														<span style={styles.liSpan}>Porciones de :</span>
														<span style={styles.liSpan}>{result.nombrePorcion}</span>
														<span style={styles.liSpan}>Enviado a :</span>
														<span style={styles.liSpan}>{result.nombreSucursal}</span>
														<i
															style={styles.liIcon}
															className="fas fa-times"
															onClick={() => removeItemArra(index)}
														/>
													</div>
												</li>
											);
									  })
									: porcionAdd.map((result, index) => {
											return (
												<li key={index}>
													<div style={styles.liDiv}>
														<span style={styles.liSpan}>{result.nombreProducto}</span>
														<span style={styles.liSpan}>{result.Cantidad}</span>
														<span style={styles.liSpan}>Porciones de :</span>
														<span style={styles.liSpan}>{result.nombrePorcion}</span>
														<span style={styles.liSpan}>Enviado a :</span>
														<span style={styles.liSpan}>{result.nombreSucursal}</span>
														<i
															style={styles.liIcon}
															className="fas fa-times"
															onClick={() => removeItemArra(index)}
														/>
													</div>
												</li>
											);
									  })}
							</ul>
						</div>
						<hr />
					</div>
				) : null}
			</DialogContent>
			<DialogActions className="dialogo">
				<Button onClick={handleClose} className="ui buttonCancelar" color="primary">
					Cancelar
				</Button>
				<Button onClick={() => sendListaProduccion()} className="ui buttonGuardar" color="primary" autoFocus>
					Enviar
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export function mapStateToProps(state, props) {
	return {
		dataDetalleProduccion: dataDetalleProduccion(state, props),
		dataSucursal: dataSucursal(state, props),
	};
}

export const actions = {
	fetchSucursal,
	updateDetalleCantidad,
};

export default connect(
	mapStateToProps,
	actions
)(ModalProduccion);
