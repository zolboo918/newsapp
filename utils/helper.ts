import {Buffer} from 'buffer';

export function toBase64(input: any) {
  return `${Buffer.from(input, 'utf-8').toString('base64')}`;
}
