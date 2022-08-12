import {StackActions} from '@react-navigation/native';
import {Select} from 'native-base';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../Components/Button/Button';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {COLORS} from '../../constants';
import CheckBox from '@react-native-community/checkbox';

const Register3 = (props: any) => {
  const handleButtonPress = () => {
    props.navigation.dispatch(StackActions.push('AgreementAndQR'));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>BIZCARD</Text>
      <Text style={styles.title}>Нэрийн хуудасны мэдээлэл</Text>
      <Text style={styles.titlePhoto}>Нэрийн хуудасны зураг</Text>
      <TouchableOpacity style={styles.photoContainer}>
        <FeatherIcon name="camera" style={styles.photoIcon} />
      </TouchableOpacity>
      <TextInput
        placeholder="Өөрийн тухай товчхон..."
        multiline
        placeholderTextColor={COLORS.textColor}
        style={styles.input}
      />
      <View style={styles.checkBoxContainer}>
        <CheckBox
          style={styles.checkBox}
          tintColors={{false: COLORS.textColor, true: COLORS.textColor}}
        />
        <Text style={styles.checkBoxTitle}>Нийтэд нээлттэй эсэх</Text>
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
          title="Хадгалах"
          style={styles.registerButton}
          titleStyle={styles.buttonText}
          onPress={handleButtonPress}
        />
      </View>
    </View>
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
    fontFamily: 'TwCenMTStd',
    fontSize: 64,
    marginTop: 55,
  },
  title: {
    color: COLORS.textColor,
    fontSize: 24,
    marginTop: 40,
    fontWeight: 'bold',
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
    height: 130,
    marginTop: 10,
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
});
