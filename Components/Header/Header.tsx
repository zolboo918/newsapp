import {isEmpty} from 'lodash';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = (props: any) => {
  const {title, leftIcon, leftIconPress, rightIcon, rightIconPress} = props;
  return (
    <View style={[styles.container]}>
      {!isEmpty(leftIcon) ? (
        <AntDesign
          onPress={leftIconPress}
          name={leftIcon}
          style={styles.icon}
        />
      ) : (
        <View />
      )}
      <Text style={styles.title}>{title}</Text>
      {!isEmpty(rightIcon) ? (
        <AntDesign
          onPress={rightIconPress}
          name={rightIcon}
          style={styles.icon}
        />
      ) : (
        <View />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#20252B',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  icon: {
    color: '#fff',
    fontSize: 20,
  },
  title: {
    color: '#fff',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
  },
});
