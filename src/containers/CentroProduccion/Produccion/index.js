import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import TablaPC from './tabla';

/*import { fetchListadoProductos } from '../ListaProducto/actions';
import { fetchPorciones } from '../Porciones/actions';*/
import { fetchProduccion } from '../actions';
import { dataProduccion } from '../selectors';

class Produccion extends React.Component {
	componentDidMount() {
		this.props.fetchProduccion();
	}
	render() {
		const { dataProduccion } = this.props;
		if (this.props.dataProduccion) {
			if (!dataProduccion.hasOwnProperty('error')) {
				return (
					<div>
						<h1
							style={{
								marginLeft: '25px',
								marginTop: '24px',
								fontWeight: 'bold',
							}}
						>
							Creacion de nota de envio por LOTE
						</h1>
						<Link
							to={`${window.location.pathname}/NotaEnvio`}
							style={{
								color: 'inherit',
							}}
						>
							<Button>Notas de Envio</Button>
						</Link>
						<TablaPC
							header={['ID', 'Estado', 'Lote', 'Fecha de creación']}
							dataTable={dataProduccion}
							getIDtable={this.getIDtable}
							key="IdProduccion"
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
		dataProduccion: dataProduccion(state, props),
	};
}

export const actions = {
	fetchProduccion,
};

export default connect(
	mapStateToProps,
	actions
)(Produccion);
