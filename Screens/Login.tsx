import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import {StackActions} from '@react-navigation/native';
import Button from '../Components/Button/Button';
import {useContext} from 'react';
import UserContext from '../Context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomAlert} from '../utils/CustomAlert';

const textColor = '#8a939e';

const Login = (props: any) => {
  const [userName, setUserName] = useState('zolboo412@gmail.com');
  const [password, setPassword] = useState('123456');
  const [remember, setRemember] = useState(false);

  const {loading, login} = useContext(UserContext);

  useEffect(() => {
    AsyncStorage.getItem('rememberUserName').then(res => {
      if (res) {
        setUserName(res);
        setRemember(true);
      }
    });
  }, []);

  const handleLoginButton = () => {
    if (remember) {
      AsyncStorage.setItem('rememberUserName', userName);
    } else {
      AsyncStorage.removeItem('rememberUserName');
    }
    login(userName, password);
  };

  const handleRegisterButton = () => {
    props.navigation.dispatch(StackActions.push('Register1'));
  };

  const handleForgetPasswordButton = () => {
    props.navigation.dispatch(StackActions.push('ForgetPassword'));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/biz_card_icon.png')}
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
        <Icon name="user-o" style={styles.inputIcon} />
        <TextInput
          value={userName}
          placeholder="Нэвтрэх нэр"
          style={styles.input}
          placeholderTextColor="#8a939e"
          onChangeText={val => setUserName(val)}
        />
      </View>
      <View style={styles.inputContainer2}>
        <FeatherIcon name="lock" style={styles.inputIcon} />
        <TextInput
          value={password}
          secureTextEntry
          placeholder="Нууц үг"
          style={styles.input}
          placeholderTextColor="#8a939e"
          onChangeText={val => setPassword(val)}
        />
      </View>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setRemember(!remember)}>
        <CheckBox
          value={remember}
          style={[styles.checkbox]}
          tintColor={textColor}
          tintColors={{true: textColor, false: textColor}}
          onValueChange={val => setRemember(val)}
        />
        <Text style={styles.checkboxLabel}>Намайг сануул</Text>
      </TouchableOpacity>
      <Button title="Нэвтрэх" loading={loading} onPress={handleLoginButton} />
      <TouchableOpacity>
        <Image
          source={require('../assets/images/LinkedIn_icon.png')}
          style={styles.linkedinLogo}
        />
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleRegisterButton}>
          <Text style={styles.checkboxLabel}>БҮРТГҮҮЛЭХ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleForgetPasswordButton}
          style={styles.forgetPassword}>
          <Text style={styles.checkboxLabel}>Нэвтрэх нэр, нууц үг мартсан</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DEFAULT_COLOR,
    paddingHorizontal: 30,
  },
  logo: {
    height: 140,
    width: 140,
    alignSelf: 'center',
    marginTop: 100,
  },
  inputContainer: {
    marginTop: 40,
    flexDirection: 'row',
    width: '100%',
  },
  inputContainer2: {
    marginTop: 20,
    flexDirection: 'row',
    width: '100%',
  },
  input: {
    color: textColor,
    borderBottomWidth: 1,
    borderBottomColor: textColor,
    width: '100%',
    paddingLeft: 40,
  },
  inputIcon: {
    color: textColor,
    fontSize: 18,
    position: 'absolute',
    left: 10,
    bottom: 15,
  },
  checkboxContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {},
  checkboxLabel: {
    color: textColor,
  },
  linkedinLogo: {
    height: 63,
    width: 63,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 15,
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
  },
  forgetPassword: {
    marginTop: 30,
  },
});
