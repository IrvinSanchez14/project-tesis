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
import FrmEstados from '../../components/Forms/frmEstados';

import { fetchEstados, idSelectedEstados, creacionRegistro } from './actions';
import { dataEstados, getDataId, getDataBodyId } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';

class Estados extends React.Component {
	componentDidMount() {
		//this.props.history.push('/');
		this.props.fetchEstados();
	}

	headTable = () => {
		let headTable;
		this.props.dataEstados.map(empresa => {
			headTable = Object.keys(empresa);
			return empresa;
		});
		return headTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedEstados(id);
	};

	getDataTable = () => {
		return this.props.fetchEstados();
	};

	crearRegistro = () => {
		this.props.creacionRegistro();
		this.props.sidebarState();
	};

	onSubmit = formValues => {
		if (formValues.flag === 'create') {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de guardar la siguiente Empresa en la Base de Datos?')) {
				api.post('/Estado/create.php', formValues).then(
					data => this.props.fetchEstados(),
					this.props.sidebarStateFalse()
				);
			} else {
				return;
			}
		} else {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de actualizar el siguiente dato de la tabla Empresa?')) {
				api.put('/Estado/update.php', formValues).then(
					data => this.props.fetchEstados(),
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
			api.put('/Estado/updateState.php', updateState).then(data => {
				if (data.data.message) {
					this.props.fetchEstados();
					this.props.sidebarStateFalse();
				}
			});
		} else {
			return;
		}
	};

	frmTableEstados = () => {
		const frmEstados = [];
		if (this.props.getDataBodyId === undefined) {
			frmEstados.push(
				<FrmEstados
					key="frmEstados"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdEstado',
						'Nombre',
						'Descripcion',
						'IdEstadoAnterior',
						'IdEstadoSiguiente'
					)}
					createData={true}
				/>
			);
		} else {
			frmEstados.push(
				<FrmEstados
					key="frmEstados"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdEstado',
						'Nombre',
						'Descripcion',
						'IdEstadoAnterior',
						'IdEstadoSiguiente'
					)}
					createData={false}
				/>
			);
		}
		return frmEstados;
	};

	render() {
		const arr = [];
		if (this.props.dataEstados) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataEstados}
					getIDtable={this.getIDtable}
					key="IdEstados"
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
						frmTable={this.frmTableEstados()}
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
		dataEstados: dataEstados(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
	};
}

export const actions = {
	fetchEstados,
	sidebarState,
	idSelectedEstados,
	sidebarStateFalse,
	creacionRegistro,
};

Estados.propTypes = {
	fetchEstados: PropTypes.func,
	dataEstados: PropTypes.array,
	sidebarState: PropTypes.func,
	idSelectedEstados: PropTypes.func,
	stateSideBarMenu: PropTypes.bool,
	getDataId: PropTypes.array,
	getDataBodyId: PropTypes.object,
	setTipoUsuarioData: PropTypes.object,
	creacionRegistro: PropTypes.func,
};

export default connect(
	mapStateToProps,
	actions
)(Estados);
