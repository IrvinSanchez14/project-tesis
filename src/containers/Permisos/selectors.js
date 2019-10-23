import { createSelector } from 'reselect';

export const dataPermiso = state => state.getIn(['permiso', 'data']);

export const getPermiso = state => state.getIn(['permiso', 'idSelected']);

export const getFormResponse = state => state.getIn(['permiso', 'formularioRespuesta']);

export const getDataId = createSelector(
	dataPermiso,
	getPermiso,
	(dataPer, idPermiso) => {
		let dataId;
		if (dataPer) {
			dataId = [];
			dataPer.forEach(data => {
				if (data.IdPermiso === idPermiso) {
					dataId.push({
						id: data.IdPermiso,
						Estado: data.Estado,
					});
				}
			});
		}
		return dataId;
	}
);

export const getDataBodyId = createSelector(
	dataPermiso,
	getPermiso,
	(dataPer, idPermiso) => {
		let dataBody;
		let d;
		if (dataPer) {
			dataBody = [];
			dataPer.forEach(data => {
				if (data.IdPermiso === idPermiso) {
					dataBody.push({
						Nombre: data.Nombre,
						Descripcion: data.Descripcion,
						FechaCreacion: data.FechaCreacion,
					});
					d = {
						IdPermiso: data.IdPermiso,
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
