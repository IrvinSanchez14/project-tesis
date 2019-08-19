import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Modal from '../../components/Modal';
import ModalTable from '../../components/ModalTable';
import Typography from '@material-ui/core/Typography';
import { ErrorTabla } from '../../components/Error';
import { Input } from 'semantic-ui-react';

import { fetchListadoProductos } from '../ListaProducto/actions';
import { fetchProducto } from '../Productos/actions';
import { datosProductos, listaPorcionProducto } from './selectors';
import { fetchPorciones } from '../Porciones/actions';
import { actualizacionLista } from './actions';

import { permisoVerListaExistente } from '../../helpers/permisos';

const useStyles = makeStyles({
	card: {
		maxWidth: 345,
		margin: '15px',
		width: '241px',
		background: '#F2F2F2',
		borderLeft: '3px solid #5AA226',
		boxShadow: '0px 1px 3px 0px rgba(0,0,0,0), 0px 1px 1px 0px rgba(0,0,0,0.0), 0px 2px 1px -1px rgba(0,0,0,0.0)',
		borderRadius: '7px',
	},
});

function ListaExistente(Props) {
	const [visibleModal, setVisibleModal] = useState(false);
	const [visibleModalTable, setVisibleModalTable] = useState(false);
	const [arrayData, setArrayData] = useState([]);
	const [nameProducto, setNameProducto] = useState({});
	const classes = useStyles();

	function verificandoProducto(datos) {
		let porciones = [];
		Props.listaPorcionProducto.map(data => {
			if (data.NombreProducto === datos.Nombre) {
				setVisibleModal(true);
				porciones.push({
					Nombre: data.Porcion,
					IdPorcion: data.IdPorcion,
				});
				setNameProducto(datos);
			}
			return arrayData;
		});
		setArrayData(porciones);
	}

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo === null) {
			Props.history.push('/');
		}
		Props.fetchProducto();
		Props.fetchListadoProductos();
		Props.fetchPorciones();
	}, []);

	return permisoVerListaExistente() ? (
		<div style={{ margin: '20px' }}>
			<div style={{ marginLeft: '16px' }}>
				<h1 style={{ fontFamily: 'Open Sans', fontSize: '28px', fontWeight: 600 }}>Productos Existentes</h1>
				<div style={{ display: 'flex', flexFlow: 'row wrap' }}>
					<div style={{ flex: 1, margin: '10px' }}>
						<button
							className="button-table"
							style={{
								border: 'none',
								color: 'white',
								fontFamily: 'Open Sans',
								width: '130px',
								height: '38px',
								borderRadius: '4px',
							}}
							onClick={() => {
								setVisibleModalTable(true);
								Props.actualizacionLista();
							}}
						>
							Lista Existente
						</button>
					</div>
					<div style={{ margin: '10px' }}>
						<div className="ui left icon input">
							<input type="text" placeholder="Buscar producto" style={{ border: '2px solid #f2f2f2' }} />
							<i className="search icon" />
						</div>
					</div>
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					flexFlow: 'row wrap',
					justifyContent: 'flex-start',
				}}
			>
				{Props.datosProductos
					? Props.datosProductos.map(data => {
							return (
								<Card
									key={data.IdProducto}
									className={classes.card}
									onClick={() => verificandoProducto(data)}
								>
									<CardActionArea
										style={{
											textAlign: 'left',
										}}
									>
										<CardContent>
											<Typography
												gutterBottom
												variant="h5"
												component="h2"
												style={{ fontSize: '16px', fontFamily: 'Open Sans' }}
											>
												{data.Nombre}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							);
					  })
					: null}
				<Modal
					visibleModal={visibleModal}
					setVisibleModal={setVisibleModal}
					dataContent={arrayData}
					title={nameProducto}
				/>
				<ModalTable visibleModalTable={visibleModalTable} setVisibleModalTable={setVisibleModalTable} />
			</div>
		</div>
	) : (
		<ErrorTabla />
	);
}

export function mapStateToProps(state, props) {
	return {
		datosProductos: datosProductos(state, props),
		listaPorcionProducto: listaPorcionProducto(state, props),
	};
}

export const actions = {
	fetchProducto,
	fetchListadoProductos,
	fetchPorciones,
	actualizacionLista,
};

export default connect(
	mapStateToProps,
	actions
)(ListaExistente);
