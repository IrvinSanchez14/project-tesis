import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

class TableData extends React.Component {
	componentDidMount() {
		const funcionId = this.props.getIDtable;
		const table = document.getElementsByClassName('table table-hover dataTable')[0].rows;
		for (var i = 2, l = table.length; i < l; i++) {
			var currentRow = table[i];
			var createClickHandler = function(row) {
				return function() {
					var cell = row.getElementsByTagName('td')[0];
					var id = cell.innerHTML;
					funcionId(id);
				};
			};

			currentRow.onclick = createClickHandler(currentRow);
		}
	}

	componentDidUpdate() {
		const funcionId = this.props.getIDtable;
		const table = document.getElementsByClassName('table table-hover dataTable')[0].rows;
		for (var i = 2, l = table.length; i < l; i++) {
			var currentRow = table[i];
			var createClickHandler = function(row) {
				return function() {
					var cell = row.getElementsByTagName('td')[0];
					var id = cell.innerHTML;
					funcionId(id);
				};
			};

			currentRow.onclick = createClickHandler(currentRow);
		}
	}

	render() {
		const hey = {};
		hey.columns = this.props.header.map((titulos, key) => {
			const prueba = {
				label: titulos.label,
				field: titulos.field,
				sort: 'asc',
				width: 150,
			};
			return prueba;
		});
		hey.rows = this.props.dataTable;
		console.log('hey', this.props.header);
		return (
			<div>
				<MDBDataTable
					paginationLabel={['Anterior', 'Siguiente']}
					hover
					responsive
					searchLabel={'Buscar'}
					entriesLabel={'Cantidad de Datos'}
					infoLabel={['Mostrando', 'de', 'en', 'datos']}
					data={hey}
					exportToCSV={true}
				/>
			</div>
		);
	}
}

export default TableData;
