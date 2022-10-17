import axios from 'axios';
import {isEmpty} from 'lodash';
import {Toast} from 'native-base';
import {Alert} from 'react-native';
import {baseUrl} from '../constants';
import {CustomAlert} from './CustomAlert';
import {showUnSuccessMessage} from './helper';

export const getRequest = (url: any) => {
  return axios
    .get(`${baseUrl}${url}`)
    .then((res: any) => {
      if (res.data.success) {
        return res.data;
      } else if (!res.data.success) {
        showUnSuccessMessage(res.data.error.message);
        return {error: res.data.error.message};
      }
    })
    .catch(err => {
      console.log('err :>> ', err);
      showUnSuccessMessage(JSON.stringify(err));
      return {error: err};
    });
};

export const sendRequest = (url: any, body?: any) => {
  return axios
    .post(`${baseUrl}${url}`, body)
    .then((res: any) => {
      if (res.data.success) {
        return res.data;
      } else if (!res.data.success) {
        if (res.data.error.code == 11000) {
          showUnSuccessMessage('Өмнө бүртгэгдсэн байна');
        } else {
          showUnSuccessMessage(res.data.error.message);
        }

        return {error: res.data.error.message};
      }
    })
    .catch(err => {
      showUnSuccessMessage(JSON.stringify(err));
    });
};

export const putRequest = (url: any, body?: any) => {
  return axios
    .put(`${baseUrl}${url}`, body)
    .then((res: any) => {
      if (res.data.success) {
        return res.data;
      } else if (!res.data.success) {
        showUnSuccessMessage(res.data.error.message);
        return {error: res.data.error.message};
      }
    })
    .catch(err => {
      showUnSuccessMessage(JSON.stringify(err));
    });
};

export const deleteRequest = (url: any) => {
  return axios
    .delete(`${baseUrl}${url}`)
    .then((res: any) => {
      if (res.data.success) {
        return res.data;
      } else if (!res.data.success) {
        showUnSuccessMessage(res.data.error.message);
        return {error: res.data.error.message};
      }
    })
    .catch(err => {
      showUnSuccessMessage(JSON.stringify(err));
      return {error: err};
    });
};

export const fileUpload = (file: any, path: any) => {
  const formData = new FormData();
  file.fileName = 'photo.jpg';
  formData.append('file', {
    uri: file.path,
    type: file.mime,
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
        description: JSON.stringify(e),
      });
    };
    xhr.onload = e => {
      const response = JSON.parse(xhr.response);
      if (response.success && !isEmpty(response.data)) {
        // Toast.show({
        //   title: 'Aмжилттай хуулагдлаа',
        // });
        resolve({success: true});
      } else {
        Toast.show({
          title: 'Дахин оролдоно уу',
          description: JSON.stringify(e),
        });
        reject({error: e});
      }
    };
  });
};
