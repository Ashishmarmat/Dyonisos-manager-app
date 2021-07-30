import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    iscategorylist: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.CATEGORYLIST:
            return action.data;
        default:
            return state
    }
}