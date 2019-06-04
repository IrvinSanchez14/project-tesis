import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Form, Sidebar, Segment } from 'semantic-ui-react';

import { sidebarStateFalse } from '../../containers/App/actions';

const estilos = {
	btnStyle: {
		float: 'right',
		width: '155px',
	},
	lblID: {
		fontSize: '2em',
	},
};

class SideBarMenu extends React.Component {
	state = { visible: false };

	handleSidebarHide = () => this.props.sidebarStateFalse();

	changeState = () => {};

	toogleBox = () => {};

	change = () => {
		let datos = {
			id: this.refs.check_me.id,
			state: this.refs.check_me.checked,
		};
		this.props.onClick(datos);
	};

	headerSide = () => {
		let TODO = [];
		if (this.props.headSide) {
			let estado = [];
			this.props.headSide.map(data => {
				TODO.push(
					<div key="headID">
						<div className="ui toggle checkbox">
							<input type="checkbox" name="public" ref="check_me" id={data.id} onClick={this.change} />
							<label style={estilos.lblID}>{data.id}</label>
						</div>
					</div>
				);
				return estado;
			});
		}
		return TODO;
	};

	BodySide = () => {
		let body = [];
		if (this.props.bodySide) {
			this.props.bodySide.map(data => {
				let children = [];
				for (let prop in data) {
					children.push(<Form.Input key={`form${prop}`} fluid label={prop} value={data[prop]} />);
				}
				body.push(children);
				return data;
			});
		}
		return body;
	};

	save = () => {
		this.refs.check_me.checked = true;
	};

	render() {
		let chek;
		if (this.refs.check_me) {
			this.props.headSide.map(data => {
				if (data.estado === '0') {
					chek = this.refs.check_me.checked = true;
				} else {
					chek = this.refs.check_me.checked = false;
				}
				return chek;
			});
		}
		return (
			<div>
				<Sidebar
					as={Menu}
					animation="overlay"
					direction="right"
					icon="labeled"
					inverted
					onHide={this.handleSidebarHide}
					vertical
					visible={this.props.SideBarVisible}
					width="thin"
					style={{ width: '35%', backgroundColor: 'white', borderLeft: 'red solid' }}
				>
					<div
						style={{
							height: '46px',
							backgroundColor: '#F0A893',
						}}
					/>
					<Menu.Item as="a">{this.headerSide()}</Menu.Item>
					<Menu.Item as="a">
						<div>{this.props.frmTable}</div>
					</Menu.Item>
				</Sidebar>
				<Sidebar.Pusher>
					<Segment basic>{this.props.content}</Segment>
				</Sidebar.Pusher>
			</div>
		);
	}
}

export function mapStateToProps(state, props) {
	return {};
}

export const actions = {
	sidebarStateFalse,
};

SideBarMenu.propTypes = {
	sidebarStateFalse: PropTypes.func,
};

export default connect(
	mapStateToProps,
	actions
)(SideBarMenu);
