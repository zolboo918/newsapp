import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect, useState} from 'react';
import StackNavigation from './Navigation/StackNavigation';
import {UserStore} from './Context/userContext';
import {
  Image,
  LogBox,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS} from './constants';
import {CustomAlert} from './utils/CustomAlert';
import AppIntroSlider from 'react-native-app-intro-slider';
import {SlideData} from './data/Data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

const App = () => {
  const [showed, setShowed] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('slideshow').then(res => {
      if (res && res == '1') {
        setShowed(true);
      } else {
        setShowed(false);
      }
    });
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  LogBox.ignoreAllLogs();

  const _renderItem = ({item}: any) => {
    return (
      <View style={styles.slide}>
        <Image
          resizeMode="contain"
          source={item.image}
          style={item.key == 4 || item.key == 5 ? styles.image0 : styles.image}
        />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _onDone = () => {
    setShowed(true);
    AsyncStorage.setItem('slideshow', '1');
  };

  return showed ? (
    <View style={{backgroundColor: COLORS.DEFAULT_COLOR, flex: 1}}>
      <NativeBaseProvider>
        <NavigationContainer>
          <UserStore>
            <StackNavigation />
            <View style={{height: Platform.OS == 'ios' ? 20 : 0}}>
              <StatusBar
                barStyle={'light-content'}
                backgroundColor={COLORS.DEFAULT_COLOR}
              />
            </View>
            <CustomAlert />
          </UserStore>
        </NavigationContainer>
      </NativeBaseProvider>
    </View>
  ) : (
    <AppIntroSlider
      renderItem={_renderItem}
      data={SlideData}
      onDone={_onDone}
      activeDotStyle={styles.activeDotStyle}
      dotStyle={styles.dotStyle}
      showPrevButton
      prevLabel="Өмнөх"
      showNextButton
      // nextLabel="Дараагийх"
      renderNextButton={() => (
        <View style={styles.renderNextButton}>
          <AntDesign name="right" style={{color: COLORS.DEFAULT_COLOR}} />
        </View>
      )}
      renderDoneButton={() => (
        <View style={styles.renderNextButton}>
          <AntDesign name="right" style={{color: COLORS.DEFAULT_COLOR}} />
        </View>
      )}
      doneLabel="Дуусгах"
    />
  );
};

export default App;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: COLORS.DEFAULT_COLOR,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '50%',
    width: '100%',
    marginTop: '40%',
  },
  image0: {
    marginTop: '40%',
    height: '30%',
    width: '50%',
  },
  text: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: '20%',
  },
  dotStyle: {
    height: 10,
    width: 10,
    borderRadius: 20,
    backgroundColor: '#d9d9d9',
    marginTop: '-30%',
  },
  activeDotStyle: {
    height: 10,
    width: 30,
    borderRadius: 20,
    backgroundColor: '#d9d9d9',
    marginTop: '-30%',
  },
  renderNextButton: {
    height: 30,
    width: 30,
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
