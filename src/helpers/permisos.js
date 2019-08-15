import * as VALIDATE from './constants';

export const permisoVerTipoUsuario = respuesta => {
	const userPermisos = JSON.parse(localStorage.getItem('userPermisos'));
	if (userPermisos !== null) {
		userPermisos.map(permiso => {
			if (permiso.Nombre === VALIDATE.PERMISO_VER_COMPONENT) {
				respuesta = true;
			}
			return respuesta;
		});
	} else {
		respuesta = false;
	}

	return respuesta;
};

export const permisosVerPermisos = respuesta => {
	const userPermisos = JSON.parse(localStorage.getItem('userPermisos'));
	if (userPermisos !== null) {
		userPermisos.map(permiso => {
			if (permiso.Nombre === VALIDATE.PERMISO_VER_COMPONENT_PERMISOS) {
				respuesta = true;
			}
			return respuesta;
		});
	} else {
		respuesta = false;
	}

	return respuesta;
};

export const permisosVerEmpresa = respuesta => {
	const userPermisos = JSON.parse(localStorage.getItem('userPermisos'));
	if (userPermisos !== null) {
		userPermisos.map(permiso => {
			if (permiso.Nombre === VALIDATE.PERMISO_VER_COMPONENT_EMPRESA) {
				respuesta = true;
			}
			return respuesta;
		});
	} else {
		respuesta = false;
	}

	return respuesta;
};

export const permisosVerEstados = respuesta => {
	const userPermisos = JSON.parse(localStorage.getItem('userPermisos'));
	if (userPermisos !== null) {
		userPermisos.map(permiso => {
			if (permiso.Nombre === VALIDATE.PERMISO_VER_COMPONENT_ESTADOS) {
				respuesta = true;
			}
			return respuesta;
		});
	} else {
		respuesta = false;
	}

	return respuesta;
};

export const permisosVerProductos = respuesta => {
	const userPermisos = JSON.parse(localStorage.getItem('userPermisos'));
	if (userPermisos !== null) {
		userPermisos.map(permiso => {
			if (permiso.Nombre === VALIDATE.PERMISO_VER_COMPONENT_PRODUCTOS) {
				respuesta = true;
			}
			return respuesta;
		});
	} else {
		respuesta = false;
	}

	return respuesta;
};

export const permisosVerProveedor = respuesta => {
	const userPermisos = JSON.parse(localStorage.getItem('userPermisos'));
	if (userPermisos !== null) {
		userPermisos.map(permiso => {
			if (permiso.Nombre === VALIDATE.PERMISO_VER_COMPONENT_PROVEEDOR) {
				respuesta = true;
			}
			return respuesta;
		});
	} else {
		respuesta = false;
	}

	return respuesta;
};

export const permisosVerSucursales = respuesta => {
	const userPermisos = JSON.parse(localStorage.getItem('userPermisos'));
	if (userPermisos !== null) {
		userPermisos.map(permiso => {
			if (permiso.Nombre === VALIDATE.PERMISO_VER_COMPONENT_SUCURSALES) {
				respuesta = true;
			}
			return respuesta;
		});
	} else {
		respuesta = false;
	}

	return respuesta;
};

export const permisosVerTipoProducto = respuesta => {
	const userPermisos = JSON.parse(localStorage.getItem('userPermisos'));
	if (userPermisos !== null) {
		userPermisos.map(permiso => {
			if (permiso.Nombre === VALIDATE.PERMISO_VER_COMPONENT_TIPOPRODUCTO) {
				respuesta = true;
			}
			return respuesta;
		});
	} else {
		respuesta = false;
	}

	return respuesta;
};

export const permisosVerUnidadMedida = respuesta => {
	const userPermisos = JSON.parse(localStorage.getItem('userPermisos'));
	if (userPermisos !== null) {
		userPermisos.map(permiso => {
			if (permiso.Nombre === VALIDATE.PERMISO_VER_COMPONENT_UNIDADMEDIDA) {
				respuesta = true;
			}
			return respuesta;
		});
	} else {
		respuesta = false;
	}

	return respuesta;
};

export const permisosVerPermisosUsuarios = respuesta => {
	const userPermisos = JSON.parse(localStorage.getItem('userPermisos'));
	if (userPermisos !== null) {
		userPermisos.map(permiso => {
			if (permiso.Nombre === VALIDATE.PERMISO_VER_COMPONENT_PERMISOUSUARIO) {
				respuesta = true;
			}
			return respuesta;
		});
	} else {
		respuesta = false;
	}

	return respuesta;
};

export const permisosVerUsuarios = respuesta => {
	const userPermisos = JSON.parse(localStorage.getItem('userPermisos'));
	if (userPermisos !== null) {
		userPermisos.map(permiso => {
			if (permiso.Nombre === VALIDATE.PERMISO_VER_COMPONENT_USUARIOS) {
				respuesta = true;
			}
			return respuesta;
		});
	} else {
		respuesta = false;
	}

	return respuesta;
};

export const permisosVerPorciones = respuesta => {
	const userPermisos = JSON.parse(localStorage.getItem('userPermisos'));
	if (userPermisos !== null) {
		userPermisos.map(permiso => {
			if (permiso.Nombre === VALIDATE.PERMISO_VER_COMPONENT_PORCIONES) {
				respuesta = true;
			}
			return respuesta;
		});
	} else {
		respuesta = false;
	}

	return respuesta;
};

export const permisoVerListaExistente = respuesta => {
	const userPermisos = JSON.parse(localStorage.getItem('userPermisos'));
	if (userPermisos !== null) {
		userPermisos.map(permiso => {
			if (permiso.Nombre === VALIDATE.PERMISO_VER_COMPONENT_LISTA_EXISTENTE) {
				respuesta = true;
			}
			return respuesta;
		});
	} else {
		respuesta = false;
	}

	return respuesta;
};
