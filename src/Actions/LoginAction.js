import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER, LOGGEDIN } from "./Types";
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

        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }

        axios.post(URL+'/users/login', sendData)
        .then(response => {
            console.log(response);
            response = response.data;
            if(response == "success" || response == "failed" || response == "not available"){
                if(response == "success"){
                    AsyncStorage.setItem(EMAIL, JSON.stringify(email));
                }
                loginStatus (dispatch, response);
            }else {
                loginError(dispatch);
            }
        })
        .catch((error) => {
            console.log(error);
            loginError(dispatch)
        });

    }
};

const loginStatus = (dispatch, status) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: status
    });
    console.log(status);
    if(status == "success") {
        Actions.home();
    }
};

const loginError = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
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