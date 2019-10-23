import React from 'react';
import { fromJS } from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { getFormResponse } from '../../containers/Proveedor/selectors';

const validate = values => {
	// IMPORTANT: values is an Immutable.Map here!
	const errors = {};
	if (!values.get('IdSucursal')) {
		errors.IdSucursal = 'Requerido';
	}
	if (!values.get('Nombre')) {
		errors.Nombre = 'Requerido';
	} else if (values.get('Nombre').length > 20) {
		errors.IdSucursal = 'Must be 20 characters or less';
	}
	if (!values.get('Direccion')) {
		errors.Direccion = 'Requerido';
	}
	if (!values.get('Razo_Social')) {
		errors.Razo_Social = 'Requerido';
	}
	if (!values.get('Nombre_Contacto')) {
		errors.Nombre_Contacto = 'Requerido';
	}
	if (!values.get('Email')) {
		errors.Email = 'Requerido';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('Email'))) {
		errors.Email = 'Verifique el crreo';
	}
	if (!values.get('DUI')) {
		errors.DUI = 'Requerido';
	} else if (isNaN(Number(values.get('Telefono')))) {
		errors.Telefono = 'Tiene que ser numero';
	}
	if (!values.get('NIT')) {
		errors.NIT = 'Requerido';
	} else if (isNaN(Number(values.get('Telefono')))) {
		errors.Telefono = 'Tiene que ser numero';
	}
	if (!values.get('NRC')) {
		errors.NRC = 'Requerido';
	} else if (isNaN(Number(values.get('Telefono')))) {
		errors.Telefono = 'Tiene que ser numero';
	}
	if (!values.get('Telefono')) {
		errors.Telefono = 'Requerido';
	} else if (isNaN(Number(values.get('Telefono')))) {
		errors.Telefono = 'Tiene que ser numero';
	} else if (values.get('Telefono').length > 8) {
		errors.Telefono = '8 digitos o menos';
	} else if (values.get('Telefono').length < 8) {
		errors.Telefono = '8 digitos o menos';
	}
	return errors;
};

class FrmProveedor extends React.Component {
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
		this.validateClean();
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="Nombre" component={this.renderInput} label="Nombre" />
				<Field name="Direccion" component={this.renderInput} label="Dirección" />
				<Field name="Telefono" component={this.renderInput} label="Teléfono" />
				<Field name="Razo_Social" component={this.renderInput} label="Razon Social" />
				<Field name="Nombre_Contacto" component={this.renderInput} label="Nombre Contacto" />
				<Field name="Email" component={this.renderInput} label="Correo" />
				<Field name="DUI" component={this.renderInput} label="DUI" />
				<Field name="NIT" component={this.renderInput} label="NIT" />
				<Field name="NRC" component={this.renderInput} label="NRC" />
				<div
					style={{
						bottom: '0',
						width: '100%',
						height: '60px',
					}}
				>
					<button className="ui buttonGuardar">Guardar</button>
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
		form: 'formProveedor',
		validate,
		enableReinitialize: true,
	})(FrmProveedor)
);
