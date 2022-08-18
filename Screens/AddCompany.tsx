import {useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import {Toast} from 'native-base';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MapView, {Marker} from 'react-native-maps';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../Components/Button/Button';
import Header from '../Components/Header/Header';
import Picker from '../Components/Picker/Picker';
import {baseUrl, COLORS} from '../constants';
import {CustomAlert} from '../utils/CustomAlert';
import {showSuccessMessage, showUnSuccessMessage} from '../utils/helper';
import {fileUpload, getRequest, sendRequest} from '../utils/Service';

const AddCompany = (props: any) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [intro, setIntro] = useState('');
  const [location, setLocation] = useState<any>('');

  const [category, setCategory] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [childCategoryData, setChildCategoryData] = useState([]);
  const [fileData, setFileData] = useState<any>();
  const [modalShow, setModalShow] = useState(false);
  const [mapMini, setMapMini] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleButtonPress = (props: any) => {
    const body = {
      name,
      logo: '',
      category,
      childCategory,
      intro,
      phone,
      email,
      address,
      location: JSON.stringify(location),
    };

    setLoading(true);
    sendRequest('/company', body).then(res => {
      setLoading(false);
      fileUpload(fileData, `${baseUrl}/company/${res.data._id}/logo`)
        .then((ress: any) => {
          showSuccessMessage();
          navigation.goBack();
        })
        .catch((e: any) => showUnSuccessMessage(JSON.stringify(e)));
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
    launchCamera({mediaType: 'photo'})
      .then((res: any): any => {
        const file = res.assets[0];
        setFileData(file);
        setModalShow(false);
      })
      .catch(e => {
        setModalShow(false);
        Toast.show({title: 'Алдаа гарлаа', description: JSON.stringify(e)});
      });
  };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'})
      .then((res: any): any => {
        const file = res.assets[0];
        setFileData(file);
        setModalShow(false);
      })
      .catch(e => {
        setModalShow(false);
        Toast.show({title: 'Алдаа гарлаа', description: JSON.stringify(e)});
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
        <TextInput
          placeholder="Нэр"
          value={name}
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setName(text)}
        />
        <Text style={styles.titlePhoto}>Лого</Text>
        {fileData?.uri ? (
          <TouchableOpacity onPress={() => setModalShow(true)}>
            <Image
              style={styles.photoContainer}
              source={{uri: fileData?.uri}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={() => setModalShow(true)}>
            <FeatherIcon name="camera" style={styles.photoIcon} />
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
        <Picker
          value={childCategory}
          items={childCategoryData}
          placeholder="Үйл ажиллагааны чиглэл"
          onPress={onPressChildCategory}
          style={{marginTop: 4}}
          onValueChange={(val: any) => setChildCategory(val)}
        />
        <TextInput
          placeholder="Утас"
          value={phone}
          keyboardType="decimal-pad"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setPhone(text)}
        />
        <TextInput
          placeholder="Мэйл"
          value={email}
          keyboardType="email-address"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setEmail(text)}
        />
        <TextInput
          placeholder="Хаяг"
          value={address}
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setAddress(text)}
        />
        <TextInput
          placeholder="Танилцуулга"
          value={intro}
          multiline
          placeholderTextColor={COLORS.textColor}
          style={styles.inputBig}
          onChangeText={(text: string) => setIntro(text)}
        />
        <View>
          <MapView
            mapType="standard"
            showsUserLocation
            provider={'google'} // remove if not using Google Maps
            style={styles.mapMini}
            region={initialRegion}
            onPress={e => setLocation(e.nativeEvent.coordinate)}>
            {location && <Marker coordinate={location} />}
          </MapView>
          <TouchableOpacity
            style={styles.mapIconContainer}
            onPress={() => setMapMini(true)}>
            <EntypoIcon name="resize-full-screen" style={{fontSize: 16}} />
          </TouchableOpacity>
        </View>

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
      <Modal visible={mapMini} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalShow(false)}>
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
              <EntypoIcon name="resize-100" style={{fontSize: 16}} />
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
    fontFamily: 'TwCenMTStd',
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
    height: 160,
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
    height: 236,
    marginTop: 10,
  },
  photoIcon: {
    fontSize: 36,
    color: COLORS.textColor,
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
});
