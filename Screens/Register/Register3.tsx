import CheckBox from '@react-native-community/checkbox';
import {StackActions} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import {Checkbox, Toast} from 'native-base';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Button from '../../Components/Button/Button';
import {COLORS} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {takePhoto} from '../../utils/helper';

const Register3 = (props: any) => {
  const [image, setImage] = useState<any>();
  const [intro, setIntro] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [fileData, setFileData] = useState();

  const handleButtonPress = () => {
    props.navigation.dispatch(
      StackActions.push('AgreementAndQR', {
        ...props.route.params,
        image: fileData,
        note: intro,
        isPublic,
      }),
    );
  };

  const openCamera = () => {
    takePhoto().then(res => {
      if (!res?.error) {
        setFileData(res);
        setImage(res.path);
      }
    });
  };

  return (
    <KeyboardAwareScrollView bounces={false} style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Bizcard</Text>
        <Text style={styles.title}>Нэрийн хуудасны мэдээлэл</Text>
        <Text style={styles.titlePhoto}>Нэрийн хуудасны зураг</Text>
        {image ? (
          <Image
            resizeMode="cover"
            source={{uri: image}}
            style={styles.photoContainer}
          />
        ) : (
          <TouchableOpacity style={styles.photoContainer} onPress={openCamera}>
            <FeatherIcon name="camera" style={styles.photoIcon} />
          </TouchableOpacity>
        )}
        <TextInput
          value={intro}
          placeholder="Өөрийн тухай товчхон..."
          multiline
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
          onChangeText={(val: any) => setIntro(val)}
        />
        <TouchableOpacity
          style={styles.checkBoxContainer}
          onPress={() => setIsPublic(!isPublic)}>
          {/* <CheckBox
            boxType="square"
            onCheckColor={COLORS.textColor}
            onFillColor={COLORS.textColor}
            tintColor={COLORS.textColor}
            onTintColor={COLORS.textColor}
            value={isPublic}
            style={styles.checkBox}
            tintColors={{false: COLORS.textColor, true: COLORS.textColor}}
            onValueChange={val => setIsPublic(val)}
          /> */}
          <Checkbox
            // boxType="square"
            color={'yellow.100'}
            backgroundColor={'green'}
            value={isPublic ? '1' : '0'}
            style={[styles.checkbox]}
            tintColor={COLORS.textColor}
            outlineColor="green"
            onChange={val => setIsPublic(val)}
            // tintColors={{true: textColor, false: textColor}}
            // onValueChange={val => setRemember(val)}
          />
          <Text style={styles.checkBoxTitle}>Нийтэд нээлттэй эсэх</Text>
        </TouchableOpacity>
        <View style={styles.bottombuttonContainer}>
          <Button
            icon="chevron-left"
            style={styles.backButton}
            iconStyle={styles.backButtonIcon}
            titleStyle={styles.buttonText}
            onPress={() => props.navigation.goBack()}
          />
          <Button
            title="Хадгалах"
            style={styles.registerButton}
            titleStyle={styles.buttonText}
            onPress={handleButtonPress}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register3;

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
    marginTop: 55,
  },
  checkbox: {
    marginRight: 10,
    margin: 0,
  },
  title: {
    color: COLORS.textColor,
    fontSize: 24,
    marginTop: 40,
    fontWeight: 'bold',
  },
  titlePhoto: {
    color: COLORS.textColor,
    fontSize: 14,
    marginTop: 20,
  },
  photoContainer: {
    borderWidth: 1,
    borderColor: COLORS.textColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    marginTop: 10,
  },
  photoIcon: {
    fontSize: 36,
    color: COLORS.textColor,
  },
  input: {
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.textColor,
    paddingHorizontal: 10,
    height: 160,
    textAlignVertical: 'top',
    fontSize: 14,
    color: COLORS.textColor,
  },
  checkBoxContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  checkBox: {},
  checkBoxTitle: {
    color: COLORS.textColor,
    fontSize: 14,
    marginLeft: 10,
  },
  bottombuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
