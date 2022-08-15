import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../Components/Header/Header';
import Button from '../../Components/Button/Button';
import {COLORS} from '../../constants';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Select} from 'native-base';

const AddNameCardManual = (props: any) => {
  const handleButtonPress = () => {};
  return (
    <View style={styles.container}>
      <Header
        title="Нэрийн хуудас нэмэх"
        leftIcon="left"
        rightIconPress={() => props.navigation.goBack()}
      />
      <ScrollView style={styles.wrapper}>
        <TouchableOpacity style={styles.photoContainer}>
          <View style={styles.iconContainer}>
            <FeatherIcon name="camera" style={styles.photoIcon} />
          </View>
        </TouchableOpacity>
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
          <TextInput
            placeholder="Албан тушаал"
            placeholderTextColor={COLORS.textColor}
            style={styles.input}
          />
          <TextInput
            placeholder="Байгууллага"
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
          <Button
            title="Хадгалах"
            style={styles.registerButton}
            titleStyle={styles.buttonText}
            onPress={handleButtonPress}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddNameCardManual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B3036',
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  photoContainer: {
    borderWidth: 1,
    borderColor: COLORS.textColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 220,
    marginTop: 20,
  },
  iconContainer: {
    height: 85,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F252B',
    borderRadius: 20,
  },
  photoIcon: {
    fontSize: 36,
    color: COLORS.textColor,
  },
  inputsContainer: {
    // marginTop: 20,
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
  registerButton: {
    width: '80%',
    alignSelf: 'center',
    height: 55,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    color: '#e1e1e1',
    alignSelf: 'center',
  },
});
