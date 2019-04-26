export const loginStateLoad = state => state.getIn(['login', 'loading']);

export const loginIsAuthenticated = state => state.getIn(['login', 'isAuthenticated']);
