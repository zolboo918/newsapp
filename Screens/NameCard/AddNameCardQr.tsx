import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../Components/Header/Header';
import Button from '../../Components/Button/Button';

const AddNameCardQr = (props: any) => {
  return (
    <View style={styles.container}>
      <Header
        title="Нэрийн хуудас нэмэх"
        leftIcon="left"
        rightIconPress={() => props.navigation.goBack()}
      />
      <View style={styles.wrapper}>
        <Text style={styles.title}>QR код уншуулна уу</Text>
        <View style={styles.qrContainer}></View>
      </View>
    </View>
  );
};

export default AddNameCardQr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B3036',
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    color: '#8A939E',
    alignSelf: 'center',
    marginTop: '30%',
  },
  qrContainer: {
    height: 360,
    width: 360,
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#8A939E',
    marginTop: '10%',
  },
});
