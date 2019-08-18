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
import FrmPorcion from '../../components/Forms/frmPorciones';
import { ErrorTabla } from '../../components/Error';

import { fetchPorciones, idSelectedPorciones, creacionRegistro, autorizacionFormFail } from './actions';
import { dataPorciones, getDataId, getDataBodyId, getFormResponse } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';
import { fetchUnidadMedida } from '../UnidadMedida/actions';
import { Print } from 'material-ui-icons';

class Porciones extends React.Component {
	componentDidMount() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo === null) {
			this.props.history.push('/');
		}
		this.props.fetchPorciones();
		this.props.fetchUnidadMedida();
	}

	headTable = () => {
		let headTable;
		this.props.dataPorciones.map(producto => {
			headTable = Object.keys(producto);
			return producto;
		});
		return headTable;
	};

	datosTabla = () => {
		const dataTable = [];
		this.props.dataPorciones.map(producto => {
			dataTable.push({
				0: producto.IdProducto,
				1: producto.Nombre,
				2: producto.Descripcion,
			});
			return producto;
		});
		return dataTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedPorciones(id);
		this.props.autorizacionFormFail(false);
	};

	getDataTable = () => {
		return this.props.fetchPorciones();
	};

	crearRegistro = () => {
		this.props.creacionRegistro();
		this.props.sidebarState();
		this.props.autorizacionFormFail(false);
	};

	onSubmit = formValues => {
		if (formValues.flag === 'create') {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de guardar la siguiente porcion en la Base de Datos?')) {
				api.post('/Porcion/create.php', formValues).then(
					data => this.props.fetchPorciones(),
					this.props.autorizacionFormFail(true),
					this.props.sidebarStateFalse()
				);
			} else {
				return this.props.autorizacionFormFail(false);
			}
		} else {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de actualizar el siguiente dato de la tabla Empresa?')) {
				api.put('/Porcion/update.php', formValues).then(
					data => this.props.fetchPorciones(),
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
			IdProducto: check.id,
			Estado: `${check.state}`,
		};
		const messageState = check.state === true ? 'Disponible' : 'Inactivo';
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Esta seguro de cambiar el estado a ${messageState}`)) {
			api.put('/Producto/updateState.php', updateState).then(data => {
				if (data.data.message) {
					this.props.fetchPorciones();
					this.props.sidebarStateFalse();
				}
			});
		} else {
			return;
		}
	};

	frmTablePorcion = () => {
		const frmProducto = [];
		if (this.props.getDataBodyId === undefined) {
			frmProducto.push(
				<FrmPorcion
					key="IdPorcion"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdPorcion',
						'Cantidad',
						'UnidadMedida'
					)}
					createData={true}
					formResponse={this.props.getFormResponse}
				/>
			);
		} else {
			frmProducto.push(
				<FrmPorcion
					key="IdPorcion"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdPorcion',
						'Cantidad',
						'UnidadMedida'
					)}
					createData={false}
					formResponse={this.props.getFormResponse}
				/>
			);
		}
		return frmProducto;
	};

	render() {
		const arr = [];
		if (this.props.dataPorciones) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataPorciones}
					ejemplo={this.datosTabla()}
					getIDtable={this.getIDtable}
					key="IdProducto"
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
						Porciones
					</h1>

					<SideBarMenu
						content={arr}
						SideBarVisible={this.props.stateSideBarMenu}
						headSide={this.props.getDataId ? this.props.getDataId : undefined}
						bodySide={this.props.getDataBodyId ? this.props.getDataBodyId : undefined}
						saveButton={this.getDataTable}
						frmTable={this.frmTablePorcion()}
						onClick={this.onChangeStateButton}
					/>
					<Fab
						style={{
							right: '16px',
							bottom: '82%',
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
		dataPorciones: dataPorciones(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
		getFormResponse: getFormResponse(state, props),
	};
}

export const actions = {
	fetchPorciones,
	sidebarState,
	idSelectedPorciones,
	sidebarStateFalse,
	creacionRegistro,
	autorizacionFormFail,
	fetchUnidadMedida,
};

Porciones.propTypes = {
	fetchPorciones: PropTypes.func,
	dataPorciones: PropTypes.array,
	sidebarState: PropTypes.func,
	idSelectedPorciones: PropTypes.func,
	stateSideBarMenu: PropTypes.bool,
	getDataId: PropTypes.array,
	getDataBodyId: PropTypes.object,
	setTipoUsuarioData: PropTypes.object,
	creacionRegistro: PropTypes.func,
};

export default connect(
	mapStateToProps,
	actions
)(Porciones);
