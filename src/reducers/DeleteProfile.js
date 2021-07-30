import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isdeleteprofile: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.DELETEPROFILE:
            return action.data;
        default:
            return state
    }
}