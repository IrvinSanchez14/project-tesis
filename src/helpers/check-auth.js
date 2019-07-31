export const isLoggedIn = () => {
	if (localStorage['token']) {
		return true;
	}
	return false;
};
