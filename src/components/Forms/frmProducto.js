import React from 'react';
import { fromJS } from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

import { getFormResponse, tiposProductos, unidadMedida, proveedores } from '../../containers/Productos/selectors';

const validate = values => {
	// IMPORTANT: values is an Immutable.Map here!
	const errors = {};
	if (!values.get('Nombre')) {
		errors.Nombre = 'Requerido';
	} else if (values.get('Nombre').length > 20) {
		errors.Nombre = 'Must be 20 characters or less';
	}
	if (!values.get('Descripcion')) {
		errors.Descripcion = 'Requerido';
	}

	if (!values.get('tipoProducto')) {
		errors.tipoProducto = 'Requerido';
	}

	if (!values.get('Siglas')) {
		errors.Siglas = 'Requerido';
	}

	if (!values.get('Proveedor')) {
		errors.Proveedor = 'Requerido';
	}
	return errors;
};

class FrmEmpresa extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta: { touched, error, warning } }) => {
		const className = `field ${error && touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{touched && (error && <span style={{ color: 'red' }}>{error}</span>)}
			</div>
		);
	};

	renderSelectUnidad = ({ input, label, meta: { touched, error, warning } }) => {
		const className = `field ${error && touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<select {...input}>
					{this.props.createData ? <option /> : null}
					{this.props.unidadMedida
						? this.props.unidadMedida.map(UM => {
								return (
									<option key={UM.IdUnidadMedida} value={UM.IdUnidadMedida}>
										{UM.Siglas}
									</option>
								);
						  })
						: null}
				</select>
			</div>
		);
	};

	renderSelectProveedor = ({ input, label, meta: { touched, error, warning } }) => {
		const className = `field ${error && touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<select {...input}>
					{this.props.createData ? <option /> : null}
					{this.props.proveedores
						? this.props.proveedores.map(P => {
								return (
									<option key={P.IdProveedor} value={P.IdProveedor}>
										{P.Nombre}
									</option>
								);
						  })
						: null}
				</select>
			</div>
		);
	};
	//{this.renderError(meta)}
	renderSelectTipo = ({ input, label, meta: { touched, error, warning } }) => {
		const className = `field ${error && touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<select {...input}>
					{this.props.createData ? <option /> : null}
					{this.props.tiposProductos
						? this.props.tiposProductos.map(TP => {
								return (
									<option key={TP.IdTipoProducto} value={TP.IdTipoProducto}>
										{TP.Nombre}
									</option>
								);
						  })
						: null}
				</select>
			</div>
		);
	};

	onSubmit = formValues => {
		let data;
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (this.props.createData) {
			data = fromJS({
				flag: 'create',
				UsuarioCreador: userInfo.IdUsuario,
			});
		} else {
			data = fromJS({
				flag: 'update',
				UsuarioActualiza: userInfo.IdUsuario,
			});
		}

		const newData = formValues.mergeDeep(data);
		this.props.onSubmit(newData.toJS());
	};

	validateClean = () => {
		const { reset } = this.props;
		if (this.props.getFormResponse) {
			reset();
		}
	};

	render() {
		this.validateClean();
		if (this.props.createData) {
			return (
				<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
					<Field name="Nombre" component={this.renderInput} label="Nombre" />
					<Field name="Descripcion" component={this.renderInput} label="Descripcion" />
					<Field name="tipoProducto" component={this.renderSelectTipo} label="Tipo Producto" />
					<Field name="Siglas" component={this.renderSelectUnidad} label="Siglas" />
					<Field name="Proveedor" component={this.renderSelectProveedor} label="Proveedor" />
					<div
						style={{
							bottom: '0',
							width: '100%',
							height: '60px',
						}}
					>
						<button className="ui buttonGuardar">Guardar</button>
					</div>
				</form>
			);
		} else {
			return (
				<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
					<Field name="Nombre" component={this.renderInput} label="Nombre" />
					<Field name="Descripcion" component={this.renderInput} label="Descripcion" />
					<Field name="IdTipoProducto" component={this.renderSelectTipo} label="Tipo Producto" />
					<Field name="IdUnidadMedida" component={this.renderSelectUnidad} label="Siglas" />
					<Field name="IdProveedor" component={this.renderSelectProveedor} label="Proveedor" />
					<div
						style={{
							bottom: '0',
							width: '100%',
							height: '60px',
						}}
					>
						<button className="ui buttonGuardar">Guardar</button>
					</div>
				</form>
			);
		}
	}
}

export function mapStateToProps(state, props) {
	return {
		getFormResponse: getFormResponse(state, props),
		tiposProductos: tiposProductos(state, props),
		unidadMedida: unidadMedida(state, props),
		proveedores: proveedores(state, props),
	};
}

export default connect(mapStateToProps)(
	reduxForm({
		form: 'formEmpresa',
		validate,
		enableReinitialize: true,
	})(FrmEmpresa)
);
