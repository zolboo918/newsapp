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
import React, {useContext, useState} from 'react';
import {StackActions} from '@react-navigation/native';
import {baseUrl, COLORS, imageUrl} from '../../constants';
import Button from '../../Components/Button/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Header from '../../Components/Header/Header';
import Picker from '../../Components/Picker/Picker';
import {isEmpty} from 'lodash';
import axios from 'axios';
import {getRequest, putRequest, sendRequest} from '../../utils/Service';
import {Toast} from 'native-base';
import {choosePhoto, showSuccessMessage, takePhoto} from '../../utils/helper';
import UserContext from '../../Context/userContext';

const NameCardEdit = (props: any) => {
  const {item} = props.route.params;
  const [firstName, setFirstName] = useState(item.firstName);
  const [lastName, setLastName] = useState(item.lastName);
  const [phone, setPhone] = useState(item.phone);
  const [email, setEmail] = useState(item.email);
  const [position, setPosition] = useState(item.position);
  const [sector, setSector] = useState(item.sector);
  const [fileData, setFileData] = useState<any>();
  const [modalShow, setModalShow] = useState(false);
  const [sectorData, setSectorData] = useState([]);
  const [company, setCompany] = useState('');
  const [companyData, setCompanyData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [companySearchValue, setCompanySearchValue] = useState('');

  const {userInfo} = useContext<any>(UserContext);

  const handleButtonPress = () => {
    const body = {
      firstName,
      lastName,
      phone,
      email,
      position,
      userId: userInfo._id,
      companyId: company,
      sectorId: sector.id,
      qr: item.qr,
      note: item.note,
      isPublic: item.isPublic,
    };
    setLoading(true);
    putRequest('/nameCards/' + item._id, body).then(res => {
      setLoading(false);
      if (!res?.error) {
        showSuccessMessage();
      }
    });
  };

  const onPressSector = () => {
    if (isEmpty(sectorData)) {
      axios.get(`${baseUrl}/companyCategories`).then(res => {
        let arr: any = [];
        res.data.data.forEach((el: any) => {
          arr.push({label: el.displayName, value: el._id});
        });
        setSectorData(arr);
      });
    }
  };
  const onPressCompany = () => {
    getRequest('/company').then(res => {
      let arr: any = [];
      res.data.forEach((el: any) => {
        arr.push({label: el.name, value: el._id});
      });
      setCompanyData(arr);
    });
  };
  const addCompany = () => {
    props.navigation.navigate('AddCompany');
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

  const onChangeSearchValue = (val: string) => {
    // setCompanySearchValue(val);
  };

  const onEndSearchValue = (val: any) => {
    let arr: any = [];
    companyData.forEach((el: any) => {
      if (el.label.toLowerCase().includes(val.toLowerCase())) {
        arr.push(el);
      }
    });
    setCompanyData(arr);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Засах"
        leftIcon="left"
        leftIconPress={() => props.navigation.goBack()}
      />
      <ScrollView style={styles.inputsContainer}>
        <TouchableOpacity onPress={() => setModalShow(true)}>
          {!fileData?.path ? (
            <Image
              source={{
                uri: imageUrl + 'uploads/' + item.image,
              }}
              resizeMode="cover"
              style={styles.image}
            />
          ) : (
            <Image
              source={{uri: fileData?.path}}
              resizeMode="cover"
              style={styles.image}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.label}>Овог</Text>
        <TextInput
          placeholder="Овог"
          value={lastName}
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setLastName(text)}
        />
        <Text style={styles.label}>Нэр</Text>
        <TextInput
          placeholder="Нэр"
          value={firstName}
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setFirstName(text)}
        />
        <Text style={styles.label}>Утас</Text>
        <TextInput
          placeholder="Утас"
          value={phone}
          keyboardType="decimal-pad"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setPhone(text)}
        />
        <Text style={styles.label}>И-Мэйл</Text>
        <TextInput
          placeholder="И-Мэйл"
          value={email}
          keyboardType="email-address"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setEmail(text)}
        />
        <Text style={styles.label}>Салбар</Text>
        <Picker
          value={sector?.displayName}
          items={sectorData}
          placeholder={sector?.displayName ? sector.displayName : 'Салбар'}
          style={{marginTop: 1}}
          onPress={onPressSector}
          onValueChange={(val: any) => setSector(val)}
        />
        <Text style={styles.label}>Байгууллага</Text>
        <Picker
          value={company}
          items={companyData}
          placeholder={company ? company : 'Байгууллага'}
          showAdd={true}
          showSearch={true}
          selectedItem={company}
          onAddPress={addCompany}
          style={{marginTop: 1}}
          onPress={onPressCompany}
          onChangeSearchValue={onChangeSearchValue}
          onEndSearchValue={onEndSearchValue}
          setCompanySearchValue={setCompanySearchValue}
          onValueChange={(val: any) => setCompany(val)}
        />
        <Text style={styles.label}>Албан тушаал</Text>
        <TextInput
          placeholder="Албан тушаал"
          value={position}
          keyboardType="email-address"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(text: string) => setPosition(text)}
        />
        <View style={styles.bottombuttonContainer}>
          <Button
            icon="chevron-left"
            style={styles.backButton}
            iconStyle={styles.backButtonIcon}
            titleStyle={styles.buttonText}
            onPress={() => props.navigation.goBack()}
          />
          <Button
            title="Хадгалах"
            loading={loading}
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
    </View>
  );
};

export default NameCardEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DEFAULT_COLOR,
  },
  label: {
    color: COLORS.textColor,
    fontSize: 14,
    marginTop: 20,
  },
  inputsContainer: {
    paddingHorizontal: 20,
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.textColor,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 14,
    color: COLORS.textColor,
  },
  bottombuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 55,
    height: 55,
  },
  image: {
    width: '100%',
    height: 220,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
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
