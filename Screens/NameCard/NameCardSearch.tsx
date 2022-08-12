import {Select} from 'native-base';
import React from 'react';
import {
  Alert,
  Dimensions,
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
import {COLORS} from '../../constants';
import {NameCardData, NameCardSearchData} from '../../data/Data';

const NameCardSearch = (props: any) => {
  return (
    <View style={styles.container}>
      <Header title="Нэрийн хуудас" />
      <View style={styles.wrapper}>
        <View style={styles.searchSection}>
          <AntDesignIcon
            name="left"
            style={styles.backIcon}
            onPress={() => props.navigation.goBack()}
          />
          <TextInput style={styles.input} placeholder="Бүх талбараас хайх" />
          <TouchableOpacity style={styles.close} onPress={() => {}}>
            <Text>X</Text>
          </TouchableOpacity>
          <AntDesignIcon name="search1" style={styles.searchIcon} />
        </View>
        <Text style={styles.total}>Нийт 5421 нэрийн хуудас байна.</Text>
        <View style={styles.filterSection}>
          <Select
            selectedValue={''}
            minWidth="32%"
            accessibilityLabel="Салбар"
            placeholder="Салбар"
            mt={2}
            placeholderTextColor={COLORS.textColor}
            fontSize={14}
            backgroundColor="#474D55"
            borderWidth={0}
            borderRadius={10}
            paddingLeft={1}
            dropdownIcon={
              <AntDesignIcon
                name="down"
                style={{color: COLORS.textColor, marginRight: 5}}
              />
            }
            height={10}
            onValueChange={itemValue => {}}>
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
          </Select>
          <Select
            selectedValue={''}
            minWidth="32%"
            accessibilityLabel="Байгууллага"
            placeholder="Байгууллага"
            mt={2}
            backgroundColor="#474D55"
            borderWidth={0}
            placeholderTextColor={COLORS.textColor}
            fontSize={13}
            borderRadius={10}
            borderColor={COLORS.textColor}
            paddingLeft={1}
            paddingRight={1}
            height={10}
            dropdownIcon={
              <AntDesignIcon
                name="down"
                style={{color: COLORS.textColor, marginRight: 5}}
              />
            }
            onValueChange={itemValue => {}}>
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
          </Select>
          <Select
            selectedValue={''}
            minWidth="32%"
            accessibilityLabel="Албан тушаал"
            placeholder="Албан тушаал"
            mt={2}
            backgroundColor="#474D55"
            borderWidth={0}
            placeholderTextColor={COLORS.textColor}
            fontSize={12}
            dropdownIcon={
              <AntDesignIcon
                name="down"
                style={{color: COLORS.textColor, marginRight: 5}}
              />
            }
            borderRadius={10}
            borderColor={COLORS.textColor}
            paddingLeft={2}
            height={10}
            onValueChange={itemValue => {}}>
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
          </Select>
        </View>
        <View style={styles.line} />
        <FlatList
          style={styles.list}
          data={NameCardSearchData}
          numColumns={2}
          renderItem={({item, index}: any) => <NameCardListItem item={item} />}
        />
      </View>
    </View>
  );
};

export default NameCardSearch;

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
  backIcon: {
    textAlign: 'left',
    color: '#fff',
    fontSize: 20,
    width: '8%',
  },
  input: {
    width: '80%',
    backgroundColor: '#d9d9d9',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    color: '#fff',
    fontSize: 28,
  },
  close: {
    position: 'absolute',
    right: '9%',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  total: {
    marginTop: 20,
    color: '#a5a5a5',
    fontSize: 16,
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    height: 1,
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width,
    marginLeft: -20,
    marginTop: 20,
  },
  list: {
    marginTop: 20,
    height: '66.8%',
  },
});
