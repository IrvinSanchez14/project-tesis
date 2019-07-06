import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';

import history from './history';
import reducer from './reducers';
import rootSaga from './sagas';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const routersMiddleware = routerMiddleware(history);
let middlewares = applyMiddleware(sagaMiddleware, routersMiddleware);

const store = createStore(reducer, fromJS(initialState), composeWithDevTools(middlewares));

sagaMiddleware.run(rootSaga);

export default store;
