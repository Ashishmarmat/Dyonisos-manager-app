import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isUploadingImage: false,
    hasError: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    const { type } = action;
console.log(type,"type")
console.log(action,"action")
    switch (type) {
        case ActionTypes.UPLOAD_IMAGE:
            return action.data;
        default:
            return state
    }
}