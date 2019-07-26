import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'semantic-ui-react';
import { cleanToken } from '../../helpers/logout';

const styles = {
	baseButton: {
		backgroundColor: '#9ACD32',
		color: '#FFF',
	},
};

class Header extends React.Component {
	render() {
		const menuLogin = (
			<Menu
				size="small"
				style={{
					backgroundColor: '#000',
				}}
			>
				<Menu.Menu position="right">
					<Menu.Item>
						<Link
							to="/SignUp"
							style={{
								color: 'inherit',
							}}
						>
							<Button style={styles.baseButton}>Registrate!</Button>
						</Link>
					</Menu.Item>
					<Menu.Item>
						<Link
							to="/Login"
							style={{
								color: 'inherit',
							}}
						>
							<Button style={styles.baseButton}>Ingresar</Button>
						</Link>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		);

		const menu = (
			<Menu
				size="small"
				style={{
					backgroundColor: '#000',
				}}
			>
				<Menu.Item name="home">
					<Link
						to="/"
						style={{
							color: '#fff',
						}}
					>
						Home
					</Link>
				</Menu.Item>
				<Dropdown item text="Administracion" style={{ color: '#fff' }}>
					<Dropdown.Menu>
						<Link
							to="/tipoUsuario"
							style={{
								color: 'inherit',
							}}
						>
							<Dropdown.Item>Tipo de Usuario</Dropdown.Item>
						</Link>
						<Link
							to="/Empresa"
							style={{
								color: 'inherit',
							}}
						>
							<Dropdown.Item>Empresa</Dropdown.Item>
						</Link>
						<Link
							to="/Ejemplo"
							style={{
								color: 'inherit',
							}}
						>
							<Dropdown.Item>Ejemplo</Dropdown.Item>
						</Link>
					</Dropdown.Menu>
				</Dropdown>
				<Menu.Menu position="right">
					<Menu.Item>
						<Link
							to="/Login"
							style={{
								color: 'inherit',
							}}
						>
							<Button style={styles.baseButton} onClick={cleanToken}>
								Salir
							</Button>
						</Link>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		);
		return <div>{!this.props.stateLogin ? menuLogin : menu}</div>;
	}
}

export default Header;
