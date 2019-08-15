import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'semantic-ui-react';
import history from '../../history';
import { logoutSuccessful } from '../../containers/Login/actions';
import store from '../../store';

const styles = {
	baseButton: {
		backgroundColor: '#9ACD32',
		color: '#FFF',
	},
};

class Header extends React.Component {
	cleanToken = () => {
		store.dispatch(logoutSuccessful('Sistema Cerrado'));
		localStorage.clear();
		history.push('/login');
	};
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
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		console.log('el raus', userInfo ? userInfo.Nombre : null);

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
						Inicio
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
							<Link
								to="/PermisosUsuarios"
								style={{
									color: 'inherit',
								}}
							>
								<Dropdown.Item>Permisos de los Usuarios</Dropdown.Item>
							</Link>
							<Link
								to="/Usuarios"
								style={{
									color: 'inherit',
								}}
							>
								<Dropdown.Item>Usuarios</Dropdown.Item>
							</Link>
							<Link
								to="/Porciones"
								style={{
									color: 'inherit',
								}}
							>
								<Dropdown.Item>Porciones</Dropdown.Item>
							</Link>
						</Dropdown.Menu>
					</Dropdown>
				) : null}
				<Dropdown item text="Listas" style={{ color: '#fff' }}>
					<Dropdown.Menu>
						<Link
							to="/ListaProducto"
							style={{
								color: 'inherit',
							}}
						>
							<Dropdown.Item>Listado de productos y sus porciones</Dropdown.Item>
						</Link>
						<Link
							to="/ListaExistente"
							style={{
								color: 'inherit',
							}}
						>
							<Dropdown.Item>Lista existente sucursal</Dropdown.Item>
						</Link>
					</Dropdown.Menu>
				</Dropdown>

				<Menu.Menu position="right">
					<Menu.Item>
						<label style={{ color: 'white', marginLeft: '-39px', position: 'absolute' }}>
							{userInfo ? userInfo.Nombre : null}
						</label>
					</Menu.Item>

					<Menu.Item>
						<Link
							to="/Login"
							style={{
								color: 'inherit',
							}}
						>
							<Button style={styles.baseButton} onClick={this.cleanToken}>
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
