import React, { Component } from 'react';
import jsPDF from 'jspdf';

export default class App extends Component {
	render() {
		const doc = new jsPDF();

		doc.text('Hello world!', 10, 10);
		doc.save('a4.pdf');
		return (
			<div>
				<h1>Hola</h1>
			</div>
		);
	}
}
