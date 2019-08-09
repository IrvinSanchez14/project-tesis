import { createSelector } from 'reselect';

export const dataUsuarios = state => state.getIn(['usuarios', 'data']);

export const getIdUsuarios = state => state.getIn(['usuarios', 'idSelected']);

export const getFormResponse = state => state.getIn(['usuarios', 'formularioRespuesta']);

const tiposUsuarios = state => state.getIn(['tipoUsuario', 'data']);

export const listaTipos = createSelector(
	tiposUsuarios,
	getIdUsuarios,
	dataUsuarios,
	(tipo, id, usuarios) => {
		let Datos;
		if (id) {
			let user = [];
			usuarios.map(us => {
				if (us.IdUsuario === id) {
					user.push(us.IdTipoUsuario);
				}
				return user;
			});
			Datos = tipo.sort(function(a, b) {
				if (user[0] === b.Nombre) {
					return 1;
				}
				if (a.Nombre === user[0]) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});
		} else {
			Datos = tipo;
		}
		return Datos;
	}
);

export const getDataId = createSelector(
	dataUsuarios,
	getIdUsuarios,
	(dataTipo, idUsuario) => {
		let dataId;
		if (dataTipo) {
			dataId = [];
			dataTipo.forEach(data => {
				if (data.IdUsuario === idUsuario) {
					dataId.push({
						id: data.IdUsuario,
						Estado: data.estadoTexto,
					});
				}
			});
		}
		return dataId;
	}
);

export const getDataBodyId = createSelector(
	dataUsuarios,
	getIdUsuarios,
	(dataTipo, idUsuario) => {
		let dataBody;
		let d;
		if (dataTipo) {
			dataBody = [];
			dataTipo.forEach(data => {
				if (data.IdUsuario === idUsuario) {
					dataBody.push({
						Nombre: data.Nombre,
						Descripcion: data.Descripcion,
					});
					d = {
						IdUsuario: data.IdUsuario,
						Nombre: data.Nombre,
						Email: data.Email,
						Alias: data.Alias,
						IdTipoUsuario: data.IdTipoUsuario,
						Estado: data.estadoTexto,
						FechaCreacion: data.FechaCreacion,
					};
				}
			});
		}
		return d;
	}
);
