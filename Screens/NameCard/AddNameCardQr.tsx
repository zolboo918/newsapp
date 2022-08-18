import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../../Components/Header/Header';
import Button from '../../Components/Button/Button';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const AddNameCardQr = (props: any) => {
  const onSuccess = (e: any) => {
    console.log('e', e);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Нэрийн хуудас нэмэх"
        leftIcon="left"
        rightIconPress={() => props.navigation.goBack()}
      />
      <View style={styles.wrapper}>
        <Text style={styles.title}>QR код уншуулна уу</Text>
        <View style={styles.qrContainer}>
          <QRCodeScanner
            // cameraContainerStyle={{height: 360, width: 360}}
            cameraStyle={styles.cameraStyle}
            // containerStyle={{height: 360, width: 360}}
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
          />
        </View>
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
    marginTop: '10%',
  },
  cameraStyle: {
    marginTop: '15%',
    marginLeft: '10%',
    width: '80%',
    height: '20%',
  },
});
