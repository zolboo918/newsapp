import {StackActions} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Button from '../../Components/Button/Button';
import {COLORS} from '../../constants';

const Register1 = (props: any) => {
  const handleButtonPress = () => {
    props.navigation.dispatch(StackActions.push('Register2'));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>BIZCARD</Text>
      <Text style={styles.title}>Ерөнхий мэдээлэл</Text>
      <View style={styles.inputsContainer}>
        <TextInput
          placeholder="Овог"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
        />
        <TextInput
          placeholder="Нэр"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
        />
        <TextInput
          placeholder="Утас"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
        />
        <TextInput
          placeholder="Мэйл"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
        />
        <View style={styles.bottombuttonContainer}>
          <Button
            icon="chevron-left"
            style={styles.backButton}
            iconStyle={styles.backButtonIcon}
            titleStyle={styles.buttonText}
            onPress={handleButtonPress}
          />
          <Button
            title="Үргэлжлүүлэх 1/3"
            style={styles.registerButton}
            titleStyle={styles.buttonText}
            onPress={handleButtonPress}
          />
        </View>
      </View>
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
