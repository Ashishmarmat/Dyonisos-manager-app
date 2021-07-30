import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    iscreateevent: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.CREATEEVENT:
            return action.data;
        default:
            return state
    }
}