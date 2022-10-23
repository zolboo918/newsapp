import {StackActions, useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import React, {useContext, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {COLORS, imageUrl} from '../../constants';
import UserContext from '../../Context/userContext';
import {showSuccessMessage} from '../../utils/helper';
import {deleteRequest, getRequest, sendRequest} from '../../utils/Service';

const NameCardListItem = (props: any) => {
  const {item, index, data, nameCardMapData, setData} = props;
  const navigation = useNavigation();
  const {userInfo} = useContext<any>(UserContext);
  const handleItemPress = () => {
    if (item?.manual) {
      navigation.dispatch(
        StackActions.push('NameCardDetail', {id: item._id, manual: true}),
      );
    } else {
      navigation.dispatch(StackActions.push('NameCardDetail', {id: item._id}));
    }
  };

  const addCard = () => {
    const body = {
      sourceId: userInfo.nameCardId,
      targetId: item._id,
      isFriend: '2',
    };
    sendRequest('/nameCardsMap/request', body).then(res => {
      if (!res.error) {
        const newItem = {
          ...item,
          isFriend: '2',
        };
        data[index] = newItem;
        const newData = [...data];
        setData(newData);
        showSuccessMessage();
      }
    });
  };

  const removeCard = () => {
    let mapItem: any = [];
    nameCardMapData.forEach((el: any) => {
      if (el.targetId == item._id && el.sourceId == userInfo.nameCardId) {
        mapItem.push(el);
      }
    });
    mapItem.forEach((el: any) => {
      deleteRequest('/nameCardsMap/' + el._id).then(res => {
        if (!res.error) {
          const newItem = {
            ...item,
            isFriend: '0',
          };
          data[index] = newItem;
          const newData = [...data];
          setData(newData);
          showSuccessMessage();
        }
      });
    });
  };
  console.log('item.image :>> ', item);
  return (
    <TouchableOpacity style={styles.container} onPress={handleItemPress}>
      <Image
        source={{uri: imageUrl + 'uploads/' + item.frontImage}}
        style={styles.image}
      />
      <View style={styles.infoSection}>
        <View style={styles.names}>
          <Text style={styles.name}>
            {item.firstName} {item.lastName}
          </Text>
          {/* <Text style={styles.name}> </Text> */}
        </View>
        <Text style={styles.position}>{item.position}</Text>
        <Text style={styles.position}>
          {item?.companyName ? item?.companyName : item.companyId?.name}
        </Text>
        {item.isFriend == '0' ? (
          <TouchableOpacity onPress={addCard}>
            <AntDesignIcon name="plussquareo" style={styles.addIcon} />
          </TouchableOpacity>
        ) : item.isFriend == '1' ? (
          <TouchableOpacity onPress={removeCard}>
            <Text style={styles.removeIcon}>X</Text>
          </TouchableOpacity>
        ) : item.isFriend == '2' ? (
          <Text style={styles.pendingText}>Хүсэлт илгээгдсэн</Text>
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
    width: '100%',
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
  pendingText: {
    color: COLORS.textColor,
    fontSize: 14,
    marginTop: 10,
    alignSelf: 'center',
  },
});
