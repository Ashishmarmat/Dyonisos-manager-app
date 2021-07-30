import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import {Alert, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
export function drawerRes(data) {
    return {
        type: ActionTypes.DRAWERMENU,
        data
    }
};

export function drawermenuAPI(data) {
  console.log("drawermenuAPI",data)
  return (dispatch) => {
  fetch(BaseUrl + `/logout`, {
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
            if (res.status === "success" ) {
            dispatch(drawerRes(res));
             AsyncStorage.removeItem('user_id')
            Actions.Login()
            } else {
            // Alert.alert(res.message);
            dispatch(drawerRes(res));
                }
            })
            .catch((e) => {
                //  console.warn(e);
            });
    }
};

