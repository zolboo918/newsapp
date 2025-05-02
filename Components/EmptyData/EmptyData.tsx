import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';

const EmptyData = () => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('../../assets/images/empty.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Мэдээлэл олдсонгүй</Text>
    </View>
  );
};

export default EmptyData;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginTop: '5%',
    borderRadius: 10,
    width: '80%',
    height: 140,
    backgroundColor: '#939393',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    height: '60%',
    width: '50%',
  },
});
