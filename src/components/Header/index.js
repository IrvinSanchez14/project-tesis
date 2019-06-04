import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'semantic-ui-react';

const Header = () => {
	return (
		<Menu
			size="small"
			style={{
				backgroundColor: '#8BEA83',
			}}
		>
			<Menu.Item name="home">
				<Link
					to="/"
					style={{
						color: 'inherit',
					}}
				>
					Home
				</Link>
			</Menu.Item>
			<Dropdown item text="Administracion">
				<Dropdown.Menu>
					<Link
						to="/tipoUsuario"
						style={{
							color: 'inherit',
						}}
					>
						<Dropdown.Item>Tipo de Usuario</Dropdown.Item>
					</Link>
					<Dropdown.Item>Russian</Dropdown.Item>
					<Dropdown.Item>Spanish</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

			<Menu.Menu position="right">
				<Menu.Item>
					<Button primary>Sign Up</Button>
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};

export default Header;
