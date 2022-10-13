import CheckBox from '@react-native-community/checkbox';
import React, {useContext, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Button from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
import {baseUrl, COLORS} from '../../constants';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserContext from '../../Context/userContext';
import {fileUpload, sendRequest} from '../../utils/Service';
import {CustomAlert} from '../../utils/CustomAlert';
import {
  choosePhoto,
  showSuccessMessage,
  showUnSuccessMessage,
  takePhoto,
} from '../../utils/helper';
import {Toast} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddNews = (props: any) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [fileData, setFileData] = useState<any>();
  const [body, setBody] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const {userInfo} = useContext<any>(UserContext);

  const handleButtonPress = () => {
    const requestBody = {
      userId: userInfo._id,
      title,
      body,
      photo: '',
      videoLink,
      nameCardId: userInfo.nameCardId,
    };
    setLoading(true);
    sendRequest('/news', requestBody).then(res => {
      if (!res.error) {
        fileUpload(fileData, `${baseUrl}/news/${res.data._id}/photo`)
          .then((ress: any) => {
            setLoading(false);
            showSuccessMessage();
            props.navigation.goBack();
          })
          .catch((e: any) => {
            showUnSuccessMessage(JSON.stringify(e));
            setLoading(false);
          });
      }
    });
  };

  const openCamera = () => {
    takePhoto().then(res => {
      setModalShow(false);
      if (!res?.error) {
        setFileData(res);
      }
    });
  };

  const openGallery = () => {
    choosePhoto().then(res => {
      setModalShow(false);
      if (!res?.error) {
        setFileData(res);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Мэдээ нэмэх"
        leftIcon="left"
        leftIconPress={() => props.navigation.goBack()}
      />
      <KeyboardAwareScrollView style={styles.wrapper}>
        <Text style={styles.titlePhoto}>Мэдээний гарчиг</Text>
        <TextInput
          value={title}
          style={styles.input}
          onChangeText={val => setTitle(val)}
        />
        <Text style={styles.titlePhoto}>Мэдээний зураг</Text>
        {fileData?.path ? (
          <TouchableOpacity onPress={() => setModalShow(true)}>
            <Image
              style={styles.photoContainer}
              source={{uri: fileData?.path}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={() => setModalShow(true)}>
            <FeatherIcon name="camera" style={styles.photoIcon} />
          </TouchableOpacity>
        )}
        <Text style={styles.titlePhoto}>Мэдээний агуулга</Text>
        <TextInput
          value={body}
          multiline
          style={styles.inputBig}
          onChangeText={val => setBody(val)}
        />
        <Text style={styles.titlePhoto}>Бичлэгний линк</Text>
        <TextInput
          value={videoLink}
          style={styles.input}
          onChangeText={val => setVideoLink(val)}
        />
        <Button
          title="Хадгалах"
          loading={loading}
          style={styles.registerButton}
          titleStyle={styles.buttonText}
          onPress={handleButtonPress}
        />
      </KeyboardAwareScrollView>
      <Modal visible={modalShow} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalShow(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <TouchableOpacity style={styles.modalItem} onPress={openCamera}>
                <Icon name="camera" style={styles.icon} />
                <Text style={styles.text}>Зураг авах</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalItem} onPress={openGallery}>
                <Icon name="photo" style={styles.icon} />
                <Text style={styles.text}>Зураг оруулах</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default AddNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B3036',
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  titlePhoto: {
    color: COLORS.textColor,
    fontSize: 14,
    marginTop: 20,
  },
  photoContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.textColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 136,
    marginTop: 10,
  },
  photoIcon: {
    fontSize: 36,
    color: COLORS.textColor,
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.textColor,
    paddingHorizontal: 10,
    height: 40,
    textAlignVertical: 'top',
    fontSize: 14,
    color: COLORS.textColor,
  },
  inputBig: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.textColor,
    paddingHorizontal: 10,
    height: 160,
    textAlignVertical: 'top',
    fontSize: 14,
    color: COLORS.textColor,
  },
  registerButton: {
    width: '80%',
    height: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#e1e1e1',
    alignSelf: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
  },
  modal: {
    height: '30%',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: COLORS.DEFAULT_COLOR,
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  modalItem: {
    height: '50%',
    width: '40%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e1e1e1',
    borderRadius: 10,
  },
  icon: {
    fontSize: 24,
    marginBottom: 10,
    color: COLORS.textColor,
  },
  text: {
    fontSize: 16,
    color: COLORS.textColor,
  },
});
