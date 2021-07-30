import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isresetpass: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.RESETPASS:
            return action.data;
        default:
            return state
    }
}