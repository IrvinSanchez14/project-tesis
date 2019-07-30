import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { registerRequesting } from '../actions';
import './stylesForReg.css';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
	<TextField hintText={label} floatingLabelText={label} errorText={touched && error} {...input} {...custom} />
);

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
	<SelectField
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		onChange={(event, index, value) => input.onChange(value)}
		children={children}
		{...custom}
	>
		<MenuItem value="ADM002" primaryText="Red" />
	</SelectField>
);

export class Register extends React.Component {
	render() {
		const { onSubmit, handleSubmit } = this.props;
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<div id="register-box">
						<Card style={{ width: '329px', height: '525px' }}>
							<CardContent>
								<div className="left" style={{ justifyContent: 'center' }}>
									<h1 style={{ marginLeft: '69px' }}>Registrate</h1>
									<form onSubmit={handleSubmit(onSubmit)}>
										<div
											className="container"
											style={{ justifyContent: 'center', marginTop: '-28px' }}
										>
											<Field name="Nombre" label="Nombre" component={renderTextField} />
											<Field name="Email" label="Correo" component={renderTextField} />
											<Field name="Alias" label="Alias" component={renderTextField} />
											<Field
												name="IdTipoUsuario"
												component={renderSelectField}
												label="Tipo de Usuario"
											/>
											<Field
												name="Passwd"
												type="password"
												label="Contraseña"
												component={renderTextField}
											/>
											<input
												style={{ marginLeft: '69px' }}
												type="submit"
												name="signup_submit"
												value="Registrate"
											/>
										</div>
									</form>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

Register.propTypes = {
	handleSubmit: PropTypes.func,
	onSubmit: PropTypes.func,
	messages: PropTypes.array,
};

export const mapStateToProps = state => ({});

export const mapDispatchToProps = dispatch => ({
	onSubmit: value => {
		const response = value.toJS();
		if (response.Nombre && response.Email) {
			dispatch(registerRequesting(response));
		} else {
			alert('Please Fill All the Fields');
		}
	},
});

export default reduxForm({
	form: 'register',
})(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Register)
);
