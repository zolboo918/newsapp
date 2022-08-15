import {isEmpty} from 'lodash';
import React, {useContext} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
          name={iconName ? iconName : 'close-circle-outline'}
          size={80}
          color={'green'}
        />
        <Text style={[styles.modalTitle, {color: color}]}>{messageTitle}</Text>
        <Text style={[styles.modalText, {color: '#000'}]}>{message}</Text>
        <View style={[styles.dialogButtonBackground]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              CustomAlert.hide();
            }}>
            <Text style={styles.textStyle}>Үгүй</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handler} style={styles.button}>
            <Text style={styles.textStyle}>Тийм</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Dialog;
