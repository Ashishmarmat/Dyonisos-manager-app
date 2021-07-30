import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isqualitytraining: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.QUALITYTRAINING:
            return action.data;
        default:
            return state
    }
}