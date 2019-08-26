import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Print from '../../components/Print/';
import TableData from '../../components/TableData';
import SideBarMenu from '../../components/SideBar';
import FrmTipoUsuario from '../../components/Forms/frmTipoUsuario';
import { ErrorTabla } from '../../components/Error';
import { sidebarStateFalse } from '../App/actions';
import api from '../../api';

import {
	fetchTipoUsuario,
	idSelectedTipoUsuario,
	setTipoUsuarioData,
	editTipousuario,
	creacionRegistro,
	autorizacionFormFail,
} from './actions';
import { dataTipoUsuario, getDataId, getDataBodyId, getFormResponse } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';

import { permisoVerTipoUsuario } from '../../helpers/permisos';

class TipoUsuario extends React.Component {
	componentDidMount() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo === null) {
			this.props.history.push('/');
		}
		this.props.fetchTipoUsuario();
	}

	headTable = () => {
		let headTable;
		this.props.dataTipoUsuario.map(tipoUsuario => {
			headTable = Object.keys(tipoUsuario);
			return tipoUsuario;
		});
		return headTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedTipoUsuario(id);
		this.props.autorizacionFormFail(false);
	};

	crearRegistro = () => {
		this.props.creacionRegistro();
		this.props.sidebarState();
		this.props.autorizacionFormFail(false);
	};

	getDataTable = () => {
		return this.props.fetchTipoUsuario();
	};

	onSubmit = formValues => {
		if (formValues.flag === 'create') {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de guardar el siguiente Tipo de Usuario en la Base de Datos?')) {
				api.post('/tipoUsuario/create.php', formValues).then(response => {
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
			if (confirm('Esta seguro de actualizar el siguiente registro de la tabla Tipo de Usuario?')) {
				api.put('/tipoUsuario/update.php', formValues).then(
					data => this.props.fetchTipoUsuario(),
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
					this.props.fetchTipoUsuario();
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
				<FrmTipoUsuario
					key="frmTipoUsuario"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdTipoUsuario',
						'Nombre',
						'Descripcion',
						'Estado'
					)}
					createData={true}
					formResponse={this.props.getFormResponse}
				/>
			);
		} else {
			frmTipoUsuarios.push(
				<FrmTipoUsuario
					key="frmTipoUsuario"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdTipoUsuario',
						'Nombre',
						'Descripcion',
						'Estado'
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
		if (this.props.dataTipoUsuario && permisoVerTipoUsuario()) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataTipoUsuario}
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
						Tipos de Usuarios
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
					<Print
						ruta={'/tipoUsuario/readAllPDF.php'}
						titulo={'tipo_usuario'}
						csv={'/tipoUsuario/readAllCSV.php'}
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
		dataTipoUsuario: dataTipoUsuario(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
		setTipoUsuarioData: setTipoUsuarioData(state, props),
		getFormResponse: getFormResponse(state, props),
	};
}

export const actions = {
	fetchTipoUsuario,
	sidebarState,
	idSelectedTipoUsuario,
	editTipousuario,
	sidebarStateFalse,
	creacionRegistro,
	autorizacionFormFail,
};

TipoUsuario.propTypes = {
	fetchTipoUsuario: PropTypes.func,
	dataTipoUsuario: PropTypes.array,
	sidebarState: PropTypes.func,
	idSelectedTipoUsuario: PropTypes.func,
	stateSideBarMenu: PropTypes.bool,
	getDataId: PropTypes.array,
	getDataBodyId: PropTypes.object,
	setTipoUsuarioData: PropTypes.object,
};

export default connect(
	mapStateToProps,
	actions
)(TipoUsuario);
