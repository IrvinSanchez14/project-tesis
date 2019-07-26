import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { selectMessages } from '../selectors';
import Message from '../../../share/messages';
import { loginRequesting } from '../actions';
import { Link } from 'react-router-dom';
import './stylesForLog.css';

export class Login extends React.Component {
	render() {
		const { onSubmit, handleSubmit, messages } = this.props;
		return (
			<div>
				<div id="login-box">
					<div className="left">
						<h1>Ingresar</h1>
						<br />
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="container">
								<Field
									name="email"
									type="text"
									id="email"
									className="email"
									label="Email"
									placeholder="Correo"
									component="input"
								/>
								<div className="forgotPassword">
									<Link to="/forgotpassword"> Olvidaste tu contraseña?</Link>
								</div>
								<Field
									name="password"
									type="password"
									id="password"
									className="password"
									label="Password"
									placeholder="Contraseña"
									component="input"
								/>
								<input type="submit" name="signin_submit" value="Ingresar" />
							</div>
						</form>
					</div>
				</div>

				<div>{!!messages.length && <Message message={messages[0].body} />}</div>
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
		else alert('Por favor rellena todos los campos');
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
