import { PROCESS_OWN_FEED, RENDER_OWN_FEED, ERROR_OWN_FEED } from '../Actions/Types';

const INITIAL_STATE = { feed: {}, error_feed: false, loading: false };

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROCESS_OWN_FEED:
            return { ...state, loading: true };
        case RENDER_OWN_FEED:
            return {...state, feed: action.payload, error_feed: false, loading: false};
        case ERROR_OWN_FEED:
            return {...state, loading: false, error_feed: true};
        default:
            return { ...state };
    }
}