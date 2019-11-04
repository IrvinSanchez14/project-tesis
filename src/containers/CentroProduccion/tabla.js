import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Label } from 'semantic-ui-react';
import ModalFactura from '../../components/ModalFactura';
import CustomizedSnackbars from '../../components/Toast';
import api from '../../api';
import { activateModal, activateToastConfirm } from './actions';
import { stateModal, stateToast } from './selectors';

function TablaCP(Props) {
	const { dataTable, activateModal, stateModal, stateToast, activateToastConfirm } = Props;
	const [visibleModal, setVisibleModal] = useState(false);
	const [visibleToast, setVisibleToast] = useState(false);
	const [array, setArray] = useState([]);
	const [detalles, setDetalles] = useState([]);
	const [numeroLote, setNumeroLote] = useState('');
	const [estadoLote, setEstadoLote] = useState('');
	const [idCP, setIdCP] = useState('');
	const [colorToast, setColorToast] = useState('');
	const [messageToast, setMessageToast] = useState('');

	useEffect(() => {
		activateModal(false);
		activateToastConfirm(false);
	}, []);

	function callApi(id) {
		activateModal(true);
		api.post('/Factura/readDetalleLote.php', { IdCP: id })
			.then(response => {
				console.log(visibleToast);
				setDetalles(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	}

	function clickRow(data) {
		if (data.IdEstado === '5') {
			console.log('producto finalizado');
			activateToastConfirm(true);
			setColorToast('error');
			setMessageToast('La producción de este lote a finalizado');
		} else {
			setVisibleModal(true);
			setArray(data);
			callApi(data.IdCP);
			setNumeroLote(data.Lote);
			setEstadoLote(data.IdEstado);
			setIdCP(data.IdCP);
			setColorToast('success');
			setMessageToast(`Producción del lote ${numeroLote} almacenada correctamente en la base de datos`);
		}
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
									clickRow(data);
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
											data.IdEstado === '2' ? 'yellow' : data.IdEstado === '4' ? 'teal' : 'red'
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
			{visibleModal ? (
				<ModalFactura
					visibleModal={visibleModal}
					setVisibleModal={setVisibleModal}
					arrays={array}
					detalles={detalles}
					stateModal={stateModal}
					estadoLote={estadoLote}
					CP={idCP}
				/>
			) : (
				undefined
			)}
			{stateToast ? (
				<CustomizedSnackbars
					visibleToast={stateToast}
					setVisibleToast={activateToastConfirm}
					messageToast={messageToast}
					variant={colorToast}
				/>
			) : (
				undefined
			)}
		</Fragment>
	);
}

export function mapStateToProps(state, props) {
	return {
		stateModal: stateModal(state, props),
		stateToast: stateToast(state, props),
	};
}

export const actions = {
	activateModal,
	activateToastConfirm,
};

export default connect(
	mapStateToProps,
	actions
)(TablaCP);
