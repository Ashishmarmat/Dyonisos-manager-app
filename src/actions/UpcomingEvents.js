import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import { Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
export function upcomingeventsRes(data,token) {
    return {
        type: ActionTypes.UPCOMINGEVENTS,
        data,token
    }
};
export function upcomingeventsAPI(data) {
    return (dispatch) => {
        fetch(BaseUrl + `/api/ManagerUpcomingEvents`, {
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
                console.log("upcomingeventsRes", res)
                if (res.success === true) {
                    dispatch(upcomingeventsRes(res));
                } else {
                    dispatch(upcomingeventsRes(res));
                }
            })
            .catch((e) => {
                console.warn(e);
            });
    }
}
