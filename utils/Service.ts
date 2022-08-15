import axios from 'axios';
import {isEmpty} from 'lodash';
import {Toast} from 'native-base';
import {Alert} from 'react-native';
import {baseUrl} from '../constants';

export const sendRequest = (url: any, body: any) => {
  return axios
    .post(`${baseUrl}${url}`, body)
    .then((res: any) => {
      console.log('res :>> ', res);
      if (res.data.success) {
        return res.data;
      } else if (!res.data.success) {
        Alert.alert('error', res.data.error.message);
        return {error: res.data.error.message};
      }
    })
    .catch(err => {
      Alert.alert('error', JSON.stringify(err));
    });
};

export const fileUpload = (file: any, path: any) => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: file.type,
    name: file.fileName,
  });
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', path);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.send(formData);
    xhr.onerror = e => {
      Toast.show({
        title: 'Дахин оролдоно уу',
        description: e.toString(),
      });
    };
    xhr.onload = e => {
      const response = JSON.parse(xhr.response);
      if (response.success && !isEmpty(response.data)) {
        Toast.show({
          title: 'Aмжилттай хуулагдлаа',
        });
        resolve({success: true});
      } else {
        Toast.show({
          title: 'Дахин оролдоно уу',
          description: e.toString(),
        });
        reject({error: e});
      }
    };
  });
};
