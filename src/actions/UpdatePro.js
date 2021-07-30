import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import {Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from "@react-native-community/async-storage";

export function uploadImageRes(data) {
    return {
        type: ActionTypes.UPLOAD_IMAGE,
        data
    }
};
export function uploadImageApi(data) {
    console.log('uploadImageApi',data)
    var getFilename = data.uri.split("/");
    var imgName = getFilename[getFilename.length - 1];
    console.log("imgName",imgName);
    var imageData = new FormData();
    imageData.append('photo', {
        uri: data.uri,
        type: data.type,
        name: imgName
    });  
     console.log("imageData",imageData)
    return async (dispatch) => {
        await fetch(`http://138.68.103.248:3000/api/uploadImage`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(res => {
                console.log('res',res)
                if (res.success === "True")  {
                    
                    dispatch(uploadImageRes(res));
                } else {
                    Alert.alert(res.message);
                    dispatch(uploadImageRes(res));
                }
            })
            .catch((e) => {
                console.log("error",e);
            });
    }
};

export function updatemanagerRes(data,token) {
    return {
        type: ActionTypes.UPDATEMANAGER,
        data,token
    }
};
export function updatemanagerAPI(data) {
    console.log("updatemanagerAPI",data)
    return (dispatch) => {
        fetch(BaseUrl + `/api/updateManager`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + data.token
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(res => {
                console.log(res)
                if (res.status === "success") {
                    AsyncStorage.setItem('managerId', res.data._id);
                    AsyncStorage.setItem('image', res.data.image);
                    AsyncStorage.setItem('email', res.data.email);
                    AsyncStorage.setItem("contactNumber", res.data.contactNumber);
                    AsyncStorage.setItem("address", res.data.address);
                    AsyncStorage.setItem("aboutMe", res.data.aboutMe);
                    AsyncStorage.setItem('username', res.data.username);
                    AsyncStorage.setItem('token', res.token);
                    dispatch(updatemanagerRes(res));
                //   Actions.Login()
            } else {
                    dispatch(updatemanagerRes(res));
                }
            })
            .catch((e) => {
                //  console.warn(e);
            });
    }
};
