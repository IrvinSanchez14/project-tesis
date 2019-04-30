import React from 'react';
import { Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class TableData extends React.Component {
	componentWillMount() {
		this.tableRow();
	}

	click = id => {
		return console.log('irvin' + id);
	};

	tableRow = () => {
		let table = [];
		this.props.ejemplo.map((value, index) => {
			let children = [];
			const number = Object.keys(value);
			for (let i = 0; i < number.length; i++) {
				children.push(<Table.Cell key={i}>{value[i]}</Table.Cell>);
			}
			table.push(
				<Table.Row onClick={() => this.props.getIDtable(value[0])} key={value[0]}>
					{children}
				</Table.Row>
			);
			return value;
		});
		return table;
	};

	render() {
		return (
			<Table celled selectable>
				<Table.Header>
					<Table.Row>
						{this.props.header.map(head => {
							return <Table.HeaderCell key={head}>{head}</Table.HeaderCell>;
						})}
					</Table.Row>
				</Table.Header>
				<Table.Body>{this.tableRow()}</Table.Body>
			</Table>
		);
	}
}

export default TableData;
