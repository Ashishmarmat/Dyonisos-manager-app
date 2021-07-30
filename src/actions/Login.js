import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import { Alert, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
export function loginRes(data) {
    return {
        type: ActionTypes.LOGIN,
        data
    }
};
export function loginAPI(data) {
    console.log("loginapi", data)
    return (dispatch) => {
        fetch(BaseUrl + `/api/eventManager_Login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(res => {
                console.log("login res", res)
                console.log("login token", res.token)

                if (res.success === true) {
                    AsyncStorage.setItem('managerId', res.data._id);
                    AsyncStorage.setItem('image', res.data.image);
                    AsyncStorage.setItem('email', res.data.email);
                    AsyncStorage.setItem('country', res.data.country);
                    AsyncStorage.setItem("contactNumber", res.data.contactNumber);
                    AsyncStorage.setItem("address", res.data.address);
                    AsyncStorage.setItem("aboutMe", res.data.aboutMe);
                    AsyncStorage.setItem('username', res.data.username);
                    AsyncStorage.setItem('token', res.token);

                    dispatch(loginRes(res));
                } 
                else {
                    dispatch(loginRes(res));
                    Alert.alert(res.message)
                }
            })
            .catch((e) => {
                console.warn(e);
            });
    }
};

