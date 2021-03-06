import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import api from '../../api';

import Print from '../../components/Print/';
import TableData from '../../components/TableData';
import SideBarMenu from '../../components/SideBar';
import { sidebarStateFalse } from '../App/actions';
import FrmTipoProducto from '../../components/Forms/frmTipoProducto';
import { ErrorTabla } from '../../components/Error';

import { fetchTipoProducto, idSelectedTipoProducto, creacionRegistro, autorizacionFormFail } from './actions';
import { dataTipoProducto, getDataId, getDataBodyId, getFormResponse } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';

import { permisosVerTipoProducto } from '../../helpers/permisos';

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

class TipoProducto extends React.Component {
	componentDidMount() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo === null) {
			this.props.history.push('/');
		}
		this.props.fetchTipoProducto();
	}

	headTable = () => {
		let headTable = [
			{ label: 'ID', field: 'IdTipoProducto' },
			{ label: 'Nombre', field: 'Nombre' },
			{ label: 'Descripcion', field: 'Descripcion' },
			{ label: 'Estado', field: 'Estado' },
			{ label: 'Fecha de Creación', field: 'FechaCreacion' },
		];
		return headTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedTipoProducto(id);
		this.props.autorizacionFormFail(false);
	};

	getDataTable = () => {
		return this.props.fetchTipoProducto();
	};

	crearRegistro = () => {
		this.props.creacionRegistro();
		this.props.sidebarState();
		this.props.autorizacionFormFail(false);
	};

	onSubmit = formValues => {
		if (formValues.flag === 'create') {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de guardar el siguiente tipo producto en la Base de Datos?')) {
				api.post('/TipoProducto/create.php', formValues).then(response => {
					if (response.data.flag !== 0) {
						alert(response.data.message);
					} else {
						this.props.fetchTipoProducto();
						this.props.autorizacionFormFail(true);
						this.props.sidebarStateFalse();
					}
				});
			} else {
				return this.props.autorizacionFormFail(false);
			}
		} else {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de actualizar el siguiente dato de la tabla tipo de productos?')) {
				api.put('/TipoProducto/update.php', formValues).then(
					data => this.props.fetchTipoProducto(),
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
			IdTipoProducto: check.id,
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
					formResponse={this.props.getFormResponse}
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
					formResponse={this.props.getFormResponse}
				/>
			);
		}
		return frmTipoProducto;
	};

	render() {
		const arr = [];
		if (this.props.dataTipoProducto && permisosVerTipoProducto()) {
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
					<div style={styles.divHeader}>
						<div style={styles.divTitle}>
							<h1> Tipos de Productos</h1>
						</div>
						<div style={styles.divAdd}>
							<Fab color="primary" aria-label="Add" onClick={this.crearRegistro}>
								<AddIcon />
							</Fab>
						</div>
						<div>
							<Print
								ruta={'/TipoProducto/readAllPDF.php'}
								titulo={'Tipo_Producto'}
								csv={'/TipoProducto/readAllCSV.php'}
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
		dataTipoProducto: dataTipoProducto(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
		getFormResponse: getFormResponse(state, props),
	};
}

export const actions = {
	fetchTipoProducto,
	sidebarState,
	idSelectedTipoProducto,
	sidebarStateFalse,
	creacionRegistro,
	autorizacionFormFail,
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
