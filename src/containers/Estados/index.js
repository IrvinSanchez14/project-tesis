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
import { ErrorTabla } from '../../components/Error';

import { fetchEstados, idSelectedEstados, creacionRegistro, autorizacionFormFail } from './actions';
import { dataEstados, getDataId, getDataBodyId, getFormResponse } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';

import { permisosVerEstados } from '../../helpers/permisos';

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

class Estados extends React.Component {
	componentDidMount() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo === null) {
			this.props.history.push('/');
		}
		this.props.fetchEstados();
	}

	headTable = () => {
		let headTable = [
			{ label: 'ID', field: 'IdEstado' },
			{ label: 'Nombre', field: 'Nombre' },
			{ label: 'Descripción', field: 'Descripcion' },
			{ label: 'Estado', field: 'Estado' },
			{ label: 'Fecha de Creación', field: 'FechaCreacion' },
		];
		return headTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedEstados(id);
		this.props.autorizacionFormFail(false);
	};

	getDataTable = () => {
		return this.props.fetchEstados();
	};

	crearRegistro = () => {
		this.props.creacionRegistro();
		this.props.sidebarState();
		this.props.autorizacionFormFail(false);
	};

	onSubmit = formValues => {
		if (formValues.flag === 'create') {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de guardar el siguiente estado en la Base de Datos?')) {
				api.post('/Estado/create.php', formValues).then(response => {
					if (response.data.flag !== 0) {
						alert(response.data.message);
					} else {
						this.props.fetchEstados();
						this.props.autorizacionFormFail(true);
						this.props.sidebarStateFalse();
					}
				});
			} else {
				return this.props.autorizacionFormFail(false);
			}
		} else {
			// eslint-disable-next-line no-restricted-globals
			if (confirm('Esta seguro de actualizar el siguiente dato de la tabla Estados?')) {
				api.put('/Estado/update.php', formValues).then(
					data => this.props.fetchEstados(),
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
			IdEstado: check.id,
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
						'Estado'
					)}
					createData={true}
					formResponse={this.props.getFormResponse}
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
						'Estado'
					)}
					createData={false}
					formResponse={this.props.getFormResponse}
				/>
			);
		}
		return frmEstados;
	};

	render() {
		const arr = [];
		if (this.props.dataEstados && permisosVerEstados()) {
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
					<div style={styles.divHeader}>
						<div style={styles.divTitle}>
							<h1>Estados del Sistema</h1>
						</div>
						<div style={styles.divAdd}>
							<Fab color="primary" aria-label="Add" onClick={this.crearRegistro}>
								<AddIcon />
							</Fab>
						</div>
						<div />
					</div>

					<SideBarMenu
						content={arr}
						SideBarVisible={this.props.stateSideBarMenu}
						headSide={this.props.getDataId ? this.props.getDataId : undefined}
						bodySide={this.props.getDataBodyId ? this.props.getDataBodyId : undefined}
						saveButton={this.getDataTable}
						frmTable={this.frmTableEstados()}
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
		dataEstados: dataEstados(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
		getFormResponse: getFormResponse(state, props),
	};
}

export const actions = {
	fetchEstados,
	sidebarState,
	idSelectedEstados,
	sidebarStateFalse,
	creacionRegistro,
	autorizacionFormFail,
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
