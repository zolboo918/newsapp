import {
  CommonActions,
  StackActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import {Fab} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
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
  const [newsData, setNewsData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const {userInfo, logOut} = useContext<any>(UserContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && userInfo) {
      getNews();
    }
  }, [userInfo, isFocused]);

  const getLikeCount = async (newsId: any) => {
    return getRequest('/newsLike/' + newsId + '/likeCount').then((res: any) => {
      return res.data;
    });
  };
  const getCommentCount = async (newsId: any) => {
    return getRequest('/newsComment/' + newsId + '/commentCount').then(
      (res: any) => {
        return res.data;
      },
    );
  };

  const getNews = () => {
    setLoading(true);
    let arr: any = [];
    getRequest(`/news`).then((news: any) => {
      getRequest(`/nameCardsMap`).then((map: any) => {
        if (!news.error && !map.error) {
          let check = false;
          if (!isEmpty(news.data)) {
            news.data.forEach((newsItem: any) => {
              map.data.forEach((mapItem: any) => {
                if (
                  !check &&
                  newsItem.nameCardId == mapItem.sourceId &&
                  userInfo.nameCardId == mapItem.targetId &&
                  mapItem.isFriend == '1'
                ) {
                  getLikeCount(newsItem._id).then((likeCount: any) => {
                    getCommentCount(newsItem._id).then((commentCount: any) => {
                      setLoading(false);
                      const data = {...newsItem, likeCount, commentCount};
                      if (!newsData.includes(data)) {
                        setNewsData((old: any) => [...old, data]);
                        check = true;
                      }
                    });
                  });
                } else {
                  console.log('eeee');
                  setLoading(false);
                }
              });
              if (newsItem.nameCardId == userInfo.nameCardId) {
                getLikeCount(newsItem._id).then((likeCount: any) => {
                  getCommentCount(newsItem._id).then((commentCount: any) => {
                    const data = {...newsItem, likeCount, commentCount};
                    if (!newsData.includes(data)) {
                      setNewsData((old: any) => [...old, data]);
                      setLoading(false);
                    }
                  });
                });
                // setNewsData((old: any) => [...old, data]);
              }
              check = false;
            });
            setNewsData(arr);
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      });
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
    height: 50,
    width: 50,
    paddingLeft: '27%',
    paddingTop: '25%',
  },
  fabIcon: {
    color: COLORS.DEFAULT_COLOR,
    fontSize: 24,
  },
});
