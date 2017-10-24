import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_PASSWORD_INVALID, LOGIN_EMAIL_INVALID, LOGIN_USER, LOGIN_ERROR} from "../Actions/Types";

const INITIAL_STATE = { email: '', password: '', loading: false, email_validation: '', password_validation: '', auth_error: false};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case EMAIL_CHANGED:
            return { ...state, email: action.payload, auth_error: false };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload, auth_error: false };
        case LOGIN_USER:
            return { ...state, loading: true, email_validation: '', password_validation: '', auth_error: false };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        case LOGIN_PASSWORD_INVALID:
            return { ...state, password_validation: 'Invalid password', password: '', loading: false };
        case LOGIN_EMAIL_INVALID:
            return { ...state, email_validation: 'Invalid email', email: '', password: '', loading: false };
        case LOGIN_ERROR:
            return { ...state, ...INITIAL_STATE, auth_error: true };
        default:
            return state;
    }
}