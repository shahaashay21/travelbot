import { PROCESS_SEARCH, RENDER_USER_SEARCH, RENDER_PLACE_SEARCH, RENDER_TRIP_SEARCH, ERROR_SEARCH, RENDER_FEED} from '../Actions/Types';

const INITIAL_STATE = { userSearchResult: [], placeSearchResult: [], tripSearchResult: [], error_search: false, loading: false};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RENDER_USER_SEARCH:
            return { ...state, userSearchResult: action.payload, loading: false, error_search: false}
        case RENDER_PLACE_SEARCH:
            return { ...state, placeSearchResult: action.payload, loading: false, error_search: false}
        case RENDER_TRIP_SEARCH:
            return { ...state, tripSearchResult: action.payload, loading: false, error_search: false}
        case PROCESS_SEARCH:
            return { ...state, userSearchResult: [], loading: true, error_search: false};
        default:
            return { ...state };
    }
}