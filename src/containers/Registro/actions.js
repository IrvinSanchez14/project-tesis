import { REGISTER_REQUESTING } from './constants';

export const registerRequesting = ({ Nombre, Email, Alias, IdTipoUsuario, Passwd }) => ({
	type: REGISTER_REQUESTING,
	Nombre,
	Email,
	Alias,
	IdTipoUsuario,
	Passwd,
});
