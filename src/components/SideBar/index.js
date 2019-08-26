import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Form, Sidebar, Segment, Checkbox } from 'semantic-ui-react';

import { sidebarStateFalse } from '../../containers/App/actions';

class SideBarMenu extends React.Component {
	state = { visible: false };

	handleSidebarHide = () => this.props.sidebarStateFalse();

	change = (id, state) => {
		let datos = {
			id: id,
			state: !state,
		};
		this.props.onClick(datos);
	};

	headerSide = () => {
		let TODO = [];
		if (this.props.headSide) {
			let estado = [];
			this.props.headSide.map(data => {
				const checkData = data.Estado === 'Disponible' ? true : false;
				TODO.push(
					<div key={data.id}>
						<div
							id="contenedor"
							style={{
								color: 'black',
								display: 'flex',
								flexFlow: 'row',
								flexWrap: 'wrap',
								textAlign: 'center',
							}}
						>
							<div
								id="id"
								style={{
									flex: '1',
									textAlign: 'center',
								}}
							>
								<Checkbox
									toggle
									id={data.id}
									onClick={() => this.change(data.id, checkData)}
									checked={checkData}
									ref="check_me"
									style={{ fontSize: '1.5em' }}
									label={data.id}
								/>
							</div>
							<div
								id="fecha"
								style={{
									flex: '1',
									textAlign: 'center',
								}}
							>
								<div
									style={{
										fontSize: '11px',
									}}
								>{`Ultima Actualizacion: 2019/05/13 22:00:00`}</div>
								<div
									style={{
										fontSize: '11px',
									}}
								>{`Usuario Creador: Irvin Sanchez`}</div>
							</div>
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
					style={{
						width: `${window.innerWidth / 2}px`,
						backgroundColor: 'white',
						borderLeft: 'solid #DBDBDB',
					}}
				>
					<div
						style={{
							height: '61.5px',
							backgroundColor: 'black',
						}}
					>
						<div
							style={{
								right: '10px',
								marginTop: '10px',
								position: 'absolute',
								color: '#FFF',
								fontSize: '2em',
								cursor: 'pointer',
							}}
							onClick={this.handleSidebarHide}
						>
							<i className="far fa-times-circle" />
						</div>
					</div>
					<Menu.Item
						as="a"
						style={{
							borderStyle: 'solid',
							borderBottomColor: 'black',
						}}
					>
						{this.headerSide()}
					</Menu.Item>
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
