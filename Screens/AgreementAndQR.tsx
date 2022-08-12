import CheckBox from '@react-native-community/checkbox';
import {StackActions} from '@react-navigation/native';
import {Checkbox, Select} from 'native-base';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import Button from '../Components/Button/Button';
import {COLORS} from '../constants';

const AgreementAndQR = (props: any) => {
  const [isConfirmed, setIsConfirmed] = useState('no');
  const [showQr, setShowQr] = useState(false);
  const handleButtonPress = () => {
    if (isConfirmed == 'yes') {
      setShowQr(true);
    }
  };
  const loginButtonPress = () => {
    props.navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>BIZCARD</Text>
      {!showQr ? (
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
          <View style={styles.checkBoxContainer}>
            <Checkbox
              borderColor="#fff"
              value={'yes'}
              colorScheme={'#fff'}
              accessibilityLabel="checkbox"
              onChange={isSelected => {
                isSelected ? setIsConfirmed('yes') : setIsConfirmed('no');
              }}
            />
            <Text style={styles.checkBoxTitle}>Зөвшөөрч байна</Text>
          </View>
          <View style={styles.bottombuttonContainer}>
            <Button
              icon="chevron-left"
              style={styles.backButton}
              iconStyle={styles.backButtonIcon}
              titleStyle={styles.buttonText}
              onPress={handleButtonPress}
            />
            <Button
              title="Бүртгүүлэх"
              style={styles.registerButton}
              titleStyle={styles.buttonText}
              onPress={handleButtonPress}
            />
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.qrText}>Таны QR код</Text>
          <Image
            source={require('../assets/images/QR.png')}
            style={styles.QRImg}
          />
          <View style={{}}>
            <Button
              title="Хадгалах"
              style={{marginTop: 20}}
              titleStyle={styles.buttonText}
            />
            <Button
              title="Нэвтрэх"
              style={{marginTop: 20}}
              titleStyle={styles.buttonText}
              onPress={loginButtonPress}
            />
          </View>
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
  checkBox: {
    backgroundColor: '#fff',
    height: 27,
    width: 27,
  },
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
});
