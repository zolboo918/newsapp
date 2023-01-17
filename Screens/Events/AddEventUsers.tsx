import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header/Header';
import {getRequest} from '../../utils/Service';
import {isEmpty} from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {position} from 'native-base/lib/typescript/theme/styled-system';
import Picker from '../../Components/Picker/Picker';
import {COLORS} from '../../constants';
import {positions} from '../../data/Data';
import {setHeight} from '../../utils/Dimension';

let data: any;

const AddEventUsers = (props: any) => {
  const {selectedUsers, setSelectedUsers} = props.route.params;
  const [users, setUsers] = useState([]);
  const [chosenUsers, setChosenUsers] = useState<any>(selectedUsers);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  const [sectorId, setSectorId] = useState('');
  const [sectorData, setSectorData] = useState([]);
  const [company, setCompany] = useState('');
  const [companyData, setCompanyData] = useState([]);
  const [position, setPosition] = useState('');
  const [positionData, setPositionData] = useState<any>([]);

  useEffect(() => {
    getRequest('/nameCards').then((res: any) => {
      if (!isEmpty(res.data)) {
        data = res.data;
        setUsers(res.data);
      }
    });
  }, []);
  console.log('selectedUsers :>> ', selectedUsers);
  const onPressSector = () => {
    if (isEmpty(sectorData)) {
      getRequest('/companyCategories').then(res => {
        let arr: any = [];
        res.data.forEach((el: any) => {
          arr.push({label: el.displayName, value: el._id});
        });
        setSectorData(arr);
      });
    }
  };

  const onPressCompany = () => {
    if (isEmpty(companyData)) {
      getRequest('/company').then(res => {
        let arr: any = [];
        res.data.forEach((el: any) => {
          arr.push({label: el.name, value: el._id});
        });
        setCompanyData(arr);
      });
    }
  };

  const onPressPosition = () => {
    if (isEmpty(positionData)) {
      setPositionData(positions);
    }
  };

  const clearFilter = () => {
    setCompany('');
    setSectorId('');
    setPosition('');
    setSearchValue('');
    setUsers(data);
  };

  const search = () => {
    let filtered: any = [];
    data.forEach((el: any) => {
      if (
        el.firstName.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        el.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        el.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        el.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        el.phone.toLowerCase().includes(searchValue.toLowerCase()) ||
        el.position.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        filtered.push(el);
      }
    });
    setUsers(filtered);
  };

  const onChangeText = (val: any) => {
    if (val == '') {
      setUsers(data);
      setSearchValue(val);
    } else setSearchValue(val);
  };

  const onValueChange = (val: any, type: any) => {
    let arr: any = [];
    switch (type) {
      case 'sector':
        data.forEach((el: any) => {
          if (el.sectorId == val) {
            arr.push(el);
          }
        });
        setSectorId(val);
        setUsers(arr);
        break;
      case 'company':
        data.forEach((el: any) => {
          if (el?.companyId?._id == val) {
            arr.push(el);
          }
        });
        setCompany(val);
        setUsers(arr);
        break;
      case 'position':
        data.forEach((el: any) => {
          if (el?.position == val) {
            arr.push(el);
          }
        });
        setPosition(val);
        setUsers(arr);
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Зочин урих"
        leftIcon="left"
        leftIconPress={() => {
          setSelectedUsers(chosenUsers);
          props.navigation.goBack();
        }}
      />
      <View style={styles.wrapper}>
        <View style={styles.searchSection}>
          <TextInput
            value={searchValue}
            style={styles.input}
            placeholder="Xайх"
            placeholderTextColor={COLORS.textColor}
            onEndEditing={search}
            onChangeText={onChangeText}
          />
          <TouchableOpacity style={styles.close} onPress={clearFilter}>
            <Text style={{color: COLORS.textColor}}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={search}>
            <AntDesignIcon name="search1" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.total}>
          Нийт {users.length} нэрийн хуудас байна.
        </Text>

        <View style={styles.filterSection}>
          <Picker
            value={sectorId}
            items={sectorData}
            placeholder="Салбар"
            style={styles.pickerContainer}
            dropdownIcon={
              <AntDesignIcon
                name="down"
                style={{color: COLORS.textColor, marginRight: 5}}
              />
            }
            onPress={onPressSector}
            onValueChange={(val: any) => onValueChange(val, 'sector')}
          />
          <Picker
            value={company}
            items={companyData}
            placeholder="Байгууллага"
            style={styles.pickerContainer}
            dropdownIcon={
              <AntDesignIcon
                name="down"
                style={{color: COLORS.textColor, marginRight: 5}}
              />
            }
            onPress={onPressCompany}
            onValueChange={(val: any) => onValueChange(val, 'company')}
          />
          <Picker
            value={position}
            items={positionData}
            placeholder="Албан тушаал"
            style={styles.pickerContainer2}
            dropdownIcon={
              <AntDesignIcon
                name="down"
                style={{color: COLORS.textColor, marginRight: 5}}
              />
            }
            onPress={onPressPosition}
            onValueChange={(val: any) => onValueChange(val, 'position')}
          />
        </View>

        <View style={styles.line} />
      </View>
      <View style={{height: setHeight(67)}}>
        <FlatList
          data={users}
          style={{padding: 20, marginBottom: 20}}
          renderItem={({item, index}: any) => {
            let check = false;
            chosenUsers.forEach((el: any) => {
              if (el._id == item._id) {
                check = true;
              }
            });
            return (
              <View>
                {check && (
                  <View style={styles.checkContainer}>
                    <AntDesignIcon name="check" style={{color: '#fff'}} />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.listItemContainer}
                  onPress={() => {
                    let arr: any = [...chosenUsers];
                    if (!arr.some((el: any) => el._id == item._id)) {
                      arr.push(item);
                    } else {
                      arr = chosenUsers.filter((el: any) => el._id != item._id);
                    }
                    setChosenUsers(arr);
                  }}>
                  <Text style={styles.listItemName}>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text style={[styles.listItemDesc, {marginTop: 5}]}>
                    {item.companyId.name}
                  </Text>
                  <View style={[styles.rowCenter, {marginTop: 5}]}>
                    <View
                      style={[
                        styles.rowCenter,
                        {
                          minWidth: '30%',
                          maxWidth: '50%',
                        },
                      ]}>
                      <SimpleLineIcon name="bag" style={styles.listItemDesc} />
                      <Text style={[styles.listItemDesc, {marginLeft: 5}]}>
                        {item.position}
                      </Text>
                    </View>
                    <View style={[styles.rowCenter, {marginLeft: 20}]}>
                      <Icon
                        style={styles.listItemDesc}
                        name="clipboard-outline"
                      />
                      <Text style={[styles.listItemDesc, {marginLeft: 5}]}>
                        {item.profession}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            setSelectedUsers(chosenUsers);
            props.navigation.goBack();
          }}>
          <AntDesignIcon name="left" style={styles.doneButtonIcon} />
          <Text style={styles.doneButtonText}>Болсон</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddEventUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B3036',
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '3%',
  },
  backIcon: {
    textAlign: 'left',
    color: '#fff',
    fontSize: 20,
    width: '8%',
  },
  input: {
    width: '90%',
    backgroundColor: '#d9d9d9',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: COLORS.textColor,
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
    marginTop: '4%',
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
    marginTop: '5%',
  },
  checkContainer: {
    height: 20,
    width: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9dc795',
    marginBottom: -10,
    zIndex: 1,
  },
  listItemContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  listItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#585858',
    lineHeight: 20,
  },
  listItemDesc: {
    color: '#a0a0a0',
    fontSize: 14,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    marginTop: 2,
    minWidth: '32%',
    backgroundColor: '#474D55',
    borderWidth: 0,
    fontSize: 13,
    paddingLeft: 1,
    paddingRight: 1,
  },
  pickerContainer2: {
    marginTop: 2,
    minWidth: '32%',
    backgroundColor: '#474D55',
    borderWidth: 0,
    fontSize: 12,
    paddingLeft: 2,
    paddingRight: 1,
  },
  doneButton: {
    height: 50,
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: Platform.OS == 'ios' ? 20 : 0,
  },
  doneButtonIcon: {
    color: '#585858',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  doneButtonText: {
    color: '#585858',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
