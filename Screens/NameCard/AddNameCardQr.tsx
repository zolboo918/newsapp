import {isEmpty} from 'lodash';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Header from '../../Components/Header/Header';
import {showUnSuccessMessage} from '../../utils/helper';
import {getRequest} from '../../utils/Service';

const AddNameCardQr = (props: any) => {
  const onSuccess = (e: any) => {
    if (e.data) {
      getRequest('/nameCards/qr/' + e.data).then(res => {
        if (!res?.error) {
          if (isEmpty(res.data)) {
            showUnSuccessMessage('Буруу QR байна');
          } else {
            props.navigation.navigate('NameCardDetail', {id: res.data[0]._id});
          }
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Нэрийн хуудас нэмэх"
        leftIcon="left"
        leftIconPress={() => props.navigation.goBack()}
      />
      <View style={styles.wrapper}>
        <Text style={styles.title}>QR код уншуулна уу</Text>
        <View style={styles.qrContainer}>
          <QRCodeScanner
            reactivate={true}
            reactivateTimeout={5000}
            cameraStyle={styles.cameraStyle}
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
