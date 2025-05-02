import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, imageUrl} from '../../constants';

const RequestListItem = (props: any) => {
  const {item, index, accept, decline} = props;
  const navigation = useNavigation<any>();

  const navigate = () => {
    navigation.navigate('NameCardDetail', {id: item._id});
  };
  console.log('item :>> ', item);
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={navigate}>
      <Image
        source={{uri: imageUrl + 'uploads/' + item?.frontImage}}
        style={styles.image}
      />
      <View style={{}}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item?.firstName} </Text>
          <Text style={styles.name}>{item?.lastName}</Text>
        </View>
        <Text style={styles.position}>{item?.position}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => accept(item, index)}>
            <Text style={styles.buttonText}>Зөвшөөөрөх</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => decline(item, index)}>
            <Text style={styles.buttonText}>Татгалзах</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RequestListItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    padding: 10,
    // borderWidth: 1,
    backgroundColor: '#3F454F',
    borderColor: COLORS.textColor,
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    height: '100%',
    width: '30%',
    marginRight: 20,
    borderRadius: 5,
  },
  textContainer: {
    flexDirection: 'row',
  },
  name: {
    color: '#e1e1e1',
    fontSize: 17,
  },
  position: {
    color: COLORS.textColor,
    fontSize: 13,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button1: {
    width: '37%',
    height: 30,
    // borderColor: '#0090F9',
    backgroundColor: '#0090F9',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    width: '37%',
    height: 30,
    // borderWidth: 1,
    // borderColor: '#FE7575',
    backgroundColor: '#5A5A5A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 11,
  },
});
