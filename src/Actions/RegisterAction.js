import { EMAIL_CHANGED, PASSWORD_CHANGED, FIRST_NAME_CHANGED, LAST_NAME_CHANGED,
    FIRST_NAME_INVALID, LAST_NAME_INVALID, EMAIL_INVALID, PASSWORD_INVALID,
    REGISTER_PROCESS, REGISTRATION_ERROR, REGISTRATION_SUCCESS, REGISTRATION_EXIST } from "./Types";

import { URL } from '../Config/Config';
import axios from 'axios';

export const firstNameChanged = (first_name) => {
    return {
        type: FIRST_NAME_CHANGED,
        payload: first_name
    }
}

export const lastNameChanged = (last_name) => {
    return {
        type: LAST_NAME_CHANGED,
        payload: last_name
    }
};
export const emailChanged = (email) => {
    return {
        type: EMAIL_CHANGED,
        payload: email
    }
}

export const passwordChanged = (password) => {
    return {
        type: PASSWORD_CHANGED,
        payload: password
    }
};

export const registerUser = (first_name, last_name, email, password) => {
    return (dispatch) => {
          dispatch({type: REGISTER_PROCESS});

        const sendData = { first_name, last_name, email, password };

        axios.post(URL+'/users/register', sendData, {
            timeout: 2000
        })
        .then(response => {
            response = response.data;
            if(response == "invalid firstName"){
                dispatch({type: FIRST_NAME_INVALID});
            } else if(response == "invalid lastName"){
                dispatch({type: LAST_NAME_INVALID});
            } else if(response == "invalid email"){
                dispatch({type: EMAIL_INVALID});
            } else if(response == "invalid password") {
                dispatch({ type: PASSWORD_INVALID });
            } else if(response == "registered"){
                dispatch({ type: REGISTRATION_SUCCESS });
            } else if(response == "available"){
                dispatch({ type: REGISTRATION_EXIST });
            } else {
                registerError(dispatch);
            }
        })
        .catch(() => registerError(dispatch));
    };
};

const registerError = (dispatch) => {
    dispatch({ type: REGISTRATION_ERROR });
};