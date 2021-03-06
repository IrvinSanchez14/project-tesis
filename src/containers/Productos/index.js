import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import api from '../../api';

import Print from '../../components/Print/';
import TableData from '../../components/TableData';
import SideBarMenu from '../../components/SideBar';
import { sidebarStateFalse } from '../App/actions';
import FrmProducto from '../../components/Forms/frmProducto';
import { ErrorTabla } from '../../components/Error';

import { fetchProducto, idSelectedProducto, creacionRegistro, autorizacionFormFail } from './actions';
import { dataProducto, getDataId, getDataBodyId, getFormResponse, tablaProducto } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';
import { fetchTipoProducto } from '../TipoProducto/actions';
import { fetchUnidadMedida } from '../UnidadMedida/actions';
import { fetchProveedor } from '../Proveedor/actions';

import { permisosVerProductos } from '../../helpers/permisos';

const styles = {
	divHeader: {
		display: 'flex',
		flexDirection: 'row',
		margin: '15px',
	},
	divTitle: {
		flex: 1,
	},
	divAdd: {
		marginRight: '20px',
	},
};

class Productos extends React.Component {
	componentDidMount() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo === null) {
			this.props.history.push('/');
		}
		this.props.fetchProducto();
		this.props.fetchProveedor();
		this.props.fetchTipoProducto();
		this.props.fetchUnidadMedida();
	}

	headTable = () => {
		let headTable = [
			{ label: 'ID', field: 'IdProducto' },
			{ label: 'Nombre', field: 'Nombre' },
			{ label: 'Descripción', field: 'Descripcion' },
			{ label: 'Tipo de Producto', field: 'tipoProducto' },
			{ label: 'Siglas', field: 'Siglas' },
			{ label: 'Proveedor', field: 'Proveedor' },
			{ label: 'Estado', field: 'Estado' },
		];
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
		this.props.autorizacionFormFail(false);
	};

	getDataTable = () => {
		return this.props.fetchProducto();
	};

	crearRegistro = () => {
		this.props.creacionRegistro();
		this.props.sidebarState();
		this.props.autorizacionFormFail(false);
	};

	onSubmit = formValues => {
		if (formValues.flag === 'create') {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de guardar el siguiente producto en la Base de Datos?')) {
				api.post('/Producto/create.php', formValues).then(response => {
					if (response.data.flag !== 0) {
						alert(response.data.message);
					} else {
						this.props.fetchProducto();
						this.props.autorizacionFormFail(true);
						this.props.sidebarStateFalse();
					}
				});
			} else {
				return this.props.autorizacionFormFail(false);
			}
		} else {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de actualizar el siguiente dato de la tabla Productos?')) {
				api.put('/Producto/update.php', formValues).then(
					data => this.props.fetchProducto(),
					this.props.autorizacionFormFail(true),
					this.props.sidebarStateFalse()
				);
			} else {
				return this.props.autorizacionFormFail(false);
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
						'Descripcion',
						'tipoProducto',
						'Siglas',
						'Proveedor',
						'IdTipoProducto',
						'IdUnidadMedida',
						'IdProveedor'
					)}
					createData={true}
					formResponse={this.props.getFormResponse}
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
						'Descripcion',
						'tipoProducto',
						'Siglas',
						'Proveedor',
						'IdTipoProducto',
						'IdUnidadMedida',
						'IdProveedor'
					)}
					createData={false}
					formResponse={this.props.getFormResponse}
				/>
			);
		}
		return frmProducto;
	};

	render() {
		const arr = [];
		if (this.props.dataProducto && permisosVerProductos()) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.tablaProducto}
					ejemplo={this.datosTabla()}
					getIDtable={this.getIDtable}
					key="IdProducto"
				/>
			);
			return (
				<div>
					<div style={styles.divHeader}>
						<div style={styles.divTitle}>
							<h1>Productos</h1>
						</div>
						<div style={styles.divAdd}>
							<Fab color="primary" aria-label="Add" onClick={this.crearRegistro}>
								<AddIcon />
							</Fab>
						</div>
						<div>
							<Print
								ruta={'/Producto/readAllPDF.php'}
								titulo={'Producto'}
								csv={'/Producto/readAllCSV.php'}
							/>
						</div>
					</div>

					<SideBarMenu
						content={arr}
						SideBarVisible={this.props.stateSideBarMenu}
						headSide={this.props.getDataId ? this.props.getDataId : undefined}
						bodySide={this.props.getDataBodyId ? this.props.getDataBodyId : undefined}
						saveButton={this.getDataTable}
						frmTable={this.frmTableProducto()}
						onClick={this.onChangeStateButton}
					/>
				</div>
			);
		} else {
			return <ErrorTabla />;
		}
	}
}

export function mapStateToProps(state, props) {
	return {
		dataProducto: dataProducto(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
		getFormResponse: getFormResponse(state, props),
		tablaProducto: tablaProducto(state, props),
	};
}

export const actions = {
	fetchProducto,
	sidebarState,
	idSelectedProducto,
	sidebarStateFalse,
	creacionRegistro,
	autorizacionFormFail,
	fetchTipoProducto,
	fetchProveedor,
	fetchUnidadMedida,
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
