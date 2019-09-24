import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

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
	const { listaDetalleFactura, Cabecera } = Props;
	const classes = useStyles();

	function askDelete() {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Esta seguro de eliminar el producto de la factura?')) {
		} else {
			return;
		}
	}

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Factura Vista
			</Typography>
			<List disablePadding>
				{listaDetalleFactura.map(product => (
					<ListItem
						onClick={() => askDelete()}
						className={`lista-factura ${classes.listItem}`}
						key={product.Producto}
					>
						<ListItemText primary={product.Producto} secondary={product.UnidadMedida} />
						<Typography variant="body2">{product.Cantidad}</Typography>
					</ListItem>
				))}
			</List>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography variant="h6" gutterBottom className={classes.title}>
						Cabecera Factura
					</Typography>
					<Typography variant="button" display="block" gutterBottom>{`Proveedor: ${
						Cabecera.Proveedor
					}`}</Typography>
					<Typography variant="button" display="block" gutterBottom>{`Numero de Factura: ${
						Cabecera.NumeroFactura
					}`}</Typography>
					<Typography variant="button" display="block" gutterBottom>{`Tipo de Factura: ${
						Cabecera.TipoFactura
					}`}</Typography>
					<Typography variant="button" display="block" gutterBottom>{`Precio sin IVA: ${
						Cabecera.SinIva
					}`}</Typography>
					<Typography variant="button" display="block" gutterBottom>{`Precio con IVA: ${
						Cabecera.IVA
					}`}</Typography>
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

const actions = {};

export default connect(
	mapStateToProps,
	actions
)(Review);
