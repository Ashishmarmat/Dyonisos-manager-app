import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import {Alert, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
export function resetpassRes(data) {
    return {
        type: ActionTypes.RESETPASS,
        data
    }
};

export function resetpassAPI(data) {
    console.log("resetpassAPI")
    return (dispatch) => {
        fetch(BaseUrl + `/api/Change_password_Manager`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(res => {
                console.log("resetpassAPI",res)
                if (res.status === "success") {
                    dispatch(resetpassRes(res));
                   
                } else {
                   
                    dispatch(resetpassRes(res));
                }
            })
            .catch((e) => {
                //  console.warn(e);
            });
    }
};

