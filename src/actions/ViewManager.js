import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import {Alert, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
export function ViewManagerRes(data) {
    return {
        type: ActionTypes.VIEWMANAGER,
        data
    }
};
export function viewmanagerAPI(data) {
    console.log("viewmanagerAPI")
    return (dispatch) => {
        fetch(BaseUrl + `/api/viewManagerProfile`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(res => {
                console.log("ViewManagerRes", res)
                if (res.success === true) {
                    dispatch(ViewManagerRes(res));
            } else {
                    dispatch(ViewManagerRes(res));
                }
            })
            .catch((e) => {
                console.warn(e);
            });
    }
};

