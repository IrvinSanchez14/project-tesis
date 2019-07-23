import { createSelector } from 'reselect';

export const dataSucursal = state => state.getIn(['sucursal', 'data']);

export const getSucursal = state => state.getIn(['sucursal', 'idSelected']);

export const getDataId = createSelector(
	dataSucursal,
	getSucursal,
	(dataSu, idSucursal) => {
		let dataId;
		if (dataSu) {
			dataId = [];
			dataSu.forEach(data => {
				if (data.IdSucursal === idSucursal) {
					dataId.push({
						id: data.IdSucursal,
						estado: data.Estado,
					});
				}
			});
		}
		return dataId;
	}
);

export const getDataBodyId = createSelector(
	dataSucursal,
	getSucursal,
	(dataSu, idSucursal) => {
		let dataBody;
		let d;
		if (dataSu) {
			dataBody = [];
			dataSu.forEach(data => {
				if (data.IdSucursal === idSucursal) {
					dataBody.push({
						Nombre: data.Nombre,
						Direccion: data.Direccion,
						Telefono: data.Telefono,
					});
					d = {
						IdSucursal: data.IdSucursal,
						Nombre: data.Nombre,
						Direccion: data.Direccion,
						Telefono: data.Telefono,
						Estado: data.Estado,
					};
				}
			});
		}
		return d;
	}
);
