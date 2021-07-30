import * as ActionTypes from "../constants/ActionTypes";
import { BaseUrl } from "../constants/api";
import { Alert, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
export function vieweventRes(data) {
  return {
    type: ActionTypes.VIEWEVENT,
    data,
  };
}
export function vieweventAPI(data) {
  console.log("vieweventAPI",data);
  return (dispatch) => {
    fetch(BaseUrl + `/api/view_Event`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("vieweventRes", res);
        if (res.success === true) {

          dispatch(vieweventRes(res));
        } else {
          dispatch(vieweventRes(res));
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };
}
