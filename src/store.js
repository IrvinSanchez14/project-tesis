import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';

import reducer from './reducers';
import rootSaga from './sagas';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
let middlewares = applyMiddleware(sagaMiddleware);

const store = createStore(reducer, fromJS(initialState), composeWithDevTools(middlewares));

sagaMiddleware.run(rootSaga);

export default store;
