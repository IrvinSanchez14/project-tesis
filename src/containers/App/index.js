import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../../history';
import Header from '../../components/Header';

import Welcome from '../Welcome';
import TipoUsuario from '../TipoUsuario';

const App = () => {
	return (
		<div>
			<Router history={history}>
				<div>
					<Header />
					<Switch>
						<Route path="/" exact component={Welcome} />
						<Route path="/TipoUsuario" exact component={TipoUsuario} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
