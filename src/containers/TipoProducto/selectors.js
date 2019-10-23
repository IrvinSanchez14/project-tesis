import { createSelector } from 'reselect';

export const dataTipoProducto = state => state.getIn(['tipoProducto', 'data']);

export const getTipoProducto = state => state.getIn(['tipoProducto', 'idSelected']);

export const getFormResponse = state => state.getIn(['tipoProducto', 'formularioRespuesta']);

export const getDataId = createSelector(
	dataTipoProducto,
	getTipoProducto,
	(dataTip, idTipoProducto) => {
		let dataId;
		if (dataTip) {
			dataId = [];
			dataTip.forEach(data => {
				if (data.IdTipoProducto === idTipoProducto) {
					dataId.push({
						id: data.IdTipoProducto,
						Estado: data.Estado,
					});
				}
			});
		}
		return dataId;
	}
);

export const getDataBodyId = createSelector(
	dataTipoProducto,
	getTipoProducto,
	(dataTip, idTipoProducto) => {
		let dataBody;
		let d;
		if (dataTip) {
			dataBody = [];
			dataTip.forEach(data => {
				if (data.IdTipoProducto === idTipoProducto) {
					dataBody.push({
						Nombre: data.Nombre,
						Descripcion: data.Descripcion,
						FechaCreacion: data.FechaCreacion,
					});
					d = {
						IdTipoProducto: data.IdTipoProducto,
						Nombre: data.Nombre,
						Descripcion: data.Descripcion,
						FechaCreacion: data.FechaCreacion,
					};
				}
			});
		}
		return d;
	}
);
