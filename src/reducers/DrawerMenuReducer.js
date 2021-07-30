import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isdrawermenu: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.DRAWERMENU:
            return action.data;
        default:
            return state
    }
}