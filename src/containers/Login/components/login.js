import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { selectMessages } from '../selectors';
import { loginRequesting } from '../actions';
import { Link } from 'react-router-dom';

export class Login extends React.Component {
	render() {
		const { onSubmit, handleSubmit } = this.props;
		return (
			<div>
				<div id="login-box">
					<div className="left-login">
						<h1>Ingresar</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							style={{ top: '11px', position: 'relative', right: '16px' }}
						>
							<div className="container">
								<Field
									name="email"
									type="text"
									id="email"
									className="input-login"
									label="Correo"
									placeholder="Correo"
									component="input"
								/>
								<div className="forgotPassword">
									<Link to="/recuperacion"> Olvido Contraseña?</Link>
								</div>
								<Field
									name="password"
									type="password"
									id="password"
									className="input-login"
									label="Contraseña"
									placeholder="Contraseña"
									component="input"
								/>
								<input type="submit" className="button-login" name="signin_submit" value="Ingresar" />
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	handleSubmit: PropTypes.func,
	onSubmit: PropTypes.func,
};

export function mapStateToProps(state, props) {
	return {
		messages: selectMessages(state, props),
	};
}

const mapDispatchToProps = dispatch => ({
	onSubmit: value => {
		const valor = value.toJS();
		if (valor.email && valor.password) dispatch(loginRequesting(valor));
		else alert('Por favor llena todos los espacios requeridos');
	},
});

export default reduxForm({
	form: 'login',
})(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Login)
);
