import { createSelector } from 'reselect';

export const dataUnidadMedida = state => state.getIn(['unidadMedida', 'data']);

export const getUnidadMedida = state => state.getIn(['unidadMedida', 'idSelected']);

export const getFormResponse = state => state.getIn(['unidadMedida', 'formularioRespuesta']);

export const getDataId = createSelector(
	dataUnidadMedida,
	getUnidadMedida,
	(dataUn, idUnidad) => {
		let dataId;
		if (dataUn) {
			dataId = [];
			dataUn.forEach(data => {
				if (data.IdUnidadMedida === idUnidad) {
					dataId.push({
						id: data.IdUnidadMedida,
						estado: data.Estado,
					});
				}
			});
		}
		return dataId;
	}
);

export const getDataBodyId = createSelector(
	dataUnidadMedida,
	getUnidadMedida,
	(dataUn, idUnidad) => {
		let dataBody;
		let d;
		if (dataUn) {
			dataBody = [];
			dataUn.forEach(data => {
				if (data.IdUnidadMedida === idUnidad) {
					dataBody.push({
						Siglas: data.Siglas,
						Nombre: data.Nombre,
					});
					d = {
						IdUnidadMedida: data.IdUnidadMedida,
						Siglas: data.Siglas,
						Nombre: data.Nombre,
					};
				}
			});
		}
		return d;
	}
);
