import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isupcomingevents: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.UPCOMINGEVENTS:
            return action.data;
        default:
            return state
    }
}