import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const NewsListItem = (props: any) => {
  const {item, onPress} = props;
  return (
    <View style={styles.container}>
      <View style={styles.userSection}>
        <Image source={{uri: item.userLogo}} style={styles.userLogo} />
        <View style={styles.userTexts}>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.userCompany}>{item.userCompany}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Image source={{uri: item.newsImage}} style={styles.newsImage} />
        <Text style={styles.newsTitle}>{item.newsTitle}</Text>
        <Text style={styles.newsDate}>{item.newsDate}</Text>
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
    marginTop: 5,
  },
});
