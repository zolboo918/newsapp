import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constants';
import AddNameCard from '../Screens/NameCard/AddNameCard';
import Events from '../Screens/Events/Events';
import NameCards from '../Screens/NameCard/NameCards';
import News from '../Screens/News/News';
import NameCardDetail from '../Screens/NameCard/NameCardDetail';
import Working from '../Screens/Working';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createMaterialBottomTabNavigator();
function BottomTabs() {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  return (
    <Tab.Navigator
      initialRouteName="News"
      activeColor="#E88B00"
      inactiveColor="#fff"
      labeled={false}
      barStyle={[
        styles.barStyle,
        {paddingTop: Platform.OS == 'ios' && statusBarHeight > 20 ? 32 : 0},
      ]}>
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
        name="Events"
        component={Events}
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
  },
  events: {
    transform: [{rotateZ: '-45deg'}],
    fontSize: 24,
    height: 24,
    width: 24,
    marginTop: 0,
    marginLeft: 5,
  },
  icons: {
    marginTop: -2,
    fontSize: 26,
    height: 26,
    width: 26,
  },
  calendatIcon: {
    marginTop: -3,
    fontSize: 27,
    height: 27,
    width: 27,
  },
  addIcon: {
    marginTop: -10,
    alignSelf: 'center',
    fontSize: 45,
    height: 45,
    width: 45,
  },
  userIcon: {
    marginTop: -3,
    alignSelf: 'center',
    fontSize: 30,
    height: 30,
    width: 30,
  },
});
