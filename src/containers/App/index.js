import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../components/Header';

import Welcome from '../Welcome';
import TipoUsuario from '../TipoUsuario';
import Login from '../Login';
import { isLoggedIn } from '../../helpers/check-auth';

const App = () => {
	return (
		<div>
			<Header stateLogin={isLoggedIn()} />
			<Switch>
				<Route path="/" exact render={() => (isLoggedIn() ? <Welcome /> : <Login />)} />
				<Route path="/TipoUsuario" exact component={TipoUsuario} />
				<Route exact path="/login" render={() => (isLoggedIn() ? <Redirect to="/" /> : <Login />)} />
			</Switch>
		</div>
	);
};

export default App;
