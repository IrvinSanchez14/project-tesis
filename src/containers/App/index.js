import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../components/Header';

import Welcome from '../Welcome';
import TipoUsuario from '../TipoUsuario';
import Login from '../Login';
import Register from '../Registro';
import { isLoggedIn } from '../../helpers/check-auth';
import Empresa from '../Empresa';
import ListaExistente from '../ListaExistente';
import ReduxEjemplo from '../EjemploRedux';
import UnidadMedida from '../UnidadMedida';
import Sucursales from '../Sucursales';
import Productos from '../Productos';
import Ejemplo from '../Ejemplo';

const App = () => {
	return (
		<div>
			<Header stateLogin={isLoggedIn()} />
			<Switch>
				<Route path="/" exact render={() => (isLoggedIn() ? <Welcome /> : <Login />)} />
				<Route path="/Ejemplo" exact component={Ejemplo} />
				<Route path="/TipoUsuario" exact component={TipoUsuario} />
				<Route path="/Empresa" exact component={Empresa} />
				<Route path="/ListaExistente" exact component={ListaExistente} />
				<Route path="/UnidadMedida" exact component={UnidadMedida} />
				<Route path="/Sucursales" exact component={Sucursales} />
				<Route path="/Productos" exact component={Productos} />
				<Route path="/redux" exact component={ReduxEjemplo} />
				<Route exact path="/login" render={() => (isLoggedIn() ? <Redirect to="/" /> : <Login />)} />
				<Route exact path="/SignUp" render={() => (isLoggedIn() ? <Redirect to="/" /> : <Register />)} />
			</Switch>
		</div>
	);
};

export default App;
