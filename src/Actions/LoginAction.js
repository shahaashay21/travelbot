import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_ERROR, LOGIN_EMAIL_INVALID, LOGIN_PASSWORD_INVALID, LOGIN_USER, LOGGEDIN } from "./Types";
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { URL, EMAIL } from '../Config/Config';
import axios from 'axios';

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

export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatch({type: LOGIN_USER});
        const sendData = { email, password };

        axios.post(URL+'/users/login', sendData, {
            timeout: 2000
        })
        .then(response => {
            response = response.data;
            if(response == "success"){
                AsyncStorage.setItem(EMAIL, JSON.stringify(email));
                loginSuccess (dispatch, response);
            } else if(response == "wrong email") {
                dispatch({ type: LOGIN_EMAIL_INVALID });
            } else if(response == "wrong password") {
                dispatch({ type: LOGIN_PASSWORD_INVALID });
            }else {
                loginError(dispatch);
            }
        })
        .catch(() => loginError(dispatch));

    }
};

const loginSuccess = (dispatch, status) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: status
    });
    if(status == "success") {
        Actions.home();
    }
};

const loginError = (dispatch) => {
    dispatch({ type: LOGIN_ERROR });
};


//To check whether login or not
// export const loggedIn = (email) => {
//     return (dispatch) => {
//         axios.get(URL + "/users/loggedin?email="+email)
//             .then(response => {
//                 response = response.data;
//                 if (response == "success") {
//                     loggedInResult(dispatch, "success");
//                 } else {
//                     loggedInResult (dispatch, "failed");
//                 }
//             })
//             .catch(() => loggedInResult(dispatch, "failed"));
//
//     }
// };
//
// const loggedInResult = (dispatch, status) => {
//     dispatch({
//         type: LOGGEDIN,
//         payload: status
//     })
// }