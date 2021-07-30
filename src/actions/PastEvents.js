import * as ActionTypes from '../constants/ActionTypes';
import {BaseUrl} from '../constants/api';
import {Alert, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
export function pasteventsRes(data,token) {
  return {
    type: ActionTypes.PASTEVENTS,
    data,token
  };
}
export function pasteventsAPI(data) {
  console.log('pasteventsAPI');
  return (dispatch) => {
    fetch(BaseUrl + `/api/ManagerPastEvents`, {
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
        console.log('pasteventsRes', res);
        if (res.success === true) {
          dispatch(pasteventsRes(res));
        } else {
          dispatch(pasteventsRes(res));
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };
}
