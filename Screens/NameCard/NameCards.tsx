import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Header from '../../Components/Header/Header';
import NameCardListItem from '../../Components/ListItems/NameCardListItem';
import {NameCardData} from '../../data/Data';

const NameCards = (props: any) => {
  const onPressSearch = () => {
    props.navigation.navigate('NameCardSearch');
  };
  return (
    <View style={styles.container}>
      <Header
        title="Нэрийн хуудас"
        rightIcon="logout"
        rightIconPress={() => Alert.alert('loglogoutout')}
      />
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.searchSection} onPress={onPressSearch}>
          <View style={styles.input}>
            <Text>Хайх</Text>
          </View>
          <AntDesignIcon name="search1" style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={{marginTop: 20, height: '85%'}}>
          <FlatList
            data={NameCardData}
            numColumns={2}
            renderItem={({item, index}: any) => (
              <NameCardListItem item={item} />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default NameCards;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B3036',
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  input: {
    width: '90%',
    backgroundColor: '#d9d9d9',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  searchIcon: {
    color: '#fff',
    fontSize: 28,
  },
});
