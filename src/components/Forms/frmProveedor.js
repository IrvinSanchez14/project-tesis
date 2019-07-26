import React from 'react';
import { fromJS } from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';

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

	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
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
				<Field name="Razo_Social" component={this.renderInput} label="Razon Social" />
				<Field name="Tipo" component={this.renderInput} label="Tipo" />
				<Field name="Nombre_Contacto" component={this.renderInput} label="Nombre Contacto" />
				<Field name="Email" component={this.renderInput} label="Email" />
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
					<button className="ui button primary">Guardar</button>
				</div>
			</form>
		);
	}
}

const validate = values => {
	const errors = {};
	if (!values.get('title')) {
		errors.title = 'Required';
	} else if (values.get('title').length > 15) {
		errors.title = 'Must be 5 characters or less';
	}

	return errors;
};

export default reduxForm({
	form: 'formProveedor',
	validate,
	enableReinitialize: true,
})(FrmProveedor);
