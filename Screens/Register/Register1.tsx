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

const Register1 = (props: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');

  const handleButtonPress = () => {
    if (password.length < 6 && password != password2) {
      setError('Нууц үгийн урт 6-аас доошгүй байна');
      setError2('Нууц үг хоорондоо таарахгүй байна');
    } else if (password.length < 6) {
      setError('Нууц үгийн урт 6-аас доошгүй байна');
    } else if (password != password2) {
      setError2('Нууц үг хоорондоо таарахгүй байна');
    } else {
      props.navigation.dispatch(
        StackActions.push('Register2', {
          firstName,
          lastName,
          phone,
          email,
          password,
        }),
      );
    }
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
            placeholder="Утас"
            value={phone}
            keyboardType="decimal-pad"
            placeholderTextColor={COLORS.textColor}
            style={styles.input}
            onChangeText={(text: string) => setPhone(text)}
          />
          <TextInput
            placeholder="Мэйл"
            value={email}
            keyboardType="email-address"
            placeholderTextColor={COLORS.textColor}
            style={styles.input}
            onChangeText={(text: string) => setEmail(text)}
          />
          <TextInput
            placeholder="Нууц үг"
            value={password}
            textContentType="oneTimeCode"
            secureTextEntry
            placeholderTextColor={COLORS.textColor}
            style={styles.input}
            onChangeText={(text: string) => {
              setError('');
              setPassword(text);
            }}
          />
          {error && (
            <Text style={{color: '#ff6666', fontSize: 12}}>{error}</Text>
          )}
          <TextInput
            placeholder="Нууц үг давт"
            value={password2}
            secureTextEntry
            placeholderTextColor={COLORS.textColor}
            style={styles.input}
            onChangeText={(text: string) => {
              setError2('');
              setPassword2(text);
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
              onPress={() => props.navigation.goBack()}
            />
            <Button
              title="Үргэлжлүүлэх 1/3"
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
