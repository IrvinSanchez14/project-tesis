import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import TableData from '../../components/TableData';
import SideBarMenu from '../../components/SideBar';
import { sidebarStateFalse } from '../App/actions';
import FrmEmpresa from '../../components/Forms/frmEmpresa';
import api from '../../api';

import { fetchEmpresa, idSelectedEmpresa } from './actions';
import { dataEmpresa, getDataId, getDataBodyId } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';

const auth = false;

class Empresa extends React.Component {
	componentDidMount() {
		if (auth) {
			this.props.history.push('/');
		}
		this.props.fetchEmpresa();
		console.log(this.props);
	}

	headTable = () => {
		let headTable;
		this.props.dataEmpresa.map(empresa => {
			headTable = Object.keys(empresa);
			return empresa;
		});
		return headTable;
	};

	datosTabla = () => {
		const dataTable = [];
		this.props.dataEmpresa.map(empresa => {
			dataTable.push({
				0: empresa.IdEmpresa,
				1: empresa.Nombre,
				2: empresa.Razon_Social,
				3: empresa.Direccion,
				4: empresa.Telefono,
				5: empresa.Correo,
				6: empresa.Estado === '0' ? 'Disponible' : 'Inactivo',
				7: empresa.FechaCreacion,
			});
			return empresa;
		});
		return dataTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedEmpresa(id);
	};

	getDataTable = () => {
		return this.props.fetchEmpresa();
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
						'Estado'
					)}
					createData={true}
				/>
			);
		} else {
			frmEmpresa.push(
				<FrmEmpresa
					key="frmEmpresa"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdTipoUsuario',
						'Nombre',
						'Razon_Social',
						'Estado'
					)}
					createData={false}
				/>
			);
		}
		return frmEmpresa;
	};

	render() {
		const arr = [];
		if (this.props.dataEmpresa) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataEmpresa}
					ejemplo={this.datosTabla()}
					getIDtable={this.getIDtable}
					key="IdEmpresa"
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
						Tipo de Usuario
					</h1>

					<SideBarMenu
						content={arr}
						SideBarVisible={this.props.stateSideBarMenu}
						headSide={this.props.getDataId ? this.props.getDataId : undefined}
						bodySide={this.props.getDataBodyId ? this.props.getDataBodyId : undefined}
						saveButton={this.getDataTable}
						frmTable={this.frmTableEmpresa()}
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
		dataEmpresa: dataEmpresa(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
	};
}

export const actions = {
	fetchEmpresa,
	sidebarState,
	idSelectedEmpresa,
	sidebarStateFalse,
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
};

export default connect(
	mapStateToProps,
	actions
)(Empresa);
