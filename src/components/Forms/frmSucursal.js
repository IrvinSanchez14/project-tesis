import React from 'react';
import { fromJS } from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';

const validate = values => {
	// IMPORTANT: values is an Immutable.Map here!
	const errors = {};
	if (!values.get('IdSucursal')) {
		errors.IdSucursal = 'Required';
	}
	if (!values.get('Nombre')) {
		errors.Nombre = 'Required';
	} else if (values.get('Nombre').length > 20) {
		errors.IdSucursal = 'Must be 20 characters or less';
	}
	if (!values.get('Direccion')) {
		errors.Direccion = 'Required';
	}
	return errors;
};

class FrmSucursal extends React.Component {
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
		if (this.props.createData) {
			data = fromJS({
				flag: 'create',
			});
		} else {
			data = fromJS({
				flag: 'update',
			});
		}

		const newData = formValues.mergeDeep(data);
		this.props.onSubmit(newData.toJS());
	};

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="Nombre" component={this.renderInput} label="Nombre" />
				<Field name="Direccion" component={this.renderInput} label="Direccion" />
				<Field name="Telefono" component={this.renderInput} label="Telefono" />
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

export default reduxForm({
	form: 'formSucursal',
	validate,
	enableReinitialize: true,
})(FrmSucursal);
