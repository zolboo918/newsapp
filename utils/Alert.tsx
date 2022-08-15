import {isEmpty} from 'lodash';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants';
import {CustomAlert} from './CustomAlert';
import {styles} from './styles';

const Alert = (props: any) => {
  // #FFBB00 - yellow
  const {iconName, color, message, messageTitle} = props;
  const hide = () => {
    CustomAlert.hide();
  };
  return (
    // <View style={styles.centeredView}>
    <View style={styles.modalView}>
      {iconName != 'none' ? (
        <Icon
          name={iconName ? iconName : 'close-circle-outline'}
          size={80}
          color={'#000'}
        />
      ) : (
        <></>
      )}
      <Text style={[styles.modalTitle, {color: COLORS.DEFAULT_COLOR}]}>
        {messageTitle}
      </Text>

      <Text style={[styles.modalText, {color: '#000'}]}>{message}</Text>

      <View style={styles.buttonBackground}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: COLORS.textColor}]}
          onPress={hide}>
          <Text style={styles.textStyle}>Хаах</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </View>
  );
};

export default Alert;
