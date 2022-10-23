import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../Components/Header/Header';
import {baseUrl, COLORS, imageUrl} from '../../constants';
import Button from '../../Components/Button/Button';
import UserContext from '../../Context/userContext';
import {deleteRequest, getRequest, sendRequest} from '../../utils/Service';
import QRCode from 'react-native-qrcode-svg';
import {isEmpty} from 'lodash';
import {showSuccessMessage} from '../../utils/helper';
import {useIsFocused} from '@react-navigation/native';
import {setHeight, setWidth} from '../../utils/Dimension';

const NameCardDetail = (props: any) => {
  const {id, manual} = props.route.params;
  const [data, setData] = useState<any>();
  const [sector, setSector] = useState<any>();
  const [company, setCompany] = useState('');
  const [isFriend, setIsFriend] = useState<any>();
  const [requested, setRequested] = useState(false);

  const [loading, setLoading] = useState(false);

  const {userInfo, logOut} = useContext<any>(UserContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllData();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      if (!isEmpty(data) && typeof data.companyId == 'string') {
        getCompany(data?.companyId);
      } else {
        setCompany(data?.companyId?.name);
      }
    }
  }, [data, isFocused]);

  const getAllData = () => {
    setLoading(true);
    if (id == 1) {
      getRequest('/nameCards/user/' + userInfo._id).then(res => {
        if (!res.error) {
          setData(res.data);
          getSector(res.data?.sectorId);
          setLoading(false);
        }
      });
      getSector(userInfo.sectorId);
    } else if (manual) {
      getRequest('/nameCardManual/' + id).then(res => {
        if (!res.error) {
          setData(res.data);
          getSector(res.data?.sectorId);
          setLoading(false);
        }
      });
    } else {
      getRequest('/nameCards/' + id).then(res => {
        if (!res.error) {
          setData(res.data);

          sendRequest('/nameCardsMap/checkIsFriend', {
            sourceId: userInfo.nameCardId,
            targetId: res.data._id,
          }).then(ress => {
            if (!ress?.error) {
              setIsFriend(ress.data[0]);
              setLoading(false);
            }
          });
          getSector(res.data?.sectorId);
        }
      });
    }
  };

  const getSector = (id: any) => {
    getRequest(`/companyCategories/${id}`).then(res => {
      if (!res.error)
        setSector({id: res.data_id, displayName: res.data.displayName});
    });
  };

  const getCompany = (id: any) => {
    if (data?.companyId) {
      getRequest(`/company/${data?.companyId}`).then(res => {
        if (!res.error) setCompany(res.data.name);
      });
    }
  };

  const buttonPress = () => {
    if (id == '1') {
      props.navigation.navigate('NameCardEdit', {
        item: {...data, sector},
      });
    } else if (manual) {
      deleteRequest('/nameCardManual/' + data?._id).then(res => {
        if (!res?.error) {
          props.navigation.goBack();
          showSuccessMessage();
        }
      });
    } else if (isFriend?.isFriend == '1') {
      deleteRequest('/nameCardsMap/' + isFriend._id).then(res => {
        if (!res.error) {
          getAllData();
          showSuccessMessage();
        }
      });
    } else {
      const body = {
        sourceId: userInfo.nameCardId,
        targetId: data._id,
      };
      sendRequest('/nameCardsMap', body).then(res => {
        if (!res?.error) {
          setRequested(true);
          showSuccessMessage();
        }
      });
    }
  };

  console.log('data', data);

  return (
    <View style={styles.container}>
      <Header
        title="Нэрийн хуудас"
        rightIcon={id == 1 ? 'logout' : ''}
        rightIconPress={logOut}
        leftIcon={id != 1 ? 'left' : ''}
        leftIconPress={() => props.navigation.goBack()}
      />
      <ScrollView style={styles.wrapper}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={'large'} color={COLORS.textColor} />
          </View>
        ) : (
          <>
            <ScrollView horizontal>
              <Image
                source={{
                  uri: imageUrl + 'uploads/' + data?.frontImage,
                }}
                resizeMode="cover"
                style={[styles.image, {marginRight: 20}]}
              />
              <Image
                source={{
                  uri: imageUrl + 'uploads/' + data?.backImage,
                }}
                resizeMode="cover"
                style={styles.image}
              />
            </ScrollView>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Нэр:</Text>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <Text style={styles.text3}>{data?.firstName} </Text>
                <Text style={styles.text3}>{data?.lastName}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Байгууллага:</Text>
              <Text style={styles.text2}>
                {data?.companyName ? data?.companyName : company}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Албан тушаал:</Text>
              <Text style={styles.text2}>{data?.position}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Салбар:</Text>
              <Text style={styles.text2}>{sector?.displayName}</Text>
            </View>
            {isFriend?.isFriend == '1' ||
              (id == 1 && (
                <>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Утас:</Text>
                    <Text style={styles.text2}>{data?.phone}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Мэйл:</Text>
                    <Text style={styles.text2}>{data?.email}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Танилцуулга:</Text>
                    <Text style={styles.text2}>{data?.aboutActivity}</Text>
                  </View>
                  <View style={styles.qr}>
                    <QRCode value={data?.qr} size={130} />
                  </View>
                </>
              ))}
            <Button
              title={
                id == '1'
                  ? 'Засах'
                  : manual || isFriend?.isFriend == '1'
                  ? 'Устгах'
                  : requested || isFriend?.isFriend == '2'
                  ? 'Хүсэлт илгээгдсэн'
                  : 'Хүсэлт илгээх'
              }
              disabled={requested || isFriend?.isFriend == '2'}
              style={styles.button}
              titleStyle={styles.buttonText}
              onPress={buttonPress}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default NameCardDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B3036',
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  loaderContainer: {
    height: setHeight(50),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: setWidth(80),
    height: 220,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    color: COLORS.textColor,
    fontSize: 16,
    width: '40%',
  },
  text2: {
    color: COLORS.textColor,
    fontSize: 16,
    width: '60%',
  },
  text3: {
    color: COLORS.textColor,
    fontSize: 16,
  },
  qr: {
    height: 150,
    width: 150,
    marginTop: 40,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '70%',
    alignSelf: 'center',
    height: 50,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
  },
});
