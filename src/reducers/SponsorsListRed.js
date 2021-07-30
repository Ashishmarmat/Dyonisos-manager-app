import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    issponsorslist: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.SPONSORSLIST:
            return action.data;
        default:
            return state
    }
}