import * as ActionTypes from '../constants/ActionTypes';
import {BaseUrl} from '../constants/api';
import {Alert, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
export function sponsorslistRes(data) {
  return {
    type: ActionTypes.SPONSORSLIST,
    data,
  };
}
export function sponsorslistAPI(data) {
  console.log('sponsorslistAPI');
  return (dispatch) => {
    fetch(BaseUrl + `/api/ManagerSponsorList`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('sponsorslistRes', res);
        if (res.success === true) {
          dispatch(sponsorslistRes(res));
        } else {
          dispatch(sponsorslistRes(res));
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };
}
