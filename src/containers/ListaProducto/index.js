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
import FrmListadoProducto from '../../components/Forms/frmListadoProducto';
import { ErrorTabla } from '../../components/Error';

import {
	fetchListadoProductos,
	fetchLecturaProducto,
	idSelectedListadoProductos,
	creacionRegistro,
	autorizacionFormFail,
} from './actions';
import { dataLecturaProducto, getDataId, getDataBodyId, getFormResponse, listaPProducto } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';
import { fetchProducto } from '../Productos/actions';
import { fetchPorciones } from '../Porciones/actions';

class ListaProducto extends React.Component {
	componentDidMount() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo === null) {
			this.props.history.push('/');
		}
		this.props.fetchProducto();
		this.props.fetchPorciones();
		this.props.fetchLecturaProducto();
		//this.props.fetchListadoProductos();
	}

	headTable = () => {
		let headTable = [
			{ label: 'ID', field: 'IdEmpresa' },
			{ label: 'Nombre', field: 'NombreProducto' },
			{ label: 'Porcion', field: 'Porcion' },
			{ label: 'Estado', field: 'estadoTexto' },
		];
		return headTable;
	};

	datosTabla = () => {
		const dataTable = [];
		this.props.dataLecturaProducto.map(producto => {
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
		this.props.idSelectedListadoProductos(id);
		this.props.autorizacionFormFail(false);
	};

	getDataTable = () => {
		return this.props.fetchLecturaProducto();
	};

	crearRegistro = () => {
		this.props.creacionRegistro();
		this.props.sidebarState();
		this.props.autorizacionFormFail(false);
	};

	onSubmit = formValues => {
		if (formValues.flag === 'create') {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de guardar la siguiente lista de producto en la Base de Datos?')) {
				api.post('/ProductoPorcion/create.php', formValues).then(
					data => this.props.fetchLecturaProducto(),
					this.props.autorizacionFormFail(true),
					this.props.sidebarStateFalse()
				);
			} else {
				return this.props.autorizacionFormFail(false);
			}
		} else {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de actualizar el siguiente dato de la tabla Empresa?')) {
				api.put('/ProductoPorcion/update.php', formValues).then(
					data => this.props.fetchLecturaProducto(),
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
					this.props.fetchLecturaProducto();
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
				<FrmListadoProducto
					key="IdPorcion"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdListaPP',
						'NombreProducto',
						'Porcion'
					)}
					createData={true}
					formResponse={this.props.getFormResponse}
				/>
			);
		} else {
			frmProducto.push(
				<FrmListadoProducto
					key="IdPorcion"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdListaPP',
						'NombreProducto',
						'Porcion'
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
		if (this.props.dataLecturaProducto) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataLecturaProducto}
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
						Lista de Productos y sus Porciones
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
		dataLecturaProducto: dataLecturaProducto(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
		getFormResponse: getFormResponse(state, props),
		listaPProducto: listaPProducto(state, props),
	};
}

export const actions = {
	fetchListadoProductos,
	sidebarState,
	idSelectedListadoProductos,
	sidebarStateFalse,
	creacionRegistro,
	autorizacionFormFail,
	fetchProducto,
	fetchPorciones,
	fetchLecturaProducto,
};

ListaProducto.propTypes = {
	fetchListadoProductos: PropTypes.func,
	dataLecturaProducto: PropTypes.array,
	sidebarState: PropTypes.func,
	idSelectedListadoProductos: PropTypes.func,
	stateSideBarMenu: PropTypes.bool,
	getDataId: PropTypes.array,
	getDataBodyId: PropTypes.object,
	setTipoUsuarioData: PropTypes.object,
	creacionRegistro: PropTypes.func,
};

export default connect(
	mapStateToProps,
	actions
)(ListaProducto);
