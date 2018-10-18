import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import mailReducer from './mailReducer';

const appReducers = combineReducers({
    errors: errorReducer,
    auth: authReducer,
    mail: mailReducer

});

export default appReducers;