import history from '../history';
import { logoutSuccessful } from '../containers/Login/actions';
import store from '../store';

export const cleanToken = () => {
	store.dispatch(logoutSuccessful('Sistema Cerrado'));
	localStorage.clear();
	history.push('/login');
};
