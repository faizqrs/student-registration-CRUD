import CryptoJS from 'crypto-js';
const BACKEND_SECRET = 'backend_secret_key';
export function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), BACKEND_SECRET).toString();
}
export function decryptData(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, BACKEND_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
}
//# sourceMappingURL=crypto.js.map