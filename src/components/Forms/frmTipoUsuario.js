import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

class FrmTipoUsuario extends React.Component {
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
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="Nombre" component={this.renderInput} label="Nombre" />
				<Field name="Descripcion" component={this.renderInput} label="Descripcion" />
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
	form: 'formTipoUsuario',
	validate,
	enableReinitialize: true,
})(FrmTipoUsuario);
