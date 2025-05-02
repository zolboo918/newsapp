import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React, {useContext, useEffect} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constants';
import AddNameCard from '../Screens/NameCard/AddNameCard';
import Events from '../Screens/Events/Events';
import NameCards from '../Screens/NameCard/NameCards';
import News from '../Screens/News/News';
import NameCardDetail from '../Screens/NameCard/NameCardDetail';
import Working from '../Screens/Working';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import UserContext from '../Context/userContext';

const Tab = createMaterialBottomTabNavigator();
function BottomTabs() {
  const {newNews, newEvent, getNews, getEvents} = useContext(UserContext);
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  useEffect(() => {
    getNews();
    getEvents();
  }, []);

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
            <View>
              {newNews ? <View style={styles.dot} /> : <></>}
              <MaterialCommunityIcons
                name="bullhorn-variant-outline"
                color={color}
                style={styles.events}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarIcon: ({color}) => (
            <View>
              {newEvent ? <View style={styles.dot} /> : <></>}
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                color={color}
                style={styles.calendatIcon}
              />
            </View>
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
  dot: {
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: '#E88B00',
    alignSelf: 'center',
    marginTop: -15,
    marginBottom: 10,
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
