import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import {Alert, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
export function deleteeventRes(data,token) {
    return {
        type: ActionTypes.DELETEEVENT,
        data,token
    }
};
export function ResetDeleteeventRes(data) {
    return {
        type: ActionTypes.DELETEEVENT,
        data
    }
};
export function deleteeventAPI(data) {
    console.log("deleteeventAPI")
    return (dispatch) => {
        fetch(BaseUrl + `/api/deleteEvents`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization" : 'Bearer ' + data.token
            },
            
            body: JSON.stringify(data)
        })
        
            .then((res) => res.json())
            .then(res => {
                console.log("deleteeventRes", res)
                if (res.success === true) {
                    dispatch(deleteeventRes(res));
            } else {
                    dispatch(deleteeventRes(res));
                }
            })
            .catch((e) => {
                console.warn(e);
            });
    }
};

