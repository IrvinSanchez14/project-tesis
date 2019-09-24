import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import api from '../../api';

import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import ModalConfirm from '../../components/ModalConfirm';

import { clickFactura, removeBanderaCabecera } from '../../FacturaStore/actions';
import { checkCorrecto, Cabecera, listaDetalleFactura } from '../../FacturaStore/selectors';

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
}));

const steps = ['Factura Cabecera', 'Productos Factura', 'Revisar Factura'];

function getStepContent(step) {
	switch (step) {
		case 0:
			return <AddressForm />;
		case 1:
			return <PaymentForm />;
		case 2:
			return <Review />;
		default:
			throw new Error('Unknown step');
	}
}

function Checkout(Props) {
	const { clickFactura, checkCorrecto, removeBanderaCabecera, Cabecera, listaDetalleFactura } = Props;
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const [p, setP] = React.useState(false);
	const [visibleModal, setVisibleModal] = React.useState(false);

	const click = () => {
		clickFactura(true);
		setP(true);
	};

	const handleNext = () => {
		if (checkCorrecto) {
			setActiveStep(activeStep + 1);
			removeBanderaCabecera(false);
			setP(false);
			clickFactura(false);
		}
	};

	const handleBack = () => {
		clickFactura(false);
		setActiveStep(activeStep - 1);
	};

	function sendFactura() {
		api.post('/Factura/create.php', { Cabecera: Cabecera, Detalle: listaDetalleFactura }).then(response => {});
	}

	useEffect(() => {
		if (p) {
			handleNext();
		}
	});

	return (
		<div>
			<CssBaseline />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h4" align="center">
						Factura
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map(label => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography variant="h5" gutterBottom>
									Thank you for your order.
								</Typography>
								<Typography variant="subtitle1">
									Your order number is #2001539. We have emailed your order confirmation, and will
									send you an update when your order has shipped.
								</Typography>
							</React.Fragment>
						) : (
							<React.Fragment>
								{getStepContent(activeStep)}
								<div className={classes.buttons}>
									{activeStep === 1 ? (
										<div>
											<Button onClick={handleBack} className={classes.button}>
												Atras
											</Button>
										</div>
									) : activeStep !== 0 ? (
										<Button onClick={handleBack} className={classes.button}>
											Atras
										</Button>
									) : null}
									{activeStep === steps.length - 1 ? (
										<Button
											variant="contained"
											color="primary"
											onClick={() => {
												sendFactura();
												setVisibleModal(true);
											}}
											className={classes.button}
										>
											Terminar Factura
										</Button>
									) : (
										<Button
											variant="contained"
											color="primary"
											onClick={() => {
												click();
											}}
											className={classes.button}
										>
											Siguiente
										</Button>
									)}
								</div>
								<ModalConfirm visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
							</React.Fragment>
						)}
					</React.Fragment>
				</Paper>
			</main>
		</div>
	);
}

export function mapStateToProps(state, props) {
	return {
		checkCorrecto: checkCorrecto(state, props),
		Cabecera: Cabecera(state, props),
		listaDetalleFactura: listaDetalleFactura(state, props),
	};
}

const actions = {
	clickFactura,
	removeBanderaCabecera,
};

export default connect(
	mapStateToProps,
	actions
)(Checkout);
