import { createSelector } from 'reselect';

export const dataProducto = state => state.getIn(['producto', 'data']);

export const getProducto = state => state.getIn(['producto', 'idSelected']);

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
					});
					d = {
						IdProducto: data.IdProducto,
						Nombre: data.Nombre,
						Descripcion: data.Descripcion,
					};
				}
			});
		}
		return d;
	}
);
