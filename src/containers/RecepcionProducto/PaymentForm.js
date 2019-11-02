import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

import CustomizedSnackbars from '../../components/Toast';

import { checkDetalleFactura, clickFactura } from '../../FacturaStore/actions';
import { revisarCabecera, Cabecera } from '../../FacturaStore/selectors';
import { fetchProducto } from '../Productos/actions';
import { dataProducto } from '../Productos/selectors';
import { fetchUnidadMedida } from '../UnidadMedida/actions';
import { dataUnidadMedida } from '../UnidadMedida/selectors';

let list = [];
function PaymentForm(Props) {
	const {
		checkDetalleFactura,
		revisarCabecera,
		fetchProducto,
		dataProducto,
		Cabecera,
		fetchUnidadMedida,
		dataUnidadMedida,
		clickFactura,
	} = Props;
	const [producto, setProducto] = React.useState(0);
	const [nombreProducto, setNombreProducto] = useState('');
	const [cantidad, setCantidad] = React.useState(0);
	const [unidadMedida, setUnidadMedida] = React.useState(0);
	const [nombreUnidadMedida, setNombreUnidadMedida] = useState('');
	const [visibleToast, setVisibleToast] = React.useState(false);
	const [activateError, setActivateError] = useState(false);
	let listaProducto = [];
	let listaUnidad = [];

	const handleChangeProveedor = name => event => {
		setNombreProducto(event.nativeEvent.target.outerText);
		setProducto(event.target.value);
	};

	const handleChangeUnidad = name => event => {
		setNombreUnidadMedida(event.nativeEvent.target.outerText);
		setUnidadMedida(event.target.value);
	};

	function handleCantidadChange(e) {
		setCantidad(e.target.value);
	}

	function onClick() {
		if (producto <= 0 || cantidad <= 0 || unidadMedida <= 0) {
			setActivateError(true);
			clickFactura(false);
		} else {
			list.push({
				Producto: producto,
				Cantidad: cantidad,
				UnidadMedida: unidadMedida,
				nombreProducto: nombreProducto,
				nombreUnidadMedida: nombreUnidadMedida,
				editValue: false,
			});
			localStorage.setItem('detalleFactura', JSON.stringify(list));
			setVisibleToast(true);
			setActivateError(false);
			setProducto(0);
			setCantidad(0);
			setUnidadMedida(0);
		}
		//checkDetalleFactura(facturaDetalle, true);
	}

	useEffect(() => {
		if (revisarCabecera) {
			const detalleFactura = JSON.parse(localStorage.getItem('detalleFactura'));
			checkDetalleFactura(detalleFactura, true);
		}
	});

	useEffect(() => {
		fetchProducto();
		fetchUnidadMedida();
	}, []);

	const productoFiltrado = () => {
		if (dataProducto) {
			const filterData = dataProducto.filter(data => parseInt(data.IdProveedor) === Cabecera.Proveedor);
			dataProducto.map(datos => {
				listaProducto.push({
					value: datos.IdProducto,
					label: datos.Nombre,
				});
				return datos;
			});

			return filterData;
		}
	};

	const unidadMedidaList = () => {
		if (dataUnidadMedida) {
			dataUnidadMedida.map(datos => {
				listaUnidad.push({
					value: datos.IdUnidadMedida,
					label: datos.Nombre,
				});
				return datos;
			});
		}
	};

	productoFiltrado();
	unidadMedidaList();

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Factura Detalle
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={12}>
					<TextField
						id="cardName"
						select
						label="Producto"
						value={producto}
						onChange={handleChangeProveedor('currency')}
						fullWidth
					>
						<MenuItem value={0}>Seleccione Producto</MenuItem>
						{listaProducto.map(option => (
							<MenuItem key={option.value} value={option.value} name={option.label}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					{producto <= 0 && activateError ? (
						<FormHelperText style={{ color: 'red' }} id="component-error-text">
							Se debe selecionar un producto
						</FormHelperText>
					) : (
						undefined
					)}
				</Grid>
				<Grid item xs={12} md={12}>
					<TextField
						required
						id="cardNumber"
						label="Cantidad"
						fullWidth
						value={cantidad}
						onChange={handleCantidadChange}
					/>
					{cantidad <= 0 && activateError ? (
						<FormHelperText style={{ color: 'red' }} id="component-error-text">
							Error debe ingresar una cantidad mayor que 0
						</FormHelperText>
					) : (
						undefined
					)}
				</Grid>
				<Grid item xs={12} md={12}>
					<TextField
						id="cardName"
						select
						label="Unidad Medida"
						value={unidadMedida}
						onChange={handleChangeUnidad('currency')}
						fullWidth
					>
						<MenuItem value={0}>Seleccione Unidad de Medida</MenuItem>
						{listaUnidad.map(option => (
							<MenuItem key={option.value} value={option.value} name={option.label}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					{unidadMedida <= 0 && activateError ? (
						<FormHelperText style={{ color: 'red' }} id="component-error-text">
							Se debe seleccionar una unidad de medida
						</FormHelperText>
					) : (
						undefined
					)}
				</Grid>
				<Grid item xs={12} md={12}>
					<button
						className="button-table"
						style={{
							border: 'none',
							color: 'white',
							fontFamily: 'Open Sans',
							width: '100%',
							height: '38px',
							borderRadius: '4px',
						}}
						onClick={onClick}
					>
						Agregar
					</button>
				</Grid>
			</Grid>
			<CustomizedSnackbars
				visibleToast={visibleToast}
				setVisibleToast={setVisibleToast}
				messageToast={`${nombreProducto} fue agregado correctamente`}
				variant={'success'}
			/>
		</React.Fragment>
	);
}

export function mapStateToProps(state, props) {
	return {
		revisarCabecera: revisarCabecera(state, props),
		dataProducto: dataProducto(state, props),
		Cabecera: Cabecera(state, props),
		dataUnidadMedida: dataUnidadMedida(state, props),
	};
}

const actions = { checkDetalleFactura, fetchProducto, fetchUnidadMedida, clickFactura };

export default connect(
	mapStateToProps,
	actions
)(PaymentForm);
