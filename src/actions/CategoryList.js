import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import { Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
export function categorylistRes(data,token) {
    return {
        type: ActionTypes.CATEGORYLIST,
        data,token
    }
};
export function categorylistAPI(data) {
    console.log("categorylistAPI", data)
    return (dispatch) => {
        fetch(BaseUrl + `/api/viewCategoryList`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                 "Authorization" : 'Bearer ' + data.token
            },
            // body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(res => {
                console.log("categorylistRes", res)
                if (res.success === true) {
                    dispatch(categorylistRes(res));
                } else {
                    dispatch(categorylistRes(res));
                }
            })
            .catch((e) => {
                console.warn(e);
            });
    }
}



export function subcategorylistRes(data) {
    return {
        type: ActionTypes.SUBCATEGORYLIST,
        data
    }
};
export function subcategorylistAPI(data) {
    console.log("subcategorylistAPI", data)
    return (dispatch) => {
        fetch(BaseUrl + `/api/viewSubCategoryList`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(res => {
                console.log("subcategorylistRes", res)
                if (res.success === true) {
                    dispatch(subcategorylistRes(res));
                } else {
                    dispatch(subcategorylistRes(res));
                }
            })
            .catch((e) => {
                console.warn(e);
            });
    }
}