import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isupdatemanager: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.UPDATEMANAGER:
            return action.data;
        default:
            return state
    }
}