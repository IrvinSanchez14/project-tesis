import React from 'react';
import { MDBNotification } from 'mdbreact';

class Notification extends React.Component {
	render() {
		return (
			<MDBNotification
				show
				fade
				iconClassName={this.props.status === 0 ? 'text-primary' : 'red-text'}
				title="Servidor"
				message={this.props.mensajeNotificacion}
				style={{
					right: '12px',
					bottom: '80%',
					position: 'fixed',
				}}
			/>
		);
	}
}

export default Notification;
