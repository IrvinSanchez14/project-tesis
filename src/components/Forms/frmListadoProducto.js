import React from 'react';
import { fromJS } from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getFormResponse, productoLista, listaPorcion, listaPProducto } from '../../containers/ListaProducto/selectors';

class FrmListadoProducto extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderSelectUnidad = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		let nombrePorcion;
		if (_.isEmpty(this.props.initialValues.toJS())) {
			console.log('vacio');
		} else {
			const valoresIniciales = this.props.initialValues.toJS();
			const cambioString = valoresIniciales.Porcion.split(' ');
			nombrePorcion = this.props.listaPorcion.sort(function(a, b) {
				if (cambioString[0] === b.Cantidad) {
					return 1;
				}
				if (a.UnidadMedida === cambioString[1]) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});
		}
		return (
			<div className={className}>
				<label>{label}</label>
				<select id="pr2" {...input}>
					{this.props.createData ? <option /> : null}
					{this.props.listaPorcion
						? this.props.listaPorcion.map(lp => {
								return (
									<option key={lp.IdPorcion} value={lp.IdPorcion}>
										{`${lp.Cantidad} ${lp.UnidadMedida}`}
									</option>
								);
						  })
						: null}
				</select>
				{this.renderError(meta)}
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
			});
		} else {
			data = fromJS({
				flag: 'update',
				UsuarioActualiza: userInfo.IdUsuario,
				valueSelect: valueSelect,
				valueSelectSucursal: valueSelectSucursal,
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
		const renderLista = ({ input, label, meta }) => {
			const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
			return (
				<div className={className}>
					<label>{label}</label>
					<ol style={{ color: 'black' }}>
						{this.props.listaPProducto ? (
							this.props.listaPProducto
								.sort(function(a, b) {
									return a.IdListaPP - b.IdListaPP;
								})
								.map(registro => {
									return (
										<li
											key={registro.IdListaPP}
											onClick={() => this.deleteUsuarioPermido(registro.IdListaPP)}
										>
											{registro.Porcion}
										</li>
									);
								})
						) : (
							<p>No Hay Registro</p>
						)}
					</ol>
				</div>
			);
		};

		const renderInput = ({ input, label, meta }) => {
			const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
			let nombreProducto;
			if (_.isEmpty(this.props.initialValues.toJS())) {
				console.log('vacio');
			} else {
				const valoresIniciales = this.props.initialValues.toJS();
				nombreProducto = this.props.productoLista.sort(function(a, b) {
					if (valoresIniciales.NombreProducto === b.Nombre) {
						return 1;
					}
					if (a.Nombre === valoresIniciales.NombreProducto) {
						return -1;
					}
					// a must be equal to b
					return 0;
				});
			}
			return (
				<div className={className}>
					<label>{label}</label>
					<select id="pr" {...input}>
						{this.props.createData ? <option /> : null}
						{this.props.productoLista
							? this.props.productoLista.map(P => {
									return (
										<option key={P.IdProducto} value={P.IdProducto}>
											{P.Nombre}
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
				<Field name="NombreProducto" component={renderInput} label="Nombre Producto" />
				<Field name="Porcion" component={this.renderSelectUnidad} label="Porcion" />
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
		productoLista: productoLista(state, props),
		listaPorcion: listaPorcion(state, props),
		listaPProducto: listaPProducto(state, props),
	};
}

export default connect(mapStateToProps)(
	reduxForm({
		form: 'formPorciones',
		enableReinitialize: true,
	})(FrmListadoProducto)
);
