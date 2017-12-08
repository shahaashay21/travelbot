import { URL } from '../Config/Config';
import axios from 'axios';
import { PROCESS_SEARCH, RENDER_USER_SEARCH, RENDER_PLACE_SEARCH, RENDER_TRIP_SEARCH, ERROR_SEARCH, RENDER_FEED} from '../Actions/Types';

export const doUserSearch = (searchString) => {
    return(dispatch) => {
        dispatch({type: PROCESS_SEARCH});

        var sendData = {searchText: searchString}
        axios.post(URL+'/getSearchResults', sendData, {
            timeout: 2000
        }).then(response => {
            response = response.data;
            setTimeout(function () {
                if(response.success){
                    dispatch({ type: RENDER_USER_SEARCH, payload: response.search_query })
                }
            }, 500)
        }).catch(() => dispatch ({ type: ERROR_SEARCH }))
    }
}

export const doPlaceSearch = (searchString) => {
    return(dispatch) => {
        dispatch({type: PROCESS_SEARCH});

        var sendData = {searchText: searchString}
        axios.post(URL+'/getSearchPlaces', sendData, {
            timeout: 2000
        }).then(response => {
            response = response.data;
            setTimeout(function () {
                if(response.success){
                    dispatch({ type: RENDER_PLACE_SEARCH, payload: response.final_search_place})
                }
            }, 500)
        }).catch(() => dispatch ({ type: ERROR_SEARCH }))
    }
}

export const doTripSearch = (searchString) => {
    return(dispatch) => {
        dispatch({type: PROCESS_SEARCH});

        var sendData = {searchText: searchString}
        axios.post(URL+'/getSearchTrips', sendData, {
            timeout: 2000
        }).then(response => {
            response = response.data;
            console.log(response);
            setTimeout(function () {
                if(response.success){
                    dispatch({ type: RENDER_TRIP_SEARCH, payload: response.final_search})
                }
            }, 500)
        }).catch(() => dispatch ({ type: ERROR_SEARCH }))
    }
}