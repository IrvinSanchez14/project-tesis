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
		console.log(this.props);
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
							<Button style={styles.baseButton}>Sign Up</Button>
						</Link>
					</Menu.Item>
					<Menu.Item>
						<Link
							to="/Login"
							style={{
								color: 'inherit',
							}}
						>
							<Button style={styles.baseButton}>Sign In</Button>
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
				{this.props.tipoUsuario === '1' ? (
					<Dropdown item text="Administracion" style={{ color: '#fff' }}>
						<Dropdown.Menu>
							<Link
								to="/Empresa"
								style={{
									color: 'inherit',
								}}
							>
								<Dropdown.Item>Empresas</Dropdown.Item>
							</Link>
							<Link
								to="/Estados"
								style={{
									color: 'inherit',
								}}
							>
								<Dropdown.Item>Estados</Dropdown.Item>
							</Link>
							<Link
								to="/Permisos"
								style={{
									color: 'inherit',
								}}
							>
								<Dropdown.Item>Permisos</Dropdown.Item>
							</Link>
							<Link
								to="/Productos"
								style={{
									color: 'inherit',
								}}
							>
								<Dropdown.Item>Productos</Dropdown.Item>
							</Link>
							<Link
								to="/Proveedores"
								style={{
									color: 'inherit',
								}}
							>
								<Dropdown.Item>Proveedores</Dropdown.Item>
							</Link>
							<Link
								to="/Sucursales"
								style={{
									color: 'inherit',
								}}
							>
								<Dropdown.Item>Sucursales</Dropdown.Item>
							</Link>
							<Link
								to="/TipoProducto"
								style={{
									color: 'inherit',
								}}
							>
								<Dropdown.Item>Tipos de Productos</Dropdown.Item>
							</Link>
							<Link
								to="/TipoUsuario"
								style={{
									color: 'inherit',
								}}
							>
								<Dropdown.Item>Tipos de Usuarios</Dropdown.Item>
							</Link>
							<Link
								to="/UnidadMedida"
								style={{
									color: 'inherit',
								}}
							>
								<Dropdown.Item>Unidades de Medidas</Dropdown.Item>
							</Link>
						</Dropdown.Menu>
					</Dropdown>
				) : null}

				<Menu.Menu position="right">
					<Menu.Item>
						<Link
							to="/Login"
							style={{
								color: 'inherit',
							}}
						>
							<Button style={styles.baseButton} onClick={cleanToken}>
								LogOut
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
