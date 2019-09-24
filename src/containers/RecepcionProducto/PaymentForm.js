import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import CustomizedSnackbars from '../../components/Toast';

import { checkDetalleFactura } from '../../FacturaStore/actions';
import { revisarCabecera } from '../../FacturaStore/selectors';

let list = [];
function PaymentForm(Props) {
	const { checkDetalleFactura, revisarCabecera } = Props;
	const [producto, setProducto] = React.useState('');
	const [cantidad, setCantidad] = React.useState(0);
	const [unidadMedida, setUnidadMedida] = React.useState('');
	const [visibleToast, setVisibleToast] = React.useState(false);

	function handleProductoChange(e) {
		setProducto(e.target.value);
	}

	function handleCantidadChange(e) {
		setCantidad(e.target.value);
	}

	function handleUnidadMedidaChange(e) {
		setUnidadMedida(e.target.value);
	}

	function onClick() {
		list.push({
			Producto: producto,
			Cantidad: cantidad,
			UnidadMedida: unidadMedida,
		});
		localStorage.setItem('detalleFactura', JSON.stringify(list));
		setVisibleToast(true);
		//checkDetalleFactura(facturaDetalle, true);
	}

	useEffect(() => {
		if (revisarCabecera) {
			const detalleFactura = JSON.parse(localStorage.getItem('detalleFactura'));
			checkDetalleFactura(detalleFactura, true);
		}
	});

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Factura Detalle
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<TextField
						required
						id="cardName"
						label="Producto"
						fullWidth
						value={producto}
						onChange={handleProductoChange}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						required
						id="cardNumber"
						label="Cantidad"
						fullWidth
						value={cantidad}
						onChange={handleCantidadChange}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						required
						id="expDate"
						label="Unidad Medida"
						fullWidth
						value={unidadMedida}
						onChange={handleUnidadMedidaChange}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
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
			<CustomizedSnackbars visibleToast={visibleToast} setVisibleToast={setVisibleToast} />
		</React.Fragment>
	);
}

export function mapStateToProps(state, props) {
	return {
		revisarCabecera: revisarCabecera(state, props),
	};
}

const actions = { checkDetalleFactura };

export default connect(
	mapStateToProps,
	actions
)(PaymentForm);
