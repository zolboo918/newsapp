import {useIsFocused} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EmptyData from '../../Components/EmptyData/EmptyData';
import Header from '../../Components/Header/Header';
import NameCardListItem from '../../Components/ListItems/NameCardListItem';
import UserContext from '../../Context/userContext';
import {NameCardData} from '../../data/Data';
import {getRequest} from '../../utils/Service';

const NameCards = (props: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [nameCardsData, setNameCardsData] = useState<any>([]);

  const {userInfo, logOut} = useContext<any>(UserContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    const res = await getRequest(
      '/nameCardsMap/' + userInfo.nameCardId + '/data',
    );
    if (!res.error) {
      setNameCardsData(res.data);
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
  return (
    <View style={styles.container}>
      <Header
        title="Нэрийн хуудас"
        rightIcon="logout"
        rightIconPress={logOut}
      />
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.searchSection} onPress={onPressSearch}>
          <View style={styles.input}>
            <Text>Хайх</Text>
          </View>
          <AntDesignIcon name="search1" style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={{marginTop: 20, height: '85%'}}>
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
