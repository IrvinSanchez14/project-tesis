import React from 'react';
import PropTypes from 'prop-types';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBCol } from 'mdbreact';
import api from '../../../api';

import './stylesForReg.css';
import Notification from '../../../components/Notification';

export class Register extends React.Component {
	state = { Email: '', loading: '', notification: false, mensajeNotificacion: '', status: 0 };

	handleChange = e => {
		this.setState({
			Email: e.target.value,
		});
	};

	onClick = () => {
		this.setState({
			loading: true,
			notification: false,
		});
		api.post('/user/recuperacion.php', { Email: this.state.Email }).then(respuesta => {
			if (respuesta.data.server === 'Ok') {
				this.setState({
					loading: false,
					notification: true,
					mensajeNotificacion: respuesta.data.message,
					status: 0,
				});
			} else {
				this.setState({
					loading: false,
					notification: true,
					mensajeNotificacion: respuesta.data.error,
					status: 1,
				});
			}
		});
	};

	render() {
		return (
			<div>
				<div className="register-box">
					<MDBCol>
						<MDBCard style={{ width: '22rem' }}>
							<MDBCardBody>
								<MDBCardTitle>Recuperacion Contraseña</MDBCardTitle>
								<div style={{ marginLeft: '24px' }}>
									<MDBInput label="Correo Electronico" onChange={this.handleChange} />
								</div>
								<MDBBtn style={{ marginLeft: '83px' }} onClick={() => this.onClick()}>
									Enviar
								</MDBBtn>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					{this.state.loading ? (
						<div className="pacpac lds-css ng-scope">
							<div style={{ width: '100%', height: '100%' }} className="lds-pacman">
								<div>
									<div />
									<div />
									<div />
								</div>
								<div>
									<div />
									<div />
								</div>
							</div>
						</div>
					) : null}
				</div>
				{this.state.notification ? (
					<Notification status={this.state.status} mensajeNotificacion={this.state.mensajeNotificacion} />
				) : null}
			</div>
		);
	}
}

Register.propTypes = {
	handleSubmit: PropTypes.func,
	onSubmit: PropTypes.func,
	messages: PropTypes.array,
};

export default Register;
