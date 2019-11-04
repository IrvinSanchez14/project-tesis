import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Label } from 'semantic-ui-react';
import ModalProduccion from '../../../components/ModalProduccion';
import CustomizedSnackbars from '../../../components/Toast';
import { fetchProduccionDetalle, activateModal, activateToastConfirm } from '../actions';
import { stateModal, stateToast } from '../selectors';

function TablaPC(Props) {
	const { dataTable, fetchProduccionDetalle, stateModal, activateModal, stateToast, activateToastConfirm } = Props;
	const [visibleModal, setVisibleModal] = useState(false);
	const [array, setArray] = useState([]);
	const [estadoLote, setEstadoLote] = useState('');
	const [idPC, setIdPC] = useState('');
	const [colorToast, setColorToast] = useState('');
	const [messageToast, setMessageToast] = useState('');
	const [numeroLote, setNumeroLote] = useState('');

	function callApi(id) {
		activateModal(true);
		fetchProduccionDetalle(id);
	}

	useEffect(() => {
		activateModal(false);
	}, []);

	function clickRow(data) {
		if (data.IdEstado === '5') {
			console.log('producto finalizado');
			activateToastConfirm(true);
			setColorToast('error');
			setMessageToast('Este lote no contiene mas datos de produccion');
		} else {
			setVisibleModal(true);
			setArray(data);
			callApi(data.IdPC);
			setEstadoLote(data.IdEstado);
			setIdPC(data.IdPC);
			setNumeroLote(data.Lote);
			setEstadoLote(data.IdEstado);
			setColorToast('success');
			setMessageToast(`Nota de envio creada correctamente del Lote: ${numeroLote}`);
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
								key={data.IdPC}
							>
								<Table.Cell>{data.IdPC}</Table.Cell>
								<Table.Cell>
									{' '}
									<Label
										as="a"
										color={
											data.IdEstado === '7' ? 'yellow' : data.IdEstado === '6' ? 'teal' : 'red'
										}
										tag
									>
										{data.NombreEstado}
									</Label>
								</Table.Cell>
								<Table.Cell>{data.lote}</Table.Cell>
								<Table.Cell>{data.FechaCreacion}</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
			{visibleModal ? (
				<ModalProduccion
					visibleModal={visibleModal}
					setVisibleModal={setVisibleModal}
					arrays={array}
					estadoLote={estadoLote}
					stateModal={stateModal}
					PC={idPC}
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
	fetchProduccionDetalle,
	activateModal,
	activateToastConfirm,
};

export default connect(
	mapStateToProps,
	actions
)(TablaPC);
