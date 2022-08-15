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

const Stack = createNativeStackNavigator();

function StackNavigation() {
  const {isLoggedIn} = useContext(UserContext);
  return (
    <Stack.Navigator>
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
            name="AgreementAndQR"
            component={AgreementAndQR}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
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
  );
}

export default StackNavigation;
