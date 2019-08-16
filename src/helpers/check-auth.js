export const isLoggedIn = () => {
	if (localStorage['token']) {
		return true;
	}
	return false;
};

export const isRenuevaLoggin = () => {
	if (localStorage['firsTime']) {
		return true;
	}
	return false;
};
