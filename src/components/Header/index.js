import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react';

import Button from '@material-ui/core/Button';
import history from '../../history';
import { logoutSuccessful } from '../../containers/Login/actions';
import store from '../../store';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const listaMenus = [
	{
		url: '/Empresa',
		texto: 'Empresas',
	},
	{
		url: '/Estados',
		texto: 'Estados',
	},
	{
		url: '/Permisos',
		texto: 'Permisos',
	},
	{
		url: '/Productos',
		texto: 'Productos',
	},
	{
		url: '/Proveedores',
		texto: 'Proveedores',
	},

	{
		url: '/Sucursales',
		texto: 'Sucursales',
	},
	{
		url: '/TipoProducto',
		texto: 'Tipos de Productos',
	},
	{
		url: '/TipoUsuario',
		texto: 'Tipos de Usuarios',
	},
	{
		url: '/UnidadMedida',
		texto: 'Unidades de Medidas',
	},
	{
		url: '/PermisosUsuarios',
		texto: 'Permisos de los Usuarios',
	},
	{
		url: '/Usuarios',
		texto: 'Usuarios',
	},
	{
		url: '/Porciones',
		texto: 'Porciones',
	},
];

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
							<Button className="ui buttonGuardar">Ingresar</Button>
						</Link>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		);
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));

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
							{listaMenus
								.sort(function(a, b) {
									if (a.texto > b.texto) {
										return 1;
									}
									if (a.texto < b.texto) {
										return -1;
									}
									return 0;
								})
								.map(menus => {
									return (
										<Link
											key={menus.url}
											to={menus.url}
											style={{
												color: 'inherit',
											}}
										>
											<Dropdown.Item>{menus.texto}</Dropdown.Item>
										</Link>
									);
								})}
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
						<AccountCircleIcon style={{ color: 'white', marginLeft: '-32px', position: 'absolute' }} />
					</Menu.Item>

					<Menu.Item>
						<span />
						<label style={{ color: 'white', marginLeft: '-39px', position: 'absolute' }}>
							{userInfo ? userInfo.Nombre : null}
						</label>
					</Menu.Item>
					<Menu.Item>
						<Link to="/Login">
							<Button className="ui buttonGuardar" onClick={this.cleanToken}>
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
