import React, { useState } from 'react';

import { Table, Popup, Tab } from 'semantic-ui-react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import esLocale from 'date-fns/locale/es';

const styles = {
	cardBase: {
		width: '50%',
	},
	cardBaseNota: {
		width: '100%',
	},
};

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'inherit',
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	root: {
		color: 'red',
	},
	menu: {
		width: 200,
	},
}));

const currencies = [
	{
		value: '1',
		label: 'LP Volcan',
	},
	{
		value: '2',
		label: 'LP Multiplaza',
	},
];

const currencies2 = [
	{
		value: '1',
		label: 'Lacteos',
	},
	{
		value: '2',
		label: 'Carnes',
	},
];

function NotaEnvio(Props) {
	const [selectedDateDe, setSelectedDateDe] = React.useState(new Date());
	const [selectedDateHasta, setSelectedDateHasta] = React.useState(new Date());
	const [consulta, setConsulta] = useState(false);
	const [values, setValues] = React.useState({
		name: 'Cat in the Hat',
		age: '',
		multiline: 'Controlled',
		currency: '1',
	});
	const classes = useStyles();

	const goBack = () => {
		Props.history.goBack();
	};

	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value });
	};

	function handleDateDeChange(date) {
		setSelectedDateDe(date);
	}

	function handleDateHastaChange(date) {
		setSelectedDateHasta(date);
	}

	const panes = [
		{
			menuItem: 'Por fecha',
			render: () => (
				<Tab.Pane>
					{!consulta ? (
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<TextField
								id="standard-select-currency"
								select
								label="Sucursal"
								className={classes.textField}
								value={values.currency}
								onChange={handleChange('currency')}
								SelectProps={{
									MenuProps: {
										className: classes.menu,
									},
								}}
								helperText="Por favor selecciona una sucursal"
								margin="normal"
							>
								{currencies.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
								<KeyboardDatePicker
									margin="normal"
									id="date-picker-dialog"
									label="Fecha"
									format="MM/dd/yyyy"
									value={selectedDateDe}
									onChange={handleDateDeChange}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
							</MuiPickersUtilsProvider>
							<Button
								variant="contained"
								style={{ backgroundColor: '#66b727', color: '#FFF' }}
								className={classes.button}
								onClick={() => setConsulta(true)}
							>
								Consultar
							</Button>
						</div>
					) : (
						<div className="ui card" style={styles.cardBaseNota}>
							<div className="content">
								<Popup
									trigger={
										<i className="right floated download icon dpdf" style={{ fontSize: '20px' }} />
									}
									content="Descarga el reporte en PDF"
									position="top center"
								/>
								<Popup
									trigger={
										<i
											className="right floated file excel icon dcsv"
											style={{ fontSize: '20px' }}
										/>
									}
									content="Descarga el reporte en Excel"
									position="top center"
								/>
								<Popup
									trigger={
										<i
											className="right floated undo icon dcsv"
											style={{ fontSize: '20px' }}
											onClick={() => setConsulta(false)}
										/>
									}
									content="Volver a generar reporte"
									position="top center"
								/>

								<div className="header">LP Volcan</div>
								<div className="meta">2019-09-17</div>
								<div className="description">
									<Table padded>
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>Lote</Table.HeaderCell>
												<Table.HeaderCell>Producto</Table.HeaderCell>
												<Table.HeaderCell>Porcion</Table.HeaderCell>
												<Table.HeaderCell>Cantidad</Table.HeaderCell>
												<Table.HeaderCell>Fecha de Vencimiento</Table.HeaderCell>
											</Table.Row>
										</Table.Header>

										<Table.Body>
											<Table.Row>
												<Table.Cell>003</Table.Cell>
												<Table.Cell>Pollo</Table.Cell>
												<Table.Cell>3.00 ONZ </Table.Cell>
												<Table.Cell>89 </Table.Cell>
												<Table.Cell>2019-10-20</Table.Cell>
											</Table.Row>
											<Table.Row>
												<Table.Cell>003</Table.Cell>
												<Table.Cell>Queso Mozzarella</Table.Cell>
												<Table.Cell>3.00 ONZ </Table.Cell>
												<Table.Cell>350 </Table.Cell>
												<Table.Cell>2019-10-25</Table.Cell>
											</Table.Row>
											<Table.Row>
												<Table.Cell>003</Table.Cell>
												<Table.Cell>Queso Mozzarella</Table.Cell>
												<Table.Cell>2.00 ONZ </Table.Cell>
												<Table.Cell>360 </Table.Cell>
												<Table.Cell>2019-10-25</Table.Cell>
											</Table.Row>
											<Table.Row>
												<Table.Cell>003</Table.Cell>
												<Table.Cell>Carne</Table.Cell>
												<Table.Cell>1.50 ONZ </Table.Cell>
												<Table.Cell>68 </Table.Cell>
												<Table.Cell>2019-10-15</Table.Cell>
											</Table.Row>
											<Table.Row>
												<Table.Cell>003</Table.Cell>
												<Table.Cell>Camaron</Table.Cell>
												<Table.Cell>3.00 ONZ </Table.Cell>
												<Table.Cell>70 </Table.Cell>
												<Table.Cell>2019-09-25</Table.Cell>
											</Table.Row>
											<Table.Row>
												<Table.Cell>003</Table.Cell>
												<Table.Cell>Camaron</Table.Cell>
												<Table.Cell>2.00 ONZ </Table.Cell>
												<Table.Cell>260 </Table.Cell>
												<Table.Cell>2019-09-25</Table.Cell>
											</Table.Row>
											<Table.Row>
												<Table.Cell>003</Table.Cell>
												<Table.Cell>Pulpo</Table.Cell>
												<Table.Cell>3.00 ONZ </Table.Cell>
												<Table.Cell>74 </Table.Cell>
												<Table.Cell>2019-09-30</Table.Cell>
											</Table.Row>
										</Table.Body>
									</Table>
								</div>
							</div>
						</div>
					)}
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Por producto',
			render: () => (
				<Tab.Pane>
					{!consulta ? (
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<TextField
								id="standard-select-currency"
								select
								label="Producto"
								className={classes.textField}
								value={values.currency}
								onChange={handleChange('currency')}
								SelectProps={{
									MenuProps: {
										className: classes.menu,
									},
								}}
								helperText="Por favor selecciona un producto"
								margin="normal"
							>
								{currencies2.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
								<KeyboardDatePicker
									margin="normal"
									id="date-picker-dialog"
									label="Desde"
									format="MM/dd/yyyy"
									value={selectedDateDe}
									onChange={handleDateDeChange}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
							</MuiPickersUtilsProvider>
							<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
								<KeyboardDatePicker
									margin="normal"
									id="date-picker-dialog"
									label="Hasta"
									format="MM/dd/yyyy"
									value={selectedDateHasta}
									onChange={handleDateHastaChange}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
							</MuiPickersUtilsProvider>
							<Button
								variant="contained"
								style={{ backgroundColor: '#66b727', color: '#FFF' }}
								className={classes.button}
								onClick={() => setConsulta(true)}
							>
								Consultar
							</Button>
						</div>
					) : (
						<div className="ui card" style={styles.cardBaseNota}>
							<div className="content">
								<Popup
									trigger={
										<i className="right floated download icon dpdf" style={{ fontSize: '20px' }} />
									}
									content="Descarga el reporte en PDF"
									position="top center"
								/>
								<Popup
									trigger={
										<i
											className="right floated file excel icon dcsv"
											style={{ fontSize: '20px' }}
										/>
									}
									content="Descarga el reporte en Excel"
									position="top center"
								/>
								<Popup
									trigger={
										<i
											className="right floated undo icon dcsv"
											style={{ fontSize: '20px' }}
											onClick={() => setConsulta(false)}
										/>
									}
									content="Volver a generar reporte"
									position="top center"
								/>

								<div className="header">LP Volcan</div>
								<div className="meta">2019-09-17</div>
								<div className="description">
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-around',
										}}
									>
										<div>
											<h4>Producto:</h4>
											<h4>Pollo</h4>
										</div>
										<div>
											<h4>Total Onzas:</h4>
											<h4>340 ONZ</h4>
										</div>
									</div>
								</div>
							</div>
							<div className="content">
								<div className="header">LP Multiplaza</div>
								<div className="meta">2019-09-17</div>
								<div className="description">
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-around',
										}}
									>
										<div>
											<h4>Producto:</h4>
											<h4>Pollo</h4>
										</div>
										<div>
											<h4>Total Onzas:</h4>
											<h4>860 ONZ</h4>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Por tipo producto',
			render: () => (
				<Tab.Pane>
					{' '}
					{!consulta ? (
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<TextField
								id="standard-select-currency"
								select
								label="Tipo de producto"
								className={classes.textField}
								value={values.currency}
								onChange={handleChange('currency')}
								SelectProps={{
									MenuProps: {
										className: classes.menu,
									},
								}}
								helperText="Por favor selecciona un tipo de producto"
								margin="normal"
							>
								{currencies2.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								id="standard-select-currency"
								select
								label="Sucursal"
								className={classes.textField}
								value={values.currency}
								onChange={handleChange('currency')}
								SelectProps={{
									MenuProps: {
										className: classes.menu,
									},
								}}
								helperText="Por favor selecciona una sucursal"
								margin="normal"
							>
								{currencies.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
								<KeyboardDatePicker
									margin="normal"
									id="date-picker-dialog"
									label="Desde"
									format="MM/dd/yyyy"
									value={selectedDateDe}
									onChange={handleDateDeChange}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
							</MuiPickersUtilsProvider>
							<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
								<KeyboardDatePicker
									margin="normal"
									id="date-picker-dialog"
									label="Hasta"
									format="MM/dd/yyyy"
									value={selectedDateHasta}
									onChange={handleDateHastaChange}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
							</MuiPickersUtilsProvider>
							<Button
								variant="contained"
								style={{ backgroundColor: '#66b727', color: '#FFF' }}
								className={classes.button}
								onClick={() => setConsulta(true)}
							>
								Consultar
							</Button>
						</div>
					) : (
						<div className="ui card" style={styles.cardBaseNota}>
							<div className="content">
								<Popup
									trigger={
										<i className="right floated download icon dpdf" style={{ fontSize: '20px' }} />
									}
									content="Descarga el reporte en PDF"
									position="top center"
								/>
								<Popup
									trigger={
										<i
											className="right floated file excel icon dcsv"
											style={{ fontSize: '20px' }}
										/>
									}
									content="Descarga el reporte en Excel"
									position="top center"
								/>
								<Popup
									trigger={
										<i
											className="right floated undo icon dcsv"
											style={{ fontSize: '20px' }}
											onClick={() => setConsulta(false)}
										/>
									}
									content="Volver a generar reporte"
									position="top center"
								/>

								<div className="header">LP Volcan</div>
								<div className="meta">2019-09-17</div>
								<div className="description">
									<Table padded>
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>Lote</Table.HeaderCell>
												<Table.HeaderCell>Producto</Table.HeaderCell>
												<Table.HeaderCell>Porcion</Table.HeaderCell>
												<Table.HeaderCell>Cantidad</Table.HeaderCell>
											</Table.Row>
										</Table.Header>

										<Table.Body>
											<Table.Row>
												<Table.Cell>003</Table.Cell>
												<Table.Cell>Queso Cheddar</Table.Cell>
												<Table.Cell>3.00 ONZ </Table.Cell>
												<Table.Cell>986 </Table.Cell>
											</Table.Row>
											<Table.Row>
												<Table.Cell>003</Table.Cell>
												<Table.Cell>Queso Mozzarella</Table.Cell>
												<Table.Cell>3.00 ONZ </Table.Cell>
												<Table.Cell>350 </Table.Cell>
											</Table.Row>
											<Table.Row>
												<Table.Cell>003</Table.Cell>
												<Table.Cell>Queso Mozzarella</Table.Cell>
												<Table.Cell>2.00 ONZ </Table.Cell>
												<Table.Cell>360 </Table.Cell>
											</Table.Row>
											<Table.Row>
												<Table.Cell>003</Table.Cell>
												<Table.Cell>Requeson</Table.Cell>
												<Table.Cell>Botella </Table.Cell>
												<Table.Cell>68 </Table.Cell>
											</Table.Row>
										</Table.Body>
									</Table>
								</div>
							</div>
						</div>
					)}
				</Tab.Pane>
			),
		},
	];

	if (window.location.pathname !== '/NotaEnvio') {
		return (
			<div>
				<div
					style={{
						marginLeft: '25px',
						marginTop: '24px',
						fontWeight: 'bold',
						fontSize: '20px',
					}}
				>
					<span onClick={goBack} style={{ cursor: 'pointer' }}>
						<i className="fas fa-arrow-left" />
						Atras
					</span>
				</div>
				<h1
					style={{
						marginLeft: '25px',
						marginTop: '5px',
						fontWeight: 'bold',
						marginBottom: '30px',
					}}
				>
					Notas de Envios
				</h1>

				<div className="ui centered cards">
					<div className="ui card" style={styles.cardBase}>
						<div className="content">
							<div className="header">LP Volcan</div>
							<div className="meta">2019-09-17</div>
							<div className="description">
								<Table padded>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Lote</Table.HeaderCell>
											<Table.HeaderCell>Producto</Table.HeaderCell>
											<Table.HeaderCell>Porcion</Table.HeaderCell>
											<Table.HeaderCell>Cantidad</Table.HeaderCell>
											<Table.HeaderCell>Fecha de Vencimiento</Table.HeaderCell>
										</Table.Row>
									</Table.Header>

									<Table.Body>
										<Table.Row>
											<Table.Cell>003</Table.Cell>
											<Table.Cell>Pollo</Table.Cell>
											<Table.Cell>3.00 ONZ </Table.Cell>
											<Table.Cell>89 </Table.Cell>
											<Table.Cell>2019-10-20</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>003</Table.Cell>
											<Table.Cell>Queso Mozzarella</Table.Cell>
											<Table.Cell>3.00 ONZ </Table.Cell>
											<Table.Cell>350 </Table.Cell>
											<Table.Cell>2019-10-25</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>003</Table.Cell>
											<Table.Cell>Queso Mozzarella</Table.Cell>
											<Table.Cell>2.00 ONZ </Table.Cell>
											<Table.Cell>360 </Table.Cell>
											<Table.Cell>2019-10-25</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>003</Table.Cell>
											<Table.Cell>Carne</Table.Cell>
											<Table.Cell>1.50 ONZ </Table.Cell>
											<Table.Cell>68 </Table.Cell>
											<Table.Cell>2019-10-15</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>003</Table.Cell>
											<Table.Cell>Camaron</Table.Cell>
											<Table.Cell>3.00 ONZ </Table.Cell>
											<Table.Cell>70 </Table.Cell>
											<Table.Cell>2019-09-25</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>003</Table.Cell>
											<Table.Cell>Camaron</Table.Cell>
											<Table.Cell>2.00 ONZ </Table.Cell>
											<Table.Cell>260 </Table.Cell>
											<Table.Cell>2019-09-25</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>003</Table.Cell>
											<Table.Cell>Pulpo</Table.Cell>
											<Table.Cell>3.00 ONZ </Table.Cell>
											<Table.Cell>74 </Table.Cell>
											<Table.Cell>2019-09-30</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
							</div>
						</div>
					</div>
					<div className="ui card" style={styles.cardBase}>
						<div className="content">
							<div className="header">LP Multiplaza</div>
							<div className="meta">2019-09-17</div>
							<div className="description">
								<Table padded>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Lote</Table.HeaderCell>
											<Table.HeaderCell>Producto</Table.HeaderCell>
											<Table.HeaderCell>Porcion</Table.HeaderCell>
											<Table.HeaderCell>Cantidad</Table.HeaderCell>
											<Table.HeaderCell>Fecha de Vencimiento</Table.HeaderCell>
										</Table.Row>
									</Table.Header>

									<Table.Body>
										<Table.Row>
											<Table.Cell>003</Table.Cell>
											<Table.Cell>Pollo</Table.Cell>
											<Table.Cell>3.00 ONZ </Table.Cell>
											<Table.Cell>45 </Table.Cell>
											<Table.Cell>2019-10-20</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>003</Table.Cell>
											<Table.Cell>Queso Mozzarella</Table.Cell>
											<Table.Cell>3.00 ONZ </Table.Cell>
											<Table.Cell>300 </Table.Cell>
											<Table.Cell>2019-10-25</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>003</Table.Cell>
											<Table.Cell>Queso Mozzarella</Table.Cell>
											<Table.Cell>2.00 ONZ </Table.Cell>
											<Table.Cell>280 </Table.Cell>
											<Table.Cell>2019-10-25</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>003</Table.Cell>
											<Table.Cell>Carne</Table.Cell>
											<Table.Cell>1.50 ONZ </Table.Cell>
											<Table.Cell>45 </Table.Cell>
											<Table.Cell>2019-10-15</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>003</Table.Cell>
											<Table.Cell>Camaron</Table.Cell>
											<Table.Cell>3.00 ONZ </Table.Cell>
											<Table.Cell>79 </Table.Cell>
											<Table.Cell>2019-09-25</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>003</Table.Cell>
											<Table.Cell>Camaron</Table.Cell>
											<Table.Cell>2.00 ONZ </Table.Cell>
											<Table.Cell>178 </Table.Cell>
											<Table.Cell>2019-09-25</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>003</Table.Cell>
											<Table.Cell>Pulpo</Table.Cell>
											<Table.Cell>3.00 ONZ </Table.Cell>
											<Table.Cell>48 </Table.Cell>
											<Table.Cell>2019-09-30</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<h1
					style={{
						marginLeft: '25px',
						marginTop: '24px',
						fontWeight: 'bold',
					}}
				>
					Notas de envio por fecha
				</h1>
				<CssBaseline />
				<main className={classes.layout}>
					<Tab panes={panes} />
				</main>
			</div>
		);
	}
}

export default NotaEnvio;
