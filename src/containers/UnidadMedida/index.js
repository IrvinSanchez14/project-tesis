import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Print from '../../components/Print/';
import api from '../../api';
import SideBarMenu from '../../components/SideBar';
import TableData from '../../components/TableData';
import FrmUnidadMedida from '../../components/Forms/frmUnidadMedida';
import { ErrorTabla } from '../../components/Error';

import { fetchUnidadMedida, idSelectedUnidadMedida, creacionRegistro, autorizacionFormFail } from './actions';
import { dataUnidadMedida, getDataBodyId, getDataId, getFormResponse } from './selectors';

import { sidebarState, sidebarStateFalse } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';

import { permisosVerUnidadMedida } from '../../helpers/permisos';

class UnidadMedida extends Component {
	componentDidMount() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo === null) {
			this.props.history.push('/');
		}
		this.props.fetchUnidadMedida();
	}

	headTable = () => {
		let headTable;
		this.props.dataUnidadMedida.map(unidadMedida => {
			headTable = Object.keys(unidadMedida);
			return unidadMedida;
		});
		return headTable;
	};

	datosTabla = () => {
		const dataTable = [];
		this.props.dataUnidadMedida.map(unidadMedida => {
			dataTable.push({
				0: unidadMedida.IdUnidadMedida,
				1: unidadMedida.Siglas,
				2: unidadMedida.Nombre,
				3: unidadMedida.Estado === '0' ? 'Disponible' : 'Inactivo',
				4: unidadMedida.FechaCreacion,
			});
			return unidadMedida;
		});
		return dataTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedUnidadMedida(id);
		this.props.autorizacionFormFail(false);
	};

	getDataTable = () => {
		return this.props.fetchUnidadMedida();
	};

	crearRegistro = () => {
		this.props.creacionRegistro();
		this.props.sidebarState();
		this.props.autorizacionFormFail(false);
	};

	onSubmit = formValues => {
		if (formValues.flag === 'create') {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de guardar la siguiente Empresa en la Base de Datos?')) {
				api.post('/UnidadMedida/create.php', formValues).then(
					data => this.props.fetchUnidadMedida(),
					this.props.autorizacionFormFail(true),
					this.props.sidebarStateFalse()
				);
			} else {
				return this.props.autorizacionFormFail(false);
			}
		} else {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de actualizar el siguiente dato de la tabla Empresa?')) {
				api.put('/UnidadMedida/update.php', formValues).then(
					data => this.props.fetchUnidadMedida(),
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
			IdUnidadMedida: check.id,
			Estado: `${check.state}`,
		};
		const messageState = check.state === true ? 'Disponible' : 'Inactivo';
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Esta seguro de cambiar el estado a ${messageState}`)) {
			api.put('/UnidadMedida/updateState.php', updateState).then(data => {
				if (data.data.message) {
					this.props.fetchUnidadMedida();
					this.props.sidebarStateFalse();
				}
			});
		} else {
			return;
		}
	};

	frmTableUnidadMedida = () => {
		const frmUnidadMedida = [];
		if (this.props.getDataBodyId === undefined) {
			frmUnidadMedida.push(
				<FrmUnidadMedida
					key="frmUnidadMedida"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdUnidadMedida',
						'Siglas',
						'Nombre',
						'Estado'
					)}
					createData={true}
					formResponse={this.props.getFormResponse}
				/>
			);
		} else {
			frmUnidadMedida.push(
				<FrmUnidadMedida
					key="frmUnidadMedida"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdUnidadMedida',
						'Siglas',
						'Nombre',
						'Estado'
					)}
					createData={false}
					formResponse={this.props.getFormResponse}
				/>
			);
		}
		return frmUnidadMedida;
	};

	render() {
		const arr = [];
		if (this.props.dataUnidadMedida && permisosVerUnidadMedida()) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataUnidadMedida}
					ejemplo={this.datosTabla()}
					getIDtable={this.getIDtable}
					key="IdUnidadMedida"
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
						Unidades de Medidas
					</h1>

					<SideBarMenu
						content={arr}
						SideBarVisible={this.props.stateSideBarMenu}
						headSide={this.props.getDataId ? this.props.getDataId : undefined}
						bodySide={this.props.getDataBodyId ? this.props.getDataBodyId : undefined}
						saveButton={this.getDataTable}
						frmTable={this.frmTableUnidadMedida()}
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
		dataUnidadMedida: dataUnidadMedida(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getFormResponse: getFormResponse(state, props),
	};
}

export const action = {
	fetchUnidadMedida,
	sidebarState,
	idSelectedUnidadMedida,
	creacionRegistro,
	sidebarStateFalse,
	autorizacionFormFail,
};

UnidadMedida.propTypes = {
	fetchUnidadMedida: PropTypes.func,
	dataUnidadMedida: PropTypes.array,
	getDataId: PropTypes.array,
	getDataBodyId: PropTypes.object,
	sidebarState: PropTypes.func,
	idSelectedUnidadMedida: PropTypes.func,
	stateSideBarMenu: PropTypes.bool,
	creacionRegistro: PropTypes.func,
};

export default connect(
	mapStateToProps,
	action
)(UnidadMedida);
