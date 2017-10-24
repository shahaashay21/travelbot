import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';

export default combineReducers({
    auth: AuthReducer,
    reg: RegisterReducer
});