import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isforgetpass: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.FORGETPASS:
            return action.data;
        default:
            return state
    }
}