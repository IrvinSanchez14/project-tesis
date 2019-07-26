import { createSelector } from 'reselect';

export const dataEstados = state => state.getIn(['estados', 'data']);

export const getEstados = state => state.getIn(['estados', 'idSelected']);

export const getDataId = createSelector(
	dataEstados,
	getEstados,
	(dataEs, idEstado) => {
		let dataId;
		if (dataEs) {
			dataId = [];
			dataEs.forEach(data => {
				if (data.IdEstado === idEstado) {
					dataId.push({
						id: data.IdEstado,
						estado: data.Estado,
					});
				}
			});
		}
		return dataId;
	}
);

export const getDataBodyId = createSelector(
	dataEstados,
	getEstados,
	(dataEs, idEstado) => {
		let dataBody;
		let d;
		if (dataEs) {
			dataBody = [];
			dataEs.forEach(data => {
				if (data.IdEstado === idEstado) {
					dataBody.push({
						Nombre: data.Nombre,
						Descripcion: data.Descripcion,
						IdEstadoAnterior: data.IdEstadoAnterior,
						IdEstadoSiguiente: data.IdEstadoSiguiente,
					});
					d = {
						IdEstado: data.IdEstado,
						Nombre: data.Nombre,
						Descripcion: data.Descripcion,
						IdEstadoAnterior: data.IdEstadoAnterior,
						IdEstadoSiguiente: data.IdEstadoSiguiente,
					};
				}
			});
		}
		return d;
	}
);
