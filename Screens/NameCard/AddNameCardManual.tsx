import {useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
import Picker from '../../Components/Picker/Picker';
import {baseUrl, COLORS} from '../../constants';
import UserContext from '../../Context/userContext';
import {getHeight} from '../../utils/Dimension';
import {
  choosePhoto,
  showSuccessMessage,
  showUnSuccessMessage,
  takePhoto,
} from '../../utils/helper';
import {fileUpload, getRequest, sendRequest} from '../../utils/Service';

const AddNameCardManual = (props: any) => {
  const [image, setImage] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [sector, setSector] = useState('');
  const [note, setNote] = useState('');

  const [sectorData, setSectorData] = useState([]);
  const [fileData, setFileData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const navigation = useNavigation();
  const {userInfo} = useContext<any>(UserContext);
  const handleButtonPress = () => {
    const body = {
      userId: userInfo._id,
      image: '',
      lastName,
      firstName,
      phone,
      email: mail,
      position,
      companyName: company,
      sectorId: sector,
      note,
    };
    setLoading(true);
    sendRequest('/nameCardManual', body).then(res => {
      if (!res?.error) {
        fileUpload(fileData, `${baseUrl}/nameCardManual/${res.data._id}/photo`)
          .then((res: any) => {
            setLoading(false);
            navigation.goBack();
            showSuccessMessage('Амжилттай бүртгэгдлээ');
          })
          .catch((e: any) => {
            showUnSuccessMessage(JSON.stringify(e));
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  };

  const onPressSector = () => {
    if (isEmpty(sectorData)) {
      getRequest('/companyCategories').then(res => {
        let arr: any = [];
        res.data.forEach((el: any) => {
          arr.push({label: el.displayName, value: el._id});
        });
        setSectorData(arr);
      });
    }
  };

  const openCamera = () => {
    takePhoto().then(res => {
      setModalShow(false);
      if (!res?.error) {
        setFileData(res);
        setImage(res.path);
      }
    });
  };

  const openGallery = () => {
    choosePhoto().then(res => {
      setModalShow(false);
      if (!res?.error) {
        setFileData(res);
        setImage(res.path);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Нэрийн хуудас нэмэх"
        leftIcon="left"
        leftIconPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView style={styles.wrapper}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={'large'} color={COLORS.textColor} />
          </View>
        ) : (
          <View style={styles.inputsContainer}>
            <Text style={styles.label}>Нэрийн хуудасны зураг</Text>
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
                <View style={styles.iconContainer}>
                  <FeatherIcon name="camera" style={styles.photoIcon} />
                </View>
              </TouchableOpacity>
            )}
            <TextInput
              value={lastName}
              placeholder="Овог"
              placeholderTextColor={COLORS.textColor}
              style={styles.input}
              onChangeText={val => setLastName(val)}
            />
            <TextInput
              value={firstName}
              placeholder="Нэр"
              placeholderTextColor={COLORS.textColor}
              style={styles.input}
              onChangeText={val => setFirstName(val)}
            />
            <TextInput
              value={phone}
              placeholder="Утас"
              placeholderTextColor={COLORS.textColor}
              style={styles.input}
              onChangeText={val => setPhone(val)}
            />
            <TextInput
              value={mail}
              placeholder="И-Мэйл"
              placeholderTextColor={COLORS.textColor}
              style={styles.input}
              onChangeText={val => setMail(val)}
            />
            <TextInput
              value={position}
              placeholder="Албан тушаал"
              placeholderTextColor={COLORS.textColor}
              style={styles.input}
              onChangeText={val => setPosition(val)}
            />
            <TextInput
              value={company}
              placeholder="Байгууллага"
              placeholderTextColor={COLORS.textColor}
              style={styles.input}
              onChangeText={val => setCompany(val)}
            />
            <Picker
              value={sector}
              items={sectorData}
              placeholder="Салбар"
              onPress={onPressSector}
              onValueChange={(val: any) => setSector(val)}
            />
            <TextInput
              value={note}
              multiline
              textAlignVertical="top"
              placeholder="Тэмдэглэл"
              placeholderTextColor={COLORS.textColor}
              style={styles.inputBig}
              onChangeText={val => setNote(val)}
            />
            <Button
              title="Хадгалах"
              loading={loading}
              style={styles.registerButton}
              titleStyle={styles.buttonText}
              onPress={handleButtonPress}
            />
          </View>
        )}
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

export default AddNameCardManual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B3036',
  },
  loaderContainer: {
    height: getHeight(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  label: {
    color: COLORS.textColor,
    marginTop: 20,
  },
  photoContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.textColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 220,
  },
  iconContainer: {
    height: 85,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F252B',
    borderRadius: 20,
  },
  photoIcon: {
    fontSize: 36,
    color: COLORS.textColor,
  },
  inputsContainer: {
    // marginTop: 20,
  },
  input: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.textColor,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 14,
    color: COLORS.textColor,
  },
  inputBig: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.textColor,
    paddingHorizontal: 10,
    height: 140,
    fontSize: 14,
    color: COLORS.textColor,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  registerButton: {
    width: '80%',
    alignSelf: 'center',
    height: 55,
    marginBottom: 30,
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
