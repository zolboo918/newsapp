import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../Components/Header/Header';
import {
  deleteRequest,
  getRequest,
  putRequest,
  sendRequest,
} from '../../utils/Service';
import Button from '../../Components/Button/Button';
import {COLORS} from '../../constants';
import {isEmpty} from 'lodash';
import UserContext from '../../Context/userContext';

const EventDetail = (props: any) => {
  const id = props.route.params.id;
  const [data, setData] = useState<any>();
  const [guest, setGuest] = useState<any>([]);
  const [interested, setInterested] = useState<any>([]);
  const [going, setGoing] = useState<any>([]);
  const [status, setStatus] = useState<any>();

  const {userInfo} = useContext<any>(UserContext);

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    going.forEach((el: any) => {
      if (el.userId._id == userInfo._id) {
        setStatus(3);
      }
    });
  }, [going]);

  useEffect(() => {
    interested.forEach((el: any) => {
      if (el.userId._id == userInfo._id) {
        setStatus(2);
      }
    });
  }, [interested]);

  const initData = () => {
    getRequest('/event/event/' + id).then((res: any) => {
      if (res.success) {
        setData(res.data);
      }
    });
    getRequest('/eventMap/' + id).then((res: any) => {
      if (res.success) {
        if (isEmpty(res.data)) {
          setGoing([]);
          setGuest([]);
          setInterested([]);
        } else {
          let guestArr: any = [];
          let goingArr: any = [];
          let interestArr: any = [];
          res.data.forEach((el: any) => {
            if (el.type == 1 && !guestArr.includes(el)) {
              guestArr.push(el);
            } else if (el.type == 2 && !interestArr.includes(el)) {
              interestArr.push(el);
            } else if (el.type == 3 && !goingArr.includes(el)) {
              goingArr.push(el);
            }
          });
          setGoing(goingArr);
          setInterested(interestArr);
          setGuest(guestArr);
        }
      }
    });
  };

  const onPressGoing = () => {
    let check = false;
    if (status == 3) {
      deleteRequest('/eventMap/' + id).then((res: any) => {
        if (res.success) {
          setStatus(null);
          initData();
        }
      });
    } else if (!status) {
      const body = {
        eventId: id,
        userId: userInfo._id,
        type: 3,
      };
      sendRequest('/eventMap', body).then((res: any) => {
        if (res.success) {
          setStatus(3);
          initData();
        }
      });
    } else if (status == 2) {
      const body = {
        eventId: id,
        userId: userInfo._id,
        type: 3,
      };
      putRequest('/eventMap/' + id, body).then((res: any) => {
        if (res.success) {
          setStatus(3);
          initData();
        }
      });
    }
  };

  const onPressInteresting = () => {
    if (status == 3) {
      const body = {
        eventId: id,
        userId: userInfo._id,
        type: 2,
      };
      putRequest('/eventMap/' + id, body).then((res: any) => {
        if (res.success) {
          initData();
          setStatus(2);
        }
      });
    } else if (status == 2) {
      deleteRequest('/eventMap/' + id).then((res: any) => {
        if (res.success) {
          initData();
          setStatus(null);
        }
      });
    } else if (!status) {
      const body = {
        eventId: id,
        userId: userInfo._id,
        type: 2,
      };
      sendRequest('/eventMap', body).then((res: any) => {
        if (res.success) {
          initData();
          setStatus(2);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Үйл явдлын хуанли"
        leftIcon="left"
        leftIconPress={() => props.navigation.goBack()}
      />
      <View style={styles.wrapper}>
        <Text style={styles.name}>{data?.name}</Text>
        <Text style={styles.description}>{data?.description}</Text>
        <Text style={styles.date}>
          {data?.date} {data?.time}
        </Text>
        <Text style={styles.date}>Уригдсан зочид:</Text>
        <FlatList
          horizontal
          data={guest}
          style={{paddingTop: 10}}
          renderItem={({item, index}: any) => {
            return (
              <View style={styles.userItemContainer}>
                <Image
                  source={require('../../assets/userIcon.png')}
                  style={styles.userItemImage}
                />
                <Text style={{color: COLORS.textColor, marginTop: 5}}>
                  {item.userId.firstName}
                </Text>
              </View>
            );
          }}
        />
        <Text style={styles.date}>Сонирхож байгаа хүмүүс:</Text>
        <FlatList
          horizontal
          data={interested}
          style={{paddingTop: 10}}
          renderItem={({item, index}: any) => {
            return (
              <View style={styles.userItemContainer}>
                <Image
                  source={require('../../assets/userIcon.png')}
                  style={styles.userItemImage}
                />
                <Text style={{color: COLORS.textColor, marginTop: 5}}>
                  {item.userId.firstName}
                </Text>
              </View>
            );
          }}
        />
        <Text style={styles.date}>Очихоор шийдсэн хүмүүс:</Text>
        <FlatList
          horizontal
          data={going}
          style={{paddingTop: 10}}
          renderItem={({item, index}: any) => {
            return (
              <View style={styles.userItemContainer}>
                <Image
                  source={require('../../assets/userIcon.png')}
                  style={styles.userItemImage}
                />
                <Text style={{color: COLORS.textColor, marginTop: 5}}>
                  {item.userId.firstName}
                </Text>
              </View>
            );
          }}
        />
        <View style={{flexDirection: 'row'}}>
          {guest.some((el: any) => el.userId._id == userInfo._id) ? (
            <View style={{marginTop: 20}}>
              <Text style={{color: COLORS.textColor, fontSize: 18}}>
                Та уригдсан байна 🎉
              </Text>
            </View>
          ) : (
            <>
              <Button
                title="Очино"
                icon="check"
                style={{
                  width: '47%',
                  marginRight: 15,
                  backgroundColor: status == 3 ? '#E88B00' : '#2d3846',
                }}
                titleStyle={{fontSize: 18, marginRight: 10, color: '#fff'}}
                iconStyle={{fontSize: 24, color: '#fff'}}
                onPress={onPressGoing}
              />
              <Button
                title="Сонирхох"
                icon="star"
                style={{
                  width: '47%',
                  marginRight: 15,
                  backgroundColor: status == 2 ? '#E88B00' : '#2d3846',
                }}
                titleStyle={{fontSize: 18, marginRight: 10, color: '#fff'}}
                iconStyle={{fontSize: 24, color: '#fff'}}
                onPress={onPressInteresting}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B3036',
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  name: {
    color: COLORS.textColor,
    fontSize: 24,
  },
  description: {
    color: COLORS.textColor,
    fontSize: 18,
    marginTop: 20,
  },
  date: {
    color: COLORS.textColor,
    fontSize: 14,
    marginTop: 20,
  },
  userItemContainer: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  userItemImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    // borderWidth: 2,
    // borderColor: '#f2f2f2',
  },
});
