import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isdeleteevent: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.DELETEEVENT:
            return action.data;
        default:
            return state
    }
}