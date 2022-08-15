import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../../Components/Header/Header';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddNameCard = (props: any) => {
  const manual = () => {
    props.navigation.navigate('AddNameCardManual');
  };
  const qr = () => {
    props.navigation.navigate('AddNameCardQr');
  };
  return (
    <View style={styles.container}>
      <Header
        title="Нэрийн хуудас"
        rightIcon="logout"
        rightIconPress={() => Alert.alert('loglogoutout')}
      />
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.photoContainer} onPress={manual}>
          <FeatherIcon name="camera" style={styles.photoIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoContainer} onPress={qr}>
          <FontAwesome name="qrcode" style={styles.photoIcon} />
        </TouchableOpacity>
        <AntDesign
          name="down"
          style={styles.downIcon}
          onPress={() => props.navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default AddNameCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B3036',
    flex: 1,
  },
  wrapper: {
    backgroundColor: '#474D55',
    height: 190,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  photoContainer: {
    borderColor: '#1F252B',
    borderWidth: 1,
    height: 85,
    width: 85,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoIcon: {
    fontSize: 24,
    color: '#fff',
  },
  downIcon: {
    position: 'absolute',
    fontSize: 30,
    color: '#fff',
    bottom: 0,
    left: '46.5%',
  },
});
