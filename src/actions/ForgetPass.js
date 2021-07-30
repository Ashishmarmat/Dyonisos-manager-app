
 import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import {Alert, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
export function forgetRes(data) {
    return {
        type: ActionTypes.FORGETPASS,
        data
    }
};

export function forgetpassAPI(data) {
    console.log("forgetpassAPI")
    return (dispatch) => {
        fetch(BaseUrl + `/api/forgotPasswordManager`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(res => {
                console.log(res)
                if (res.status === "success") {
                    dispatch(forgetRes(res));
                    // AsyncStorage.setItem('email',res.data.userName);
                     Actions.Login()

                } else {
                    // Alert.alert(res.message);
                    dispatch(forgetRes(res));
                }
            })
            .catch((e) => {
                //  console.warn(e);
            });
    }
};

