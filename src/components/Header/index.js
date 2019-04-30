import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div className="ui secondary pointing menu">
			<Link to="/" className="item">
				Home
			</Link>
			<div className="right menu">
				<Link to="/TipoUsuario" className="item">
					Tipo Usuario
				</Link>
			</div>
		</div>
	);
};

export default Header;
