import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {isEmpty} from 'lodash';
import {Toast} from 'native-base';
import React, {useState} from 'react';
import {baseUrl} from '../constants';
import {CustomAlert} from '../utils/CustomAlert';
import {showDialogMessage, showUnSuccessMessage} from '../utils/helper';
import {getRequest, request, sendRequest} from '../utils/Service';
export const glob: any = {};

const defaultValue = {
  isLoggedIn: false,
  newNews: false,
  newEvent: false,
  setNewNews: (val: boolean) => {},
  setNewEvent: (val: boolean) => {},
  setIsLoggedIn: (val: any) => {},
  login: (userName: any, password: any) => {},
  logOut: () => {},
  setUserInfo: (val: any) => {},
  token: null,
  userInfo: null,
  loading: false,
  error: null,
};

const UserContext = React.createContext(defaultValue);

export const UserStore = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newNews, setNewNews] = useState(false);
  const [newEvent, setNewEvent] = useState(false);

  const logOut = () => {
    showDialogMessage('Та гарахдаа итгэлтэй байна уу?', () => {
      setIsLoggedIn(false);
      setToken(null);
      setUserInfo(null);
      AsyncStorage.removeItem('loginUserInfo');
    });
  };

  const login = (phone: any, password: any) => {
    setLoading(true);
    request('/sign', {phone, password})
      .then((res: any) => {
        if (res.success) {
          setToken(res.token);
          glob.token = res.token;
          glob.userInfo = res.user;
          setIsLoggedIn(true);
          setUserInfo(res.user);
          setLoading(false);
          AsyncStorage.setItem(
            'loginUserInfo',
            JSON.stringify({...res.user, token: res.token}),
          );
        } else {
          const errMsg = res.success_text;
          setError(errMsg);
          setIsLoggedIn(false);
          setLoading(false);
          showUnSuccessMessage(
            errMsg ? errMsg : 'Та интернэт холболтоо шалгана уу',
          );
        }
      })
      .catch((err: any) => {
        console.log('err', err);
        setError(err.error.message ? err.error.message : err);
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

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        newNews,
        newEvent,
        setNewNews,
        setNewEvent,
        setIsLoggedIn,
        login,
        logOut,
        setUserInfo,
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
