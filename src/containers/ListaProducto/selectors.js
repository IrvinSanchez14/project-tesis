import { createSelector } from 'reselect';

export const dataListadoProducto = state => state.getIn(['listadoProducto', 'data']);
export const dataLecturaProducto = state => state.getIn(['listadoProducto', 'lecturaP']);

export const getListadoProducto = state => state.getIn(['listadoProducto', 'idSelected']);

export const getFormResponse = state => state.getIn(['listadoProducto', 'formularioRespuesta']);

const productos = state => state.getIn(['producto', 'data']);
const porciones = state => state.getIn(['porciones', 'data']);

export const productoLista = createSelector(
	productos,
	getListadoProducto,
	dataListadoProducto,
	(producto, id, listaP) => {
		let selectTipo;
		if (id) {
			let PR = [];
			listaP.map(p => {
				if (p.IdListaPP === id) {
					PR.push(p.NombreProducto);
				}
				return PR;
			});
			selectTipo = producto.sort(function(a, b) {
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
			selectTipo = producto;
		}
		return selectTipo;
	}
);
 
export const getDataId = createSelector(
	dataLecturaProducto,
	getListadoProducto,
	(dataPro, idListaPP) => {
		let dataId;
		if (dataPro) {
			dataId = [];
			dataPro.forEach(data => {
				if (data.IdListaPP === idListaPP) {
					dataId.push({
						id: data.IdListaPP,
						estado: data.estadoTexto,
						IdProducto: data.IdProducto,
						NombreProducto: data.NombreProducto,
					});
				}
			});
		}
		return dataId;
	}
);

export const listaPorcion = createSelector(
	porciones,
	dataListadoProducto,
	getDataId,
	(porcion, lista, id) => {
		let selectTipo;
		if (id) {
			const nobreProductoLista = id.map(GB => GB.NombreProducto);
			const l = lista.filter(PNA => nobreProductoLista.includes(PNA.NombreProducto));
			const f = l.map(a => a.IdPorcion);
			selectTipo = porcion.filter(PP => !f.includes(PP.IdPorcion));
		} else {
			selectTipo = porcion;
		}
		return selectTipo;
	}
);

export const listaPProducto = createSelector(
	getDataId,
	dataListadoProducto,
	(bodyid, lista) => {
		let productoPorcion;
		if (bodyid) {
			const nobreProductoLista = bodyid.map(GB => GB.NombreProducto);
			productoPorcion = lista.filter(PNA => nobreProductoLista.includes(PNA.NombreProducto));
		}
		return productoPorcion;
	}
);

export const getDataBodyId = createSelector(
	dataListadoProducto,
	getListadoProducto,
	(dataPro, idListaPP) => {
		let dataBody;
		let d;
		if (dataPro) {
			dataBody = [];
			dataPro.forEach(data => {
				if (data.IdListaPP === idListaPP) {
					dataBody.push({
						NombreProducto: data.NombreProducto,
						Porcion: data.Porcion,
					});
					d = {
						IdListaPP: data.IdListaPP,
						NombreProducto: data.NombreProducto,
						Porcion: data.Porcion,
					};
				}
			});
		}
		return d;
	}
);
