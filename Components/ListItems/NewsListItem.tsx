import {isEmpty} from 'lodash';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {baseUrl, imageUrl} from '../../constants';

const NewsListItem = (props: any) => {
  const {item, onPress} = props;
  const date = new Date(item.createdDate);

  return (
    <View style={styles.container}>
      <View style={styles.userSection}>
        <Image
          source={
            !isEmpty(item.userLogo)
              ? {uri: imageUrl + 'uploads/' + item.photo}
              : require('../../assets/images/userIcon.png')
          }
          style={styles.userLogo}
        />
        <View style={styles.userTexts}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.userName}>{item.userId.firstName}</Text>
            <Text style={styles.userName}> {item.userId.lastName}</Text>
          </View>
          <Text style={styles.userCompany}>{item.userId.companyName}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{uri: imageUrl + 'uploads/' + item.photo}}
          style={styles.newsImage}
        />
        <Text style={styles.newsTitle}>{item.title}</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
            width: '100%',
          }}>
          <Icon name="heart-o" style={{fontSize: 20, color: '#fff'}} />
          <Text style={{fontSize: 12, color: '#fff', marginLeft: 5}}>34</Text>
          <Icon
            name="commenting-o"
            style={{fontSize: 20, color: '#fff', marginLeft: 20}}
          />
          <Text style={{fontSize: 12, color: '#fff', marginLeft: 5}}>34</Text>
          <Text style={styles.newsDate}>
            {date.getFullYear()}.{date.getMonth() + 1}.{date.getDate()}{' '}
            {date.getHours()}:{date.getMinutes()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NewsListItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  userSection: {
    flexDirection: 'row',
  },
  userLogo: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  userTexts: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    color: '#F5f5f5',
  },
  userCompany: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginTop: 10,
  },
  newsTitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
  newsDate: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'right',
    marginLeft: '38%',
  },
});
