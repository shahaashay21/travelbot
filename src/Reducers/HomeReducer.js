import { PROCESS_FEED, RENDER_FEED, ERROR_FEED, USER_LIKE } from '../Actions/Types';

const INITIAL_STATE = { feed: {}, error_feed: false, loading: false, user_like: false };

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROCESS_FEED:
            return { ...state, loading: true };
        case RENDER_FEED:
            console.log("here in reducer");
            if(action.payload.success){
                return {...state, feed: action.payload, error_feed: false, loading: false};
            } else {
                return {...state, error_feed: true, loading: false};
            }
        case ERROR_FEED:
            return {...state, loading: false, error_feed: true};
        case USER_LIKE:
            return {...state};
        default:
            return { ...state };
    }
}