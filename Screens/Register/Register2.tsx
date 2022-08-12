import {StackActions} from '@react-navigation/native';
import {Select} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Button from '../../Components/Button/Button';
import {COLORS} from '../../constants';

const Register2 = (props: any) => {
  const handleButtonPress = () => {
    props.navigation.dispatch(StackActions.push('Register3'));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>BIZCARD</Text>
      <Text style={styles.title}>Ажлын мэдээлэл</Text>
      <View style={styles.inputsContainer}>
        <TextInput
          placeholder="Байгууллага"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
        />
        <TextInput
          placeholder="Албан тушаал"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
        />
        <Select
          selectedValue={''}
          minWidth="200"
          accessibilityLabel="Салбар"
          placeholder="Салбар"
          mt={2.5}
          placeholderTextColor={COLORS.textColor}
          fontSize={14}
          borderRadius={10}
          borderColor={COLORS.textColor}
          paddingLeft={2}
          height={10}
          onValueChange={itemValue => {}}>
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
        </Select>
        <View style={styles.bottombuttonContainer}>
          <Button
            icon="chevron-left"
            style={styles.backButton}
            iconStyle={styles.backButtonIcon}
            titleStyle={styles.buttonText}
            onPress={handleButtonPress}
          />
          <Button
            title="Үргэлжлүүлэх 2/3"
            style={styles.registerButton}
            titleStyle={styles.buttonText}
            onPress={handleButtonPress}
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
