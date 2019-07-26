/*import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//___________________*/

import React from 'react';
import { fromJS } from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';

/* _______________________________________________________
					ALIDACIONES							*/
const number = value => (value && isNaN(Number(value)) ? 'Tiene que ser solo numeros' : undefined);

export const phoneNumber = value =>
	value && !/^(0|[1-7][0-7]{7})$/i.test(value) ? 'Telefono invalido, ingrese 8 digitos' : undefined;

const email = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? 'Ingresa una direccion de correo valido'
		: undefined;
// _______________________________________________________

class FrmEmpresa extends React.Component {
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
			//<MuiThemeProvider muiTheme={getMuiTheme()}>
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="Nombre" component={this.renderInput} label="Nombre" />
				<Field name="Razon_Social" component={this.renderInput} label="Razon Social" />
				<Field name="Direccion" component={this.renderInput} label="Direccion" />
				<Field
					name="Telefono"
					type="text"
					component={this.renderInput}
					label="Telefono"
					validate={[number, phoneNumber]}
				/>
				<Field name="Correo" type="text" component={this.renderInput} label="Correo" validate={email} />
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
			//</MuiThemeProvider>
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
	form: 'formEmpresa',
	validate,
	enableReinitialize: true,
})(FrmEmpresa);
