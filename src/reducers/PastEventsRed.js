import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    ispastevents: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.PASTEVENTS:
            return action.data;
        default:
            return state
    }
}