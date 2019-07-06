import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../components/Header';

import Welcome from '../Welcome';
import TipoUsuario from '../TipoUsuario';
import Login from '../Login';
import Register from '../Registro';
import { isLoggedIn } from '../../helpers/check-auth';
import Empresa from '../Empresa';

const App = () => {
	return (
		<div>
			<Header stateLogin={isLoggedIn()} />
			<Switch>
				<Route path="/" exact render={() => (isLoggedIn() ? <Welcome /> : <Login />)} />
				<Route path="/TipoUsuario" exact component={TipoUsuario} />
				<Route path="/Empresa" exact component={Empresa} />
				<Route exact path="/login" render={() => (isLoggedIn() ? <Redirect to="/" /> : <Login />)} />
				<Route exact path="/SignUp" render={() => (isLoggedIn() ? <Redirect to="/" /> : <Register />)} />
			</Switch>
		</div>
	);
};

export default App;
