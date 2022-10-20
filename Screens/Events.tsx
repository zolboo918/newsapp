import {Fab} from 'native-base';
import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from 'react-native-calendars';
import EmptyData from '../Components/EmptyData/EmptyData';
import {COLORS} from '../constants';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Header from '../Components/Header/Header';
import {getRequest} from '../utils/Service';
import {isEmpty} from 'lodash';

interface State {
  loading: boolean;
  items?: AgendaSchedule;
}

export default class AgendaScreen extends Component<State> {
  state: State = {
    items: undefined,
    loading: false,
  };
  date = new Date();
  today = this.date.toISOString().split('T')[0];

  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Үйл явдлын хуанли"
          rightIcon="logout"
          rightIconPress={this.logOut}
        />
        <Agenda
          testID={'calendars'}
          items={this.state.items}
          loadItemsForMonth={this.loadItems}
          selected={this.today}
          renderItem={this.renderItem}
          renderEmptyDate={() => <EmptyData />}
          // rowHasChanged={this.rowHasChanged}
          // showClosingKnob={true}
          theme={{
            calendarBackground: COLORS.DEFAULT_COLOR,
            agendaKnobColor: COLORS.textColor,
            dayTextColor: COLORS.textColor,
            selectedDayBackgroundColor: '#E88B00',
            monthTextColor: COLORS.textColor,
          }}
          displayLoadingIndicator={this.state.loading}
          // renderDay={(day, item) => <Text>{day ? day.day : 'item'}</Text>}
          // hideExtraDays={false}
          showOnlySelectedDayItems
          // reservationsKeyExtractor={this.reservationsKeyExtractor}
        />
        <Fab
          style={styles.fab}
          renderInPortal={false}
          onPress={this.onPressFab}
          icon={<AntDesignIcon name="plus" style={styles.fabIcon} />}
        />
      </View>
    );
  }
  initData = () => {
    this.setState({loading: true});
    getRequest(`/event/${this.date.toISOString().split('T')[0]}`).then(
      (res: any) => {
        this.setState({loading: false});
        let arr: any = [];
        if (res.success && !isEmpty(res.data)) {
          res.data.forEach((el: any) => {
            arr.push({
              name: el.name,
              height: 100,
              day: el.date,
            });
          });
        }
        this.setState({
          items: arr,
        });
      },
    );
  };
  componentDidMount(): void {}

  onPressFab = () => {};

  logOut = () => {};

  loadItems = (day: DateData) => {
    const items = this.state.items || {};
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: 100,
              day: strTime,
            });
          }
        }
      }
      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 5000);
  };

  renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    return (
      <TouchableOpacity
        testID={'item'}
        style={[styles.item, {height: reservation.height}]}
        onPress={() => Alert.alert(reservation.name)}>
        <Text style={{fontSize: 14, color: COLORS.textColor}}>
          {reservation.name}
        </Text>
      </TouchableOpacity>
    );
  };

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B3036',
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
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
});
