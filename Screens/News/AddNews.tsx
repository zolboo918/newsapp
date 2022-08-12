import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
import {COLORS} from '../../constants';
import FeatherIcon from 'react-native-vector-icons/Feather';

const AddNews = (props: any) => {
  const handleButtonPress = () => {};

  return (
    <View style={styles.container}>
      <Header
        title="Мэдээ нэмэх"
        leftIcon="left"
        leftIconPress={() => props.navigation.goBack()}
      />
      <View style={styles.wrapper}>
        <Text style={styles.titlePhoto}>Мэдээний гарчиг</Text>
        <TextInput style={styles.input} />
        <Text style={styles.titlePhoto}>Мэдээний зураг</Text>
        <TouchableOpacity style={styles.photoContainer}>
          <FeatherIcon name="camera" style={styles.photoIcon} />
        </TouchableOpacity>
        <Text style={styles.titlePhoto}>Мэдээний агуулга</Text>
        <TextInput multiline style={styles.inputBig} />
        <Text style={styles.titlePhoto}>Бичлэгний линк</Text>
        <TextInput style={styles.input} />
        <Button
          title="Хадгалах"
          style={styles.registerButton}
          titleStyle={styles.buttonText}
          onPress={handleButtonPress}
        />
      </View>
    </View>
  );
};

export default AddNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B3036',
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  titlePhoto: {
    color: COLORS.textColor,
    fontSize: 14,
    marginTop: 20,
  },
  photoContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.textColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    marginTop: 10,
  },
  photoIcon: {
    fontSize: 36,
    color: COLORS.textColor,
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.textColor,
    paddingHorizontal: 10,
    height: 40,
    textAlignVertical: 'top',
    fontSize: 14,
    color: COLORS.textColor,
  },
  inputBig: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.textColor,
    paddingHorizontal: 10,
    height: 160,
    textAlignVertical: 'top',
    fontSize: 14,
    color: COLORS.textColor,
  },
  registerButton: {
    width: '80%',
    height: 60,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#e1e1e1',
    alignSelf: 'center',
  },
});
