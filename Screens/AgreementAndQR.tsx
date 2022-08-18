import CheckBox from '@react-native-community/checkbox';
import {StackActions} from '@react-navigation/native';
import axios from 'axios';
import {Checkbox, Select, Toast} from 'native-base';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../Components/Button/Button';
import {baseUrl, COLORS} from '../constants';
import {fileUpload, sendRequest} from '../utils/Service';
// import QRCode from 'react-native-qrcode-generator';
import {isEmpty} from 'lodash';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';
import {showUnSuccessMessage, toBase64} from '../utils/helper';
import QRCode from 'react-native-qrcode-svg';

const AgreementAndQR = (props: any) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrImage, setQrImage] = useState('');
  const [qrsvgref, setqrsvgref] = useState<any>();

  const handleButtonPress = () => {
    if (isConfirmed) {
      setLoading(true);
      const data = props.route.params;
      const body = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        companyName: data.companyId,
        companyId: '',
        linkedInId: data.linkedInId,
        password: data.password,
        position: data.position.toUpperCase(),
        sectorId: data.sectorId,
        image: '',
        note: data.note,
        isPublic: data.isPublic,
      };

      sendRequest('/users/register', body).then(result => {
        if (!result.error) {
          fileUpload(
            data.image,
            `http://192.168.1.18:4000/api/v1/users/${result.data.nameCardId}/photo`,
          )
            .then((res: any) => {
              setLoading(false);
              setQrImage(result.data.qr);
            })
            .catch((e: any) => {
              showUnSuccessMessage(JSON.stringify(e));
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      });
    } else {
      setError(true);
    }
  };

  const saveQr = async () => {
    qrsvgref.toDataURL((data: any) => {
      let filePath = RNFS.CachesDirectoryPath + `/nameCardQr.png`;
      RNFS.writeFile(filePath, data, 'base64')
        .then(success => {
          return CameraRoll.save(filePath);
        })
        .then(() => {
          Toast.show({title: 'Зураг ажмжилттай татагдлаа'});
        });
    });
  };

  const loginButtonPress = () => {
    props.navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>BIZCARD</Text>
      {isEmpty(qrImage) && !loading ? (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Үйлчилгээний нөхцөл</Text>
            <Text style={styles.mainText}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
              Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum."
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkBoxContainer}
            onPress={() => {
              setIsConfirmed(!isConfirmed);
              setError(false);
            }}>
            <CheckBox
              value={isConfirmed}
              style={styles.checkBox}
              tintColors={
                !error
                  ? {false: COLORS.textColor, true: COLORS.textColor}
                  : {false: '#ff6666', true: '#ff6666'}
              }
              onValueChange={val => {
                setIsConfirmed(val);
                setError(false);
              }}
            />
            <Text style={styles.checkBoxTitle}>Зөвшөөрч байна</Text>
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
              title="Бүртгүүлэх"
              style={styles.registerButton}
              titleStyle={styles.buttonText}
              onPress={handleButtonPress}
            />
          </View>
        </View>
      ) : qrImage && !loading ? (
        <View>
          <Text style={styles.qrText}>Таны QR код</Text>
          <View style={styles.QRImg}>
            <QRCode
              value={qrImage}
              size={250}
              getRef={(r: any) => setqrsvgref(r)}
            />
          </View>
          <View style={{}}>
            <Button
              title="Хадгалах"
              style={{marginTop: 20}}
              titleStyle={styles.buttonText}
              onPress={saveQr}
            />
            <Button
              title="Нэвтрэх"
              style={{marginTop: 20}}
              titleStyle={styles.buttonText}
              onPress={loginButtonPress}
            />
          </View>
        </View>
      ) : (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color={COLORS.textColor} />
        </View>
      )}
    </View>
  );
};

export default AgreementAndQR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DEFAULT_COLOR,
    paddingHorizontal: 30,
  },
  headerTitle: {
    alignSelf: 'center',
    color: '#f2f2f2',
    fontFamily: 'TwCenMTStd',
    fontSize: 64,
    marginTop: 65,
  },
  textContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    marginTop: 40,
  },
  title: {
    color: '#323232',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainText: {
    color: '#323232',
    fontSize: 14,
    marginTop: 10,
  },
  checkBoxContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  checkBox: {},
  checkBoxTitle: {
    color: '#D9D9D9',
    fontSize: 14,
    marginLeft: 10,
  },
  bottombuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 60,
    height: 60,
  },
  backButtonIcon: {
    fontSize: 40,
  },
  registerButton: {
    width: '78%',
    height: 60,
  },
  buttonText: {
    fontSize: 18,
    color: '#e1e1e1',
    alignSelf: 'center',
  },
  qrText: {
    alignSelf: 'center',
    color: COLORS.textColor,
    fontSize: 24,
    marginTop: 30,
  },
  QRImg: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginVertical: 40,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
