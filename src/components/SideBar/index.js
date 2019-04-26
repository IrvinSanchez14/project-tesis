import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Menu, Form, Sidebar, Checkbox, Segment, Button } from 'semantic-ui-react';

import { sidebarStateFalse } from '../../containers/App/actions';

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
					estado.push(<Checkbox onClick={() => this.changeState()} checked toggle />);
				} else {
					estado.push(<Checkbox toggle />);
				}
				TODO.push(
					<div>
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
					children.push(<Form.Input fluid label={prop} value={data[prop]} />);
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
					style={{ width: '35%', backgroundColor: '#04B431' }}
				>
					<Menu.Item as="a">{this.headerSide()}</Menu.Item>
					<Menu.Item as="a">
						<div>{this.BodySide()}</div>
					</Menu.Item>
					<div
						style={{
							position: 'absolute',
							bottom: '0',
							width: '100%',
							height: '60px',
							background: 'rgb(4, 180, 49)',
						}}
					>
						<Button primary onClick={this.props.saveButton}>
							Guardar
						</Button>
						<Button secondary>Cancelar</Button>
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
