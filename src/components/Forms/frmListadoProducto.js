import React from 'react';
import { fromJS } from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

import { getFormResponse, productoLista, listaPorcion } from '../../containers/ListaProducto/selectors';

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

	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<select {...input}>
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

	renderSelectUnidad = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<select {...input}>
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
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="NombreProducto" component={this.renderInput} label="Nombre Producto" />
				<Field name="Porcion" component={this.renderSelectUnidad} label="Porcion" />

				<div
					style={{
						bottom: '0',
						width: '100%',
						height: '60px',
					}}
				>
					<button className="ui button primary">Guardar</button>
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
	};
}

export default connect(mapStateToProps)(
	reduxForm({
		form: 'formPorciones',
		enableReinitialize: true,
	})(FrmListadoProducto)
);
