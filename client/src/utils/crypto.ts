import CryptoJS from 'crypto-js';

const FRONTEND_SECRET = 'backend_secret_key'; // Must match backend secret

export function encryptData(data: object): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), FRONTEND_SECRET).toString();
}

export function decryptData(ciphertext: string): any {
  const bytes = CryptoJS.AES.decrypt(ciphertext, FRONTEND_SECRET);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString);
}
