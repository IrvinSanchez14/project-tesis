import React, { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

import { actualizacionListaFacturaDetalle } from '../../FacturaStore/actions';
import { listaDetalleFactura, Cabecera } from '../../FacturaStore/selectors';

const useStyles = makeStyles(theme => ({
	listItem: {
		padding: theme.spacing(1, 0),
	},
	total: {
		fontWeight: '700',
	},
	title: {
		marginTop: theme.spacing(2),
	},
}));

function Review(Props) {
	const { listaDetalleFactura, Cabecera, actualizacionListaFacturaDetalle } = Props;
	const [valor, setValor] = useState(0);
	const [cantidadVal, setCantidadVal] = useState(0);
	const classes = useStyles();

	function askDelete(index) {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Esta seguro de eliminar el producto de la factura?')) {
			listaDetalleFactura.splice(index, 1);
			localStorage.setItem('detalleFactura', JSON.stringify(listaDetalleFactura));
			actualizacionListaFacturaDetalle();
		} else {
			return;
		}
	}

	function activateEditInput(arrayId) {
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Esta seguro `)) {
			const newObjectList = listaDetalleFactura.map((row, index) => {
				if (index === arrayId) {
					row = { ...row, editValue: true };
					setValor(row.Cantidad);
				}
				return row;
			});
			localStorage.setItem('detalleFactura', JSON.stringify(newObjectList));
			actualizacionListaFacturaDetalle();
		} else {
			return;
		}
	}

	/*useEffect(() => {
		if (Cabecera !== undefined) {
			setNumeroFactura(Cabecera.NumeroFactura);
			setProveedor(Cabecera.Proveedor);
			setTipoFactura(Cabecera.TipoFactura);
			setSinIva(Cabecera.SinIva);
			setIva(Cabecera.IVA);
			setNombreProveedor(nombreProveedor);
			setNombreTipoFactura(nombreTipoFactura);
		}
	}, []);*/

	function handleChangeCantidad(e) {
		setCantidadVal(e.target.value);
		return cantidadVal;
	}

	const handleKeyDown = (e, arrayId) => {
		if (e.key === 'Enter') {
			const newObjectList = listaDetalleFactura.map((row, index) => {
				if (index === arrayId) {
					row = { ...row, Cantidad: cantidadVal, editValue: false };
				}
				return row;
			});
			localStorage.setItem('detalleFactura', JSON.stringify(newObjectList));
			actualizacionListaFacturaDetalle();
		}
	};

	console.log('listaDetalleFactura', listaDetalleFactura);

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Factura Vista
			</Typography>
			<List disablePadding>
				{listaDetalleFactura !== null
					? listaDetalleFactura.map((product, index) => (
							<ListItem key={index}>
								<ListItemText primary={product.nombreProducto} secondary={product.nombreUnidadMedida} />
								<Typography variant="body2">
									{product.editValue ? (
										<input
											style={{
												width: '42px',
												border: '0px',
											}}
											type="number"
											onChange={handleChangeCantidad}
											defaultValue={product.Cantidad}
											onKeyDown={e => handleKeyDown(e, index)}
											disabled={false}
										/>
									) : (
										product.Cantidad
									)}
								</Typography>
								<Typography style={{ margin: '10px' }} variant="body2">
									{' '}
									<span className="spanAction" onClick={() => activateEditInput(index)}>
										<i className="fas fa-pen" />
									</span>
									{'  '}-{'  '}
									<span onClick={() => askDelete(index)} className="spanAction">
										<i className="fas fa-trash" />
									</span>
								</Typography>
							</ListItem>
					  ))
					: undefined}
			</List>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography variant="h6" gutterBottom className={classes.title}>
						Cabecera Factura
					</Typography>
					<Typography
						variant="button"
						display="block"
						gutterBottom
					>{`Proveedor: ${Cabecera.nombreProveedor}`}</Typography>
					<Typography
						variant="button"
						display="block"
						gutterBottom
					>{`Numero de Factura: ${Cabecera.NumeroFactura}`}</Typography>
					<Typography
						variant="button"
						display="block"
						gutterBottom
					>{`Tipo de Documento: ${Cabecera.nombreTipoFactura}`}</Typography>
					<Typography
						variant="button"
						display="block"
						gutterBottom
					>{`Precio sin IVA: ${Cabecera.SinIva}`}</Typography>
					<Typography
						variant="button"
						display="block"
						gutterBottom
					>{`Precio con IVA: ${Cabecera.IVA}`}</Typography>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export function mapStateToProps(state, props) {
	return {
		listaDetalleFactura: listaDetalleFactura(state, props),
		Cabecera: Cabecera(state, props),
	};
}

const actions = {
	actualizacionListaFacturaDetalle,
};

export default connect(
	mapStateToProps,
	actions
)(Review);
