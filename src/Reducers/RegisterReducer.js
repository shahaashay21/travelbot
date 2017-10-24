import { EMAIL_CHANGED, PASSWORD_CHANGED, FIRST_NAME_CHANGED, LAST_NAME_CHANGED,
    FIRST_NAME_INVALID, LAST_NAME_INVALID, EMAIL_INVALID, PASSWORD_INVALID,
    REGISTER_PROCESS, REGISTRATION_ERROR, REGISTRATION_SUCCESS, REGISTRATION_EXIST } from "../Actions/Types";

const INITIAL_STATE = { first_name: '', last_name: '', email: '', password: '',
    first_name_validation: '', last_name_validation: '', email_validation: '', password_validation: '',
    loading: false, reg_error: false, available: false, success: false};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case FIRST_NAME_CHANGED:
            return { ...state, first_name: action.payload, reg_error: false, available: false };
        case LAST_NAME_CHANGED:
            return { ...state, last_name: action.payload, reg_error: false, available: false };
        case EMAIL_CHANGED:
            return { ...state, email: action.payload, reg_error: false, available: false };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload, reg_error: false, available: false };
        case REGISTER_PROCESS:
            return { ...state, available: false, reg_error: false, success: false, loading: true, first_name_validation: '', last_name_validation: '', email_validation: '', password_validation: ''};
        case FIRST_NAME_INVALID:
            return { ...state, first_name_validation: 'Invalid first name', first_name: '', loading: false };
        case LAST_NAME_INVALID:
            return { ...state, last_name_validation: 'Invalid last name', last_name: '', loading: false };
        case PASSWORD_INVALID:
            return { ...state, password_validation: 'Invalid password', password: '', loading: false };
        case EMAIL_INVALID:
            return { ...state, email_validation: 'Invalid email', email: '', password: '', loading: false };
        case REGISTRATION_ERROR:
            return { ...state, ...INITIAL_STATE, reg_error: true, available: false};
        case REGISTRATION_SUCCESS:
            return { ...state, ...INITIAL_STATE, success: true, available: false};
        case REGISTRATION_EXIST:
            return { ...state, reg_error: false, available: true, success: false, loading: false};
        default:
            return state;
    }
}