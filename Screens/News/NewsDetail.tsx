import React from 'react';
import {Image, Platform, ScrollView} from 'react-native';
import {Alert, StyleSheet, Text, View} from 'react-native';
import WebView from 'react-native-webview';
import Header from '../../Components/Header/Header';
import {imageUrl} from '../../constants';
import YouTube from 'react-native-youtube';

const NewsDetail = (props: any) => {
  const data = props.route.params;
  const date = new Date(data.createdDate);
  const videoLink = data.videoLink;
  const videoId = videoLink?.substr(
    videoLink.lastIndexOf('/') + 1,
    videoLink.length,
  );

  return (
    <View style={styles.container}>
      <Header
        title="Дэлгэрэнгүй"
        leftIcon="left"
        leftIconPress={() => props.navigation.goBack()}
      />
      <Image
        source={{uri: imageUrl + 'uploads/' + data.photo}}
        style={styles.image}
      />
      <ScrollView style={styles.wrapper}>
        <Text style={styles.newsTitle}>{data.title}</Text>
        <Text style={styles.newsDate}>
          {date.getFullYear()}.{date.getMonth() + 1}.{date.getDate()}{' '}
          {date.getHours()}:{date.getMinutes()}
        </Text>
        <Text style={styles.news}>{data.body}</Text>
        <View style={styles.youtube}>
          <YouTube
            apiKey="AIzaSyBspyEjdjNnJCiLpl3DDDyZTYw_sqB1XIg"
            videoId={videoId} // The YouTube video ID
            play={true} // control playback of video with true/false
            style={{alignSelf: 'stretch', height: 300}}
          />
        </View>
      </ScrollView>
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
  newsDate: {
    fontSize: 12,
    color: '#e1e1e1',
    marginTop: 5,
  },
  youtube: {
    marginTop: 20,
  },
});
