import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../Components/Header/Header';
import UserContext from '../Context/userContext';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import {Theme} from 'react-native-calendars/src/types';
import {COLORS} from '../constants';

LocaleConfig.locales['mn'] = {
  monthNames: [
    '1-р сар',
    '2-р сар',
    '3-р сар',
    '4-р сар',
    '5-р сар',
    '6-р сар',
    '7-р сар',
    '8-р сар',
    '9-р сар',
    '10-р сар',
    '11-р сар',
    '12-р сар',
  ],
  monthNamesShort: [
    '1-р сар',
    '2-р сар',
    '3-р сар',
    '4-р сар',
    '5-р сар',
    '6-р сар',
    '7-р сар',
    '8-р сар',
    '9-р сар',
    '10-р сар',
    '11-р сар',
    '12-р сар',
  ],
  dayNames: ['Да.', 'Мя.', 'Лх.', 'Пү.', 'Ба.', 'Бя.', 'Ня.'],
  dayNamesShort: ['Да.', 'Мя.', 'Лх.', 'Пү.', 'Ба.', 'Бя.', 'Ня.'],
  today: 'Өнөөдөр',
};
LocaleConfig.defaultLocale = 'mn';
const theme: Theme = {
  selectedDotColor: '#ffffff',
  arrowColor: COLORS.DEFAULT_COLOR,
  todayTextColor: COLORS.DEFAULT_COLOR,
  textDayFontWeight: '300',
  textDayFontSize: 14,
  textMonthFontSize: 14,
  textDayHeaderFontSize: 14,
};

const Events = () => {
  const {userInfo, logOut} = useContext<any>(UserContext);
  return (
    <View style={styles.container}>
      <Header
        title="Үйл явдлын хуанли"
        rightIcon="logout"
        rightIconPress={logOut}
      />
      <View>
        <Calendar
          current={'2022-10-24'}
          onDayPress={() => {}}
          markedDates={{
            ['2022-10-24']: {
              selected: true,
              marked: true,
              selectedColor: COLORS.DEFAULT_COLOR,
              dotColor: '#fff',
            },
          }}
          theme={theme}
          enableSwipeMonths={true}
        />
      </View>
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B3036',
    flex: 1,
  },
});
