import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import HomeReducer from './HomeReducer';

export default combineReducers({
    auth: AuthReducer,
    reg: RegisterReducer,
    home: HomeReducer
});