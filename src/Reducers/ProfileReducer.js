import { PROCESS_MY_FEED, RENDER_MY_FEED, ERROR_MY_FEED } from '../Actions/Types';

const INITIAL_STATE = { feed: {}, error_feed: false, loading: false };

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROCESS_MY_FEED:
            return { ...state, loading: true };
        case RENDER_MY_FEED:
            return {...state, feed: action.payload, error_feed: false, loading: false};
        case ERROR_MY_FEED:
            return {...state, loading: false, error_feed: true};
        default:
            return { ...state };
    }
}