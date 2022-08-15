import {StackActions} from '@react-navigation/native';
import axios from 'axios';
import {isEmpty} from 'lodash';
import {Select} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Button from '../../Components/Button/Button';
import Picker from '../../Components/Picker/Picker';
import {baseUrl, COLORS} from '../../constants';

const Register2 = (props: any) => {
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [sectorId, setSectorId] = useState('');
  const [sectorData, setSectorData] = useState([]);

  const continuePress = () => {
    props.navigation.dispatch(
      StackActions.push('Register3', {
        ...props.route.params,
        companyName,
        position,
        sectorId,
      }),
    );
  };

  const onPressSector = () => {
    if (isEmpty(sectorData)) {
      axios
        .get(`${baseUrl}/companyCategories`)
        .then(res => {
          let arr: any = [];
          res.data.data.forEach((el: any) => {
            arr.push({label: el.displayName, value: el._id});
          });
          setSectorData(arr);
        })
        .catch(e => console.log('e', e));
    }
  };
  console.log('setSectorId :>> ', sectorId);
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>BIZCARD</Text>
      <Text style={styles.title}>Ажлын мэдээлэл</Text>
      <View style={styles.inputsContainer}>
        <TextInput
          value={companyName}
          placeholder="Байгууллага"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(val: any) => setCompanyName(val)}
        />
        <TextInput
          value={position}
          placeholder="Албан тушаал"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(val: any) => setPosition(val)}
        />
        <Picker
          value={sectorId}
          items={sectorData}
          placeholder="Салбар"
          onPress={onPressSector}
          onValueChange={(val: any) => {
            console.log('val :>> ', val);
            setSectorId(val);
          }}
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
            title="Үргэлжлүүлэх 2/3"
            style={styles.registerButton}
            titleStyle={styles.buttonText}
            onPress={continuePress}
          />
        </View>
      </View>
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
    marginTop: 20,
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
