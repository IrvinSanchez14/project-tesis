import { createSelector } from 'reselect';

export const dataProducto = state => state.getIn(['producto', 'data']);

export const getProducto = state => state.getIn(['producto', 'idSelected']);

export const getFormResponse = state => state.getIn(['producto', 'formularioRespuesta']);

const getTipoProducto = state => state.getIn(['tipoProducto', 'data']);
const getUnidadMedida = state => state.getIn(['unidadMedida', 'data']);
const getProveedor = state => state.getIn(['proveedor', 'data']);

export const tiposProductos = createSelector(
	getTipoProducto,
	getProducto,
	dataProducto,
	(tipo, id, producto) => {
		let selectTipo;
		if (id) {
			let PR = [];
			producto.map(p => {
				if (p.IdProducto === id) {
					PR.push(p.tipoProducto);
				}
				return PR;
			});
			selectTipo = tipo.sort(function(a, b) {
				if (PR[0] === b.Nombre) {
					return 1;
				}
				if (a.Nombre === PR[0]) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});
		} else {
			selectTipo = tipo;
		}
		return selectTipo;
	}
);

export const unidadMedida = createSelector(
	getUnidadMedida,
	getProducto,
	dataProducto,
	(unidad, id, producto) => {
		let selectTipo;
		if (id) {
			let PR = [];
			producto.map(p => {
				if (p.IdProducto === id) {
					PR.push(p.Siglas);
				}
				return PR;
			});
			selectTipo = unidad.sort(function(a, b) {
				if (PR[0] === b.Siglas) {
					return 1;
				}
				if (a.Siglas === PR[0]) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});
		} else {
			selectTipo = unidad;
		}
		return selectTipo;
	}
);

export const proveedores = createSelector(
	getProveedor,
	getProducto,
	dataProducto,
	(tipo, id, producto) => {
		let selectTipo;
		if (id) {
			let PR = [];
			producto.map(p => {
				if (p.IdProducto === id) {
					PR.push(p.Proveedor);
				}
				return PR;
			});
			selectTipo = tipo.sort(function(a, b) {
				if (PR[0] === b.Nombre) {
					return 1;
				}
				if (a.Nombre === PR[0]) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});
		} else {
			selectTipo = tipo;
		}
		return selectTipo;
	}
);

export const getDataId = createSelector(
	dataProducto,
	getProducto,
	(dataPro, idProducto) => {
		let dataId;
		if (dataPro) {
			dataId = [];
			dataPro.forEach(data => {
				if (data.IdProducto === idProducto) {
					dataId.push({
						id: data.IdProducto,
						estado: data.Estado,
					});
				}
			});
		}
		return dataId;
	}
);

export const getDataBodyId = createSelector(
	dataProducto,
	getProducto,
	(dataPro, idProducto) => {
		let dataBody;
		let d;
		if (dataPro) {
			dataBody = [];
			dataPro.forEach(data => {
				if (data.IdProducto === idProducto) {
					dataBody.push({
						Nombre: data.Nombre,
						Descripcion: data.Descripcion,
						tipoProducto: data.tipoProducto,
						Siglas: data.Siglas,
						Proveedor: data.Proveedor,
					});
					d = {
						IdProducto: data.IdProducto,
						Nombre: data.Nombre,
						Descripcion: data.Descripcion,
						tipoProducto: data.tipoProducto,
						Siglas: data.Siglas,
						Proveedor: data.Proveedor,
					};
				}
			});
		}
		return d;
	}
);
