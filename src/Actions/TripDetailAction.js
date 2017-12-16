import { URL } from '../Config/Config';
import axios from 'axios';
import { PROCESS_OWN_FEED, RENDER_OWN_FEED, ERROR_OWN_FEED } from '../Actions/Types';
import { Actions } from 'react-native-router-flux';

export const getSingleTrip = (own_trip_id) => {
    return (dispatch) => {
        dispatch({type: PROCESS_OWN_FEED});

        getTripFeed(dispatch, own_trip_id);
    }
}

export const updateUserLike = (like_by_me, tripId, userId) => {
    return (dispatch) => {
        var sendData = {like_by_me, trip_id: tripId, userId};
        axios.post(URL+'/likeTrip', sendData, {
            timeout: 2000
        }).then(response => {
            response = response.data
            if(response.success){
                getTripFeed(dispatch, tripId);
            }else {
                dispatch ({ type: ERROR_OWN_FEED });
            }
        }).catch(() => dispatch ({ type: ERROR_OWN_FEED }))
    }
}

const getTripFeed = (dispatch, own_trip_id) => {
        // axios.get(URL+'/trip/feed', {
            sendData = {own_trip_id};
        axios.post(URL+'/myowntrip', sendData, {
            timeout: 2000
        }).then(response => {
            response = response.data;
            dispatch({ type: RENDER_OWN_FEED, payload: response });
        }).catch(() => dispatch ({ type: ERROR_OWN_FEED }))
}

export const getSingleTripInformation = (own_trip_id) => {
    return (dispatch) => {
    }
    // return (dispatch) => {
    //     dispatch({type: PROCESS_OWN_FEED});

    //     // axios.get(URL+'/trip/feed', {
    //     sendData = {trip_id: own_trip_id};
    //     axios.post(URL+'/getTripDetails', sendData, {
    //         timeout: 2000
    //     }).then(response => {
    //         response = response.data;
    //         console.log(response);
    //         // dispatch({ type: RENDER_OWN_FEED, payload: response });
    //     }).catch(() => dispatch ({ type: ERROR_OWN_FEED }))
    // }
}