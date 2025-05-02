import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../Components/Header/Header';
import EmptyData from '../Components/EmptyData/EmptyData';
import {deleteRequest, getRequest, sendRequest} from '../utils/Service';
import UserContext from '../Context/userContext';
import RequestListItem from '../Components/ListItems/RequestListItem';
import {isEmpty} from 'lodash';

const FriendRequest = (props: any) => {
  const [data, setData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);

  const {userInfo} = useContext<any>(UserContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getRequest('/nameCardsMap/request/' + userInfo.nameCardId).then(res => {
      if (!res?.error) {
        let arr: any = [];
        if (!isEmpty(res.data)) {
          res.data.forEach((el: any) => {
            if (el.isFriend == '2') {
              arr.push(el);
            }
          });
        }
        setData(arr);
      }
    });
  };

  const onRefresh = () => {
    getData();
  };

  const accept = (item: any, index: any) => {
    const body = {
      id: data[index]._id,
      sourceId: item._id,
      targetId: userInfo.nameCardId,
      isFriend: '1',
    };
    sendRequest('/nameCardsMap/request', body).then(res => {
      if (!res?.error) {
        getData();
      }
    });
  };

  const decline = (item: any, index: any) => {
    // const body = {
    //   id: data[index]._id,
    //   sourceId: item._id,
    //   targetId: userInfo.nameCardId,
    //   isFriend: '0',
    // };
    deleteRequest('/nameCardsMap/' + data[index]._id).then(res => {
      if (!res?.error) {
        getData();
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Хүсэлтүүд"
        leftIcon="left"
        leftIconPress={() => props.navigation.goBack()}
      />
      <View style={styles.wrapper}>
        <View style={{marginTop: 20, height: '92%'}}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={<EmptyData />}
            data={data}
            renderItem={({item, index}: any) => (
              <RequestListItem
                item={item?.sourceId}
                index={index}
                accept={accept}
                decline={decline}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B3036',
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
});
