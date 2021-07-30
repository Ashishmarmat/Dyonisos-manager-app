import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import {Alert, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
export function sidescreenRes(data) {
    return {
        type: ActionTypes.SIDESCREEN,
        data
    }
};
export function sidescreenAPI(data) {
  console.log("sidescreenAPI",data)
  return (dispatch) => {
  fetch(BaseUrl + `/SiteScreen`, {
  method: 'POST',
  headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
  body: JSON.stringify(data)
})
  .then((res) => res.json())
  .then(res => {
  console.log("SiteScreen",res)
  dispatch(sidescreenRes(res));
})
.catch((e) => {
                //  console.warn(e);
});
}
};

