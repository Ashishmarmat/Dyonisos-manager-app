import * as ActionTypes from '../constants/ActionTypes';
import {BaseUrl} from '../constants/api';
import {Alert, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
export function createeventRes(data,token) {
  return {
    type: ActionTypes.CREATEEVENT,
    data,token
  };
}
export function createeventAPI(data) {
  console.log('createeventAPI', data);
  return (dispatch) => {
    fetch(BaseUrl + `/api/create_event`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization" : 'Bearer ' + data.token
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('createeventRes', res);
        if (res.success === true) {
          dispatch(createeventRes(res));
        } else {
          dispatch(createeventRes(res));
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };
}
