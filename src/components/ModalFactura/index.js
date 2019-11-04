import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Table, Form } from 'semantic-ui-react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchListadoProductos } from '../../containers/ListaProducto/actions';
import { dataPorciones } from '../../containers/Porciones/selectors';
import { dataListadoProducto } from '../../containers/ListaProducto/selectors';
import { activateModal, activateToastConfirm, fetchFactura } from '../../containers/CentroProduccion/actions';
import { dataFactura } from '../../containers/CentroProduccion/selectors';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import esLocale from 'date-fns/locale/es';
import DateFnsUtils from '@date-io/date-fns';
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

function ModalFactura(Props) {
	const {
		visibleModal,
		setVisibleModal,
		arrays,
		detalles,
		dataListadoProducto,
		dataPorciones,
		activateModal,
		stateModal,
		activateToastConfirm,
		estadoLote,
		CP,
		fetchFactura,
		dataFactura,
	} = Props;
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [available, setAvailable] = useState(false);
	const [listPorcion, setListPorcion] = useState([]);
	const [porcionAdd, setPorcionAdd] = useState([]);
	const [inputCantidad, setInputCantidad] = useState(0);
	const [selectPorcion, setSelectPorcion] = useState(0);
	const [showList, setShowList] = useState(false);
	const [nombreProducto, setNombreProducto] = useState('');
	const [nombrePorcion, setNombrePorcion] = useState('');
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [idProducto, setIdProducto] = useState(0);
	const [loading, setLoading] = React.useState(false);

	function handleDateChange(date) {
		setSelectedDate(date);
	}

	function handleClose() {
		setVisibleModal(false);
		activateModal(false);
		setPorcionAdd([]);
		setInputCantidad(0);
	}

	function crearPorcion(nameProduct, id) {
		let newList;
		const names = [];
		dataListadoProducto.map(list => {
			if (list.NombreProducto === nameProduct) {
				names.push(parseInt(list.IdPorcion));
			}
			return names;
		});

		newList = dataPorciones.filter(PNA => names.includes(PNA.IdPorcion));
		setListPorcion(newList);
		setAvailable(true);
		setNombreProducto(nameProduct);
		setIdProducto(id);
	}

	function addDataToArray() {
		setPorcionAdd([]);
		const informacion =
			JSON.parse(localStorage.getItem(`${arrays.Lote}`)) === null
				? []
				: JSON.parse(localStorage.getItem(`${arrays.Lote}`));
		setPorcionAdd(informacion);
	}

	useEffect(() => {
		if (!visibleModal) {
			setAvailable(false);
		}
	});

	useEffect(() => {
		if (stateModal) {
			addDataToArray();
		}
	}, []);

	function createPorcionAdd() {
		if (estadoLote === '2') {
			api.put('/Factura/changeState.php', { ID: CP, Estado: 4 }).then(response => {
				console.log(response);
				fetchFactura();
			});
		}
		if (_.isEmpty(localStorage.getItem(`${arrays.Lote}`))) {
			list = [];
			list.push({
				IdProducto: idProducto,
				Cantidad: inputCantidad,
				IdPorcion: selectPorcion,
				nombreProducto: nombreProducto,
				nombrePorcion: nombrePorcion,
				FechaVencimiento: moment(selectedDate).format('YYYY-MM-DD'),
			});
			setPorcionAdd(list);
			localStorage.setItem(`${arrays.Lote}`, JSON.stringify(list));
			setShowList(true);
		} else {
			const local = JSON.parse(localStorage.getItem(`${arrays.Lote}`));
			list = [];
			if (local) {
				local.map(data => {
					list.push({
						IdProducto: data.IdProducto,
						Cantidad: data.Cantidad,
						IdPorcion: data.IdPorcion,
						nombreProducto: data.nombreProducto,
						nombrePorcion: data.nombrePorcion,
						FechaVencimiento: data.FechaVencimiento,
					});
					return data;
				});
			}
			list.push({
				IdProducto: idProducto,
				Cantidad: inputCantidad,
				IdPorcion: selectPorcion,
				nombreProducto: nombreProducto,
				nombrePorcion: nombrePorcion,
				FechaVencimiento: moment(selectedDate).format('YYYY-MM-DD'),
			});
			setPorcionAdd(list);
			localStorage.setItem(`${arrays.Lote}`, JSON.stringify(list));
			setInputCantidad(0);
			setShowList(true);
		}
	}

	function handleChangeCantidad(e) {
		setInputCantidad(e.target.value);
		setShowList(false);
	}
	function handleSelect(e) {
		const index = e.nativeEvent.target.selectedIndex;
		const name = e.nativeEvent.target[index].text;
		setSelectPorcion(e.target.value);
		setNombrePorcion(name);
		setShowList(false);
	}

	function removeItemArra(index) {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Esta seguro de eliminarlo de la lista?')) {
			list.splice(index, 1);
			localStorage.setItem(`${arrays.Lote}`, JSON.stringify(list));
			setShowList(false);
		} else {
			return setShowList(false);
		}
	}

	function sendListaProduccion() {
		const cabecera = {
			lote: arrays.Lote,
			IdCP: arrays.IdCP,
			UsuarioCreador: 1,
		};
		activateToastConfirm(true);
		setLoading(true);
		const arrayFactura = dataFactura.filter(response => response.IdCP === CP);
		if (arrayFactura[0].IdEstado === '4') {
			api.put('/Factura/changeState.php', { ID: CP, Estado: 5 })
				.then(response => {
					api.post('/Produccion/create.php', { Cabecera: cabecera, Detalle: list })
						.then(response => {
							localStorage.removeItem(`${arrays.Lote}`);
							setTimeout(() => {
								setVisibleModal(false);
								setLoading(false);
								activateToastConfirm(false);
								fetchFactura();
							}, 2000);
						})
						.catch(error => {
							console.log(error);
						});
				})
				.catch(error => {
					console.log(error);
				});
		}

		/**/
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
				{`Lote: ${arrays.Lote}`}
			</DialogTitle>
			<DialogContent>
				<Table padded>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>ID</Table.HeaderCell>
							<Table.HeaderCell>Nombre</Table.HeaderCell>
							<Table.HeaderCell>Cantidad</Table.HeaderCell>
							<Table.HeaderCell>Unidad de medida</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{detalles.map(detalle => {
							return (
								<Table.Row
									key={detalle.IdCPdetalle}
									onClick={() => {
										crearPorcion(detalle.Nombre, detalle.IdProducto);
									}}
									className="tabla-factura"
								>
									<Table.Cell>{detalle.IdCPdetalle}</Table.Cell>
									<Table.Cell>{detalle.Nombre}</Table.Cell>
									<Table.Cell>{detalle.Cantidad}</Table.Cell>
									<Table.Cell>{detalle.NombreUnidad}</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
				<hr />
				{available ? (
					<div>
						<p
							style={{
								textAlign: 'center',
								fontWeight: 'bold',
								fontSize: '17px',
								backgroundColor: '#8acd24',
							}}
						>{`Producto Seleccionado: ${nombreProducto}`}</p>
						<div className="container22">
							<div>
								<div>
									<div>
										{listPorcion ? (
											<select onChange={e => handleSelect(e)}>
												<option value={0}>Seleccione Porcion</option>
												{listPorcion.map(list => {
													return (
														<option
															key={list.IdPorcion}
															value={list.IdPorcion}
														>{`${list.Cantidad} ${list.UnidadMedida}`}</option>
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
									<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
										<KeyboardDatePicker
											margin="normal"
											id="date-picker-dialog"
											label="Fecha de vencimiento"
											format="MM/dd/yyyy"
											value={selectedDate}
											onChange={handleDateChange}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</MuiPickersUtilsProvider>
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
									height: '50px',
								}}
								className="effectClick"
								onClick={() => createPorcionAdd()}
							>
								<h5>AGREGAR</h5>
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
														<span style={styles.liSpan}>{result.nombrePorcion}</span>
														<span style={styles.liSpan}>{result.FechaVencimiento}</span>
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
														<span style={styles.liSpan}>{result.nombrePorcion}</span>
														<span style={styles.liSpan}>{result.FechaVencimiento}</span>
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
				<Button
					onClick={() => sendListaProduccion()}
					className="ui buttonGuardar"
					color="primary"
					disabled={loading}
					autoFocus
				>
					Enviar
				</Button>
				<div>{loading && <CircularProgress size={24} />}</div>
			</DialogActions>
		</Dialog>
	);
}

export function mapStateToProps(state, props) {
	return {
		dataListadoProducto: dataListadoProducto(state, props),
		dataPorciones: dataPorciones(state, props),
		dataFactura: dataFactura(state, props),
	};
}

export const actions = {
	fetchListadoProductos,
	activateModal,
	activateToastConfirm,
	fetchFactura,
};

export default connect(
	mapStateToProps,
	actions
)(ModalFactura);
