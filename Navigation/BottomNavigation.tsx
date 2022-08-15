import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constants';
import AddNameCard from '../Screens/NameCard/AddNameCard';
import Events from '../Screens/Events';
import NameCards from '../Screens/NameCard/NameCards';
import News from '../Screens/News/News';
import NameCardDetail from '../Screens/NameCard/NameCardDetail';

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
              size={26}
              style={styles.events}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="calendar-blank-outline"
              color={color}
              style={styles.icons}
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
              style={styles.icons}
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
  },
  events: {
    transform: [{rotateZ: '-45deg'}],
    fontSize: 30,
    height: 30,
    width: 30,
  },
  icons: {
    fontSize: 30,
    height: 30,
    width: 30,
  },
  addIcon: {
    fontSize: 40,
    height: 40,
    width: 40,
  },
});
