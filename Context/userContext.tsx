import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {isEmpty} from 'lodash';
import {Toast} from 'native-base';
import React, {useState} from 'react';
import {baseUrl} from '../constants';
import {CustomAlert} from '../utils/CustomAlert';
import {showDialogMessage, showUnSuccessMessage} from '../utils/helper';
import {getRequest} from '../utils/Service';

const defaultValue = {
  isLoggedIn: false,
  newNews: false,
  newEvent: false,
  setNewNews: (val: boolean) => {},
  setNewEvent: (val: boolean) => {},
  setIsLoggedIn: (val: any) => {},
  register: (val: any) => {},
  login: (userName: any, password: any) => {},
  logOut: () => {},
  getNews: () => {},
  getEvents: () => {},
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
    });
  };

  const getNews = () => {
    getRequest(`/news`).then((news: any) => {
      if (news.success) {
        AsyncStorage.getItem(`newsCount${userInfo._id}`).then((res: any) => {
          if (!isEmpty(res)) {
            const result = JSON.parse(res);
            if (result < news.data.length) {
              setNewNews(true);
              AsyncStorage.setItem(
                `newsCount${userInfo._id}`,
                news.data.length.toString(),
              );
            }
          } else {
            setNewNews(true);
            AsyncStorage.setItem(
              `newsCount${userInfo._id}`,
              news.data.length.toString(),
            );
          }
        });
      }
    });
  };

  const getEvents = () => {
    let date: any = {};
    const d = new Date();
    const month =
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    date = {year: d.getFullYear(), month};
    getRequest(
      `/event/filter/${date.year}-${date.month}-01/${date.year}-${date.month}-31`,
    ).then((res: any) => {
      if (res.success && !isEmpty(res.data)) {
        AsyncStorage.getItem(`eventCount${userInfo._id}`).then(
          (oldcount: any) => {
            if (!isEmpty(oldcount)) {
              const result = JSON.parse(oldcount);
              if (result < res.data.length) {
                setNewEvent(true);
                AsyncStorage.setItem(
                  `eventCount${userInfo._id}`,
                  res.data.length.toString(),
                );
              } else {
                setNewEvent(false);
              }
            } else {
              setNewEvent(true);
              AsyncStorage.setItem(
                `eventCount${userInfo._id}`,
                res.data.length.toString(),
              );
            }
          },
        );
      }
    });
    // getRequest(`/news`).then((news: any) => {
    //   console.log('news', news);
    //   if (news.success) {
    //     AsyncStorage.getItem('newsCount').then((res: any) => {
    //       console.log('res :>> ', res);
    //       if (!isEmpty(res)) {
    //         const result = JSON.parse(res);
    //         if (result < news.data.length) {
    //           setNewNews(true);
    //           AsyncStorage.setItem('newsCount', news.data.length.toString());
    //         }
    //       } else {
    //         setNewNews(true);
    //         AsyncStorage.setItem('newsCount', news.data.length.toString());
    //       }
    //     });
    //   }
    // });
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
      .post(
        `${baseUrl}/users/login`,
        {
          userName,
          password,
        },
        {timeout: 20000},
      )
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
        newNews,
        newEvent,
        setNewNews,
        setNewEvent,
        setIsLoggedIn,
        register,
        login,
        logOut,
        getNews,
        getEvents,
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
