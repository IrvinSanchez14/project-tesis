import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import TableData from '../../components/TableData';
import SideBarMenu from '../../components/SideBar';
import FrmUsuarios from '../../components/Forms/frmUsuarios';
import { ErrorTabla } from '../../components/Error';
import { sidebarStateFalse } from '../App/actions';
import api from '../../api';

import {
	fetchUsuarios,
	idSelectedUsuarios,
	setUsuarioData,
	editUsuarios,
	creacionRegistro,
	autorizacionFormFail,
} from './actions';
import { dataUsuarios, getDataId, getDataBodyId, getFormResponse, listaTipos } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';
import { fetchTipoUsuario } from '../TipoUsuario/actions';

import { permisosVerUsuarios } from '../../helpers/permisos';

class Usuarios extends React.Component {
	componentDidMount() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo === null) {
			this.props.history.push('/');
		}
		this.props.fetchUsuarios();
		this.props.fetchTipoUsuario();
	}

	headTable = () => {
		let headTable;
		this.props.dataUsuarios.map(tipoUsuario => {
			headTable = Object.keys(tipoUsuario);
			return tipoUsuario;
		});
		return headTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedUsuarios(id);
		this.props.autorizacionFormFail(false);
	};

	crearRegistro = () => {
		this.props.creacionRegistro();
		this.props.sidebarState();
		this.props.autorizacionFormFail(false);
	};

	getDataTable = () => {
		return this.props.fetchUsuarios();
	};

	onSubmit = formValues => {
		if (formValues.flag === 'create') {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de guardar el siguiente Usuario en la Base de Datos?')) {
				api.post('/user/create_user.php', formValues).then(
					data => this.props.fetchUsuarios(),
					this.props.autorizacionFormFail(true),
					this.props.sidebarStateFalse()
				);
			} else {
				return this.props.autorizacionFormFail(false);
			}
		} else {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de actualizar el siguiente registro de la tabla Tipo de Usuario?')) {
				api.put('/user/update.php', formValues).then(
					data => this.props.fetchUsuarios(),
					this.props.autorizacionFormFail(true),
					this.props.sidebarStateFalse()
				);
			} else {
				return this.props.autorizacionFormFail(false);
			}
		}
	};

	onChangeStateButton = check => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		const updateState = {
			IdTipoUsuario: check.id,
			Estado: `${check.state}`,
			UsuarioActualiza: userInfo.IdUsuario,
		};
		const messageState = check.state === true ? 'Disponible' : 'Inactivo';
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Esta seguro de cambiar el estado a ${messageState}`)) {
			api.put('/tipoUsuario/updateState.php', updateState).then(data => {
				if (data.data.message) {
					this.props.fetchUsuarios();
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
				<FrmUsuarios
					key="frmUsuarios"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdUsuario',
						'Nombre',
						'Email',
						'Alias',
						'IdTipoUsuario'
					)}
					createData={true}
					formResponse={this.props.getFormResponse}
					listaTipos={this.props.listaTipos}
				/>
			);
		} else {
			frmTipoUsuarios.push(
				<FrmUsuarios
					key="frmUsuarios"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdUsuario',
						'Nombre',
						'Email',
						'Alias',
						'IdTipoUsuario'
					)}
					createData={false}
					formResponse={this.props.getFormResponse}
					listaTipos={this.props.listaTipos}
				/>
			);
		}
		return frmTipoUsuarios;
	};

	render() {
		const arr = [];
		if (this.props.dataUsuarios && permisosVerUsuarios()) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataUsuarios}
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
						Usuarios
					</h1>

					<SideBarMenu
						content={arr}
						SideBarVisible={this.props.stateSideBarMenu}
						headSide={this.props.getDataId ? this.props.getDataId : undefined}
						bodySide={this.props.getDataBodyId ? this.props.getDataBodyId : undefined}
						saveButton={this.getDataTable}
						frmTable={this.frmTableTipo()}
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
				</div>
			);
		} else {
			return <ErrorTabla />;
		}
	}
}

export function mapStateToProps(state, props) {
	return {
		dataUsuarios: dataUsuarios(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
		setUsuarioData: setUsuarioData(state, props),
		getFormResponse: getFormResponse(state, props),
		listaTipos: listaTipos(state, props),
	};
}

export const actions = {
	fetchUsuarios,
	fetchTipoUsuario,
	sidebarState,
	idSelectedUsuarios,
	editUsuarios,
	sidebarStateFalse,
	creacionRegistro,
	autorizacionFormFail,
};

Usuarios.propTypes = {
	fetchUsuarios: PropTypes.func,
	dataUsuarios: PropTypes.array,
	sidebarState: PropTypes.func,
	idSelectedUsuarios: PropTypes.func,
	stateSideBarMenu: PropTypes.bool,
	getDataId: PropTypes.array,
	getDataBodyId: PropTypes.object,
	setUsuarioData: PropTypes.object,
};

export default connect(
	mapStateToProps,
	actions
)(Usuarios);
