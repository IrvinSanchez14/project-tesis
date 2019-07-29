import { createSelector } from 'reselect';

export const dataProveedor = state => state.getIn(['proveedor', 'data']);

export const getProveedor = state => state.getIn(['proveedor', 'idSelected']);

export const getFormResponse = state => state.getIn(['proveedor', 'formularioRespuesta']);

export const getDataId = createSelector(
	dataProveedor,
	getProveedor,
	(dataPro, idProveedor) => {
		let dataId;
		if (dataPro) {
			dataId = [];
			dataPro.forEach(data => {
				if (data.IdProveedor === idProveedor) {
					dataId.push({
						id: data.IdProveedor,
						estado: data.Estado,
					});
				}
			});
		}
		return dataId;
	}
);

export const getDataBodyId = createSelector(
	dataProveedor,
	getProveedor,
	(dataPro, idProveedor) => {
		let dataBody;
		let d;
		if (dataPro) {
			dataBody = [];
			dataPro.forEach(data => {
				if (data.IdProveedor === idProveedor) {
					dataBody.push({
						Nombre: data.Nombre,
						Direccion: data.Direccion,
						Telefono: data.Telefono,
						Razo_Social: data.Razo_Social,
						Tipo: data.Tipo,
						Nombre_Contacto: data.Nombre_Contacto,
						Email: data.Email,
						DUI: data.DUI,
						NIT: data.NIT,
						NRC: data.NRC,
						Estado: data.Estado,
						FechaCreacion: data.FechaCreacion,
					});
					d = {
						IdProveedor: data.IdProveedor,
						Nombre: data.Nombre,
						Direccion: data.Direccion,
						Telefono: data.Telefono,
						Razo_Social: data.Razo_Social,
						Tipo: data.Tipo,
						Nombre_Contacto: data.Nombre_Contacto,
						Email: data.Email,
						DUI: data.DUI,
						NIT: data.NIT,
						NRC: data.NRC,
						Estado: data.Estado,
						FechaCreacion: data.FechaCreacion,
					};
				}
			});
		}
		return d;
	}
);
