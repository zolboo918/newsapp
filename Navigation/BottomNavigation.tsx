import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constants';
import AddNameCard from '../Screens/NameCard/AddNameCard';
import Events from '../Screens/Events';
import NameCards from '../Screens/NameCard/NameCards';
import News from '../Screens/News/News';
import NameCardDetail from '../Screens/NameCard/NameCardDetail';
import Working from '../Screens/Working';

const Tab = createMaterialBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="News"
      activeColor="#E88B00"
      inactiveColor="#fff"
      labeled={false}
      barStyle={styles.barStyle}>
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="bullhorn-variant-outline"
              color={color}
              style={styles.events}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Working"
        component={Working}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="calendar-blank-outline"
              color={color}
              style={styles.calendatIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddNameCard"
        component={AddNameCard}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="plus-circle-outline"
              color={color}
              style={styles.addIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NameCards"
        component={NameCards}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="share-variant-outline"
              color={color}
              style={styles.icons}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={NameCardDetail}
        initialParams={{id: 1}}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              style={styles.userIcon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabs;

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: COLORS.DEFAULT_COLOR,
    height: 80,
    justifyContent: 'center',
    paddingTop: Platform.OS == 'ios' ? 32 : 0,
  },
  events: {
    transform: [{rotateZ: '-45deg'}],
    fontSize: 29,
    height: 30,
    width: 30,
    marginTop: 0,
    marginLeft: 5,
  },
  icons: {
    marginTop: -2,
    fontSize: 32,
    height: 32,
    width: 32,
  },
  calendatIcon: {
    marginTop: -3,
    fontSize: 33,
    height: 33,
    width: 33,
  },
  addIcon: {
    marginTop: -10,
    alignSelf: 'center',
    fontSize: 50,
    height: 50,
    width: 50,
  },
  userIcon: {
    marginTop: -2,
    alignSelf: 'center',
    fontSize: 36,
    height: 36,
    width: 36,
  },
});
