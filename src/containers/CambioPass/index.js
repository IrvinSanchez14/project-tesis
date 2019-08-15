import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBCol, MDBNotification } from 'mdbreact';
import api from '../../api';
import history from '../../history';

import '../Registro/components/stylesForReg.css';

class CambioPass extends React.Component {
	state = { pass1: '', pass2: '', notification: false };

	responseOk = () => {
		localStorage.clear();
		history.push('/login');
	};

	onClick = () => {
		const id = JSON.parse(localStorage.getItem('firsTime'));
		api.post('/user/cambioPass.php', { id: id, ...this.state }).then(response => {
			this.setState({
				notification: true,
			});
			setTimeout(() => this.responseOk(), 2000);
		});
	};

	handleChange1 = e => {
		this.setState({
			pass1: e.target.value,
		});
	};

	handleChange2 = e => {
		this.setState({
			pass2: e.target.value,
		});
	};

	render() {
		return (
			<div className="register-box">
				<MDBCol>
					<MDBCard style={{ width: '22rem' }}>
						<MDBCardBody>
							<MDBCardTitle>Cambiar Contraseña</MDBCardTitle>
							<div style={{ marginLeft: '24px' }}>
								<MDBInput label="Nuevo Password" onChange={this.handleChange1} />
							</div>
							<div style={{ marginLeft: '24px' }}>
								<MDBInput label="Confirmar Password" onChange={this.handleChange2} />
							</div>
							<MDBBtn style={{ marginLeft: '83px' }} onClick={() => this.onClick()}>
								Enviar
							</MDBBtn>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
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

export default CambioPass;
