import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Label } from 'semantic-ui-react';
import ModalProduccion from '../../../components/ModalProduccion';
import { fetchProduccionDetalle } from '../actions';

function TablaPC(Props) {
	const { dataTable, fetchProduccionDetalle } = Props;
	const [visibleModal, setVisibleModal] = useState(false);
	const [array, setArray] = useState([]);

	function callApi(id) {
		fetchProduccionDetalle(id);
	}

	return (
		<Fragment>
			<Table singleLine>
				<Table.Header>
					<Table.Row>
						{Props.header.map(head => {
							return <Table.HeaderCell key={head}>{head}</Table.HeaderCell>;
						})}
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{dataTable.map(data => {
						return (
							<Table.Row
								onClick={() => {
									setVisibleModal(true);
									setArray(data);
									callApi(data.IdPC);
								}}
								className="tabla-factura"
								key={data.IdPC}
							>
								<Table.Cell>{data.IdPC}</Table.Cell>
								<Table.Cell>{data.lote}</Table.Cell>
								<Table.Cell>
									{' '}
									<Label
										as="a"
										color={
											data.IdEstado === '2' ? 'yellow' : data.IdEstado === '4' ? 'teal' : 'green'
										}
										tag
									>
										{data.NombreEstado}
									</Label>
								</Table.Cell>
								<Table.Cell>{data.FechaCreacion}</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
			<ModalProduccion visibleModal={visibleModal} setVisibleModal={setVisibleModal} arrays={array} />
		</Fragment>
	);
}

export function mapStateToProps(state, props) {
	return {};
}

export const actions = {
	fetchProduccionDetalle,
};

export default connect(
	mapStateToProps,
	actions
)(TablaPC);
