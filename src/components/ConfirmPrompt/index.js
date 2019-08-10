import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import './style.css'; // Import css

export function confirmPrompt() {
	const yes = () => {
		const answer = true;
		return answer;
	};

	confirmAlert({
		customUI: ({ onClose }) => {
			return (
				<div className="custom-ui">
					<h1>Estas seguo?</h1>
					<p>Quieres eliminarlo?</p>
					<button onClick={onClose}>No</button>
					<button onClick={() => yes()}>Si, Eliminar!</button>
				</div>
			);
		},
	});
}

class ModalPrompt extends React.Component {
	submit = () => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="custom-ui">
						<h1>Estas seguro?</h1>
						<p>Quieres eliminarlo</p>
						<button onClick={onClose}>No</button>
						<button
							onClick={() => {
								this.handleClickDelete();
								onClose();
							}}
						>
							Si, Eliminar!
						</button>
					</div>
				);
			},
		});
	};

	render() {
		return (
			<div className="container">
				<button onClick={this.submit}>Aceptar</button>
			</div>
		);
	}
}

export default ModalPrompt;
