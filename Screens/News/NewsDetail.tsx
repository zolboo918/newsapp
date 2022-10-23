import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
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
import {deleteRequest, getRequest, sendRequest} from '../../utils/Service';
import {showDialogMessage, showSuccessMessage} from '../../utils/helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {getWidth, setHeight} from '../../utils/Dimension';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isEmpty} from 'lodash';

const NewsDetail = (props: any) => {
  const data = props.route.params;
  const [heartPress, setHeartPress] = useState(false);
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [commentData, setCommentData] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [commentHeight, setCommentHeight] = useState(true);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const date = new Date(data.createdDate);
  const videoLink = data.videoLink;
  const videoId = videoLink?.substr(
    videoLink.lastIndexOf('/') + 1,
    videoLink.length,
  );
  let showRef: any;
  let hideRef: any;

  const {userInfo} = useContext<any>(UserContext);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setCommentHeight(false);
      },
    );
    showRef = keyboardDidShowListener;

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setCommentHeight(true);
      },
    );
    hideRef = keyboardDidHideListener;
    getRequest('/newsLike/' + data._id).then((res: any) => {
      if (res.success) {
        res.data.forEach((el: any) => {
          if (el.userId._id == userInfo._id) {
            setHeartPress(true);
          }
        });
      }
    });
    sendRequest('/news/' + data._id + '/viewedCount', {
      viewedCount: data.viewedCount + 1,
    });
    return () => {
      hideRef.remove();
      showRef.remove();
    };
  }, []);

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
    const body = {
      newsId: data._id,
      userId: userInfo._id,
    };
    if (heartPress) {
      setLikeCount(likeCount - 1);
      sendRequest(`/newsLike/unlike`, body).then();
    } else {
      setLikeCount(likeCount + 1);
      const body = {
        newsId: data._id,
        userId: userInfo._id,
      };
      sendRequest(`/newsLike/`, body).then();
    }
    setHeartPress(!heartPress);
  };

  const onPressComment = () => {
    actionSheetRef.current?.show();
    getCommentData();
  };

  const getCommentData = () => {
    setLoading(true);
    getRequest('/newsComment/' + data._id + '/comment').then((res: any) => {
      if (res.success) {
        setLoading(false);
        setCommentData(res.data);
      }
    });
  };

  const sendComment = () => {
    if (!isEmpty(commentContent)) {
      const body = {
        userId: userInfo._id,
        newsId: data._id,
        content: commentContent,
      };
      sendRequest(`/newsComment/${data._id}`, body).then((res: any) => {
        if (res.success) {
          getCommentData();
          setCommentContent('');
        }
      });
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
              style={{fontSize: 22, color: heartPress ? 'tomato' : '#fff'}}
            />
            <Text style={{fontSize: 16, color: '#fff', marginLeft: 5}}>
              {likeCount}
            </Text>

            <TouchableOpacity
              style={styles.commentButtonContainer}
              onPress={onPressComment}>
              <Icon name="commenting-o" style={{fontSize: 22, color: '#fff'}} />
              {/* <Text style={styles.commentButtonText}>Сэтгэгдэл</Text> */}
              <Text style={styles.commentButtonText}>{data.commentCount}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ActionSheet ref={actionSheetRef}>
          <View
            style={{
              height: commentHeight ? setHeight(80) : setHeight(50),
              padding: 20,
            }}>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#e1e1e1'}}>
              <Text style={styles.commentTitle}>Сэтгэгдлүүд</Text>
            </View>
            <ScrollView style={{maxHeight: setHeight(65)}}>
              <FlatList
                data={commentData}
                renderItem={({item, index}: any) => {
                  const date = new Date(item.date);
                  return (
                    <View
                      style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        width: '90%',
                      }}>
                      <Image
                        source={{
                          uri: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
                        }}
                        style={{height: 40, width: 40, borderRadius: 30}}
                      />
                      <View>
                        <View style={styles.commentBodyContainer}>
                          <Text style={styles.commentUser}>
                            {item.userId.firstName} {item.userId.lastName}
                          </Text>
                          <Text style={{color: '#282828', fontSize: 14}}>
                            {item.content}
                          </Text>
                        </View>
                        <Text style={styles.commentDate}>
                          {date.getFullYear() +
                            '.' +
                            (date.getMonth() + 1) +
                            '.' +
                            date.getDate() +
                            ' ' +
                            date.getHours() +
                            ':' +
                            date.getMinutes()}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </ScrollView>
            <KeyboardAwareScrollView
              style={styles.writeCommentContainer}
              scrollEnabled={false}>
              <TextInput
                value={commentContent}
                placeholder="Сэтгэгдэл үлдээх"
                placeholderTextColor={'#a0a0a0'}
                style={styles.commentInput}
                onChangeText={(val: any) => setCommentContent(val)}
              />
              <Icon name="send" style={styles.sendIcon} onPress={sendComment} />
            </KeyboardAwareScrollView>
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
    marginLeft: 20,
    // borderWidth: 1,
    borderColor: '#fff',
    // borderRadius: 30,
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
    marginLeft: 10,
  },
  commentUser: {
    color: '#282828',
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentDate: {
    color: '#A0A0A0',
    fontSize: 12,
    marginLeft: '10%',
    marginTop: 5,
  },
  writeCommentContainer: {
    width: getWidth(),
    height: setHeight(8),
    position: 'absolute',
    bottom: Platform.OS == 'android' ? -20 : 0,
    backgroundColor: '#f0f0f0',
    // marginLeft: -20,
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
    right: 30,
    top: 10,
    fontSize: 20,
    color: COLORS.DEFAULT_COLOR,
  },
});
