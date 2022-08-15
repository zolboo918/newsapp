import {Dimensions} from 'react-native';

export const getWidth = () => {
  return Dimensions.get('window').width;
};

export const getHeight = () => {
  return Dimensions.get('window').height;
};

export const setWidth = (number: number) => {
  return (Dimensions.get('window').width * number) / 100;
};

export const setHeight = (number: number) => {
  return (Dimensions.get('window').height * number) / 100;
};
