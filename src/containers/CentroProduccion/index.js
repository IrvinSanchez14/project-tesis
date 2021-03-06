import React from 'react';
import { connect } from 'react-redux';

import TablaCP from './tabla';

import { fetchListadoProductos } from '../ListaProducto/actions';
import { fetchPorciones } from '../Porciones/actions';
import { fetchFactura } from './actions';
import { dataFactura } from './selectors';

class CentroProduccion extends React.Component {
	componentDidMount() {
		this.props.fetchFactura();
		this.props.fetchPorciones();
		this.props.fetchListadoProductos();
	}
	render() {
		const { dataFactura } = this.props;
		if (this.props.dataFactura) {
			if (!dataFactura.hasOwnProperty('error')) {
				return (
					<div>
						<h1
							style={{
								marginLeft: '25px',
								marginTop: '24px',
								fontWeight: 'bold',
							}}
						>
							Control de Produccion
						</h1>
						<TablaCP
							header={['ID', 'Estado', 'Lote', 'Proveedor', 'Numero de Factura', 'Fecha de creación']}
							dataTable={dataFactura}
							getIDtable={this.getIDtable}
							key="IdEmpresa"
						/>
					</div>
				);
			} else {
				return <p>No existe datos en este momento</p>;
			}
		} else {
			return null;
		}
	}
}

export function mapStateToProps(state, props) {
	return {
		dataFactura: dataFactura(state, props),
	};
}

export const actions = {
	fetchFactura,
	fetchPorciones,
	fetchListadoProductos,
};

export default connect(
	mapStateToProps,
	actions
)(CentroProduccion);
