import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isViewManager: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.VIEWMANAGER:
            return action.data;
        default:
            return state
    }
}