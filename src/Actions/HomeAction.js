import { URL } from '../Config/Config';
import axios from 'axios';
import { PROCESS_FEED, RENDER_FEED, ERROR_FEED } from './Types';

export const getFeed = () => {
    return (dispatch) => {
        dispatch({type: PROCESS_FEED});

        axios.get(URL+'/trip/feed', {
            timeout: 2000
        })
            .then(response => {
                response = response.data;
                setTimeout(function () {
                    dispatch({ type: RENDER_FEED, payload: response })
                }, 2000)
            }).catch(() => dispatch ({ type: ERROR_FEED }))
    }
}