import React from 'react';
import { fromJS } from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';

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

	if (!values.get * '') {
		errors.Descripcion = 'Required';
	} else if (isNaN(Number(values.Descripcion))) {
		errors.Descripcion = 'irvin culeero';
	}

	return errors;
};

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
				<Field name="Descripcion" component={this.renderInput} label="Descripcion" />
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
	form: 'formTipoUsuario',
	validate,
	enableReinitialize: true,
})(FrmTipoUsuario);
