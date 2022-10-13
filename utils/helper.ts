import {Buffer} from 'buffer';
import {Toast} from 'native-base';
import {Platform} from 'react-native';
import {openCamera, openPicker} from 'react-native-image-crop-picker';
import {CustomAlert} from './CustomAlert';

export function toBase64(input: any) {
  return `${Buffer.from(input, 'utf-8').toString('base64')}`;
}

export const showSuccessMessage = (message?: any) => {
  CustomAlert.show('Амжилттай', message, '', 'checkmark-circle-outline');
};
export const showWarningMessage = (message?: any) => {
  CustomAlert.show('Анхааруулга', message, '', 'information-circle-outline');
};

export const showUnSuccessMessage = (message?: any) => {
  CustomAlert.show('Амжилтгүй', message);
};

export const showDialogMessage = (message: any, handler: any) => {
  CustomAlert.show(message, '', 'dialog', 'ios-help-circle-outline', handler);
};

export function validateEmail(email: any) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const choosePhoto = () => {
  return openPicker({
    mediaType: 'photo',
    cropping: true,
    showCropFrame: true,
    showCropGuidelines: true,
    freeStyleCropEnabled: true,
    cropperToolbarTitle:
      Platform.OS == 'android' ? '16:9 хэмжээг сонгоно уу' : '',
  })
    .then((res: any): any => res)
    .catch(e => {
      Toast.show({title: 'Алдаа гарлаа', description: JSON.stringify(e)});
      return {error: e};
    });
};

export const takePhoto = () => {
  return openCamera({
    mediaType: 'photo',
    cropping: true,
    showCropFrame: true,
    showCropGuidelines: true,
    cropperToolbarTitle: '16:9 хэмжээг сонгоно уу',
  })
    .then((res: any): any => res)
    .catch(e => {
      Toast.show({title: 'Алдаа гарлаа', description: JSON.stringify(e)});
      return {error: e};
    });
};
