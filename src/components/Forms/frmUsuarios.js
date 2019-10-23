import React from 'react';
import { fromJS } from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

import { getFormResponse } from '../../containers/TipoUsuario/selectors';
import { dataSucursal } from '../../containers/Sucursales/selectors';
import { getDataBodyId } from '../../containers/Usuarios/selectors';

const validate = values => {
	// IMPORTANT: values is an Immutable.Map here!
	const errors = {};
	if (!values.get('IdTipoUsuario')) {
		errors.IdTipoUsuario = 'Required';
	}
	if (!values.get('Nombre')) {
		errors.Nombre = 'Required';
	} else if (values.get('Nombre').length > 20) {
		errors.IdTipoUsuario = 'Must be 20 characters or less';
	}
	if (!values.get('Descripcion')) {
		errors.Descripcion = 'Required';
	}
	if (!values.get('Email')) {
		errors.Email = 'Requerido';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('Email'))) {
		errors.Email = 'Verifique el crreo';
	}

	if (!values.get('Passwd')) {
		errors.Passwd = 'Required';
	}

	if (!values.get('Alias')) {
		errors.Alias = 'Required';
	}
	return errors;
};

class FrmUsuario extends React.Component {
	state = { sucursal: 0 };
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderNewObject(input) {
		if (input.value === '2' || input.value === '3' || input.value === 'Gerente' || input.value === 'Supervisor') {
			this.setState({
				sucursal: 1,
			});
		} else {
			this.setState({
				sucursal: 0,
			});
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

	renderSucursalExiste = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<select {...input}>
					{this.props.createData ? <option /> : null}
					{this.props.dataSucursal
						? this.props.dataSucursal.map(sucursal => {
								return (
									<option key={sucursal.IdSucursal} value={sucursal.IdSucursal}>
										{sucursal.Nombre}
									</option>
								);
						  })
						: null}
				</select>
				{this.renderError(meta)}
			</div>
		);
	};

	renderPassw = ({ input, label, meta: { touched, error, warning } }) => {
		const className = `field ${error && touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" type="password" />
				{touched && (error && <span style={{ color: 'red' }}>{error}</span>)}
			</div>
		);
	};

	renderSelect = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<select id="pr" {...input}>
					{this.props.createData ? <option /> : null}
					{this.props.listaTipos
						? this.props.listaTipos.map(permiso => {
								return (
									<option key={permiso.IdTipoUsuario} value={permiso.IdTipoUsuario}>
										{permiso.Nombre}
									</option>
								);
						  })
						: null}
				</select>
				{console.log(
					'prueba',
					document.getElementById('pr') === null ? 'error' : document.getElementById('pr').value
				)}
				{this.renderError(meta)}
				{this.renderNewObject(input)}
			</div>
		);
	};

	onSubmit = formValues => {
		let data;
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		const valueSelect = document.getElementById('pr') === null ? 'error' : document.getElementById('pr').value;
		const valueSelectSucursal =
			document.getElementById('pr2') === null ? 'error' : document.getElementById('pr2').value;
		if (this.props.createData) {
			data = fromJS({
				flag: 'create',
				UsuarioCreador: userInfo.IdUsuario,
				valueSelectSucursal: valueSelectSucursal,
				IdSucursal: 3,
			});
		} else {
			data = fromJS({
				flag: 'update',
				valueSelect: valueSelect,
				valueSelectSucursal: valueSelectSucursal,
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

		const renderSucursal = ({ input, label, meta }) => {
			const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
			/*nombreSucursal = this.props.dataSucursal.sort(function(a, b) {
				if (arreglo.Sucursal === b.Nombre) {
					return 1;
				}
				if (a.Nombre === arreglo.Sucursal) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});*/

			return (
				<div className={className}>
					<label>{label}</label>
					<select id="pr2" {...input}>
						{this.props.createData ? <option /> : null}
						{this.props.dataSucursal
							? this.props.dataSucursal.map(sucursal => {
									return (
										<option key={sucursal.IdSucursal} value={sucursal.IdSucursal}>
											{sucursal.Nombre}
										</option>
									);
							  })
							: null}
					</select>
					{this.renderError(meta)}
				</div>
			);
		};
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="Nombre" component={this.renderInput} label="Nombre" />
				<Field name="Email" component={this.renderInput} label="Email" />
				<Field name="Alias" component={this.renderInput} label="Alias" />
				<Field name="IdTipoUsuario" component={this.renderSelect} label="Rol" />
				<Field name="IdSucursal" component={renderSucursal} label="Sucursal" />
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

export function mapStateToProps(state, props) {
	return {
		getFormResponse: getFormResponse(state, props),
		dataSucursal: dataSucursal(state, props),
		getDataBodyId: getDataBodyId(state, props),
	};
}

export default connect(mapStateToProps)(
	reduxForm({
		form: 'formUsuarios',
		validate,
		enableReinitialize: true,
	})(FrmUsuario)
);
