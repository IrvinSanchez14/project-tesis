import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import api from '../../api';

import TableData from '../../components/TableData';
import SideBarMenu from '../../components/SideBar';
import { sidebarStateFalse } from '../App/actions';
import FrmProducto from '../../components/Forms/frmProducto';

import { fetchProducto, idSelectedProducto, creacionRegistro } from './actions';
import { dataProducto, getDataId, getDataBodyId } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';

class Productos extends React.Component {
	componentDidMount() {
		//this.props.history.push('/');
		this.props.fetchProducto();
	}

	headTable = () => {
		let headTable;
		this.props.dataProducto.map(producto => {
			headTable = Object.keys(producto);
			return producto;
		});
		return headTable;
	};

	datosTabla = () => {
		const dataTable = [];
		this.props.dataProducto.map(producto => {
			dataTable.push({
				0: producto.IdProducto,
				1: producto.Nombre,
				2: producto.Descripcion,
			});
			return producto;
		});
		return dataTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedProducto(id);
	};

	getDataTable = () => {
		return this.props.fetchProducto();
	};

	crearRegistro = () => {
		this.props.creacionRegistro();
		this.props.sidebarState();
	};

	onSubmit = formValues => {
		if (formValues.flag === 'create') {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de guardar la siguiente Empresa en la Base de Datos?')) {
				api.post('/Producto/create.php', formValues).then(
					data => this.props.fetchProducto(),
					this.props.sidebarStateFalse()
				);
			} else {
				return;
			}
		} else {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de actualizar el siguiente dato de la tabla Empresa?')) {
				api.put('/Producto/update.php', formValues).then(
					data => this.props.fetchProducto(),
					this.props.sidebarStateFalse()
				);
			} else {
				return;
			}
		}
	};

	onChangeStateButton = check => {
		const updateState = {
			IdProducto: check.id,
			Estado: `${check.state}`,
		};
		const messageState = check.state === true ? 'Disponible' : 'Inactivo';
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Esta seguro de cambiar el estado a ${messageState}`)) {
			api.put('/Producto/updateState.php', updateState).then(data => {
				if (data.data.message) {
					this.props.fetchProducto();
					this.props.sidebarStateFalse();
				}
			});
		} else {
			return;
		}
	};

	frmTableProducto = () => {
		const frmProducto = [];
		if (this.props.getDataBodyId === undefined) {
			frmProducto.push(
				<FrmProducto
					key="IdProducto"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdProducto',
						'Nombre',
						'Descripcion'
					)}
					createData={true}
				/>
			);
		} else {
			frmProducto.push(
				<FrmProducto
					key="IdProducto"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdProducto',
						'Nombre',
						'Descripcion'
					)}
					createData={false}
				/>
			);
		}
		return frmProducto;
	};

	render() {
		const arr = [];
		if (this.props.dataProducto) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataProducto}
					ejemplo={this.datosTabla()}
					getIDtable={this.getIDtable}
					key="IdProducto"
				/>
			);
			return (
				<div>
					<h1
						style={{
							marginLeft: '25px',
							marginTop: '24px',
							fontWeight: 'bold',
						}}
					>
						Productos
					</h1>

					<SideBarMenu
						content={arr}
						SideBarVisible={this.props.stateSideBarMenu}
						headSide={this.props.getDataId ? this.props.getDataId : undefined}
						bodySide={this.props.getDataBodyId ? this.props.getDataBodyId : undefined}
						saveButton={this.getDataTable}
						frmTable={this.frmTableProducto()}
						onClick={this.onChangeStateButton}
					/>
					<Fab
						style={{
							right: '16px',
							bottom: '16px',
							position: 'fixed',
						}}
						color="primary"
						aria-label="Add"
						onClick={this.crearRegistro}
					>
						<AddIcon />
					</Fab>
				</div>
			);
		}
		return null;
	}
}

export function mapStateToProps(state, props) {
	return {
		dataProducto: dataProducto(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
	};
}

export const actions = {
	fetchProducto,
	sidebarState,
	idSelectedProducto,
	sidebarStateFalse,
	creacionRegistro,
};

Productos.propTypes = {
	fetchProducto: PropTypes.func,
	dataProducto: PropTypes.array,
	sidebarState: PropTypes.func,
	idSelectedProducto: PropTypes.func,
	stateSideBarMenu: PropTypes.bool,
	getDataId: PropTypes.array,
	getDataBodyId: PropTypes.object,
	setTipoUsuarioData: PropTypes.object,
	creacionRegistro: PropTypes.func,
};

export default connect(
	mapStateToProps,
	actions
)(Productos);
