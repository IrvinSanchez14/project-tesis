import { createSelector } from 'reselect';

export const dataEmpresa = state => state.getIn(['empresa', 'data']);

export const getEmpresa = state => state.getIn(['empresa', 'idSelected']);

export const getFormResponse = state => state.getIn(['empresa', 'formularioRespuesta']);

export const getDataId = createSelector(
	dataEmpresa,
	getEmpresa,
	(dataEmp, idEmpresa) => {
		let dataId;
		if (dataEmp) {
			dataId = [];
			dataEmp.forEach(data => {
				if (data.IdEmpresa === idEmpresa) {
					dataId.push({
						id: data.IdEmpresa,
						estado: data.Estado,
					});
				}
			});
		}
		return dataId;
	}
);

export const getDataBodyId = createSelector(
	dataEmpresa,
	getEmpresa,
	(dataEmp, idEmpresa) => {
		let dataBody;
		let d;
		if (dataEmp) {
			dataBody = [];
			dataEmp.forEach(data => {
				if (data.IdEmpresa === idEmpresa) {
					dataBody.push({
						Nombre: data.Nombre,
						Razon_Social: data.Razon_Social,
						Direccion: data.Direccion,
						Telefono: data.Telefono,
						Correo: data.Correo,
					});
					d = {
						IdEmpresa: data.IdEmpresa,
						Nombre: data.Nombre,
						Razon_Social: data.Razon_Social,
						Direccion: data.Direccion,
						Telefono: data.Telefono,
						Correo: data.Correo,
					};
				}
			});
		}
		return d;
	}
);
