import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    issidescreen: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.SIGNUP:
            return action.data;
        default:
            return state
    }
}
