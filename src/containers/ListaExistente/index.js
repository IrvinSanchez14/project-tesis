import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Modal from '../../components/Modal';
import ModalTable from '../../components/ModalTable';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	card: {
		maxWidth: 345,
		margin: '15px',
		width: '137px',
		background: 'deeppink',
	},
});

const mockData = [
	{
		Nombre: 'Tomate',
		Porcion: [
			{
				Nombre: '2',
				Alias: 'Onz',
			},
			{
				Nombre: '3',
				Alias: 'Onz',
			},
		],
	},
	{
		Nombre: 'Queso Mozarella',
		Porcion: [
			{
				Nombre: '4',
				Alias: 'Onz',
			},
			{
				Nombre: '2',
				Alias: 'Onz',
			},
		],
	},
];

export default function ListaExistente() {
	const [visibleModal, setVisibleModal] = useState(false);
	const [visibleModalTable, setVisibleModalTable] = useState(false);
	const [arrayData, setArrayData] = useState([]);
	const [nombreProducto, setNombreProducto] = useState('');
	const classes = useStyles();

	function verificandoProducto(id) {
		mockData.map(data => {
			if (data.Nombre === id) {
				setVisibleModal(true);
				setArrayData(data.Porcion);
				setNombreProducto(data.Nombre);
			}
			return arrayData;
		});
	}

	return (
		<div
			style={{
				display: 'flex',
				flexFlow: 'row wrap',
				justifyContent: 'flex-start',
			}}
		>
			{mockData.map(data => {
				return (
					<Card key={data.Nombre} className={classes.card}>
						<CardActionArea
							style={{
								textAlign: 'center',
							}}
							onClick={() => verificandoProducto(data.Nombre)}
						>
							<CardContent>
								<Typography gutterBottom variant="h5" component="h2">
									{data.Nombre}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				);
			})}
			<Modal
				visibleModal={visibleModal}
				setVisibleModal={setVisibleModal}
				dataContent={arrayData}
				title={nombreProducto}
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
				onClick={() => setVisibleModalTable(true)}
				className="video-link"
			>
				{'Lista'}
			</Fab>
		</div>
	);
}
