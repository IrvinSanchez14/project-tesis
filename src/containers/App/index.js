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
import Porciones from '../Porciones';
import ListaProducto from '../ListaProducto';
import CambioPass from '../CambioPass';
import Checkout from '../RecepcionProducto';
import CentroProduccion from '../CentroProduccion';
import Produccion from '../CentroProduccion/Produccion';
import NotaEnvio from '../CentroProduccion/NotaEnvio';

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
				<Route path="/restaurantesivar.com" exact render={() => (isLoggedIn() ? <Welcome /> : <Login />)} />
				<Route path="/TipoUsuario" exact component={TipoUsuario} />
				<Route path="/Empresa" exact component={Empresa} />
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
				<Route path="/Porciones" exact component={Porciones} />
				<Route path="/ListaProducto" exact component={ListaProducto} />
				<Route path="/RecepcionProducto" exact component={Checkout} />
				<Route path="/ListaCP" exact component={CentroProduccion} />
				<Route path="/Produccion" exact component={Produccion} />
				<Route path={`/Produccion/NotaEnvio`} exact component={NotaEnvio} />
				<Route
					path="/CambioPassword"
					exact
					render={() => (!isRenuevaLoggin() ? <Redirect to="/" /> : <CambioPass />)}
				/>
				<Route exact path="/login" render={() => (isLoggedIn() ? <Redirect to="/" /> : <Login />)} />
				<Route exact path="/recuperacion" render={() => (isLoggedIn() ? <Redirect to="/" /> : <Register />)} />
			</Switch>
		</div>
	);
};

export default App;
