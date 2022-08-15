import {Fab, Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import Header from '../../Components/Header/Header';
import NewsListItem from '../../Components/ListItems/NewsListItem';
import {NewsListData} from '../../data/Data';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../constants';
import {StackActions} from '@react-navigation/native';

const News = (props: any) => {
  const onPressFab = () => {
    props.navigation.navigate('AddNews');
  };

  const onPressNews = (item: any) => {
    props.navigation.navigate('NewsDetail', item);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Мэдээ"
        rightIcon="logout"
        rightIconPress={() =>
          props.navigation.dispatch(StackActions.replace('Login'))
        }
      />
      <FlatList
        data={NewsListData}
        keyExtractor={(item: any, index: any) => index}
        renderItem={({item, index}: any) => (
          <NewsListItem item={item} onPress={() => onPressNews(item)} />
        )}
      />
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
