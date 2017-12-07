import { PROCESS_FEED, RENDER_FEED, ERROR_FEED } from '../Actions/Types';

const INITIAL_STATE = { feed: {}, error_feed: false, loading: false };

export default(state, action) => {
    switch (action.type) {
        case PROCESS_FEED:
            return { ...state, loading: true };
        case RENDER_FEED:
            return {...state, feed: action.payload, error_feed: false, loading: false};
        case ERROR_FEED:
            return {...state, loading: false, error_feed: true};
        default:
            return { ...state };
    }
}