import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { checkCabeceraFactura } from '../../FacturaStore/actions';
import { revisarCabecera } from '../../FacturaStore/selectors';

function AddressForm(Props) {
	const { revisarCabecera, checkCabeceraFactura } = Props;
	const [selectedDate, setSelectedDate] = React.useState(new Date('2019-01-01T21:11:54'));
	const [numeroFactura, setNumeroFactura] = React.useState('');
	const [proveedor, setProveedor] = React.useState('');
	const [tipoFactura, setTipoFactura] = React.useState('');
	const [sinIva, setSinIva] = React.useState('');
	const [iva, setIva] = React.useState('');

	function handleDateChange(date) {
		setSelectedDate(date);
	}

	function handleNoFacturaChange(e) {
		setNumeroFactura(e.target.value);
	}

	function handleProveedorChange(e) {
		setProveedor(e.target.value);
	}

	function handleTipoFacturaChange(e) {
		setTipoFactura(e.target.value);
	}

	function handleSinIvaChange(e) {
		setSinIva(e.target.value);
	}

	function handleIvaChange(e) {
		setIva(e.target.value);
	}

	useEffect(() => {
		if (revisarCabecera) {
			const cabeceraFactura = {
				Fecha: selectedDate,
				NumeroFactura: numeroFactura,
				Proveedor: proveedor,
				TipoFactura: tipoFactura,
				SinIva: sinIva,
				IVA: iva,
			};
			checkCabeceraFactura(cabeceraFactura, true);
		}
	});

	return (
		<div>
			<Typography variant="h6" gutterBottom>
				Factura titulo
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
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
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="IdProveedor"
						name="IdProveedor"
						label="Proveedor"
						fullWidth
						onChange={handleProveedorChange}
						value={proveedor}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						id="Tipo"
						name="TipoFactura"
						label="Tipo de factura"
						fullWidth
						onChange={handleTipoFacturaChange}
						value={tipoFactura}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="TotalSinIva"
						name="TotalSinIva"
						label="Total sin IVA"
						fullWidth
						onChange={handleSinIvaChange}
						value={sinIva}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="Iva"
						name="Iva"
						label="IVA"
						fullWidth
						onChange={handleIvaChange}
						value={iva}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export function mapStateToProps(state, props) {
	return {
		revisarCabecera: revisarCabecera(state, props),
	};
}

const actions = {
	checkCabeceraFactura,
};

export default connect(
	mapStateToProps,
	actions
)(AddressForm);
