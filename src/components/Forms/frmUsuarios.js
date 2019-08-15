import React from 'react';
import { fromJS } from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

import { getFormResponse } from '../../containers/TipoUsuario/selectors';

const validate = values => {
	// IMPORTANT: values is an Immutable.Map here!
	const errors = {};
	if (!values.get('IdTipoUsuario')) {
		errors.IdTipoUsuario = 'Required';
	}
	if (!values.get('Nombre')) {
		errors.Nombre = 'Required';
	} else if (values.get('Nombre').length > 20) {
		errors.IdTipoUsuario = 'Must be 20 characters or less';
	}
	if (!values.get('Descripcion')) {
		errors.Descripcion = 'Required';
	}
	return errors;
};

class FrmUsuario extends React.Component {
	state = { sucursal: 0 };
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta: { touched, error, warning } }) => {
		const className = `field ${error && touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{touched && (error && <span style={{ color: 'red' }}>{error}</span>)}
			</div>
		);
	};

	renderSucursal = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<select {...input}>
					{this.props.createData ? <option /> : null}
					{this.props.listaTipos
						? this.props.listaTipos.map(permiso => {
								return (
									<option key={permiso.IdTipoUsuario} value={permiso.IdTipoUsuario}>
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

	renderPassw = ({ input, label, meta: { touched, error, warning } }) => {
		const className = `field ${error && touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" type="password" />
				{touched && (error && <span style={{ color: 'red' }}>{error}</span>)}
			</div>
		);
	};

	renderSelect = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<select {...input}>
					{this.props.createData ? <option /> : null}
					{this.props.listaTipos
						? this.props.listaTipos.map(permiso => {
								return (
									<option key={permiso.IdTipoUsuario} value={permiso.IdTipoUsuario}>
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

	onSubmit = formValues => {
		let data;
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (this.props.createData) {
			data = fromJS({
				flag: 'create',
				UsuarioCreador: userInfo.IdUsuario,
			});
		} else {
			data = fromJS({
				flag: 'update',
				UsuarioActualiza: userInfo.IdUsuario,
			});
		}

		const newData = formValues.mergeDeep(data);

		this.props.onSubmit(newData.toJS());
	};

	validateClean = () => {
		const { reset } = this.props;
		if (this.props.getFormResponse) {
			reset();
		}
	};

	render() {
		console.log('this.state', this.state);
		this.validateClean();
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="Nombre" component={this.renderInput} label="Nombre" />
				<Field name="Email" component={this.renderInput} label="Email" />
				<Field name="Alias" component={this.renderInput} label="Alias" />
				<Field name="IdTipoUsuario" component={this.renderSelect} label="Rol" />
				{this.props.createData ? <Field name="Passwd" component={this.renderPassw} label="Contraseña" /> : null}
				{this.state.sucursal === 1 ? (
					<Field name="IdTipoUsuario" component={this.renderSelect} label="Rol" />
				) : null}
				<div
					style={{
						bottom: '0',
						width: '100%',
						height: '60px',
					}}
				>
					<button className="ui button primary">Guardar</button>
				</div>
			</form>
		);
	}
}

export function mapStateToProps(state, props) {
	return {
		getFormResponse: getFormResponse(state, props),
	};
}

export default connect(mapStateToProps)(
	reduxForm({
		form: 'formUsuarios',
		validate,
		enableReinitialize: true,
	})(FrmUsuario)
);
