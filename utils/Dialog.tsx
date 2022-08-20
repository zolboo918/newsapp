import {isEmpty} from 'lodash';
import React, {useContext} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants';
// import LoaderContext from "../../contexts/LoaderContext";
import {CustomAlert} from './CustomAlert';
import {styles} from './styles';

const Dialog = (props: any) => {
  const {iconName, color, message, messageTitle, handler} = props;
  // const {loading} = useContext(LoaderContext);

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Icon
          name={iconName ? iconName : 'ios-help-circle-outline'}
          size={80}
          color={'#fff'}
        />
        <Text style={[styles.modalTitle, {color: color}]}>{messageTitle}</Text>
        <Text style={[styles.modalText2, {color: '#fff'}]}>{message}</Text>
        <View style={[styles.dialogButtonBackground]}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              CustomAlert.hide();
            }}>
            <Text style={styles.textStyle}>Үгүй</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handler();
              CustomAlert.hide();
            }}
            style={styles.button2}>
            <Text style={styles.textStyle}>Тийм</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Dialog;
