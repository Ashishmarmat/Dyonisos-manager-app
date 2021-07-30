import * as ActionTypes from '../constants/ActionTypes';
import {BaseUrl} from '../constants/api';
import {Alert, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
export function updateeventRes(data) {
  return {
    type: ActionTypes.UPDATEEVENT,
    data,
  };
}
export function updateeventAPI(data) {
  console.log('updateeventAPI', data);
  return (dispatch) => {
    fetch(BaseUrl + `/api/update_Event`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('updateeventRes', res);
        if (res.success === true) {
          dispatch(updateeventRes(res));
        } else {
          dispatch(updateeventRes(res));
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };
}
