import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TableData from '../../components/TableData';
import SideBarMenu from '../../components/SideBar';

import { fetchTipoUsuario, idSelectedTipoUsuario, setTipoUsuarioData } from './actions';
import { dataTipoUsuario, getDataId, getDataBodyId } from './selectors';

import { sidebarState } from '../App/actions';
import { stateSideBarMenu } from '../App/selectors';

class TipoUsuario extends React.Component {
	componentDidMount() {
		this.props.fetchTipoUsuario();
		this.getDataTable();
	}

	headTable = () => {
		let headTable;
		this.props.dataTipoUsuario.map(tipoUsuario => {
			headTable = Object.keys(tipoUsuario);
			return tipoUsuario;
		});
		return headTable;
	};

	datosTabla = () => {
		const dataTable = [];
		this.props.dataTipoUsuario.map(tipoUsuario => {
			dataTable.push({
				0: tipoUsuario.IdTipoUsuario,
				1: tipoUsuario.Nombre,
				2: tipoUsuario.Descripcion,
				3: tipoUsuario.Estado,
			});
			return tipoUsuario;
		});
		return dataTable;
	};

	getIDtable = id => {
		this.props.sidebarState();
		this.props.idSelectedTipoUsuario(id);
	};

	getDataTable = () => {
		return console.log('click', this.props.fetchTipoUsuario());
	};

	render() {
		const arr = [];
		if (this.props.dataTipoUsuario) {
			arr.push(
				<TableData
					header={this.headTable()}
					dataTable={this.props.dataTipoUsuario}
					ejemplo={this.datosTabla()}
					getIDtable={this.getIDtable}
					key="idTableTipoUsuario"
				/>
			);
			return (
				<div>
					<h1>tabla</h1>
					<button onClick={this.getDataTable}>GET</button>
					<SideBarMenu
						content={arr}
						SideBarVisible={this.props.stateSideBarMenu}
						headSide={this.props.getDataId ? this.props.getDataId : undefined}
						bodySide={this.props.getDataBodyId ? this.props.getDataBodyId : undefined}
						saveButton={this.getDataTable}
					/>
				</div>
			);
		}
		return null;
	}
}

export function mapStateToProps(state, props) {
	return {
		dataTipoUsuario: dataTipoUsuario(state, props),
		stateSideBarMenu: stateSideBarMenu(state, props),
		getDataId: getDataId(state, props),
		getDataBodyId: getDataBodyId(state, props),
		setTipoUsuarioData: setTipoUsuarioData(state, props),
	};
}

export const actions = {
	fetchTipoUsuario,
	sidebarState,
	idSelectedTipoUsuario,
};

TipoUsuario.propTypes = {
	fetchTipoUsuario: PropTypes.func,
	dataTipoUsuario: PropTypes.array,
	sidebarState: PropTypes.func,
	idSelectedTipoUsuario: PropTypes.func,
	stateSideBarMenu: PropTypes.bool,
	getDataId: PropTypes.array,
	getDataBodyId: PropTypes.array,
	setTipoUsuarioData: PropTypes.object,
};

export default connect(
	mapStateToProps,
	actions
)(TipoUsuario);
