import {Fab} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EmptyData from '../../Components/EmptyData/EmptyData';
import Header from '../../Components/Header/Header';
import NewsListItem from '../../Components/ListItems/NewsListItem';
import {COLORS} from '../../constants';
import UserContext from '../../Context/userContext';
import {getRequest} from '../../utils/Service';

const News = (props: any) => {
  const [newsData, setNewsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const {logOut} = useContext(UserContext);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    setLoading(true);
    getRequest(`/news`)
      .then((res: any) => {
        setLoading(false);
        if (!res.error) {
          setNewsData(res.data);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onPressFab = () => {
    props.navigation.navigate('AddNews');
  };

  const onPressNews = (item: any) => {
    props.navigation.navigate('NewsDetail', item);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getNews();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Мэдээ" rightIcon="logout" rightIconPress={logOut} />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={COLORS.textColor} />
        </View>
      ) : (
        <FlatList
          ListEmptyComponent={<EmptyData />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={newsData}
          keyExtractor={(item: any, index: any) => index}
          renderItem={({item, index}: any) => (
            <NewsListItem item={item} onPress={() => onPressNews(item)} />
          )}
        />
      )}
      <Fab
        style={styles.fab}
        renderInPortal={false}
        onPress={onPressFab}
        icon={<AntDesignIcon name="plus" style={styles.fabIcon} />}
      />
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B3036',
    flex: 1,
  },
  fab: {
    backgroundColor: '#E88B00',
    position: 'absolute',
    height: 60,
    width: 60,
  },
  fabIcon: {
    color: COLORS.DEFAULT_COLOR,
    fontSize: 26,
  },
});
