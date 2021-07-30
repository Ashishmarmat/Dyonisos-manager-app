import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isviewevent: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.VIEWEVENT:
            return action.data;
        default:
            return state
    }
}