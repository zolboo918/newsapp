import {Buffer} from 'buffer';
import {CustomAlert} from './CustomAlert';

export function toBase64(input: any) {
  return `${Buffer.from(input, 'utf-8').toString('base64')}`;
}

export const showSuccessMessage = (message?: any) => {
  CustomAlert.show('Амжилттай', message, '', 'checkmark-circle-outline');
};

export const showUnSuccessMessage = (message?: any) => {
  CustomAlert.show('Амжилтгүй', message);
};
