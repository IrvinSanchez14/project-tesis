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
import FrmProveedor from '../../components/Forms/frmProveedor';
import { ErrorTabla } from '../../components/Error';

import { fetchProveedor, idSelectedProveedor, creacionRegistro, autorizacionFormFail } from './actions';
import { dataProveedor, getDataId, getDataBodyId, getFormResponse } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';

import { permisosVerProveedor } from '../../helpers/permisos';

class Proveedor extends React.Component {
	componentDidMount() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo === null) {
			this.props.history.push('/');
		}
		this.props.fetchProveedor();
	}

	headTable = () => {
		let headTable;
		this.props.dataProveedor.map(empresa => {
			headTable = Object.keys(empresa);
			return empresa;
		});
		return headTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedProveedor(id);
		this.props.autorizacionFormFail(false);
	};

	getDataTable = () => {
		return this.props.fetchProveedor();
	};

	crearRegistro = () => {
		this.props.creacionRegistro();
		this.props.sidebarState();
		this.props.autorizacionFormFail(false);
	};

	onSubmit = formValues => {
		if (formValues.flag === 'create') {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de guardar el siguiente proveedor en la Base de Datos?')) {
				api.post('/Proveedor/create.php', formValues).then(
					data => this.props.fetchProveedor(),
					this.props.autorizacionFormFail(true),
					this.props.sidebarStateFalse()
				);
			} else {
				return this.props.autorizacionFormFail(false);
			}
		} else {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de actualizar el siguiente dato de la tabla Empresa?')) {
				api.put('/Proveedor/update.php', formValues).then(
					data => this.props.fetchProveedor(),
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
			IdEmpresa: check.id,
			Estado: `${check.state}`,
		};
		const messageState = check.state === true ? 'Disponible' : 'Inactivo';
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Esta seguro de cambiar el estado a ${messageState}`)) {
			api.put('/Proveedor/updateState.php', updateState).then(data => {
				if (data.data.message) {
					this.props.fetchProveedor();
					this.props.sidebarStateFalse();
				}
			});
		} else {
			return;
		}
	};

	frmTableProveedor = () => {
		const frmProveedor = [];
		if (this.props.getDataBodyId === undefined) {
			frmProveedor.push(
				<FrmProveedor
					key="frmProveedor"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdProveedor',
						'Nombre',
						'Direccion',
						'Telefono',
						'Razo_Social',
						'Tipo',
						'Nombre_Contacto',
						'Email',
						'DUI',
						'NIT',
						'NRC',
						'Estado',
						'FechaCreacion'
					)}
					createData={true}
					formResponse={this.props.getFormResponse}
				/>
			);
		} else {
			frmProveedor.push(
				<FrmProveedor
					key="frmProveedor"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdProveedor',
						'Nombre',
						'Direccion',
						'Telefono',
						'Razo_Social',
						'Tipo',
						'Nombre_Contacto',
						'Email',
						'DUI',
						'NIT',
						'NRC',
						'Estado',
						'FechaCreacion'
					)}
					createData={false}
					formResponse={this.props.getFormResponse}
				/>
			);
		}
		return frmProveedor;
	};

	render() {
		const arr = [];
		if (this.props.dataProveedor && permisosVerProveedor()) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataProveedor}
					getIDtable={this.getIDtable}
					key="IdProveedor"
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
						Proveedores
					</h1>

					<SideBarMenu
						content={arr}
						SideBarVisible={this.props.stateSideBarMenu}
						headSide={this.props.getDataId ? this.props.getDataId : undefined}
						bodySide={this.props.getDataBodyId ? this.props.getDataBodyId : undefined}
						saveButton={this.getDataTable}
						frmTable={this.frmTableProveedor()}
						onClick={this.onChangeStateButton}
					/>
					<Fab
						style={{
							right: '16px',
							bottom: '80%',
							position: 'fixed',
						}}
						color="primary"
						aria-label="Add"
						onClick={this.crearRegistro}
					>
						<AddIcon />
					</Fab>
					<Print />
				</div>
			);
		} else {
			return <ErrorTabla />;
		}
	}
}

export function mapStateToProps(state, props) {
	return {
		dataProveedor: dataProveedor(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
		getFormResponse: getFormResponse(state, props),
	};
}

export const actions = {
	fetchProveedor,
	sidebarState,
	idSelectedProveedor,
	sidebarStateFalse,
	creacionRegistro,
	autorizacionFormFail,
};

Proveedor.propTypes = {
	fetchProveedor: PropTypes.func,
	dataProveedor: PropTypes.array,
	sidebarState: PropTypes.func,
	idSelectedProveedor: PropTypes.func,
	stateSideBarMenu: PropTypes.bool,
	getDataId: PropTypes.array,
	getDataBodyId: PropTypes.object,
	setTipoUsuarioData: PropTypes.object,
	creacionRegistro: PropTypes.func,
};

export default connect(
	mapStateToProps,
	actions
)(Proveedor);
