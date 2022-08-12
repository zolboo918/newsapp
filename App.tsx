import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import StackNavigation from './Navigation/StackNavigation';
import {UserStore} from './Context/userContext';

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <UserStore>
          <StackNavigation />
        </UserStore>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
