import { URL } from '../Config/Config';
import axios from 'axios';
import { PROCESS_FEED, RENDER_FEED, ERROR_FEED, USER_LIKE } from './Types';

export const getFeed = () => {
    return (dispatch) => {
        dispatch({type: PROCESS_FEED});

        getTripFeed(dispatch);
    }
}

export const updateUserLike = (like_by_me, tripId, userId, feed) => {
    return (dispatch) => {
        var sendData = {like_by_me, trip_id: tripId, userId};
        axios.post(URL+'/likeTrip', sendData, {
            timeout: 2000
        }).then(response => {
            response = response.data
            if(response.success){
                // getTripFeed(dispatch);
            }else {
                dispatch ({ type: ERROR_FEED });
            }
        }).catch(() => dispatch ({ type: ERROR_FEED }))
        getTripFeed(dispatch);
    }
}

const getTripFeed = (dispatch) => {
        // axios.get(URL+'/trip/feed', {
        axios.post(URL+'/getNewsFeed', {
            timeout: 2000
        })
            .then(response => {
                response = response.data;
                setTimeout(function () {
                    dispatch({ type: RENDER_FEED, payload: response })
                }, 1000)
            }).catch(() => dispatch ({ type: ERROR_FEED }))
}