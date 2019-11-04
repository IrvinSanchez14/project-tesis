import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Modal from '../../components/Modal';
import ModalTable from '../../components/ModalTable';
import Typography from '@material-ui/core/Typography';
import { ErrorTabla } from '../../components/Error';

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
		width: '339px',
		background: '#F2F2F2',
		borderLeft: '3px solid #5AA226',
		boxShadow: '0px 1px 3px 0px rgba(0,0,0,0), 0px 1px 1px 0px rgba(0,0,0,0.0), 0px 2px 1px -1px rgba(0,0,0,0.0)',
		borderRadius: '7px',
	},
});

const dataMock = [
	{
		IdProducto: '32',
		Nombre: 'Escobas',
		Descripcion: 'prueba',
		tipoProducto: 'Frutas',
		Siglas: 'ONZ',
		Proveedor: 'testsssss',
		Estado: 'Inactivo',
		IdTipoProducto: '6',
		IdUnidadMedida: '1',
		IdProveedor: '3',
	},
	{
		IdProducto: '30',
		Nombre: 'Papel Toalla',
		Descripcion: 'fruta fresca',
		tipoProducto: 'Frutas',
		Siglas: 'Unida',
		Proveedor: 'testsssss',
		Estado: 'Inactivo',
		IdTipoProducto: '6',
		IdUnidadMedida: '2',
		IdProveedor: '3',
	},
	{
		IdProducto: '29',
		Nombre: 'Sartenes',
		Descripcion: 'para anotar el pedido',
		tipoProducto: 'Material de trabajo',
		Siglas: 'Unida',
		Proveedor: 'testsssss',
		Estado: 'Inactivo',
		IdTipoProducto: '7',
		IdUnidadMedida: '2',
		IdProveedor: '3',
	},
	{
		IdProducto: '28',
		Nombre: 'Aceite',
		Descripcion: 'los que se dan al momento de llevar la cuenta',
		tipoProducto: 'Material de trabajo',
		Siglas: 'Unida',
		Proveedor: 'testsssss',
		Estado: 'Inactivo',
		IdTipoProducto: '7',
		IdUnidadMedida: '2',
		IdProveedor: '3',
	},
	{
		IdProducto: '27',
		Nombre: 'Leña',
		Descripcion: 'envio de pedidos',
		tipoProducto: 'Material de trabajo',
		Siglas: 'Unida',
		Proveedor: 'testsssss',
		Estado: 'Inactivo',
		IdTipoProducto: '7',
		IdUnidadMedida: '2',
		IdProveedor: '3',
	},
	{
		IdProducto: '26',
		Nombre: 'Agua garrafon',
		Descripcion: 'para aquellos jugos',
		tipoProducto: 'Frutas',
		Siglas: 'LB',
		Proveedor: 'testsssss',
		Estado: 'Inactivo',
		IdTipoProducto: '6',
		IdUnidadMedida: '5',
		IdProveedor: '3',
	},
	{
		IdProducto: '25',
		Nombre: 'Chile para pizza',
		Descripcion: 'la fruta maracuya',
		tipoProducto: 'Frutas',
		Siglas: 'LB',
		Proveedor: 'testsssss',
		Estado: 'Inactivo',
		IdTipoProducto: '6',
		IdUnidadMedida: '5',
		IdProveedor: '3',
	},
	{
		IdProducto: '24',
		Nombre: 'Queso parmesano',
		Descripcion: 'el melecoton',
		tipoProducto: 'Frutas',
		Siglas: 'Unida',
		Proveedor: 'testsssss',
		Estado: 'Inactivo',
		IdTipoProducto: '3',
		IdUnidadMedida: '2',
		IdProveedor: '3',
	},
	{
		IdProducto: '23',
		Nombre: 'Manteles',
		Descripcion: 'la sandia',
		tipoProducto: 'Frutas',
		Siglas: 'Unida',
		Proveedor: 'testsssss',
		Estado: 'Inactivo',
		IdTipoProducto: '6',
		IdUnidadMedida: '2',
		IdProveedor: '3',
	},
];

function ListaPedidos(Props) {
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
			<div style={{ marginLeft: '15px' }}>
				<h1 style={{ fontFamily: 'Open Sans', fontSize: '28px', fontWeight: 600 }}>
					Productos para lista pedidos
				</h1>
				<div style={{ display: 'flex', flexFlow: 'row wrap', marginLeft: '-8px' }}>
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
							Lista de Pedidos
						</button>
					</div>
					<div style={{ margin: '10px' }}>
						<div className="ui left icon input" style={{ marginRight: '9px' }}>
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
				{dataMock
					? dataMock.map(data => {
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
)(ListaPedidos);
