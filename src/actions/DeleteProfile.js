import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import {Alert, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
export function deleteprofileRes(data) {
    return {
        type: ActionTypes.DELETEPROFILE,
        data
    }
};
export function deleteprofileAPI(data) {
    console.log("deleteprofileAPI")
    return (dispatch) => {
        fetch(BaseUrl + `/api/deleteManager`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(res => {
                console.log("deleteprofileRes", res)
                if (res.success === true) {
                    dispatch(deleteprofileRes(res));
            } else {
                    dispatch(deleteprofileRes(res));
                }
            })
            .catch((e) => {
                console.warn(e);
            });
    }
};

