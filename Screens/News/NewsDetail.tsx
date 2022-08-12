import React from 'react';
import {Image, Platform} from 'react-native';
import {Alert, StyleSheet, Text, View} from 'react-native';
import WebView from 'react-native-webview';
import Header from '../../Components/Header/Header';

const NewsDetail = (props: any) => {
  const data = props.route.params;
  return (
    <View style={styles.container}>
      <Header
        title="Дэлгэрэнгүй"
        leftIcon="left"
        leftIconPress={() => props.navigation.goBack()}
      />
      <Image source={{uri: data.newsImage}} style={styles.image} />
      <View style={styles.wrapper}>
        <Text style={styles.newsTitle}>{data.newsTitleFull}</Text>
        <Text style={styles.news}>{data.newsContext}</Text>
        <View>
          {/* <WebView
            style={{marginTop: Platform.OS == 'ios' ? 20 : 0, opacity: 0.99}}
            // javaScriptEnabled={true}
            // domStorageEnabled={true}
            androidHardwareAccelerationDisabled={true}
            source={{
              uri: 'https://stackoverflow.com/questions/57413156/pla`y-youtube-video-in-react-native-video',
            }}
          /> */}
        </View>
      </View>
    </View>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B3036',
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: '28%',
  },
  newsTitle: {
    color: '#fff',
    fontSize: 20,
    marginTop: 15,
  },
  news: {
    color: '#8A939E',
    fontSize: 14,
    marginTop: 20,
  },
});
