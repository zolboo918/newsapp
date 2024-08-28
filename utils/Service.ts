import axios from 'axios';
import {isEmpty} from 'lodash';
import {Toast} from 'native-base';
import {Alert} from 'react-native';
import {baseUrl} from '../constants';
import {CustomAlert} from './CustomAlert';
import {showUnSuccessMessage} from './helper';
import {glob} from '../Context/userContext';

export const request = (url: any, data: any) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${glob.token}`);
  myHeaders.append('Content-Type', 'multipart/form-data');

  var formdata = new FormData();
  Object.keys(data).forEach((el: any) => {
    formdata.append(el, data[el]);
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  return fetch(`${baseUrl}/${url}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      return JSON.parse(result);
    })
    .catch(error => error);
};

export const getRequest = (url: any) => {
  // return request(url);
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
      showUnSuccessMessage(JSON.stringify(err));
      return {error: err};
    });
};

export const sendRequest = (url: any, body?: any) => {
  return request(url, body).then((res: any) => {
    if (res.success) {
      return res.data;
    } else if (!res.success) {
      showUnSuccessMessage(res.success_text);

      return {error: res.data.error.message};
    }
  });
  // return axios
  //   .post(`${baseUrl}${url}`, body)
  //   .then((res: any) => {
  //     if (res.data.success) {
  //       return res.data;
  //     } else if (!res.data.success) {
  //       if (res.data.error.code == 11000) {
  //         showUnSuccessMessage('Өмнө бүртгэгдсэн байна');
  //       } else {
  //         showUnSuccessMessage(res.data.error.message);
  //       }

  //       return {error: res.data.error.message};
  //     }
  //   })
  //   .catch(err => {
  //     showUnSuccessMessage(JSON.stringify(err));
  //   });
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
  file.fileName =
    'photo_' +
    `${Math.floor(Math.random() * 90000) + 10000}.` +
    file.mime.split('/')[1];
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

export const getNewsRequest = () => {
  return request('/json/news/10', {user_id: glob.userInfo.id}).then(
    (res: any) => {
      if (res.success === false) {
        showUnSuccessMessage(res.success_text);
      } else {
        return res.results;
      }
    },
  );
};

export const getNewsDetailRequest = (id: any) => {
  return request(`/json/news_more/${id}`, {user_id: glob.userInfo.id}).then(
    (res: any) => {
      if (res.success === false) {
        showUnSuccessMessage(res.success_text);
      } else {
        return res;
      }
    },
  );
};

export const getNewsComments = (newsId: any) => {
  return request(`/json/comments/10`, {
    user_id: glob.userInfo.id,
    news_id: newsId,
  }).then((res: any) => {
    if (res.success === false) {
      showUnSuccessMessage(res.success_text);
    } else {
      return res.results;
    }
  });
};

export const addNewsRequest = (body: any) => {
  body.fileData.fileName =
    'photo_' +
    `${Math.floor(Math.random() * 90000) + 10000}.` +
    body.fileData.mime.split('/')[1];
  const path = body.fileData.path;
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${glob.token}`);

  var formdata = new FormData();
  formdata.append('user_id', body.userInfo.id);
  formdata.append('title', body.title);
  formdata.append('long_desc', body.long_desc);
  formdata.append('image', {
    uri: path,
    type: body.fileData.mime,
    name: body.fileData.fileName,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };
  console.log('requestOptions', requestOptions);
  return fetch('https://api.bizcard.mn//json/news_add', requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
};
