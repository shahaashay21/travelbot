import { SEND_POSITION } from "./Types";
import { URL } from '../Config/Config';
import axios from 'axios';

export const sendPosition = (email, latitude, longitude) => {
    return(dispatch) => {
        sendData = { email, latitude, longitude};
        axios.post(URL+'/trip/saveposition', sendData, {
            timeout: 2000
        }).then(response => {
            dispatch({ type: SEND_POSITION });
        }).then(error => {
            dispatch({ type: SEND_POSITION });
        })
    }
}