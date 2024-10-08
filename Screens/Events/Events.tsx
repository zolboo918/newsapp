import {Fab} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Agenda, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Header from '../../Components/Header/Header';
import {COLORS} from '../../constants';
import {isEmpty} from 'lodash';
import UserContext from '../../Context/userContext';
import {getRequest} from '../../utils/Service';
import {useIsFocused} from '@react-navigation/native';

const AgendaScreen = (props: any) => {
  let date = new Date();
  const [items, setItems] = useState<any>({});
  const [today, setToday] = useState(date.toISOString().split('T')[0]);
  const [invited, setinvited] = useState<any>([]);
  const [markedDates, setMarkedDates] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const {userInfo, setNewEvent, logOut} = useContext<any>(UserContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadDayData(today);
      setNewEvent(false);
    }
  }, [isFocused]);

  const loadDayData = (date: any) => {
    setLoading(true);
    getRequest(`/event/events/${date}`).then((res: any) => {
      setLoading(false);
      let arr: any = [];
      if (res.success && !isEmpty(res.data)) {
        res.data.forEach((el: any) => {
          if (!arr[date]) arr[date] = [];
          arr[date].push({
            name: el.name,
            height: 80,
            day: el.date,
            ...el,
          });
          el.users.forEach((elm: any) => {
            if (
              elm.userId._id == userInfo._id &&
              !invited.some((elem: any) => elem._id == elm.eventId)
            ) {
              setinvited((old: any) => [...old, el]);
            }
          });
        });
      }
      if (!arr[date]) {
        let clone = Object.assign({}, arr, {[date]: []});
        arr = clone;
        //this.state.items[dayString] = [];
      }
      setItems(arr);
    });
  };

  const loadMonthData = (date: any) => {
    setLoading(true);
    if (!date) {
      const d = new Date();
      const month =
        d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
      date = {year: d.getFullYear(), month};
    }
    if (date.month < 10) {
      date.month = `0${date.month}`;
    }

    getRequest(
      `/event/filter/${date.year}-${date.month}-01/${date.year}-${date.month}-31`,
    ).then((res: any) => {
      let arr: any = {};
      setLoading(false);
      if (res.success && !isEmpty(res.data)) {
        res.data.forEach((el: any) => {
          // arr.push(el.date);
          // '2022-11-20': {textColor: 'green', marked: true},
          arr[el.date] = {marked: true};
        });
        setMarkedDates(arr);
      }
    });
  };

  const onPressFab = () => {
    props.navigation.navigate('AddEvent');
  };

  const renderItem = (reservation: any, isFirst: boolean) => {
    const inv = invited.some((el: any) => el._id == reservation._id);
    return (
      <EventItem
        reservation={reservation}
        inv={inv}
        navigation={props.navigation}
      />
    );
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  return (
    <View style={styles.container}>
      <Header
        title="Үйл явдлын хуанли"
        rightIcon="logout"
        rightIconPress={logOut}
      />
      <Agenda
        testID={'calendars'}
        items={items}
        selected={today}
        renderItem={renderItem}
        renderEmptyDate={() => (
          <View style={styles.itemContainer}>
            <Text>Эвент олдсонгүй</Text>
          </View>
        )}
        rowHasChanged={rowHasChanged}
        displayLoadingIndicator={false}
        showClosingKnob={true}
        onDayPress={day => {
          setToday(day.dateString);
          loadDayData(day.dateString);
        }}
        // Callback that gets called when day changes while scrolling agenda list
        loadItemsForMonth={date => {
          loadMonthData(date);
        }}
        onDayChange={day => {}}
        markedDates={markedDates}
        theme={{
          calendarBackground: COLORS.DEFAULT_COLOR,
          agendaKnobColor: COLORS.textColor,
          dayTextColor: COLORS.textColor,
          selectedDayBackgroundColor: '#E88B00',
          monthTextColor: COLORS.textColor,
        }}
        showOnlySelectedDayItems
      />
      <Fab
        style={styles.fab}
        renderInPortal={false}
        onPress={onPressFab}
        icon={<AntDesignIcon name="plus" style={styles.fabIcon} />}
      />
    </View>
  );
};

export default AgendaScreen;

const EventItem = memo((props: any) => {
  const {reservation, inv, navigation} = props;
  return (
    <TouchableOpacity
      testID={'item'}
      style={[styles.item, {height: reservation.height}]}
      onPress={() => navigation.navigate('EventDetail', {id: reservation._id})}>
      <View style={styles.itemContainerReal}>
        {inv && (
          <View style={styles.statusContainer}>
            <Text style={{color: '#fff', fontSize: 12}}>Уригдсан</Text>
          </View>
        )}
        <View>
          <Text style={styles.name}>{reservation.name}</Text>
          <Text style={styles.day}>
            {reservation.day} {reservation.time}
          </Text>
        </View>
        <AntDesignIcon
          name="right"
          style={{fontSize: 20, color: COLORS.textColor}}
        />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B3036',
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  statusContainer: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: '#53bd61',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
  },
  itemContainerReal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    color: '#585858',
    fontWeight: '800',
  },
  day: {
    fontSize: 14,
    color: '#585858',
    fontWeight: '200',
    marginTop: 20,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  fab: {
    backgroundColor: '#E88B00',
    position: 'absolute',
    height: 50,
    width: 50,
    paddingLeft: '27%',
    paddingTop: '25%',
  },
  fabIcon: {
    color: COLORS.DEFAULT_COLOR,
    fontSize: 24,
  },
  itemContainer: {
    backgroundColor: '#fff',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
});
