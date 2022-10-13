import {StackActions} from '@react-navigation/native';
import axios from 'axios';
import {isEmpty} from 'lodash';
import {Select} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Button from '../../Components/Button/Button';
import Picker from '../../Components/Picker/Picker';
import {baseUrl, COLORS} from '../../constants';
import {getRequest} from '../../utils/Service';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Register2 = (props: any) => {
  const [position, setPosition] = useState('');
  const [workPhone, setWorkPhone] = useState('');
  const [aboutActivity, setAboutActivity] = useState('');
  const [company, setCompany] = useState('');
  const [companyData, setCompanyData] = useState([]);

  const continuePress = () => {
    props.navigation.dispatch(
      StackActions.push('Register3', {
        ...props.route.params,
        companyId: company,
        position,
        workPhone,
        aboutActivity,
      }),
    );
  };

  const addCompany = () => {
    props.navigation.navigate('AddCompany');
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

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Bizcard</Text>
      <Text style={styles.title}>Байгууллага</Text>
      <KeyboardAwareScrollView style={styles.inputsContainer}>
        <Picker
          value={company}
          items={companyData}
          placeholder={company ? company : 'Байгууллага'}
          showAdd={true}
          selectedItem={company}
          onAddPress={addCompany}
          style={{marginTop: 1}}
          onPress={onPressCompany}
          onValueChange={(val: any) => setCompany(val)}
        />
        <TextInput
          value={position}
          placeholder="Албан тушаал"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(val: any) => setPosition(val)}
        />
        <TextInput
          value={workPhone}
          placeholder="Ажлын утас"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(val: any) => setWorkPhone(val)}
        />
        <TextInput
          value={aboutActivity}
          placeholder="Үйл ажиллагааны тухай товч тайлбар"
          multiline
          placeholderTextColor={COLORS.textColor}
          style={styles.inputBig}
          onChangeText={(val: any) => setAboutActivity(val)}
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
            title="Үргэлжлүүлэх"
            style={styles.registerButton}
            titleStyle={styles.buttonText}
            onPress={continuePress}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Register2;

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
  title: {
    color: COLORS.textColor,
    fontSize: 22,
    marginTop: '17%',
    fontWeight: 'bold',
  },
  inputsContainer: {
    marginTop: 20,
  },
  tip: {
    color: COLORS.textColor,
    fontSize: 12,
    marginTop: 5,
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
    paddingTop: 10,
    height: 70,
    textAlignVertical: 'top',
    fontSize: 14,
    color: COLORS.textColor,
  },
  bottombuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
