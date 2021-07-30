import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isallevents: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.ALLEVENTS:
            return action.data;
        default:
            return state
    }
}