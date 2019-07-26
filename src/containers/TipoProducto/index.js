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
import FrmTipoProducto from '../../components/Forms/frmTipoProducto';

import { fetchTipoProducto, idSelectedTipoProducto, creacionRegistro } from './actions';
import { dataTipoProducto, getDataId, getDataBodyId } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';

class TipoProducto extends React.Component {
	componentDidMount() {
		//this.props.history.push('/');
		this.props.fetchTipoProducto();
	}

	headTable = () => {
		let headTable;
		this.props.dataTipoProducto.map(empresa => {
			headTable = Object.keys(empresa);
			return empresa;
		});
		return headTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedTipoProducto(id);
	};

	getDataTable = () => {
		return this.props.fetchTipoProducto();
	};

	crearRegistro = () => {
		this.props.creacionRegistro();
		this.props.sidebarState();
	};

	onSubmit = formValues => {
		if (formValues.flag === 'create') {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de guardar la siguiente Empresa en la Base de Datos?')) {
				api.post('/TipoProducto/create.php', formValues).then(
					data => this.props.fetchTipoProducto(),
					this.props.sidebarStateFalse()
				);
			} else {
				return;
			}
		} else {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de actualizar el siguiente dato de la tabla Empresa?')) {
				api.put('/TipoProducto/update.php', formValues).then(
					data => this.props.fetchTipoProducto(),
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
			api.put('/TipoProducto/updateState.php', updateState).then(data => {
				if (data.data.message) {
					this.props.fetchTipoProducto();
					this.props.sidebarStateFalse();
				}
			});
		} else {
			return;
		}
	};

	frmTableEmpresa = () => {
		const frmTipoProducto = [];
		if (this.props.getDataBodyId === undefined) {
			frmTipoProducto.push(
				<FrmTipoProducto
					key="frmEmpresa"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdTipoProducto',
						'Nombre',
						'Descripcion',
						'FechaCreacion',
						'Estado'
					)}
					createData={true}
				/>
			);
		} else {
			frmTipoProducto.push(
				<FrmTipoProducto
					key="frmEmpresa"
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.getDataBodyId ? this.props.getDataBodyId : undefined,
						'IdTipoProducto',
						'Nombre',
						'Descripcion',
						'FechaCreacion',
						'Estado'
					)}
					createData={false}
				/>
			);
		}
		return frmTipoProducto;
	};

	render() {
		const arr = [];
		if (this.props.dataTipoProducto) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataTipoProducto}
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
						Tipo de Producto
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
		dataTipoProducto: dataTipoProducto(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
	};
}

export const actions = {
	fetchTipoProducto,
	sidebarState,
	idSelectedTipoProducto,
	sidebarStateFalse,
	creacionRegistro,
};

TipoProducto.propTypes = {
	fetchTipoProducto: PropTypes.func,
	dataTipoProducto: PropTypes.array,
	sidebarState: PropTypes.func,
	idSelectedTipoProducto: PropTypes.func,
	stateSideBarMenu: PropTypes.bool,
	getDataId: PropTypes.array,
	getDataBodyId: PropTypes.object,
	setTipoUsuarioData: PropTypes.object,
	creacionRegistro: PropTypes.func,
};

export default connect(
	mapStateToProps,
	actions
)(TipoProducto);
