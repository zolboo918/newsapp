import {isEmpty} from 'lodash';
import {ChevronLeftIcon} from 'native-base';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants';

const Button = (props: any) => {
  const {title, icon, style, titleStyle, iconStyle, onPress} = props;
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      {title && <Text style={[styles.buttonText, titleStyle]}>{title}</Text>}
      {icon && <Icon name={icon} style={[styles.icon, iconStyle]} />}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#2d3846',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: COLORS.textColor,
    fontSize: 24,
  },
  icon: {
    color: COLORS.textColor,
    fontSize: 20,
  },
});
