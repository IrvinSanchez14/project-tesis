import { createSelector } from 'reselect';

export const dataTipoUsuario = state => state.getIn(['tipoUsuario', 'data']);

export const getIdTipoUsuario = state => state.getIn(['tipoUsuario', 'idSelected']);

export const getDataId = createSelector(
	dataTipoUsuario,
	getIdTipoUsuario,
	(dataTipo, idTipoUsuario) => {
		let dataId;
		if (dataTipo) {
			dataId = [];
			dataTipo.forEach(data => {
				if (data.IdTipoUsuario === idTipoUsuario) {
					dataId.push({
						id: data.IdTipoUsuario,
						Estado: data.Estado,
					});
				}
			});
		}
		return dataId;
	}
);

export const getDataBodyId = createSelector(
	dataTipoUsuario,
	getIdTipoUsuario,
	(dataTipo, idTipoUsuario) => {
		let dataBody;
		let d;
		if (dataTipo) {
			dataBody = [];
			dataTipo.forEach(data => {
				if (data.IdTipoUsuario === idTipoUsuario) {
					dataBody.push({
						Nombre: data.Nombre,
						Descripcion: data.Descripcion,
					});
					d = {
						IdTipoUsuario: data.IdTipoUsuario,
						Nombre: data.Nombre,
						Descripcion: data.Descripcion,
						Estado: data.Estado,
					};
				}
			});
		}
		return d;
	}
);
