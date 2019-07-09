import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../components/Header';

import Welcome from '../Welcome';
import TipoUsuario from '../TipoUsuario';
import Login from '../Login';
import Register from '../Registro';
import { isLoggedIn, isRenuevaLoggin } from '../../helpers/check-auth';
import Empresa from '../Empresa';
import ListaExistente from '../ListaExistente';
import ReduxEjemplo from '../EjemploRedux';
import UnidadMedida from '../UnidadMedida';
import Sucursales from '../Sucursales';
import Productos from '../Productos';
import TipoProducto from '../TipoProducto';
import Proveedor from '../Proveedor';
import Permisos from '../Permisos';
import Estados from '../Estados';
import PermisosUsuarios from '../PermisosUsuarios';
import Usuarios from '../Usuarios';
<<<<<<< HEAD
import Porciones from '../Porciones';
import ListaProducto from '../ListaProducto';
import CambioPass from '../CambioPass';
=======
import Ejemplo1 from './../Ejemplo1';
>>>>>>> src/containers/Ejemplo1

const App = () => {
	const local = JSON.parse(localStorage.getItem('userInfo'));
	let tipo;
	if (local !== null) {
		tipo = local.IdTipoUsuario;
	}

	return (
		<div>
			<Header stateLogin={isLoggedIn()} tipoUsuario={tipo} />
			<Switch>
				<Route path="/" exact render={() => (isLoggedIn() ? <Welcome /> : <Login />)} />
				<Route path="/TipoUsuario" exact component={TipoUsuario} />
				<Route path="/Empresa" exact component={Empresa} />
<<<<<<< HEAD
				<Route path="/ListaExistente" exact component={ListaExistente} />
				<Route path="/UnidadMedida" exact component={UnidadMedida} />
				<Route path="/Sucursales" exact component={Sucursales} />
				<Route path="/Productos" exact component={Productos} />
				<Route path="/redux" exact component={ReduxEjemplo} />
				<Route path="/TipoProducto" exact component={TipoProducto} />
				<Route path="/Proveedores" exact component={Proveedor} />
				<Route path="/Permisos" exact component={Permisos} />
				<Route path="/Estados" exact component={Estados} />
				<Route path="/PermisosUsuarios" exact component={PermisosUsuarios} />
				<Route path="/Usuarios" exact component={Usuarios} />
<<<<<<< HEAD
				<Route path="/Porciones" exact component={Porciones} />
				<Route path="/ListaProducto" exact component={ListaProducto} />
				<Route
					path="/CambioPassword"
					exact
					render={() => (!isRenuevaLoggin() ? <Redirect to="/" /> : <CambioPass />)}
				/>
=======
=======
				<Route path="/Ejemplo1" exact component={Ejemplo1} />
>>>>>>> src/containers/Ejemplo1
>>>>>>> src/containers/Ejemplo1
				<Route exact path="/login" render={() => (isLoggedIn() ? <Redirect to="/" /> : <Login />)} />
				<Route exact path="/recuperacion" render={() => (isLoggedIn() ? <Redirect to="/" /> : <Register />)} />
			</Switch>
		</div>
	);
};

export default App;
