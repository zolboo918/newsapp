import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Button from '../Components/Button/Button';
import {COLORS} from '../constants';
import {getHeight, getWidth} from '../utils/Dimension';

const Working = (props: any) => {
  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <View style={styles.background}>
      <Image
        resizeMode="contain"
        source={require('../assets/images/working.png')}
        style={{height: '35%', width: 260}}
      />
      <Text style={styles.text}>ЭНЭ ХУУДАС ХӨГЖҮҮЛЭГДЭЖ БАЙНА</Text>
      <Button
        title="Буцах"
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={goBack}
      />
    </View>
  );
};

export default Working;

const styles = StyleSheet.create({
  background: {
    height: getHeight(),
    width: getWidth(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DEFAULT_COLOR,
  },
  text: {
    marginTop: '10%',
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    width: '50%',
    textAlign: 'center',
  },
  button: {
    marginTop: '10%',
    height: 55,
    width: '45%',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 20,
  },
});
