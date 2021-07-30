import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    issubcategorylist: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case ActionTypes.SUBCATEGORYLIST:
            return action.data;
        default:
            return state
    }
}