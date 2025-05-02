import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Header from '../../Components/Header/Header';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UserContext from '../../Context/userContext';
import {COLORS} from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddNameCard = (props: any) => {
  const {logOut} = useContext(UserContext);

  const search = () => {
    props.navigation.navigate('NameCardSearch');
  };

  const manual = () => {
    props.navigation.navigate('AddNameCardManual');
  };

  const qr = () => {
    props.navigation.navigate('AddNameCardQr');
  };

  const friendRequest = () => {
    props.navigation.navigate('FriendRequest');
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon="adduser"
        title="Нэрийн хуудас"
        rightIcon="logout"
        rightIconPress={logOut}
        leftIconPress={friendRequest}
      />
      <View style={styles.wrapper}>
        <View style={{alignItems: 'center', width: '30%'}}>
          <TouchableOpacity style={styles.photoContainer} onPress={manual}>
            <Icon name="edit" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.text}>Гараар бүртгэх</Text>
        </View>
        <View style={{alignItems: 'center', width: '30%'}}>
          <TouchableOpacity style={styles.photoContainer} onPress={qr}>
            <Icon name="qrcode" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.text}>QR уншуулах</Text>
        </View>
        <View style={{alignItems: 'center', width: '30%'}}>
          <TouchableOpacity style={styles.photoContainer} onPress={search}>
            <FeatherIcon name="search" style={styles.photoIcon} />
          </TouchableOpacity>
          <Text style={styles.text}>Хайлт хийх</Text>
        </View>
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
    // alignItems: 'center',
    paddingTop: 25,
    position: 'absolute',
    bottom: 0,
  },
  photoContainer: {
    borderColor: '#a0a0a0',
    borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoIcon: {
    fontSize: 35,
    color: '#fff',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  downIcon: {
    position: 'absolute',
    fontSize: 30,
    color: '#fff',
    bottom: 0,
    left: '46.5%',
  },
  icon: {
    fontSize: 35,
    color: '#fff',
  },
});
