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
import Print from '../../components/Print/';

import { fetchListadoProductos } from '../ListaProducto/actions';
import { fetchProducto } from '../Productos/actions';
import { datosProductos, listaPorcionProducto } from './selectors';
import { fetchPorciones } from '../Porciones/actions';
import { actualizacionLista } from './actions';

const useStyles = makeStyles({
	card: {
		maxWidth: 345,
		margin: '15px',
		width: '137px',
		background: 'deeppink',
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
		Props.fetchProducto();
		Props.fetchListadoProductos();
		Props.fetchPorciones();
	}, []);

	return (
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
							<Card key={data.IdProducto} className={classes.card}>
								<CardActionArea
									style={{
										textAlign: 'center',
									}}
									onClick={() => verificandoProducto(data)}
								>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
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
			<Fab
				style={{
					right: '16px',
					bottom: '16px',
					position: 'fixed',
				}}
				color="primary"
				aria-label="Add"
				onClick={() => {
					setVisibleModalTable(true);
					Props.actualizacionLista();
				}}
				className="video-link"
			>
				{'Lista'}
			</Fab>
			<Print />
		</div>
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
