import { CREATE_TRIP, TRIP_PROCESS, TRIP_ERROR } from "../Actions/Types";

const INITIAL_STATE = { loading: false, trip_error: false };

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TRIP_PROCESS:
            return { ...state, loading: true, trip_error: false };
        case TRIP_ERROR:
            return { ...state, loading: false, trip_error: true}
        default:
            return { ...state };
    }
}