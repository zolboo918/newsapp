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
  const [modalShow, setModalShow] = useState(false);

  const register = () => {
    //
    setModalShow(true);
  };
  const friend = () => {
    props.navigation.navigate('FriendRequest');
  };

  const manual = () => {
    setModalShow(false);
    props.navigation.navigate('AddNameCardManual');
  };

  const qr = () => {
    setModalShow(false);
    props.navigation.navigate('AddNameCardQr');
  };
  return (
    <View style={styles.container}>
      <Header
        title="Нэрийн хуудас"
        rightIcon="logout"
        rightIconPress={logOut}
      />
      <View style={styles.wrapper}>
        <View style={{alignItems: 'center', width: '30%'}}>
          <TouchableOpacity style={styles.photoContainer} onPress={register}>
            <FeatherIcon name="camera" style={styles.photoIcon} />
          </TouchableOpacity>
          <Text style={styles.text}>Нэрийн хуудас бүртгэх</Text>
        </View>
        <View style={{alignItems: 'center', width: '30%'}}>
          <TouchableOpacity style={styles.photoContainer} onPress={friend}>
            <FeatherIcon name="user-plus" style={styles.photoIcon} />
          </TouchableOpacity>
          <Text style={styles.text}>Найзын хүсэлт</Text>
        </View>
        <AntDesign
          name="down"
          style={styles.downIcon}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <Modal visible={modalShow} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalShow(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <TouchableOpacity style={styles.modalItem} onPress={manual}>
                <Icon name="edit" style={styles.icon} />
                <Text style={styles.text}>Гараар бүртгэх</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalItem} onPress={qr}>
                <Icon name="qrcode" style={styles.icon} />
                <Text style={styles.text}>QR уншуулах</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    borderColor: '#1F252B',
    borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoIcon: {
    fontSize: 40,
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
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
  },
  modal: {
    height: '30%',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: COLORS.DEFAULT_COLOR,
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  modalItem: {
    height: '50%',
    width: '40%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e1e1e1',
    borderRadius: 10,
  },
  icon: {
    fontSize: 30,
    marginBottom: 10,
    color: COLORS.textColor,
  },
});
