import {StackActions, useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../constants';

const NameCardListItem = (props: any) => {
  const {item} = props;
  const navigation = useNavigation();
  const handleItemPress = () => {
    navigation.dispatch(StackActions.push('NameCardDetail', {id: item.id}));
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleItemPress}>
      <Image source={{uri: item.nameCardPicture}} style={styles.image} />
      <View style={styles.infoSection}>
        <View style={styles.names}>
          <Text style={styles.name}>{item.firstName}</Text>
          <Text style={styles.name}> {item.lastName}</Text>
        </View>
        <Text style={styles.position}>{item.lastName}</Text>
        <Text style={styles.position}>{item.company}</Text>
        {!isEmpty(item.existMyList) && item.existMyList == '0' ? (
          <AntDesignIcon name="plussquareo" style={styles.addIcon} />
        ) : !isEmpty(item.existMyList) && item.existMyList == '1' ? (
          <TouchableOpacity>
            <Text style={styles.removeIcon}>X</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NameCardListItem;

const styles = StyleSheet.create({
  container: {
    width: '49%',
    marginRight: '2%',
    borderWidth: 1,
    borderColor: '#3B4047',
    marginBottom: 20,
    borderRadius: 7,
  },
  image: {
    height: 135,
    width: '100%',
    borderRadius: 7,
  },
  infoSection: {
    padding: 10,
  },
  names: {
    flexDirection: 'row',
  },
  name: {
    color: '#8A939E',
    fontSize: 16,
  },
  position: {
    color: '#8A939E',
    fontSize: 14,
  },
  addIcon: {
    color: COLORS.textColor,
    fontSize: 24,
    marginTop: 10,
  },
  removeIcon: {
    color: COLORS.textColor,
    fontSize: 18,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
