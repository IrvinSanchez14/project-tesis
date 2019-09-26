import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Print from '../../components/Print/';
import api from '../../api';

import TableData from '../../components/TableData';
import SideBarMenu from '../../components/SideBar';
import { sidebarStateFalse } from '../App/actions';
import FrmEmpresa from '../../components/Forms/frmEmpresa';
import { ErrorTabla } from '../../components/Error';

import { fetchEmpresa, idSelectedEmpresa, creacionRegistro, autorizacionFormFail } from './actions';
import { dataEmpresa, getDataId, getDataBodyId, getFormResponse } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';

import { permisosVerEmpresa } from '../../helpers/permisos';

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

class Empresa extends React.Component {
	componentDidMount() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo === null) {
			this.props.history.push('/');
		}
		this.props.fetchEmpresa();
	}

	headTable = () => {
		let headTable = [
			{ label: 'ID', field: 'IdEmpresa' },
			{ label: 'Nombre', field: 'Nombre' },
			{ label: 'Razon Social', field: 'Razon_Social' },
			{ label: 'Dirección', field: 'Direccion' },
			{ label: 'Telefono', field: 'Telefono' },
			{ label: 'Correo Electronico', field: 'Correo' },
			{ label: 'Estado', field: 'Estado' },
			{ label: 'Fecha de Creación', field: 'FechaCreacion' },
		];
		return headTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedEmpresa(id);
		this.props.autorizacionFormFail(false);
	};

	getDataTable = () => {
		return this.props.fetchEmpresa();
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
				api.post('/Empresas/create.php', formValues).then(response => {
					if (response.data.flag !== 0) {
						alert(response.data.message);
					} else {
						this.props.fetchEmpresa();
						this.props.autorizacionFormFail(true);
						this.props.sidebarStateFalse();
					}
				});
			} else {
				return;
			}
		} else {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de actualizar el siguiente dato de la tabla Empresa?')) {
				api.put('/Empresas/update.php', formValues).then(
					data => this.props.fetchEmpresa(),
					this.props.autorizacionFormFail(true),
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
			api.put('/Empresas/updateState.php', updateState).then(data => {
				if (data.data.message) {
					this.props.fetchEmpresa();
					this.props.sidebarStateFalse();
				}
			});
		} else {
			return;
		}
	};

	frmTableEmpresa = () => {
		const frmEmpresa = [];
		if (this.props.getDataBodyId === undefined) {
			frmEmpresa.push(
				<FrmEmpresa
					key="frmEmpresa"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdEmpresa',
						'Nombre',
						'Razon_Social',
						'Direccion',
						'Telefono',
						'Correo',
						'Estado'
					)}
					createData={true}
					formResponse={this.props.getFormResponse}
				/>
			);
		} else {
			frmEmpresa.push(
				<FrmEmpresa
					key="frmEmpresa"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdEmpresa',
						'Nombre',
						'Razon_Social',
						'Direccion',
						'Telefono',
						'Correo',
						'Estado'
					)}
					createData={false}
					formResponse={this.props.getFormResponse}
				/>
			);
		}
		return frmEmpresa;
	};

	render() {
		const arr = [];
		if (this.props.dataEmpresa && permisosVerEmpresa()) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataEmpresa}
					getIDtable={this.getIDtable}
					key="IdEmpresa"
				/>
			);
			return (
				<div>
					<div style={styles.divHeader}>
						<div style={styles.divTitle}>
							<h1>Empresas</h1>
						</div>
						<div style={styles.divAdd}>
							<Fab color="primary" aria-label="Add" onClick={this.crearRegistro}>
								<AddIcon />
							</Fab>
						</div>
						<div>
							<Print
								ruta={'/Empresas/readAllPDF.php'}
								titulo={'Empresas'}
								csv={'/Empresas/readAllCSV.php'}
							/>
						</div>
					</div>

					<SideBarMenu
						content={arr}
						SideBarVisible={this.props.stateSideBarMenu}
						headSide={this.props.getDataId ? this.props.getDataId : undefined}
						bodySide={this.props.getDataBodyId ? this.props.getDataBodyId : undefined}
						saveButton={this.getDataTable}
						frmTable={this.frmTableEmpresa()}
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
		dataEmpresa: dataEmpresa(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
		getFormResponse: getFormResponse(state, props),
	};
}

export const actions = {
	fetchEmpresa,
	sidebarState,
	idSelectedEmpresa,
	sidebarStateFalse,
	creacionRegistro,
	autorizacionFormFail,
};

Empresa.propTypes = {
	fetchEmpresa: PropTypes.func,
	dataEmpresa: PropTypes.array,
	sidebarState: PropTypes.func,
	idSelectedEmpresa: PropTypes.func,
	stateSideBarMenu: PropTypes.bool,
	getDataId: PropTypes.array,
	getDataBodyId: PropTypes.object,
	setTipoUsuarioData: PropTypes.object,
	creacionRegistro: PropTypes.func,
};

export default connect(
	mapStateToProps,
	actions
)(Empresa);
