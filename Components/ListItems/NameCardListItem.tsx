import {StackActions, useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {COLORS, imageUrl} from '../../constants';
import UserContext from '../../Context/userContext';
import {showSuccessMessage} from '../../utils/helper';
import {deleteRequest, sendRequest} from '../../utils/Service';

const NameCardListItem = (props: any) => {
  const {item, index, data, setData} = props;
  const navigation = useNavigation();
  const {userInfo} = useContext<any>(UserContext);

  const handleItemPress = () => {
    navigation.dispatch(StackActions.push('NameCardDetail', {id: item._id}));
  };

  const addCard = () => {
    const body = {
      sourceId: userInfo.nameCardId,
      targetId: item._id,
    };
    sendRequest('/nameCardsMap', body).then(res => {
      if (!res.error) {
        const newItem = {
          ...item,
          existMyList: '1',
        };
        data[index] = newItem;
        const newData = [...data];
        setData(newData);
        showSuccessMessage();
      }
    });
  };

  const removeCard = () => {
    deleteRequest('/nameCardsMap/' + item._id).then(res => {
      if (!res.error) {
        const newItem = {
          ...item,
          existMyList: '0',
        };
        data[index] = newItem;
        const newData = [...data];
        setData(newData);
        showSuccessMessage();
      }
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleItemPress}>
      <Image
        source={{uri: imageUrl + 'uploads/' + item.image}}
        style={styles.image}
      />
      <View style={styles.infoSection}>
        <View style={styles.names}>
          <Text style={styles.name}>{item.firstName}</Text>
          <Text style={styles.name}> {item.lastName}</Text>
        </View>
        <Text style={styles.position}>{item.position}</Text>
        <Text style={styles.position}>{item?.companyId?.name}</Text>
        {!isEmpty(item.existMyList) && item.existMyList == '0' ? (
          <TouchableOpacity onPress={addCard}>
            <AntDesignIcon name="plussquareo" style={styles.addIcon} />
          </TouchableOpacity>
        ) : !isEmpty(item.existMyList) && item.existMyList == '1' ? (
          <TouchableOpacity onPress={removeCard}>
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
