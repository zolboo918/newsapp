import React, {useContext, useRef, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Alert, StyleSheet, Text, View} from 'react-native';
import WebView from 'react-native-webview';
import Header from '../../Components/Header/Header';
import {COLORS, imageUrl} from '../../constants';
import YouTube from 'react-native-youtube';
import UserContext from '../../Context/userContext';
import {deleteRequest} from '../../utils/Service';
import {showDialogMessage, showSuccessMessage} from '../../utils/helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {getWidth, setHeight} from '../../utils/Dimension';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const NewsDetail = (props: any) => {
  const [heartPress, setHeartPress] = useState(false);
  const [likeCount, setLikeCount] = useState(34);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const data = props.route.params;
  const date = new Date(data.createdDate);
  const videoLink = data.videoLink;
  const videoId = videoLink?.substr(
    videoLink.lastIndexOf('/') + 1,
    videoLink.length,
  );

  const {userInfo} = useContext<any>(UserContext);

  const deleteNews = () => {
    showDialogMessage('Та итгэлтэй байна уу?', () => {
      deleteRequest('/news/' + data._id).then(res => {
        if (!res?.error) {
          props.navigation.goBack();
          showSuccessMessage();
        }
      });
    });
  };

  const onPressLike = () => {
    setHeartPress(!heartPress);
    if (heartPress) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Дэлгэрэнгүй"
        leftIcon="left"
        rightIcon={data.nameCardId == userInfo.nameCardId ? 'delete' : ''}
        rightIconPress={
          data.nameCardId == userInfo.nameCardId ? deleteNews : () => {}
        }
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
          {videoId && (
            <YouTube
              apiKey="AIzaSyBspyEjdjNnJCiLpl3DDDyZTYw_sqB1XIg"
              videoId={videoId} // The YouTube video ID
              play={true} // control playback of video with true/false
              style={{alignSelf: 'stretch', height: 300}}
            />
          )}
        </View>
        <View>
          <View style={styles.commentLikeContainer}>
            <Icon
              name={heartPress ? 'heart' : 'heart-o'}
              onPress={onPressLike}
              style={{fontSize: 26, color: heartPress ? 'tomato' : '#fff'}}
            />
            <Text style={{fontSize: 16, color: '#fff', marginLeft: 5}}>
              {likeCount}
            </Text>

            <TouchableOpacity
              style={styles.commentButtonContainer}
              onPress={() => actionSheetRef.current?.show()}>
              <Icon name="commenting-o" style={{fontSize: 26, color: '#fff'}} />
              <Text style={styles.commentButtonText}>Сэтгэгдэл</Text>
              <Text style={styles.commentButtonText}>34</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ActionSheet ref={actionSheetRef}>
          <View style={{height: setHeight(80), padding: 20}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#e1e1e1'}}>
              <Text style={styles.commentTitle}>Сэтгэгдлүүд</Text>
            </View>
            <ScrollView style={{maxHeight: setHeight(60)}}>
              <View style={{marginTop: 20, flexDirection: 'row', width: '90%'}}>
                <Image
                  source={{
                    uri: 'https://img.freepik.com/free-photo/portrait-dark-skinned-cheerful-woman-with-curly-hair-touches-chin-gently-laughs-happily-enjoys-day-off-feels-happy-enthusiastic-hears-something-positive-wears-casual-blue-turtleneck_273609-43443.jpg?w=2000',
                  }}
                  style={{height: 40, width: 40, borderRadius: 30}}
                />
                <View>
                  <View style={styles.commentBodyContainer}>
                    <Text style={styles.commentUser}>Ундармаа</Text>
                    <Text style={{color: '#282828', fontSize: 14}}>
                      An summo saepe maiestatis sit, ei saepe eos. gaga
                    </Text>
                  </View>
                  <Text style={styles.commentDate}>2022.10.13 23:38</Text>
                </View>
              </View>
            </ScrollView>
            <View style={styles.writeCommentContainer}>
              <TextInput
                placeholder="Сэтгэгдэл үлдээх"
                style={styles.commentInput}
              />
              <Icon name="send" style={styles.sendIcon} />
            </View>
          </View>
        </ActionSheet>
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

  commentLikeContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  commentButtonContainer: {
    marginLeft: '20%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 30,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  commentButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  commentTitle: {
    fontSize: 22,
    marginBottom: 20,
  },
  commentBodyContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginLeft: 20,
  },
  commentUser: {
    color: '#282828',
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentDate: {
    color: '#A0A0A0',
    fontSize: 12,
    marginLeft: '7%',
    marginTop: 5,
  },
  writeCommentContainer: {
    width: getWidth(),
    backgroundColor: '#f0f0f0',
    marginLeft: -20,
    padding: 10,
  },
  commentInput: {
    width: '95%',
    marginLeft: '2.5%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendIcon: {
    position: 'absolute',
    borderRadius: 5,
    right: 40,
    top: 20,
    fontSize: 20,
    color: COLORS.DEFAULT_COLOR,
  },
});
