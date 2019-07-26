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
import FrmPermiso from '../../components/Forms/frmPermiso';

import { fetchPermiso, idSelectedPermiso, creacionRegistro } from './actions';
import { dataPermiso, getDataId, getDataBodyId } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';

class Permiso extends React.Component {
	componentDidMount() {
		//this.props.history.push('/');
		this.props.fetchPermiso();
	}

	headTable = () => {
		let headTable;
		this.props.dataPermiso.map(empresa => {
			headTable = Object.keys(empresa);
			return empresa;
		});
		return headTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedPermiso(id);
	};

	getDataTable = () => {
		return this.props.fetchPermiso();
	};

	crearRegistro = () => {
		this.props.creacionRegistro();
		this.props.sidebarState();
	};

	onSubmit = formValues => {
		if (formValues.flag === 'create') {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de guardar la siguiente Empresa en la Base de Datos?')) {
				api.post('/Permisos/create.php', formValues).then(
					data => this.props.fetchPermiso(),
					this.props.sidebarStateFalse()
				);
			} else {
				return;
			}
		} else {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de actualizar el siguiente dato de la tabla Empresa?')) {
				api.put('/Permisos/update.php', formValues).then(
					data => this.props.fetchPermiso(),
					this.props.sidebarStateFalse()
				);
			} else {
				return;
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
			api.put('/Permisos/updateState.php', updateState).then(data => {
				if (data.data.message) {
					this.props.fetchPermiso();
					this.props.sidebarStateFalse();
				}
			});
		} else {
			return;
		}
	};

	frmTablePermiso = () => {
		const frmPermiso = [];
		if (this.props.getDataBodyId === undefined) {
			frmPermiso.push(
				<FrmPermiso
					key="frmPermiso"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdPermiso',
						'Nombre',
						'Descripcion',
						'Estado'
					)}
					createData={true}
				/>
			);
		} else {
			frmPermiso.push(
				<FrmPermiso
					key="frmPermiso"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdPermiso',
						'Nombre',
						'Descripcion',
						'Estado'
					)}
					createData={false}
				/>
			);
		}
		return frmPermiso;
	};

	render() {
		const arr = [];
		if (this.props.dataPermiso) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataPermiso}
					getIDtable={this.getIDtable}
					key="IdPermiso"
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
						Permisos
					</h1>

					<SideBarMenu
						content={arr}
						SideBarVisible={this.props.stateSideBarMenu}
						headSide={this.props.getDataId ? this.props.getDataId : undefined}
						bodySide={this.props.getDataBodyId ? this.props.getDataBodyId : undefined}
						saveButton={this.getDataTable}
						frmTable={this.frmTablePermiso()}
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
		dataPermiso: dataPermiso(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
	};
}

export const actions = {
	fetchPermiso,
	sidebarState,
	idSelectedPermiso,
	sidebarStateFalse,
	creacionRegistro,
};

Permiso.propTypes = {
	fetchPermiso: PropTypes.func,
	dataPermiso: PropTypes.array,
	sidebarState: PropTypes.func,
	idSelectedPermiso: PropTypes.func,
	stateSideBarMenu: PropTypes.bool,
	getDataId: PropTypes.array,
	getDataBodyId: PropTypes.object,
	setTipoUsuarioData: PropTypes.object,
	creacionRegistro: PropTypes.func,
};

export default connect(
	mapStateToProps,
	actions
)(Permiso);
