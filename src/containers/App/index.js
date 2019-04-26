import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageAdmin from '../../components/PageAdmin';

import { stateSideBarMenu } from './selectors';

class App extends React.Component {
	menu = () => {
		if (localStorage.jwtToken) {
			return <Link to="/tipoUsuario">Admin Tipo Usuario </Link>;
		} else {
			return <Link to="/login">Login </Link>;
		}
	};
	render() {
		return (
			<Router>
				<div key="id1" id="id1">
					<PageAdmin id="id" />
				</div>
			</Router>
		);
	}
}

export function mapStateToProps(state, props) {
	return {
		stateSideBarMenu: stateSideBarMenu(state, props),
	};
}

App.propTypes = {
	stateSideBarMenu: PropTypes.bool,
};

export default connect(mapStateToProps)(App);
