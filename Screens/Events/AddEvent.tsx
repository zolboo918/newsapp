import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../Components/Header/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from '../../constants';
import Button from '../../Components/Button/Button';
import DatePicker from 'react-native-date-picker';
import {getRequest, sendRequest} from '../../utils/Service';
import {isEmpty} from 'lodash';
import {showSuccessMessage, showWarningMessage} from '../../utils/helper';
import Icon from 'react-native-vector-icons/EvilIcons';
import UserContext from '../../Context/userContext';

const AddEvent = (props: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);

  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const {userInfo} = useContext<any>(UserContext);

  useEffect(() => {
    getRequest('/nameCards').then((res: any) => {
      if (!isEmpty(res.data)) {
        setUsers(res.data);
      }
    });
  }, []);

  const handleButtonPress = () => {
    if (isEmpty(title)) {
      showWarningMessage('Гарчиг заавал оруулна уу');
    } else {
      const tm = new Date(time);
      const body = {
        date: date.toISOString().split('T')[0],
        time: tm.getHours() + ':' + tm.getMinutes(),
        name: title,
        description,
      };
      setLoading(true);
      sendRequest('/event', body).then((res: any) => {
        setLoading(false);
        if (res.success) {
          selectedUsers.forEach((el: any) => {
            const mapBody = {
              eventId: res.data._id,
              userId: el.userId[0],
              type: '1',
            };
            sendRequest('/eventMap', mapBody);
          });
          showSuccessMessage();
          props.navigation.goBack();
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Эвент нэмэх"
        leftIcon="left"
        leftIconPress={() => props.navigation.goBack()}
      />
      {loading ? (
        <ActivityIndicator size={'large'} color={COLORS.textColor} />
      ) : (
        <KeyboardAwareScrollView style={styles.wrapper}>
          <Text style={styles.titlePhoto}>Эвентийн гарчиг</Text>
          <TextInput
            value={title}
            style={styles.input}
            onChangeText={val => setTitle(val)}
          />
          <Text style={styles.titlePhoto}>Нэмэлт мэдээлэл</Text>
          <TextInput
            value={description}
            multiline
            style={styles.inputBig}
            onChangeText={val => setDescription(val)}
          />
          <View style={styles.dateTimeContainer}>
            <View style={{width: '48%'}}>
              <Text style={styles.titlePhoto}>Эхлэх өдөр</Text>
              <TouchableOpacity
                style={styles.dateContainer}
                onPress={() => setDateOpen(true)}>
                <Text style={styles.selectedDate}>
                  {date.toISOString().split('T')[0]}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '48%'}}>
              <Text style={styles.titlePhoto}>Эхлэх цаг</Text>
              <TouchableOpacity
                style={styles.dateContainer}
                onPress={() => setTimeOpen(true)}>
                <Text style={styles.selectedDate}>
                  {(time.getHours() > 9
                    ? time.getHours()
                    : '0' + time.getHours()) +
                    ':' +
                    (time.getMinutes() > 9
                      ? time.getMinutes()
                      : '0' + time.getMinutes())}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={styles.titlePhoto}>Урих зочид</Text>
            <FlatList
              horizontal
              data={users}
              style={{paddingTop: 10}}
              renderItem={({item, index}: any) => {
                return (
                  <TouchableOpacity
                    style={styles.userItemContainer}
                    onPress={() => {
                      if (selectedUsers.includes(item)) {
                        const arr = selectedUsers.filter(
                          (el: any) => el != item,
                        );
                        setSelectedUsers(arr);
                      } else {
                        setSelectedUsers((old: any) => [...old, item]);
                      }
                    }}>
                    <Image
                      source={require('../../assets/userIcon.png')}
                      style={styles.userItemImage}
                    />
                    <Text style={{color: COLORS.textColor, marginTop: 5}}>
                      {item.firstName}
                    </Text>
                    {selectedUsers.includes(item) && (
                      <View style={styles.checkContainer}>
                        <Icon name="check" style={styles.checkIcon} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <Button
            title="Хадгалах"
            loading={loading}
            style={styles.registerButton}
            titleStyle={styles.buttonText}
            onPress={handleButtonPress}
          />
          <DatePicker
            modal
            mode="date"
            open={dateOpen}
            androidVariant="nativeAndroid"
            date={date}
            onConfirm={date => {
              setDateOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setDateOpen(false);
            }}
          />
          <DatePicker
            modal
            mode="time"
            open={timeOpen}
            androidVariant="nativeAndroid"
            date={time}
            onConfirm={date => {
              setTimeOpen(false);
              setTime(date);
            }}
            onCancel={() => {
              setTimeOpen(false);
            }}
          />
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B3036',
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  titlePhoto: {
    color: COLORS.textColor,
    fontSize: 14,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.textColor,
    paddingHorizontal: 10,
    height: 40,
    textAlignVertical: 'top',
    fontSize: 14,
    color: COLORS.textColor,
  },
  inputBig: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.textColor,
    paddingHorizontal: 10,
    height: 160,
    textAlignVertical: 'top',
    fontSize: 14,
    color: COLORS.textColor,
  },
  dateContainer: {
    // width: '45%',
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.textColor,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
    marginTop: 10,
  },
  selectedDate: {
    color: COLORS.textColor,
  },
  registerButton: {
    width: '80%',
    height: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#e1e1e1',
    alignSelf: 'center',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  userItemContainer: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  userItemImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    // borderWidth: 2,
    // borderColor: '#f2f2f2',
  },
  checkContainer: {
    position: 'absolute',
    right: -7,
    top: -5,
    backgroundColor: COLORS.textColor,
    borderRadius: 50,
  },
  checkIcon: {
    color: COLORS.DEFAULT_COLOR,
    fontSize: 20,
  },
});
