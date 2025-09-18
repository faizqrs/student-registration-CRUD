import CryptoJS from 'crypto-js';

const BACKEND_SECRET = 'backend_secret_key';

export function encryptData(data: object): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), BACKEND_SECRET).toString();
}

export function decryptData(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, BACKEND_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}
