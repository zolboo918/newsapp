import {StackActions} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import {Toast} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Button from '../Components/Button/Button';
import {COLORS} from '../constants';
import {showSuccessMessage, validateEmail} from '../utils/helper';
import {sendRequest} from '../utils/Service';

const ForgetPassword = (props: any) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');

  const [loading, setLoading] = useState(false);

  const handleButtonPress1 = () => {
    if (isEmpty(email)) {
      Toast.show({title: 'Алдаа', description: 'И-Мэйл хаяг оруулна уу'});
    } else if (!validateEmail(email.trim())) {
      Toast.show({title: 'Алдаа', description: 'И-Мэйл хаяг буруу байна.'});
    } else {
      setLoading(true);
      sendRequest('/users/forgot-password', {
        email: email.toLowerCase().trim(),
      }).then(res => {
        setLoading(false);
        if (res.success) {
          setCurrentScreen(1);
          showSuccessMessage('Мэйл хаягт явуулсан кодыг оруулна уу');
        }
      });
    }
  };
  const handleButtonPress2 = () => {
    const body = {
      token,
      email: email.toLowerCase().trim(),
    };
    setLoading(true);
    sendRequest('/users/check-token', body).then(res => {
      setLoading(false);
      if (!res?.error) {
        setCurrentScreen(2);
      }
    });
  };

  const handleButtonPress3 = () => {
    // setCurrentScreen(2);
    if (password.length < 6 && password != password2) {
      setError('Нууц үг оруулна уу.');
      setError2('Нууц үг оруулна уу.');
    } else if (password.length < 6) {
      setError('Нууц үгийн урт 6-аас дээш байна.');
    } else if (password != password2) {
      setError2('Нууц үг тохирохгүй байна.');
    } else {
      setLoading(true);
      sendRequest('/users/reset-password', {password, token}).then(res => {
        if (res.success) {
          setLoading(false);
          props.navigation.navigate('Login');
          showSuccessMessage('Нууц үг амжилттай шинэчлэгдлээ');
        }
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Bizcard</Text>
      {currentScreen == 0 ? (
        <View>
          <Text style={styles.title}>Бүртгэлтэй И-Мэйл хаягаа оруулна уу.</Text>
          <View style={styles.inputsContainer}>
            <TextInput
              value={email}
              placeholder="И-Мэйл"
              keyboardType="email-address"
              placeholderTextColor={COLORS.textColor}
              style={styles.input}
              onChangeText={val => setEmail(val)}
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
                loading={loading}
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
          <Text style={styles.subtitle}>
            * Хэрэв таны мэйлийн inbox-т байхгүй бол spam хэсэгт шалгаарай.
          </Text>
          <View style={styles.inputsContainer}>
            <TextInput
              value={token}
              placeholder="Код"
              placeholderTextColor={COLORS.textColor}
              style={styles.input}
              onChangeText={val => setToken(val)}
            />
            <View style={styles.bottombuttonContainer}>
              <Button
                icon="chevron-left"
                style={styles.backButton}
                iconStyle={styles.backButtonIcon}
                titleStyle={styles.buttonText}
                onPress={() => setCurrentScreen(0)}
              />
              <Button
                title="Үргэлжлүүлэх"
                loading={loading}
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
              value={password}
              placeholder="Нууц үг"
              secureTextEntry
              placeholderTextColor={COLORS.textColor}
              style={styles.input}
              onChangeText={val => {
                setPassword(val);
                setError('');
              }}
            />
            {error && (
              <Text style={{color: '#ff6666', fontSize: 12}}>{error}</Text>
            )}
            <TextInput
              value={password2}
              placeholder="Нууц үг давт"
              secureTextEntry
              placeholderTextColor={COLORS.textColor}
              style={styles.input}
              onChangeText={val => {
                setPassword2(val);
                setError2('');
              }}
            />
            {error2 && (
              <Text style={{color: '#ff6666', fontSize: 12}}>{error2}</Text>
            )}
            <View style={styles.bottombuttonContainer}>
              <Button
                icon="chevron-left"
                style={styles.backButton}
                iconStyle={styles.backButtonIcon}
                titleStyle={styles.buttonText}
                onPress={() => setCurrentScreen(1)}
              />
              <Button
                title="Хадгалах"
                loading={loading}
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
    fontWeight: 'bold',
    fontSize: 64,
    marginTop: 65,
  },
  title: {
    color: COLORS.textColor,
    fontSize: 18,
    marginTop: 60,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.textColor,
    fontSize: 12,
    marginTop: 10,
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
