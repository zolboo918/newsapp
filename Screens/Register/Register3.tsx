import {StackActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Button from '../../Components/Button/Button';
import {COLORS} from '../../constants';
import {choosePhoto, takePhoto} from '../../utils/helper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Register3 = (props: any) => {
  const [image, setImage] = useState<any>();
  const [image2, setImage2] = useState<any>();
  const [fileData, setFileData] = useState();
  const [fileData2, setFileData2] = useState();

  const [modalShow, setModalShow] = useState('');

  const handleButtonPress = () => {
    props.navigation.dispatch(
      StackActions.push('Register4', {
        ...props.route.params,
        frontImage: fileData,
        backImage: fileData2,
      }),
    );
  };

  const openCamera = (type: any) => {
    takePhoto().then(res => {
      if (!res?.error) {
        if (type == '1') {
          setFileData(res);
          setImage(res.path);
        } else {
          setFileData2(res);
          setImage2(res.path);
        }
      }
    });
  };
  const openGallery = (type: any) => {
    choosePhoto().then(res => {
      setModalShow('');
      if (!res?.error) {
        if (type == '1') {
          setFileData(res);
          setImage(res.path);
        } else {
          setFileData2(res);
          setImage2(res.path);
        }
      }
    });
  };

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.container}>
      <Text style={styles.headerTitle}>Bizcard</Text>
      <Text style={styles.title}>Нэрийн хуудасны мэдээлэл</Text>
      <Text style={[styles.titlePhoto, {marginTop: 10, marginBottom: -10}]}>
        Нэрийн хуудасны зураг
      </Text>
      {image ? (
        <Image
          resizeMode="cover"
          source={{uri: image}}
          style={styles.photoContainer}
        />
      ) : (
        <TouchableOpacity
          style={styles.photoContainer}
          onPress={() => setModalShow('1')}>
          <FeatherIcon name="camera" style={styles.photoIcon} />
          <Text style={styles.titlePhoto}>Нүүр</Text>
        </TouchableOpacity>
      )}

      {image2 ? (
        <Image
          resizeMode="cover"
          source={{uri: image2}}
          style={styles.photoContainer}
        />
      ) : (
        <TouchableOpacity
          style={styles.photoContainer}
          onPress={() => setModalShow('2')}>
          <FeatherIcon name="camera" style={styles.photoIcon} />
          <Text style={styles.titlePhoto}>Ар тал</Text>
        </TouchableOpacity>
      )}
      <View style={styles.bottombuttonContainer}>
        <Button
          icon="chevron-left"
          style={styles.backButton}
          iconStyle={styles.backButtonIcon}
          titleStyle={styles.buttonText}
          onPress={() => props.navigation.goBack()}
        />
        <Button
          title="Үргэлжлүүлэх"
          style={styles.registerButton}
          titleStyle={styles.buttonText}
          onPress={handleButtonPress}
        />
      </View>
      <Modal
        visible={modalShow == '1' || modalShow == '2'}
        transparent
        animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalShow('')}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => openCamera(modalShow == '1' ? '1' : '2')}>
                <Icon name="camera" style={styles.icon} />
                <Text style={styles.text}>Зураг авах</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => openGallery(modalShow == '1' ? '1' : '2')}>
                <Icon name="photo" style={styles.icon} />
                <Text style={styles.text}>Зураг оруулах</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAwareScrollView>
  );
};

export default Register3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DEFAULT_COLOR,
    paddingHorizontal: 30,
  },
  headerTitle: {
    alignSelf: 'center',
    color: '#f2f2f2',
    fontWeight: 'bold',
    fontSize: 64,
    marginTop: '15%',
  },
  checkbox: {
    marginRight: 10,
    margin: 0,
  },
  title: {
    color: COLORS.textColor,
    fontSize: 22,
    marginTop: '13%',
    fontWeight: 'bold',
  },
  titlePhoto: {
    color: COLORS.textColor,
    fontSize: 14,
    marginTop: 10,
  },
  photoContainer: {
    borderWidth: 1,
    borderColor: COLORS.textColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    marginTop: 20,
  },
  photoIcon: {
    fontSize: 36,
    color: COLORS.textColor,
  },
  input: {
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.textColor,
    paddingHorizontal: 10,
    height: 160,
    textAlignVertical: 'top',
    fontSize: 14,
    color: COLORS.textColor,
  },
  checkBoxContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  checkBox: {},
  checkBoxTitle: {
    color: COLORS.textColor,
    fontSize: 14,
    marginLeft: 10,
  },
  bottombuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 50,
    height: 50,
  },
  backButtonIcon: {
    fontSize: 35,
  },
  registerButton: {
    width: '78%',
    height: 50,
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
