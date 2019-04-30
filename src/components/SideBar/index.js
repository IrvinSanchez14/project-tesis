import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Form, Sidebar, Checkbox, Segment, Button } from 'semantic-ui-react';

import { sidebarStateFalse } from '../../containers/App/actions';

const estilos = {
	btnStyle: {
		float: 'right',
		width: '155px',
	},
};

class SideBarMenu extends React.Component {
	state = { visible: false };
	handleSidebarHide = () => this.props.sidebarStateFalse();

	changeState = () => {};

	toogleBox = () => {};

	headerSide = () => {
		let TODO = [];
		if (this.props.headSide) {
			let estado = [];
			this.props.headSide.map(data => {
				if (data.estado === '0') {
					estado.push(<Checkbox key={`checkBox`} onClick={() => this.changeState()} checked toggle />);
				} else {
					estado.push(<Checkbox toggle />);
				}
				TODO.push(
					<div key="headID">
						<div>
							<h3>{data.id}</h3>
						</div>
						<div>{estado}</div>
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

	render() {
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
					<Menu.Item as="a">{this.headerSide()}</Menu.Item>
					<Menu.Item as="a">
						<div>{this.props.frmTable}</div>
					</Menu.Item>
					<div
						style={{
							position: 'absolute',
							bottom: '0',
							width: '100%',
							height: '60px',
						}}
					>
						<Button primary onClick={this.props.saveButton} style={estilos.btnStyle}>
							Guardar
						</Button>
						<Button negative style={estilos.btnStyle} onClick={this.props.sidebarStateFalse}>
							Cancelar
						</Button>
					</div>
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
