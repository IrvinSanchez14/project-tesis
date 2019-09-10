import React, { Fragment, useState } from 'react';
import { Table, Label } from 'semantic-ui-react';
import ModalFactura from '../../components/ModalFactura';
import api from '../../api';

function TablaCP(Props) {
	const { dataTable } = Props;
	const [visibleModal, setVisibleModal] = useState(false);
	const [array, setArray] = useState([]);
	const [detalles, setDetalles] = useState([]);

	function callApi(id) {
		api.post('/Factura/readDetalleLote.php', { IdCP: id })
			.then(response => {
				setDetalles(response.data);
			})
			.catch(error => {
				console.log(error);
			});
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
									callApi(data.IdCP);
								}}
								className="tabla-factura"
								key={data.IdCP}
							>
								<Table.Cell>{data.IdCP}</Table.Cell>
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
								<Table.Cell>{data.Lote}</Table.Cell>
								<Table.Cell>{data.NombreProveedor}</Table.Cell>
								<Table.Cell>{data.NoFactura}</Table.Cell>
								<Table.Cell>{data.FechaCreacion}</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
			<ModalFactura
				visibleModal={visibleModal}
				setVisibleModal={setVisibleModal}
				arrays={array}
				detalles={detalles}
			/>
		</Fragment>
	);
}

export default TablaCP;
