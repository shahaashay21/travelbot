import { CREATE_TRIP, TRIP_PROCESS, TRIP_ERROR } from "./Types";
import { URL } from '../Config/Config';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';


export const create_trip = (source, destination, budget, start_date, end_date, trip_name) => {
    return(dispatch) => {
        console.log("Processing: " + end_date);
        dispatch({type: TRIP_PROCESS});

        const sendData = { source, destination, budget, start_date, end_date, trip_name };
        axios.post(URL+'/trip/new', sendData, {
            timeout: 2000
        }).then(response => {
            response = response.data;
            console.log(response);
            if(response == "Done"){
                console.log("INSIDE DONE");
                Actions.tabbar();
            }else{
                dispatch({ type: TRIP_ERROR });
            }
        }).catch(() => {
            dispatch({ type: TRIP_ERROR });
        });
    }
}