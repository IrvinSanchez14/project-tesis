import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Dropdown, Menu } from 'semantic-ui-react';
import Login from '../../containers/Login';
import TipoUsuario from '../../containers/TipoUsuario';
import Welcome from '../../containers/Welcome';

import styles from './style.css';

class PageAdmin extends React.Component {
	render() {
		const arr = [];
		arr.push(
			<div key="id2">
				<Route exact path="/" component={Welcome} />
				<Route path="/login" component={Login} />
				<Route path="/tipoUsuario" component={TipoUsuario} />
			</div>
		);
		return (
			<div id="IdPageAdmin">
				<Menu fixed="top" inverted>
					<Container>
						<Menu.Item as="a" header>
							Tesis Project
						</Menu.Item>
						<Link to="/" className={'menuHeader'}>
							Home
						</Link>

						<Dropdown item simple text="Administracion">
							<Dropdown.Menu>
								<Link to="/tipoUsuario" className={'item'}>
									Tipo Usuario
								</Link>
								<Dropdown.Item>List Item</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Header>Header Item</Dropdown.Header>
								<Dropdown.Item>
									<i className="dropdown icon" />
									<span className="text">Submenu</span>
									<Dropdown.Menu>
										<Dropdown.Item>List Item</Dropdown.Item>
										<Dropdown.Item>List Item</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown.Item>
								<Dropdown.Item>List Item</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Container>
				</Menu>
				<Container style={{ marginTop: '7em' }}>{arr}</Container>
			</div>
		);
	}
}

export default PageAdmin;
