import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import StackNavigation from './Navigation/StackNavigation';
import {UserStore} from './Context/userContext';
import {LogBox, StatusBar} from 'react-native';
import {COLORS} from './constants';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <UserStore>
          <StackNavigation />
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={COLORS.DEFAULT_COLOR}
          />
        </UserStore>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
