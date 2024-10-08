import {useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import React, {useState} from 'react';
import {
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
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MapView, {Marker} from 'react-native-maps';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../Components/Button/Button';
import Header from '../Components/Header/Header';
import Picker from '../Components/Picker/Picker';
import {baseUrl, COLORS} from '../constants';
import {Checkbox} from 'native-base';
import {
  choosePhoto,
  showSuccessMessage,
  showUnSuccessMessage,
  showWarningMessage,
  takePhoto,
} from '../utils/helper';
import {fileUpload, getRequest, sendRequest} from '../utils/Service';

const AddCompany = (props: any) => {
  const [logo, setLogo] = useState<any>();
  const [coverPhoto, setCoverPhoto] = useState<any>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [email, setEmail] = useState('');
  const [web, setWeb] = useState('');
  const [address, setAddress] = useState('');
  const [intro, setIntro] = useState('');
  const [location, setLocation] = useState<any>('');
  const [isofficaial, setIsofficaial] = useState(false);

  const [category, setCategory] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [childCategoryData, setChildCategoryData] = useState([]);

  const [modalShow, setModalShow] = useState<any>(null);
  const [mapMini, setMapMini] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleButtonPress = (props: any) => {
    const body = {
      name,
      logo: '',
      cover: '',
      category,
      intro,
      phone1: phone,
      phone2,
      phone3,
      email,
      website: web,
      address,
      location: JSON.stringify(location),
      isOfficial: isofficaial,
    };

    setLoading(true);
    sendRequest('/company', body).then(res => {
      setLoading(false);
      fileUpload(logo, `${baseUrl}/company/${res.data._id}/cover`)
        .then((res: any) => {
          fileUpload(logo, `${baseUrl}/company/${res.data._id}/logo`)
            .then((ress: any) => {
              showSuccessMessage();
              navigation.goBack();
            })
            .catch((e: any) => showUnSuccessMessage(JSON.stringify(e)));
        })
        .catch(() => {
          fileUpload(logo, `${baseUrl}/company/${res.data._id}/logo`)
            .then((ress: any) => {
              showSuccessMessage();
              navigation.goBack();
            })
            .catch((e: any) => showUnSuccessMessage(JSON.stringify(e)));
        });
    });
  };

  const initialRegion = {
    latitude: 47.919025,
    longitude: 106.91778,
    latitudeDelta: 0.0215,
    longitudeDelta: 0.0721,
  };

  const onPressCategory = () => {
    if (isEmpty(categoryData)) {
      getRequest(`/companyCategories`).then(res => {
        let arr: any = [];
        res.data.forEach((el: any) => {
          arr.push({label: el.displayName, value: el._id});
        });
        setCategoryData(arr);
      });
    }
  };

  const onPressChildCategory = () => {
    getRequest(`/companyChildCategories/${category}`).then(res => {
      if (!res.error) {
        let arr: any = [];
        res.data.forEach((el: any) => {
          arr.push({label: el.displayName, value: el._id});
        });
        setChildCategoryData(arr);
      }
    });
  };

  const openCamera = () => {
    takePhoto().then(res => {
      setModalShow(null);
      if (!res?.error) {
        if (modalShow == 1) {
          setLogo(res);
        } else {
          setCoverPhoto(res);
        }
      }
    });
  };

  const openGallery = (type: any) => {
    choosePhoto().then(res => {
      setModalShow(null);
      if (!res?.error) {
        if (modalShow == 1) {
          setLogo(res);
        } else {
          setCoverPhoto(res);
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Байгууллага бүртгэх"
        leftIcon="left"
        leftIconPress={() => props.navigation.goBack()}
      />
      <ScrollView style={styles.inputsContainer}>
        {logo?.path ? (
          <TouchableOpacity onPress={() => setModalShow('1')}>
            <Image style={styles.photoContainer2} source={{uri: logo?.path}} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.photoContainer2}
            onPress={() => setModalShow('1')}>
            <FeatherIcon name="camera" style={styles.photoIcon} />
            <Text>Лого</Text>
          </TouchableOpacity>
        )}
        <TextInput
          placeholder="Байгууллагын нэр"
          value={name}
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setName(text)}
        />
        <Text style={styles.introCount}>{intro.length} / 199</Text>
        <TextInput
          placeholder="Товч танилцуулга"
          value={intro}
          multiline
          placeholderTextColor={COLORS.textColor}
          style={styles.inputBig}
          onChangeText={(text: string) => setIntro(text)}
        />
        <Text style={{marginTop: 20, color: COLORS.textColor}}>
          Cover зураг
        </Text>
        {coverPhoto?.path ? (
          <TouchableOpacity onPress={() => setModalShow('2')}>
            <Image
              style={styles.photoContainer}
              source={{uri: coverPhoto?.path}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={() => setModalShow('2')}>
            <FeatherIcon
              name="camera"
              style={[styles.photoIcon, {color: COLORS.textColor}]}
            />
          </TouchableOpacity>
        )}
        <Picker
          value={category}
          items={categoryData}
          placeholder="Үйл ажиллагааны ангилал"
          onPress={onPressCategory}
          style={{marginTop: 4}}
          onValueChange={(val: any) => setCategory(val)}
        />
        {/* <Picker
          value={childCategory}
          items={childCategoryData}
          placeholder="Үйл ажиллагааны чиглэл"
          onPress={onPressChildCategory}
          style={{marginTop: 4}}
          onValueChange={(val: any) => setChildCategory(val)}
        /> */}
        <TextInput
          placeholder="Утас 1"
          value={phone}
          keyboardType="decimal-pad"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setPhone(text)}
        />
        <TextInput
          placeholder="Утас 2"
          value={phone2}
          keyboardType="decimal-pad"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setPhone2(text)}
        />
        <TextInput
          placeholder="Утас 3"
          value={phone3}
          keyboardType="decimal-pad"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setPhone3(text)}
        />
        <TextInput
          placeholder="Цахим шуудан"
          value={email}
          keyboardType="email-address"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setEmail(text)}
        />
        <TextInput
          placeholder="Цахим хуудас URL"
          value={web}
          keyboardType="url"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setWeb(text)}
        />
        <TextInput
          placeholder="Хаяг"
          value={address}
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setAddress(text)}
        />

        <View style={{height: 200, position: 'relative'}}>
          <MapView
            mapType="standard"
            showsUserLocation
            provider={'google'} // remove if not using Google Maps
            style={styles.mapMini}
            region={initialRegion}
            onPress={e => {
              console.log('e', e.nativeEvent);
              setLocation(e.nativeEvent.coordinate);
            }}>
            {location && <Marker coordinate={location} />}
          </MapView>
          <TouchableOpacity
            style={styles.mapIconContainer}
            onPress={() => setMapMini(true)}>
            <EntypoIcon
              name="resize-full-screen"
              style={{fontSize: 16, color: COLORS.DEFAULT_COLOR}}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.checkBoxContainer}
          onPress={() => {
            if (!isofficaial) {
              showWarningMessage(
                'Албан ёсны  байгууллага болохын тулд дараах шаардлагуудыг тавина.',
              );
            }
            setIsofficaial(!isofficaial);
          }}>
          <Checkbox
            isChecked={isofficaial}
            value={'isPublic'}
            style={[styles.checkbox]}
            backgroundColor={COLORS.DEFAULT_COLOR}
            colorScheme={'white'}
            tintColor={COLORS.textColor}
            onChange={val => {
              if (val) {
                showWarningMessage(
                  'Албан ёсны  байгууллага болохын тулд дараах шаардлагуудыг тавина.',
                );
              }
              setIsofficaial(val);
            }}
          />
          <Text style={styles.checkBoxTitle}>Албан ёсны байгууллага</Text>
        </TouchableOpacity>

        <View style={styles.bottombuttonContainer}>
          <Button
            icon="chevron-left"
            style={styles.backButton}
            iconStyle={styles.backButtonIcon}
            titleStyle={styles.buttonText}
            onPress={() => props.navigation.goBack()}
          />
          <Button
            loading={loading}
            title="Хадгалах"
            style={styles.registerButton}
            titleStyle={styles.buttonText}
            onPress={handleButtonPress}
          />
        </View>
      </ScrollView>
      <Modal
        visible={modalShow == '1' || modalShow == '2'}
        transparent
        animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalShow(null)}>
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
      <Modal visible={mapMini} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalShow(null)}>
          <View style={styles.modalContainer}>
            <MapView
              mapType="standard"
              showsUserLocation
              provider={'google'} // remove if not using Google Maps
              style={styles.mapNotMini}
              region={initialRegion}
              onPress={e => setLocation(e.nativeEvent.coordinate)}>
              <Marker
                coordinate={
                  location
                    ? location
                    : {
                        latitude: 47.908967751992016,
                        longitude: 106.91042192280293,
                      }
                }
              />
            </MapView>
            <TouchableOpacity
              style={styles.mapIconContainer}
              onPress={() => setMapMini(false)}>
              <EntypoIcon
                name="resize-100"
                style={{fontSize: 16, color: COLORS.DEFAULT_COLOR}}
              />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default AddCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DEFAULT_COLOR,
  },
  headerTitle: {
    alignSelf: 'center',
    color: '#f2f2f2',
    fontWeight: 'bold',
    fontSize: 64,
    marginTop: 65,
  },
  title: {
    color: COLORS.textColor,
    fontSize: 24,
    marginTop: 60,
    fontWeight: 'bold',
  },
  inputsContainer: {
    paddingHorizontal: 20,
  },
  inputBig: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.textColor,
    paddingHorizontal: 10,
    height: 107,
    paddingTop: 10,
    textAlignVertical: 'top',
    fontSize: 14,
    color: COLORS.textColor,
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
  introCount: {
    alignSelf: 'flex-end',
    color: COLORS.textColor,
    marginTop: 10,
    marginBottom: -15,
  },
  titlePhoto: {
    color: COLORS.textColor,
    fontSize: 14,
    marginTop: 20,
  },
  photoContainer: {
    borderWidth: 1,
    borderColor: COLORS.textColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    marginTop: 10,
  },
  photoContainer2: {
    borderWidth: 1,
    borderColor: COLORS.textColor,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    width: 120,
    backgroundColor: '#7C8999',
    marginTop: 10,
  },
  photoIcon: {
    fontSize: 36,
    color: COLORS.DEFAULT_COLOR,
  },
  bottombuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 55,
    height: 55,
  },
  backButtonIcon: {
    fontSize: 40,
  },
  registerButton: {
    width: '78%',
    height: 55,
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
  modalContainer2: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: '80%',
    width: '80%',
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
  mapIconContainer: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#fff',
    padding: 10,
    top: 30,
    right: 10,
  },
  mapMini: {
    height: 200,
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
  },
  mapNotMini: {
    height: '100%',
    width: '100%',
  },
  checkBoxContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
    margin: 0,
  },
  checkBoxTitle: {
    color: '#D9D9D9',
    fontSize: 14,
    marginLeft: 10,
  },
});
