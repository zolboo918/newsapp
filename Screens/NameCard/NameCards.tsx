import {useIsFocused} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EmptyData from '../../Components/EmptyData/EmptyData';
import Header from '../../Components/Header/Header';
import NameCardListItem from '../../Components/ListItems/NameCardListItem';
import {COLORS} from '../../constants';
import UserContext from '../../Context/userContext';
import {getRequest} from '../../utils/Service';

const NameCards = (props: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [nameCardsData, setNameCardsData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const {userInfo, logOut} = useContext<any>(UserContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const getData = async () => {
    setLoading(true);
    const res = await getRequest(
      '/nameCardsMap/' + userInfo.nameCardId + '/data',
    );
    if (!res.error) {
      let arr: any = [];
      if (!isEmpty(res.data)) {
        res.data.forEach((el: any) => {
          if (el.isFriend == '1') {
            arr.push(el);
          }
        });
      }
      const data: any = await getManualNameCards();

      setNameCardsData([...arr, ...data]);
    }
    setLoading(false);
  };

  const getManualNameCards = async () => {
    const res = await getRequest('/nameCardManual/user/' + userInfo._id);
    if (!res.error) {
      let arr: any = [];
      res.data.forEach((el: any) => {
        arr.push({targetId: {...el, manual: true}});
      });
      return arr;
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  const onPressSearch = () => {
    props.navigation.navigate('NameCardSearch');
  };

  const friendRequest = () => {
    props.navigation.navigate('FriendRequest');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Нэрийн хуудас"
        leftIcon="adduser"
        rightIcon="logout"
        rightIconPress={logOut}
        leftIconPress={friendRequest}
      />
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.searchSection} onPress={onPressSearch}>
          <View style={styles.input}>
            <Text>Хайх</Text>
          </View>
          <AntDesignIcon name="search1" style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={{marginTop: 20, height: '85%'}}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator color={COLORS.textColor} size="large" />
            </View>
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={<EmptyData />}
              data={nameCardsData}
              numColumns={2}
              renderItem={({item, index}: any) => (
                <NameCardListItem item={item.targetId} />
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default NameCards;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B3036',
    flex: 1,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  input: {
    width: '90%',
    backgroundColor: '#d9d9d9',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  searchIcon: {
    color: '#fff',
    fontSize: 28,
  },
});
