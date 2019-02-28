import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers/'
import rootSaga from './sagas/'

const sagaMiddleWare = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancer(applyMiddleware(sagaMiddleWare))
);
sagaMiddleWare.run(rootSaga);

export default store;
