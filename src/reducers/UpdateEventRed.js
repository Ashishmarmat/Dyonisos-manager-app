import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isupdateevent: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.UPDATEEVENT:
            return action.data;
        default:
            return state
    }
}