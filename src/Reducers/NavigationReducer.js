import { SEND_POSITION } from "../Actions/Types";

const INITIAL_STATE = { };

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEND_POSITION:
            return { ...state};
        default:
            return { ...state };
    }
}