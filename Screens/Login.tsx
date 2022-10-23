import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Image,
  Modal,
  Platform,
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
import {Checkbox} from 'native-base';
import {isEmpty} from 'lodash';
import {showUnSuccessMessage} from '../utils/helper';
import LinkedInModal from 'react-native-linkedin';
import {setHeight} from '../utils/Dimension';
import WebView from 'react-native-webview';
import querystring from 'query-string';
import 'react-native-get-random-values';
import {v4} from 'uuid';
import {pipe, evolve, propSatisfies, applySpec, propOr, add} from 'ramda';

export const cleanUrlString = (state: any) => state.replace('#!', '');

export const getCodeAndStateFromUrl = pipe(
  querystring.extract,
  querystring.parse,
  evolve({state: cleanUrlString}),
);
export const fetchToken = async (payload: any) => {
  return fetch('https://www.linkedin.com/oauth/v2/accessToken/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: querystring.stringify({
      grant_type: 'client_credentials',
      client_id: '786unfwxdhdyye',
      client_secret: 'GhTrt0w51H41sbes',
    }),
  })
    .then(response => response.json())
    .then(responseData => {
      console.log(JSON.stringify(responseData));
    });
};

const textColor = '#8a939e';

const Login = (props: any) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [userNameEdited, setUserNameEdited] = useState(false);
  // const [payload, setPayload] = useState();
  // let modal = React.createRef<LinkedInModal>();
  const [modal, setModal] = useState<LinkedInModal>();
  const [show, setShow] = useState(false);

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
    if (!remember) {
      AsyncStorage.removeItem('rememberUserName');
    } else {
      AsyncStorage.setItem('rememberUserName', userName);
    }
    if (isEmpty(userName) || isEmpty(password)) {
      showUnSuccessMessage('Нэвтрэх нэр, нууц үг оруулна уу');
    } else {
      login(userName.toLowerCase().trim(), password);
    }
  };

  const handleRegisterButton = () => {
    props.navigation.dispatch(StackActions.push('Register1'));
  };

  const handleForgetPasswordButton = () => {
    props.navigation.dispatch(StackActions.push('ForgetPassword'));
  };

  const onValueChangeUserName = (val: any) => {
    setUserName(val);
    setUserNameEdited(true);
    if (remember) {
      setRemember(false);
      AsyncStorage.removeItem('rememberUserName');
    }
  };

  const getUser = async (data: any) => {
    console.log('data :>> ', data);
    const {access_token, authentication_code} = data;
    if (!authentication_code) {
      const response = await fetch(
        'https://api.linkedin.com/v2/me?projection= (id,firstName,lastName,profilePicture(displayImage~:playableStreams) )',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      const apipayload = await response.json();
      // setPayload(apipayload);
    } else {
      Alert.alert(`authentication_code = ${authentication_code}`);
    }
  };

  const getUserEmailId = async (data: any) => {
    const {access_token, authentication_code} = data;
    if (!authentication_code) {
      const response = await fetch(
        'https://api.linkedin.com/v2/clientAwareMemberHandles?  q=members&projection=(elements*(primary,type,handle~))',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      const emailpayload = await response.json();
      console.log('emailpayload', emailpayload);

      // setEmail(emailpayload.elements[0]['handle~'].emailAddress);
      // handleGetUser();
    } else {
      Alert.alert(`authentication_code = ${authentication_code}`);
    }
  };

  const onNavigationStateChange = async ({url}: any) => {
    const {code, state} = getCodeAndStateFromUrl(url);
    console.log('code', code);
    const token = await getAccessToken(code);
    console.log('token :>> ', token);
  };

  const getAccessToken = async (code: any) => {
    const token = await fetchToken({
      grant_type: 'authorization_code',
      code,
      client_id: '786unfwxdhdyye',
      client_secret: 'GhTrt0w51H41sbes',
      redirect_uri: 'https://www.linkedin.com/developers/tools/oauth/redirect',
    });

    return token;
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
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
          onChangeText={onValueChangeUserName}
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
        <Checkbox
          accessibilityLabel="remember"
          value="remember"
          isChecked={remember}
          style={[styles.checkbox]}
          tintColor={COLORS.textColor}
          backgroundColor={COLORS.DEFAULT_COLOR}
          colorScheme={'white'}
          onChange={val => {
            setRemember(val);
            AsyncStorage.removeItem('rememberUserName');
          }}
        />
        <Text style={styles.checkboxLabel}>Намайг сануул</Text>
      </TouchableOpacity>
      <Button title="Нэвтрэх" loading={loading} onPress={handleLoginButton} />
      <TouchableOpacity
        style={styles.linkedinContainer}
        onPress={() => setShow(true)}>
        <Image
          resizeMode="contain"
          source={require('../assets/images/LinkedIn_icon.png')}
          style={styles.linkedinLogo}
        />
      </TouchableOpacity>
      <Modal visible={show} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.close} onPress={() => setShow(false)}>
            <Text style={{fontSize: 20, lineHeight: 20}}>x</Text>
          </TouchableOpacity>
          <WebView
            source={{
              uri: `https://www.linkedin.com/oauth/v2/authorization?${querystring.stringify(
                {
                  grant_type: 'authorization_code',
                  response_type: 'code',
                  client_id: '786unfwxdhdyye',
                  scope: ['r_liteprofile', 'r_emailaddress'].join(' ').trim(),
                  state: v4(),
                  redirect_uri:
                    'https://www.linkedin.com/developers/tools/oauth/redirect',
                },
              )}`,
            }}
            onNavigationStateChange={onNavigationStateChange}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            sharedCookiesEnabled={true}
          />
        </View>
      </Modal>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleRegisterButton}>
          <Text style={styles.checkboxLabel}>БҮРТГҮҮЛЭХ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleForgetPasswordButton}
          style={styles.forgetPassword}>
          <Text style={styles.checkboxLabel}>Нууц үг мартсан</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.DEFAULT_COLOR,
    paddingHorizontal: 30,
  },
  logo: {
    height: '22%',
    width: 140,
    alignSelf: 'center',
    marginTop: '20%',
  },
  inputContainer: {
    marginTop: '12%',
    flexDirection: 'row',
    width: '100%',
  },
  inputContainer2: {
    marginTop: '6%',
    flexDirection: 'row',
    width: '100%',
  },
  input: {
    color: textColor,
    borderBottomWidth: 1,
    borderBottomColor: textColor,
    width: '100%',
    paddingLeft: 40,
    height: 40,
    // paddingBottom: Platform.OS == 'ios' ? 12 : 6,
  },
  inputIcon: {
    color: textColor,
    fontSize: 18,
    position: 'absolute',
    left: 10,
    bottom: 15,
  },
  checkboxContainer: {
    marginTop: '9%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
    margin: 0,
  },
  checkboxLabel: {
    color: textColor,
  },
  linkedinContainer: {
    width: 64,
    height: '8%',
    alignSelf: 'center',
    marginTop: '10%',
  },
  linkedinLogo: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 15,
  },
  footer: {
    alignItems: 'center',
    marginTop: '7%',
  },
  forgetPassword: {
    marginTop: '5%',
  },
  close: {
    backgroundColor: '#f2f2f2',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 30,
    marginBottom: -10,
    marginRight: -10,
    borderWidth: 2,
    borderColor: '#a0a0a0',
    zIndex: 1,
  },
  modalContainer: {
    height: '85%',
    width: '90%',
    marginTop: 'auto',
    marginBottom: 'auto',
    alignSelf: 'center',
  },
});
