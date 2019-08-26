import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Print from '../../components/Print/';
import api from '../../api';
import TableData from '../../components/TableData';
import SideBarMenu from '../../components/SideBar';
import FrmSucursal from '../../components/Forms/frmSucursal';
import { ErrorTabla } from '../../components/Error';

import { fetchSucursal, idSelectedSucursal, creacionRegistro, autorizacionFormFail } from './actions';
import { dataSucursal, getDataId, getDataBodyId, getFormResponse } from './selectors';

import { sidebarState, sidebarStateFalse } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';

import { permisosVerSucursales } from '../../helpers/permisos';

class Sucursales extends Component {
	componentDidMount() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo === null) {
			this.props.history.push('/');
		}
		this.props.fetchSucursal();
	}

	headTable = () => {
		let headTable;
		this.props.dataSucursal.map(sucursal => {
			headTable = Object.keys(sucursal);
			return sucursal;
		});
		return headTable;
	};

	datosTabla = () => {
		const dataTable = [];
		this.props.dataSucursal.map(sucursal => {
			dataTable.push({
				0: sucursal.IdSucursal,
				1: sucursal.IdEmpresa,
				2: sucursal.Nombre,
				3: sucursal.Direccion,
				4: sucursal.Telefono,
				5: sucursal.IdEncargado,
				6: sucursal.Estado === '0' ? 'Disponible' : 'Inactivo',
				7: sucursal.FechaCreacion,
			});
			return sucursal;
		});
		return dataTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedSucursal(id);
		this.props.autorizacionFormFail(false);
	};

	getDataTable = () => {
		return this.props.fetchSucursal();
	};

	crearRegistro = () => {
		this.props.creacionRegistro();
		this.props.sidebarState();
		this.props.autorizacionFormFail(false);
	};

	onSubmit = formValues => {
		if (formValues.flag === 'create') {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de guardar la siguiente sucursal en la Base de Datos?')) {
				api.post('/Sucursales/create.php', formValues).then(response => {
					if (response.data.flag !== 0) {
						alert(response.data.message);
					} else {
						this.props.fetchSucursal();
						this.props.autorizacionFormFail(true);
						this.props.sidebarStateFalse();
					}
				});
			} else {
				return this.props.autorizacionFormFail(false);
			}
		} else {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de actualizar el siguiente dato de la tabla Empresa?')) {
				api.put('/Sucursales/update.php', formValues).then(
					data => this.props.fetchSucursal(),
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
			IdSucursal: check.id,
			Estado: `${check.state}`,
		};
		const messageState = check.state === true ? 'Disponible' : 'Inactivo';
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Esta seguro de cambiar el estado a ${messageState}`)) {
			api.put('/Sucursales/updateState.php', updateState).then(data => {
				if (data.data.message) {
					this.props.fetchSucursal();
					this.props.sidebarStateFalse();
				}
			});
		} else {
			return;
		}
	};

	frmTableSucursal = () => {
		const frmSucursal = [];
		if (this.props.getDataBodyId === undefined) {
			frmSucursal.push(
				<FrmSucursal
					key="frmSucursal"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdSucursal',
						'Nombre',
						'Direccion',
						'Telefono',
						'Estado'
					)}
					createData={true}
					formResponse={this.props.getFormResponse}
				/>
			);
		} else {
			frmSucursal.push(
				<FrmSucursal
					key="frmSucursal"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdSucursal',
						'Nombre',
						'Direccion',
						'Telefono',
						'Estado'
					)}
					createData={false}
					formResponse={this.props.getFormResponse}
				/>
			);
		}
		return frmSucursal;
	};

	render() {
		const arr = [];
		if (this.props.dataSucursal && permisosVerSucursales()) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataSucursal}
					ejemplo={this.datosTabla()}
					getIDtable={this.getIDtable}
					key="IdSucursal"
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
						Sucursales
					</h1>

					<SideBarMenu
						content={arr}
						SideBarVisible={this.props.stateSideBarMenu}
						headSide={this.props.getDataId ? this.props.getDataId : undefined}
						bodySide={this.props.getDataBodyId ? this.props.getDataBodyId : undefined}
						saveButton={this.getDataTable}
						frmTable={this.frmTableSucursal()}
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
						ruta={'/Sucursales/readAllPDF.php'}
						titulo={'Sucursales'}
						csv={'/Sucursales/readAllCSV.php'}
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
		dataSucursal: dataSucursal(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getFormResponse: getFormResponse(state, props),
	};
}

export const actions = {
	fetchSucursal,
	sidebarState,
	sidebarStateFalse,
	idSelectedSucursal,
	creacionRegistro,
	autorizacionFormFail,
};

Sucursales.propTypes = {
	fetchSucursal: PropTypes.func,
	dataSucursal: PropTypes.array,
	getDataId: PropTypes.array,
	getDataBodyId: PropTypes.object,
	sidebarState: PropTypes.func,
	stateSideBarMenu: PropTypes.bool,
	idSelectedSucursal: PropTypes.func,
	creacionRegistro: PropTypes.func,
};

export default connect(
	mapStateToProps,
	actions
)(Sucursales);
