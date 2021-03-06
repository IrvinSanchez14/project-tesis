import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableData from '../../components/TableData';
import SideBarMenu from '../../components/SideBar';
import FrmPermisosUsuarios from '../../components/Forms/frmPermisosUsuarios';
import { ErrorTabla } from '../../components/Error';
import { sidebarStateFalse } from '../App/actions';
import api from '../../api';

import {
	fetchPermisosUsuarios,
	idSelectedPermisosUsuarios,
	setPermisosUsuariosData,
	editPermisosUsuarios,
	creacionRegistro,
	autorizacionFormFail,
	listaPermisosUsuarios,
} from './actions';
import { dataPermisosUsuarios, getDataId, getDataBodyId, getFormResponse } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';
import { fetchPermiso } from '../Permisos/actions';

import { permisosVerPermisosUsuarios } from '../../helpers/permisos';

class PermisosUsuarios extends React.Component {
	componentDidMount() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo === null) {
			this.props.history.push('/');
		}
		this.props.fetchPermisosUsuarios();
		this.props.fetchPermiso();
	}

	headTable = () => {
		let headTable = [
			{ label: 'ID', field: 'IdUsuario' },
			{ label: 'Correo Electronico', field: 'Email' },
			{ label: 'Nombre de Usuario', field: 'NombreUsuario' },
			{ label: 'Tipo de Usuario', field: 'NombreTipo' },
			{ label: 'Estado', field: 'estadoTexto' },
		];
		return headTable;
	};

	getIDtable = id => {
		api.post('/permisoUsuario/permisosUsuarios.php', { IdUsuario: id }).then(permisosU => {
			this.props.listaPermisosUsuarios(permisosU.data);
			this.props.sidebarState();
			this.props.idSelectedPermisosUsuarios(id);
			this.props.autorizacionFormFail(false);
		});
	};

	getDataTable = () => {
		return this.props.fetchPermisosUsuarios();
	};

	onChangeStateButton = check => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		const updateState = {
			IdUsuario: check.id,
			Estado: `${check.state}`,
			UsuarioActualiza: userInfo.IdUsuario,
		};
		const messageState = check.state === true ? 'Disponible' : 'Inactivo';
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Esta seguro de cambiar el estado a ${messageState}`)) {
			api.put('/permisoUsuario/updateState.php', updateState).then(data => {
				if (data.data.message) {
					this.props.fetchPermisosUsuarios();
					this.props.sidebarStateFalse();
				}
			});
		} else {
			return;
		}
	};

	frmTableTipo = () => {
		const frmTipoUsuarios = [];
		if (this.props.getDataBodyId === undefined) {
			frmTipoUsuarios.push(
				<FrmPermisosUsuarios
					key="frmTipoUsuario"
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdUsuario',
						'Email',
						'NombreUsuario',
						'NombreTipo',
						'estadoTexto'
					)}
					createData={true}
					formResponse={this.props.getFormResponse}
				/>
			);
		} else {
			frmTipoUsuarios.push(
				<FrmPermisosUsuarios
					key="frmTipoUsuario"
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdUsuario',
						'Email',
						'NombreUsuario',
						'NombreTipo',
						'estadoTexto'
					)}
					createData={false}
					formResponse={this.props.getFormResponse}
				/>
			);
		}
		return frmTipoUsuarios;
	};

	render() {
		const arr = [];
		if (this.props.dataPermisosUsuarios && permisosVerPermisosUsuarios()) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataPermisosUsuarios}
					getIDtable={this.getIDtable}
					key="idTableTipoUsuario"
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
						Permisos Usuarios
					</h1>

					<SideBarMenu
						content={arr}
						SideBarVisible={this.props.stateSideBarMenu}
						bodySide={this.props.getDataBodyId ? this.props.getDataBodyId : undefined}
						saveButton={this.getDataTable}
						frmTable={this.props.getDataBodyId ? this.frmTableTipo() : undefined}
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
		dataPermisosUsuarios: dataPermisosUsuarios(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
		setPermisosUsuariosData: setPermisosUsuariosData(state, props),
		getFormResponse: getFormResponse(state, props),
	};
}

export const actions = {
	fetchPermisosUsuarios,
	sidebarState,
	idSelectedPermisosUsuarios,
	editPermisosUsuarios,
	sidebarStateFalse,
	creacionRegistro,
	autorizacionFormFail,
	fetchPermiso,
	listaPermisosUsuarios,
};

PermisosUsuarios.propTypes = {
	fetchPermisosUsuarios: PropTypes.func,
	dataPermisosUsuarios: PropTypes.array,
	sidebarState: PropTypes.func,
	idSelectedPermisosUsuarios: PropTypes.func,
	stateSideBarMenu: PropTypes.bool,
	getDataId: PropTypes.array,
	getDataBodyId: PropTypes.object,
	setPermisosUsuariosData: PropTypes.object,
};

export default connect(
	mapStateToProps,
	actions
)(PermisosUsuarios);
