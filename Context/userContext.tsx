import {StackActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Toast} from 'native-base';
import React, {useState} from 'react';
import {baseUrl} from '../constants';
import {CustomAlert} from '../utils/CustomAlert';
import {showDialogMessage, showUnSuccessMessage} from '../utils/helper';
import {getRequest} from '../utils/Service';

const defaultValue = {
  isLoggedIn: false,
  setIsLoggedIn: (val: any) => {},
  register: (val: any) => {},
  login: (userName: any, password: any) => {},
  logOut: () => {},
  token: null,
  userInfo: null,
  loading: false,
  error: null,
};

const UserContext = React.createContext(defaultValue);

export const UserStore = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logOut = () => {
    showDialogMessage('Та гарахдаа итгэлтэй байна уу?', () => {
      setIsLoggedIn(false);
      setToken(null);
      setUserInfo(null);
    });
  };

  // const nameCardInfo = (userId: any) => {
  //   getRequest('/nameCards/user/' + userId).then(res => {
  //     if (!res?.error) {
  //       setNameCardIndo(res.data);
  //     }
  //   });
  // };

  const login = (userName: any, password: any) => {
    setLoading(true);
    axios
      .post(`${baseUrl}/users/login`, {
        userName,
        password,
      })
      .then(res => {
        if (res.data.success) {
          setToken(res.data.token);
          setIsLoggedIn(true);
          setUserInfo({
            ...res.data.user,
            nameCardId: res.data.nameCardId,
            nameCardImage: res.data.photo,
          });
          setLoading(false);
        } else {
          const errMsg = res.data.error.message;
          setError(errMsg);
          setIsLoggedIn(false);
          setLoading(false);
          showUnSuccessMessage(
            errMsg ? errMsg : 'Та интернэт холболтоо шалгана уу',
          );
        }
      })
      .catch(err => {
        console.log('err', err);
        setError(
          err.response.data.error.message
            ? err.response.data.error.message
            : err,
        );
        setIsLoggedIn(false);
        setLoading(false);
        Toast.show({
          title: 'Алдаа гарлаа',
          description: err
            ? err.response.data.error.message
            : 'Та интернэт холболтоо шалгана уу',
        });
      });
  };
  const register = (userInfo: any) => {
    setLoading(true);
    try {
      axios
        .post(
          `https://bookappapi.herokuapp.com/api/v1/users/register`,
          userInfo,
        )
        .then(res => {
          setToken(res.data.token);
          setIsLoggedIn(true);
          setUserInfo(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          //   Toast.show({
          //     text1: 'Алдаа',
          //     text2: err.response.data
          //       ? err.response.data.error.message
          //       : 'Та дахин оролдоно уу',
          //     type: 'error',
          //   });
          setIsLoggedIn(false);
          setLoading(false);
        });
    } catch (error: any) {
      console.log('error->', error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        register,
        login,
        logOut,
        token,
        userInfo,
        loading,
        error,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
