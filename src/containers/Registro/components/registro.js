import React from 'react';
import PropTypes from 'prop-types';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBCol, MDBNotification } from 'mdbreact';

import Message from '../../../share/messages';
import api from '../../../api';

import './stylesForReg.css';

export class Register extends React.Component {
	state = { Email: '', loading: '', notification: false };

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
			console.log(respuesta);
			this.setState({
				loading: false,
				notification: true,
			});
		});
	};

	render() {
		console.log(this.state);
		return (
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
				{this.state.notification ? (
					<MDBNotification
						show
						fade
						iconClassName="text-primary"
						title="Servidor"
						message="Correo enviado exitosamente"
						style={{
							position: 'initial',
							top: '10px',
							right: '10px',
							zIndex: 9999,
						}}
					/>
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
