import React from 'react';
import { fromJS } from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import api from '../../api';

import { getFormResponse } from '../../containers/Empresa/selectors';
import { dataPermiso } from '../../containers/Permisos/selectors';
import {
	getPermisosUsuario,
	getIdPermisosUsuarios,
	permisosDisponibles,
} from '../../containers/PermisosUsuarios/selectors';
import { fetchUsuarioPermiso } from '../../containers/PermisosUsuarios/actions';
import './estilos.css';

class FrmPermisosUsuarios extends React.Component {
	componentDidUpdate() {
		if (this.props.getPermisosUsuario) {
		}
	}

	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	prueba = () => {
		const informacion = this.props.initialValues.toJS();

		return this.props.fetchUsuarioPermiso(informacion.IdUsuario);
	};

	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input style={{ backgroundColor: 'ghostwhite' }} {...input} autoComplete="off" readOnly="readonly" />
				{this.renderError(meta)}
			</div>
		);
	};

	renderTextArea = ({ input, meta: { touched, error, warning } }) => (
		<div>
			<label>Permisos Asignados</label>
			<div>
				<textarea {...input} placeholder="lista de permisos" rows="10" cols="40" />
				{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
			</div>
		</div>
	);

	renderSelect = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<select {...input}>
					<option />
					{this.props.permisosDisponibles
						? this.props.permisosDisponibles.map(permiso => {
								return (
									<option key={permiso.IdPermiso} value={permiso.IdPermiso}>
										{permiso.Nombre}
									</option>
								);
						  })
						: null}
				</select>
				{this.renderError(meta)}
			</div>
		);
	};

	validateClean = () => {
		const { reset } = this.props;
		reset();
	};

	onSubmit = formValues => {
		let data;
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		data = fromJS({
			UsuarioCreador: userInfo.IdUsuario,
		});

		const newData = formValues.mergeDeep(data);
		api.post('/permisoUsuario/create.php', newData).then(data => {
			this.prueba();
			this.validateClean();
		});
	};

	deleteUsuarioPermido = id => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Esta seguro de Eliminar el siguiente permiso?')) {
			api.post('/permisoUsuario/delete.php', { IdPermisosusuario: id }).then(data => {
				this.prueba();
			});
		} else {
			return;
		}
	};

	render() {
		const renderLista = ({ input, label, meta }) => {
			const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
			return (
				<div className={className}>
					<label>{label}</label>
					<ol style={{ color: 'black' }}>
						{this.props.getPermisosUsuario ? (
							this.props.getPermisosUsuario
								.sort(function(a, b) {
									return a.IdPermiso - b.IdPermiso;
								})
								.map(registro => {
									return (
										<li
											key={registro.IdPermiso}
											onClick={() => this.deleteUsuarioPermido(registro.IdPermisosusuario)}
										>
											{registro.Nombre}
										</li>
									);
								})
						) : (
							<p>No Hay Registro</p>
						)}
					</ol>
				</div>
			);
		};
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="NombreUsuario" component={this.renderInput} label="Usuario" />
				<Field name="NombreTipo" component={this.renderInput} label="TipoUsuario" />
				<Field name="IdPermiso" component={this.renderSelect} label="lista de permisos" />
				<Field name="Lista" component={renderLista} label="Lista de permisos asignados al Usuario" />
				<div
					style={{
						bottom: '0',
						width: '100%',
						height: '60px',
					}}
				>
					<button className="ui buttonGuardar">Agregar</button>
				</div>
			</form>
		);
	}
}

export function mapStateToProps(state, props) {
	return {
		getFormResponse: getFormResponse(state, props),
		dataPermiso: dataPermiso(state, props),
		getPermisosUsuario: getPermisosUsuario(state, props),
		getIdPermisosUsuarios: getIdPermisosUsuarios(state, props),
		permisosDisponibles: permisosDisponibles(state, props),
	};
}

export const actions = {
	fetchUsuarioPermiso,
};

export default connect(
	mapStateToProps,
	actions
)(
	reduxForm({
		form: 'formPermisosUsuarios',
		enableReinitialize: true,
	})(FrmPermisosUsuarios)
);
