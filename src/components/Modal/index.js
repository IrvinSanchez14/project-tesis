import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	formControl: {
		margin: theme.spacing(3),
	},
	group: {
		margin: theme.spacing(1, 0),
	},
}));

const list = [];

export default function Modal(Props) {
	const { visibleModal, setVisibleModal, dataContent, title } = Props;

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = useStyles();
	const [value, setValue] = useState('');
	const [porcion, setPorcion] = useState(0);
	const [cantidadPorcion, setCantidadPorcion] = useState(0);
	const [lista, setLista] = useState([]);

	useEffect(() => {
		const local = JSON.parse(localStorage.getItem('listaExistente'));
		if (local) {
			local.map(data => {
				list.push({
					nombre: data.nombre,
					porcion: data.porcion,
					cantidad: data.cantidad,
				});
				return data;
			});
		}
	}, []);

	function handleChange(event) {
		setValue(event.target.value);
	}
	function handleClose() {
		setVisibleModal(false);
	}

	function valueChek(event) {
		setPorcion(event.target.value);
	}

	function valueTextField(event) {
		setCantidadPorcion(event.target.value);
	}

	function createList() {
		list.push({
			nombre: title,
			porcion: porcion,
			cantidad: cantidadPorcion,
		});
		setLista(list);
		setVisibleModal(false);
		localStorage.setItem('listaExistente', JSON.stringify(list));
		console.log(lista)
	}

	return (
		<Dialog
			fullScreen={fullScreen}
			open={visibleModal}
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogTitle
				id="responsive-dialog-title"
				style={{
					backgroundColor: '#39215E',
					color: '#FFF',
				}}
			>
				{title}
			</DialogTitle>
			<DialogContent>
				<FormLabel component="legend">Elige</FormLabel>
				<RadioGroup
					aria-label="Porciones"
					name="Porciones"
					className={classes.group}
					value={value}
					onChange={handleChange}
				>
					{dataContent.map(array => {
						return (
							<FormControlLabel
								key={array.Nombre}
								value={array.Nombre}
								control={<Radio />}
								label={`${array.Nombre} ${array.Alias}`}
								onChange={event => valueChek(event)}
							/>
						);
					})}
				</RadioGroup>
				<FormLabel component="legend">Elige Cantidad</FormLabel>
				<TextField
					id="outlined-email-input"
					label="Cantidad"
					className={classes.textField}
					type="email"
					name="Cantidad"
					margin="normal"
					variant="outlined"
					onChange={event => valueTextField(event)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancelar
				</Button>
				<Button onClick={createList} color="primary" autoFocus>
					Agregar
				</Button>
			</DialogActions>
		</Dialog>
	);
}
