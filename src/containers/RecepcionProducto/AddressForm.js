import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { checkCabeceraFactura, clickFactura } from '../../FacturaStore/actions';
import { revisarCabecera, Cabecera } from '../../FacturaStore/selectors';
import { fetchProveedor } from '../Proveedor/actions';
import { dataProveedor } from '../Proveedor/selectors';
import esLocale from 'date-fns/locale/es';
import _ from 'lodash';

const currencies2 = [
	{
		value: '1',
		label: 'Factura',
	},
	{
		value: '2',
		label: 'Credito Fiscal',
	},
];

function AddressForm(Props) {
	const { revisarCabecera, checkCabeceraFactura, fetchProveedor, dataProveedor, clickFactura, Cabecera } = Props;
	const [selectedDate, setSelectedDate] = React.useState(new Date());
	const [numeroFactura, setNumeroFactura] = React.useState('');
	const [proveedor, setProveedor] = React.useState(0);
	const [nombreProveedor, setNombreProveedor] = useState('');
	const [tipoFactura, setTipoFactura] = React.useState(0);
	const [nombreTipoFactura, setNombreTipoFactura] = useState('');
	const [sinIva, setSinIva] = React.useState('');
	const [iva, setIva] = React.useState('');
	const [activateError, setActivateError] = useState(false);
	let listaProveedor = [];

	const proveedorLista = () => {
		if (dataProveedor) {
			dataProveedor.map(datos => {
				listaProveedor.push({
					value: datos.IdProveedor,
					label: datos.Nombre,
				});
				return datos;
			});
		}
		return false;
	};

	function handleDateChange(date) {
		setSelectedDate(date);
	}

	const handleChangeProveedor = name => event => {
		setNombreProveedor(event.nativeEvent.target.outerText);
		setProveedor(event.target.value);
	};

	const handleChangeTipo = name => event => {
		setNombreTipoFactura(event.nativeEvent.target.outerText);
		setTipoFactura(event.target.value);
	};

	function handleNoFacturaChange(e) {
		setNumeroFactura(e.target.value);
	}

	function handleSinIvaChange(e) {
		setSinIva(e.target.value);
	}

	function handleIvaChange(e) {
		setIva(e.target.value);
		const numero = e.target.value;
		const precio_sin_iva = numero / 1.13;
		setSinIva(precio_sin_iva.toFixed(4));
	}

	useEffect(() => {
		if (
			(_.isEmpty(numeroFactura) || proveedor <= 0 || tipoFactura <= 0 || _.isEmpty(sinIva) || _.isEmpty(iva)) &&
			revisarCabecera
		) {
			setActivateError(true);
			clickFactura(false);
		} else {
			if (revisarCabecera) {
				const cabeceraFactura = {
					Fecha: moment(selectedDate).format('MM/DD/YYYY'),
					NumeroFactura: numeroFactura,
					Proveedor: proveedor,
					TipoFactura: tipoFactura,
					SinIva: sinIva,
					IVA: iva,
					UsuarioCreador: 1,
					nombreTipoFactura: nombreTipoFactura,
					nombreProveedor: nombreProveedor,
				};
				checkCabeceraFactura(cabeceraFactura, true);
				localStorage.setItem('cabeceraFactura', JSON.stringify(cabeceraFactura));
				setActivateError(false);
			}
		}
	});

	useEffect(() => {
		fetchProveedor();

		if (Cabecera !== undefined) {
			setNumeroFactura(Cabecera.NumeroFactura);
			setProveedor(Cabecera.Proveedor);
			setTipoFactura(Cabecera.TipoFactura);
			setSinIva(Cabecera.SinIva);
			setIva(Cabecera.IVA);
			setNombreProveedor(nombreProveedor);
			setNombreTipoFactura(nombreTipoFactura);
		}
	}, []);

	proveedorLista();

	return (
		<div>
			<Typography variant="h6" gutterBottom>
				Factura titulo
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
						<KeyboardDatePicker
							margin="normal"
							id="date-picker-dialog"
							label="Fecha de recepcion"
							format="MM/dd/yyyy"
							value={selectedDate}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="NoFactura"
						name="NoFactura"
						label="Numero de Factura"
						fullWidth
						onChange={handleNoFacturaChange}
						value={numeroFactura}
						color="red"
					/>
					{_.isEmpty(numeroFactura) && activateError ? (
						<FormHelperText style={{ color: 'red' }} id="component-error-text">
							Error llenar el siguiente campo
						</FormHelperText>
					) : (
						undefined
					)}
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="standard-select-currency"
						select
						label="Proveedor"
						value={proveedor}
						onChange={handleChangeProveedor('currency')}
					>
						<MenuItem value={0}>Seleccione proveedor</MenuItem>
						{listaProveedor.map(option => (
							<MenuItem key={option.value} value={option.value} name={option.label}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					{proveedor <= 0 && activateError ? (
						<FormHelperText style={{ color: 'red' }} id="component-error-text">
							Se debe selecionar un proveedor
						</FormHelperText>
					) : (
						undefined
					)}
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="standard-select-currency"
						select
						label="Tipo de documento"
						value={tipoFactura}
						onChange={handleChangeTipo('currency')}
						fullWidth
					>
						<MenuItem value={0}>Seleccion tipo de tipo de documento</MenuItem>
						{currencies2.map(option => (
							<MenuItem key={option.value} value={option.value} onClick={() => console.log(option.value)}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					{tipoFactura <= 0 && activateError ? (
						<FormHelperText style={{ color: 'red' }} id="component-error-text">
							Se debe selecionar un tipo de factura
						</FormHelperText>
					) : (
						undefined
					)}
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						disabled
						id="TotalSinIva"
						name="TotalSinIva"
						label="Total sin IVA"
						fullWidth
						onChange={handleSinIvaChange}
						value={sinIva}
					/>
					{_.isEmpty(sinIva) && activateError ? (
						<FormHelperText style={{ color: 'red' }} id="component-error-text">
							Error llenar el siguiente campo
						</FormHelperText>
					) : (
						undefined
					)}
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="Iva"
						name="Iva"
						label="Total con IVA"
						fullWidth
						onChange={handleIvaChange}
						value={iva}
					/>
					{_.isEmpty(iva) && activateError ? (
						<FormHelperText style={{ color: 'red' }} id="component-error-text">
							Error llenar el siguiente campo
						</FormHelperText>
					) : (
						undefined
					)}
				</Grid>
			</Grid>
		</div>
	);
}

export function mapStateToProps(state, props) {
	return {
		revisarCabecera: revisarCabecera(state, props),
		dataProveedor: dataProveedor(state, props),
		Cabecera: Cabecera(state, props),
	};
}

const actions = {
	checkCabeceraFactura,
	fetchProveedor,
	clickFactura,
};

export default connect(
	mapStateToProps,
	actions
)(AddressForm);
