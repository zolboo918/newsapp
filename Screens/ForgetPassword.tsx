import {StackActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Button from '../Components/Button/Button';
import {COLORS} from '../constants';

const ForgetPassword = (props: any) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const handleButtonPress1 = () => {
    setCurrentScreen(1);
  };
  const handleButtonPress2 = () => {
    setCurrentScreen(2);
  };

  const handleButtonPress3 = () => {
    // setCurrentScreen(2);
    props.navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>BIZCARD</Text>
      {currentScreen == 0 ? (
        <View>
          <Text style={styles.title}>Бүртгэлтэй И-Мэйл хаягаа оруулна уу.</Text>
          <View style={styles.inputsContainer}>
            <TextInput
              placeholder="И-Мэйл"
              placeholderTextColor={COLORS.textColor}
              style={styles.input}
            />
            <View style={styles.bottombuttonContainer}>
              <Button
                icon="chevron-left"
                style={styles.backButton}
                iconStyle={styles.backButtonIcon}
                titleStyle={styles.buttonText}
                onPress={handleButtonPress1}
              />
              <Button
                title="Үргэлжлүүлэх"
                style={styles.registerButton}
                titleStyle={styles.buttonText}
                onPress={handleButtonPress1}
              />
            </View>
          </View>
        </View>
      ) : currentScreen == 1 ? (
        <View>
          <Text style={styles.title}>
            И-мэйл хаягт явуулсан нэг удаагийн кодыг оруулна уу
          </Text>
          <View style={styles.inputsContainer}>
            <TextInput
              placeholder="Код"
              placeholderTextColor={COLORS.textColor}
              style={styles.input}
            />
            <View style={styles.bottombuttonContainer}>
              <Button
                icon="chevron-left"
                style={styles.backButton}
                iconStyle={styles.backButtonIcon}
                titleStyle={styles.buttonText}
                onPress={handleButtonPress2}
              />
              <Button
                title="Үргэлжлүүлэх"
                style={styles.registerButton}
                titleStyle={styles.buttonText}
                onPress={handleButtonPress2}
              />
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Шинэ нууц үгээ оруулна уу</Text>
          <View style={styles.inputsContainer}>
            <TextInput
              placeholder="Нууц үг"
              placeholderTextColor={COLORS.textColor}
              style={styles.input}
            />
            <TextInput
              placeholder="Нууц үг давт"
              placeholderTextColor={COLORS.textColor}
              style={styles.input}
            />
            <View style={styles.bottombuttonContainer}>
              <Button
                icon="chevron-left"
                style={styles.backButton}
                iconStyle={styles.backButtonIcon}
                titleStyle={styles.buttonText}
                onPress={handleButtonPress3}
              />
              <Button
                title="Хадгалах"
                style={styles.registerButton}
                titleStyle={styles.buttonText}
                onPress={handleButtonPress3}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ForgetPassword;

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
    fontSize: 18,
    marginTop: 60,
    fontWeight: 'bold',
  },
  inputsContainer: {
    marginTop: 60,
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
    marginTop: 130,
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
