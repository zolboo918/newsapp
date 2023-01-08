import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Register1 from '../Screens/Register/Register1';
import Register2 from '../Screens/Register/Register2';
import Register3 from '../Screens/Register/Register3';
import AgreementAndQR from '../Screens/AgreementAndQR';
import ForgetPassword from '../Screens/ForgetPassword';
import {useContext} from 'react';
import UserContext from '../Context/userContext';
import BottomTabs from './BottomNavigation';
import AddNews from '../Screens/News/AddNews';
import NewsDetail from '../Screens/News/NewsDetail';
import NameCardSearch from '../Screens/NameCard/NameCardSearch';
import NameCardDetail from '../Screens/NameCard/NameCardDetail';
import AddNameCardManual from '../Screens/NameCard/AddNameCardManual';
import AddNameCardQr from '../Screens/NameCard/AddNameCardQr';
import NameCardEdit from '../Screens/NameCard/NameCardEdit';
import AddCompany from '../Screens/AddCompany';
import FriendRequest from '../Screens/FriendRequest';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {COLORS} from '../constants';
import Register4 from '../Screens/Register/Register4';
import AddEvent from '../Screens/Events/AddEvent';
import EventDetail from '../Screens/Events/EventDetail';
import AddEventUsers from '../Screens/Events/AddEventUsers';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  const {isLoggedIn} = useContext(UserContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.DEFAULT_COLOR,
        paddingBottom: 0,
        marginBottom: StatusBar.currentHeight ? 0 : -20,
      }}>
      <SafeAreaView style={{flex: 1}}>
        <Stack.Navigator initialRouteName="Login">
          {!isLoggedIn ? (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Register1"
                component={Register1}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Register2"
                component={Register2}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Register3"
                component={Register3}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Register4"
                component={Register4}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AgreementAndQR"
                component={AgreementAndQR}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgetPassword"
                component={ForgetPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddCompany"
                component={AddCompany}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="BottomTab"
                component={BottomTabs}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddEvent"
                component={AddEvent}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EventDetail"
                component={EventDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddEventUsers"
                component={AddEventUsers}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddNews"
                component={AddNews}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="NewsDetail"
                component={NewsDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="NameCardSearch"
                component={NameCardSearch}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="NameCardDetail"
                component={NameCardDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="NameCardEdit"
                component={NameCardEdit}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddCompany"
                component={AddCompany}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FriendRequest"
                component={FriendRequest}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddNameCardManual"
                component={AddNameCardManual}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddNameCardQr"
                component={AddNameCardQr}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </SafeAreaView>
    </View>
  );
}

export default StackNavigation;
