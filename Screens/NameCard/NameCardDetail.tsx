import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../Components/Header/Header';
import {COLORS} from '../../constants';
import Button from '../../Components/Button/Button';

const NameCardDetail = (props: any) => {
  const id = props.route.params.id;
  return (
    <View style={styles.container}>
      <Header
        title="Нэрийн хуудас"
        leftIcon="left"
        leftIconPress={() => props.navigation.goBack()}
      />
      <ScrollView style={styles.wrapper}>
        <Image
          source={{
            uri: 'https://pbs.twimg.com/media/E6zYQTlUYAEYp0d?format=jpg&name=4096x4096',
          }}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Нэр:</Text>
          <Text style={styles.text2}>Цогтоо Ган-Эрдэнэ</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Байгууллага:</Text>
          <Text style={styles.text2}>“Ай Ви И Эл” ХХК</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Албан тушаал:</Text>
          <Text style={styles.text2}>Director</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Салбар:</Text>
          <Text style={styles.text2}>Мэдээллийн технологи</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Утас:</Text>
          <Text style={styles.text2}>99133211</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Утас 2:</Text>
          <Text style={styles.text2}>113315</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Мэйл:</Text>
          <Text style={styles.text2}>ganerdene@email.com</Text>
        </View>
        <Image
          source={require('../../assets/images/QR.png')}
          style={styles.qr}
        />
        <Button
          title="Хүсэлт илгээх"
          style={styles.button}
          titleStyle={styles.buttonText}
        />
      </ScrollView>
    </View>
  );
};

export default NameCardDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B3036',
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 220,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    color: COLORS.textColor,
    fontSize: 16,
    width: '40%',
  },
  text2: {
    color: COLORS.textColor,
    fontSize: 16,
    width: '60%',
  },
  qr: {
    height: 150,
    width: 150,
    marginTop: 40,
  },
  button: {
    width: '70%',
    alignSelf: 'center',
    height: 50,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
  },
});
