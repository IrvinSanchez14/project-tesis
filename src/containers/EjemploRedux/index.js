import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { confirmPrompt } from '../../components/ConfirmPrompt';

import { reduxCarga, fetchReduxData } from './actions';

class ReduxEjemplo extends React.Component {
	componentDidMount() {
		console.log(this.props);
		this.props.fetchReduxData();
	}

	render() {
		return (
			<div>
				<h1>Redux Ejemplo</h1>
				<button onClick={() => console.log(confirmPrompt())}>Click</button>
			</div>
		);
	}
}

ReduxEjemplo.propTypes = {
	titulo: PropTypes.string,
	reduxCarga: PropTypes.any,
	fetchReduxData: PropTypes.func,
};

export function mapStateToProps(state, props) {
	return {};
}

export const actions = {
	reduxCarga,
	fetchReduxData,
};

export default connect(
	mapStateToProps,
	actions
)(ReduxEjemplo);
