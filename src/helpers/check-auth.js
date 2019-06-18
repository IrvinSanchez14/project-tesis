import jwtDecode from 'jwt-decode';

export const isLoggedIn = () => {
	if (localStorage['token']) {
		let token = localStorage['token'].substr(4);
		if (jwtDecode(token).exp < Date.now() / 1000) {
			localStorage.clear();
			return false;
		}
		return true;
	}
	return false;
};
