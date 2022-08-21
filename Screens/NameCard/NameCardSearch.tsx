import {useIsFocused} from '@react-navigation/native';
import {identity, includes, isEmpty} from 'lodash';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
import Picker from '../../Components/Picker/Picker';
import {COLORS} from '../../constants';
import UserContext from '../../Context/userContext';
import {positions} from '../../data/Data';
import {getRequest} from '../../utils/Service';

let data: any;

const NameCardSearch = (props: any) => {
  const [nameCardsData, setNameCardsData] = useState([]);
  const [nameCardMapData, setNameCardMapData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  const [sectorId, setSectorId] = useState('');
  const [sectorData, setSectorData] = useState([]);
  const [company, setCompany] = useState('');
  const [companyData, setCompanyData] = useState([]);
  const [position, setPosition] = useState('');
  const [positionData, setPositionData] = useState<any>([]);

  const {userInfo} = useContext<any>(UserContext);

  useEffect(() => {
    getData().then(({nameCards, nameCardsMap}: any) => {
      let arr: any = [];
      let check = false;
      let doubleCheck = false;
      if (isEmpty(nameCardsMap)) {
        nameCards.forEach((nameCard: any, index: any) => {
          nameCard = {...nameCard, isFriend: '0'};
          arr.push(nameCard);
        });
      } else {
        nameCards.forEach((nameCard: any, i: any) => {
          nameCardsMap.forEach((map: any, index: any) => {
            if (!check) {
              if (nameCard._id == map.targetId) {
                nameCard = {...nameCard, isFriend: map.isFriend};
                if (!check && !doubleCheck) {
                  arr.push(nameCard);
                } else {
                  arr[arr.length - 1] = nameCard;
                }
                check = true;
              } else {
                nameCard = {...nameCard, isFriend: '0'};
                if (!arr.some((elm: any) => elm._id == nameCard._id))
                  arr.push(nameCard);
                doubleCheck = true;
                check = false;
              }
            }
          });
          check = false;
          doubleCheck = false;
        });
      }
      const a = arr.filter(
        (elm: any) => elm._id != userInfo.nameCardId && elm.isPublic,
      );
      setNameCardsData(a);
    });
  }, []);

  const getData = async () => {
    setLoading(true);
    const nameCards = await getRequest('/nameCards');
    if (!nameCards?.error) {
      data = nameCards.data;
    }

    const nameCardMap = await getRequest(
      '/nameCardsMap/' + userInfo.nameCardId,
    );

    if (!nameCardMap?.error) {
      setNameCardMapData(nameCardMap.data);
    }
    setLoading(false);
    return {nameCards: nameCards.data, nameCardsMap: nameCardMap.data};
  };

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
    setNameCardsData(data);
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
    setNameCardsData(filtered);
  };

  const onChangeText = (val: any) => {
    if (val == '') {
      setNameCardsData(data);
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
        setNameCardsData(arr);
        break;
      case 'company':
        data.forEach((el: any) => {
          if (el?.companyId?._id == val) {
            arr.push(el);
          }
        });
        setCompany(val);
        setNameCardsData(arr);
        break;
      case 'position':
        data.forEach((el: any) => {
          if (el?.position == val) {
            arr.push(el);
          }
        });
        setPosition(val);
        setNameCardsData(arr);
        break;

      default:
        break;
    }
  };

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
          <TextInput
            value={searchValue}
            style={styles.input}
            placeholder="Бүх талбараас хайх"
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
          Нийт {nameCardsData.length} нэрийн хуудас байна.
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
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={COLORS.textColor} size="large" />
          </View>
        ) : (
          <FlatList
            style={styles.list}
            data={nameCardsData}
            numColumns={2}
            keyExtractor={(item: any, index: any) => index}
            renderItem={({item, index}: any) => (
              <NameCardListItem
                item={item}
                index={index}
                data={nameCardsData}
                nameCardMapData={nameCardMapData}
                setData={setNameCardsData}
              />
            )}
          />
        )}
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
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
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
    width: '80%',
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
  list: {
    marginTop: '5%',
    height: '66.8%',
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
});
