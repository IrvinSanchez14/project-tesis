import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

import { listaDetalleFactura } from '../../FacturaStore/selectors';

const products = [
	{ name: 'Queso Mozzarella', desc: 'LB', price: '15' },
	{ name: 'Queso Cheddar', desc: 'LB', price: '25' },
];
const addresses = ['Numero Factura', 'Total Sin Iva', 'Iva', 'Tipo de Factura', 'Fecha'];

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
	const { listaDetalleFactura } = Props;
	const classes = useStyles();

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Factura Vista
			</Typography>
			<List disablePadding>
				{listaDetalleFactura.map(product => (
					<ListItem className={classes.listItem} key={product.Producto}>
						<ListItemText primary={product.Producto} secondary={product.UnidadMedida} />
						<Typography variant="body2">{product.Cantidad}</Typography>
					</ListItem>
				))}
				<ListItem className={classes.listItem}>
					<ListItemText primary="Cantidad Total" />
					<Typography variant="subtitle1" className={classes.total}>
						40
					</Typography>
				</ListItem>
			</List>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography variant="h6" gutterBottom className={classes.title}>
						Cabecera
					</Typography>
					<Typography gutterBottom>Proveedor</Typography>
					<Typography gutterBottom>{addresses.join(', ')}</Typography>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export function mapStateToProps(state, props) {
	return {
		listaDetalleFactura: listaDetalleFactura(state, props),
	};
}

const actions = {};

export default connect(
	mapStateToProps,
	actions
)(Review);
