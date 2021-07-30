import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import {Alert, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
  export function rockingeventRes(data) {
    return {
        type: ActionTypes.ROCKINGEVENT,
        data
    }
};
export function rockingeventAPI(data) {
 console.log("rockingeventAPI",data)
 return (dispatch) => {
 fetch(BaseUrl + `/api/view_Event`, {
method: 'POST',
headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         },
body: JSON.stringify(data)
})
.then((res) => res.json())
.then(res => {
console.log("rockingeventRes",res)

if (res.success === true) {
   
    dispatch(rockingeventRes(res));
} else  {
    dispatch(rockingeventRes(res));
}
})
.catch((e) => {
console.warn(e);
});
}
};


