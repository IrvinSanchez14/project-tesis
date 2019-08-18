import React from 'react';

class Ejemplo1 extends React.Component {
	componentDidMount() {
		alert('alerta!');
	}
	prueba = () => {
		return console.log('prueba2!');
	};
	render() {
		return (
			<div>
				<h1> Ejemplo 1</h1>
				<button onClick={this.prueba}>click me</button>
			</div>
		);
	}
}

export default Ejemplo1;
