import * as ActionTypes from '../constants/ActionTypes';
import {BaseUrl} from '../constants/api';
import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
export function signupRes(data) {
  return {
    type: ActionTypes.SIGNUP,
    data,
  };
}
export function signupAPI(data) {
  console.log('signupApi', data);
  return (dispatch) => {
    fetch(BaseUrl + `/api/managerSignup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('signup res', res);

        if (res.success === true) {
          AsyncStorage.setItem('managerId', res.data._id);
          AsyncStorage.setItem('email', res.data.email);
          AsyncStorage.setItem('country', res.data.country);

          dispatch(signupRes(res));
        } else {
          dispatch(signupRes(res));
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };
}
