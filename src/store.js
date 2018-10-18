import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers/index';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(
    appReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
);

export default store;