import {StackActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Button from '../../Components/Button/Button';
import {COLORS} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Picker from '../../Components/Picker/Picker';
import {isEmpty} from 'lodash';
import {getRequest} from '../../utils/Service';

const Register1 = (props: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [intro, setIntro] = useState('');
  const [sectorId, setSectorId] = useState('');
  const [sectorData, setSectorData] = useState([]);
  const [profession, setProfession] = useState('');

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

  const handleButtonPress = () => {
    props.navigation.dispatch(
      StackActions.push('Register2', {
        firstName,
        lastName,
        phone,
        email,
        sectorId,
        profession,
      }),
    );
    // }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Bizcard</Text>
      <Text style={styles.title}>Ерөнхий мэдээлэл</Text>
      <ScrollView style={styles.inputsContainer} bounces={false}>
        <KeyboardAwareScrollView>
          <TextInput
            placeholder="Овог"
            value={lastName}
            placeholderTextColor={COLORS.textColor}
            style={styles.input}
            onChangeText={(text: string) => setLastName(text)}
          />
          <TextInput
            placeholder="Нэр"
            value={firstName}
            placeholderTextColor={COLORS.textColor}
            style={styles.input}
            onChangeText={(text: string) => setFirstName(text)}
          />
          <TextInput
            placeholder="Хувийн гар утас"
            value={phone}
            keyboardType="decimal-pad"
            placeholderTextColor={COLORS.textColor}
            style={styles.input}
            onChangeText={(text: string) => setPhone(text)}
          />
          <TextInput
            placeholder="Хувийн цахим шуудан"
            value={email}
            keyboardType="email-address"
            placeholderTextColor={COLORS.textColor}
            style={styles.input}
            onChangeText={(text: string) => setEmail(text)}
          />
          <TextInput
            value={intro}
            placeholder="Миний тухай"
            multiline
            placeholderTextColor={COLORS.textColor}
            style={styles.inputBig}
            onChangeText={(val: any) => setIntro(val)}
          />
          <Picker
            value={sectorId}
            items={sectorData}
            placeholder="Салбар"
            style={{marginTop: 5}}
            onPress={onPressSector}
            onValueChange={(val: any) => setSectorId(val)}
          />
          <TextInput
            placeholder="Мэргэжил"
            value={profession}
            placeholderTextColor={COLORS.textColor}
            style={styles.input}
            onChangeText={(text: string) => setProfession(text)}
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
              onPress={handleButtonPress}
            />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </View>
  );
};

export default Register1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DEFAULT_COLOR,
    paddingHorizontal: 30,
  },
  headerTitle: {
    alignSelf: 'center',
    color: '#f2f2f2',
    // fontWeight: "bold",
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
  input: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderColor: COLORS.textColor,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 14,
    color: COLORS.textColor,
    backgroundColor: COLORS.DEFAULT_COLOR,
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
