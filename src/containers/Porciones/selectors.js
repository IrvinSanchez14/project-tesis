import { createSelector } from 'reselect';

export const dataPorciones = state => state.getIn(['porciones', 'data']);

export const getPorciones = state => state.getIn(['porciones', 'idSelected']);

export const getFormResponse = state => state.getIn(['porciones', 'formularioRespuesta']);

const unidadMedida = state => state.getIn(['unidadMedida', 'data']);

export const unidadesMedidas = createSelector(
	unidadMedida,
	getPorciones,
	dataPorciones,
	(unidad, id, porciones) => {
		let selectTipo;
		if (id) {
			let PR = [];
			porciones.map(p => {
				if (p.IdPorcion === id) {
					PR.push(p.UnidadMedida);
				}
				return PR;
			});
			selectTipo = unidad.sort(function(a, b) {
				if (PR[0] === b.Nombre) {
					return 1;
				}
				if (a.Nombre === PR[0]) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});
		} else {
			selectTipo = unidad;
		}
		return selectTipo;
	}
);

export const getDataId = createSelector(
	dataPorciones,
	getPorciones,
	(dataPro, idPorcion) => {
		let dataId;
		if (dataPro) {
			dataId = [];
			dataPro.forEach(data => {
				if (data.IdPorcion === idPorcion) {
					dataId.push({
						id: data.IdPorcion,
						estado: data.estadoTexto,
					});
				}
			});
		}
		return dataId;
	}
);

export const getDataBodyId = createSelector(
	dataPorciones,
	getPorciones,
	(dataPro, idPorcion) => {
		let dataBody;
		let d;
		if (dataPro) {
			dataBody = [];
			dataPro.forEach(data => {
				if (data.IdPorcion === idPorcion) {
					dataBody.push({
						Cantidad: data.Cantidad,
						UnidadMedida: data.UnidadMedida,
					});
					d = {
						IdPorcion: data.IdPorcion,
						Cantidad: data.Cantidad,
						UnidadMedida: data.UnidadMedida,
					};
				}
			});
		}
		return d;
	}
);
