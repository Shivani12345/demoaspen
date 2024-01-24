import {Linking, Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import deviceInfoModule from 'react-native-device-info';

import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';
import STRINGS from 'common/strings';
import REGEX from 'common/regex';
import SIZES from './sizes';
import responsivePixels from './responsivePixels';
const {
  contactInfo,
  secondContactInfo,
  btnClear,
  btnNext,
  emptyFieldError,
  validateErrorMessage,
  validErrorMessage,
  btnClose,
  btnOk,
  dateOfBirthError,
  emptyError,
  requiredError,
  addCreditCard,
} = STRINGS;
const {isTab} = SIZES;
import CryptoJS from 'react-native-crypto-js';
import moment from 'moment';
var forge = require('node-forge');
import base64 from 'react-native-base64'
/**
 * * For Add element in Array
 * @param arrayList [{a:1},{a:2},{a:3},{a:4},{a:5}]
 * @param data {a:6}
 * @param positionLast true
 * @returns [{a:1},{a:2},{a:3},{a:4},{a:5},{a:6}]
 */
export function addElementToArray(
  arrayList: Array<any>,
  data: object,
  positionLast: boolean = true,
): Array<any> {
  return positionLast ? [...arrayList, data] : [data, ...arrayList];
}

/**
 * * For Add array in Array
 * @param arrayMain [1,2,3,4,5]
 * @param arraySub [6,7]
 * @param positionLast true
 * @returns [1,2,3,4,5,6,7]
 */
export function addArrayToArray(
  arrayMain: Array<any>,
  arraySub: Array<any>,
  positionLast: boolean = true,
): Array<any> {
  return positionLast
    ? [...arrayMain, ...arraySub]
    : [...arraySub, ...arrayMain];
}

/**
 * * For get the Number in the "K" and "M" format
 * @Input = 100 => @Output = 100
 * @Input = 1500 => @Output = 1.5K
 * @Input = 1500000 => @Output = 1.5M
 */
export function numberConversation(
  numberValue: number = 0,
  floatCount: number = 1,
): string {
  const count_M = +(numberValue / 1000000).toFixed(floatCount);
  const count_K = +(numberValue / 1000).toFixed(floatCount);
  return count_M >= 1
    ? `${count_M}M`
    : count_K >= 1
      ? `${count_K}K`
      : `${numberValue}`;
}

/**
 * * For Fix the array gride blanc box with empty object
 * @param arrayData = [{id:1},{id:2},{id:2}]
 * @param grideCount = 2
 * @returns = [{id:1},{id:2},{id:2},{empty: true}]
 */
export function fillGride(
  arrayData: Array<any>,
  grideCount: number = 0,
): Array<any> {
  const numberOfFullRows = Math.floor(arrayData.length / grideCount);
  let numberOfElementsLastRow =
    arrayData.length - numberOfFullRows * grideCount;
  let finalArray = [...arrayData];
  while (
    numberOfElementsLastRow !== grideCount &&
    numberOfElementsLastRow !== 0
  ) {
    finalArray = [...finalArray, {empty: true}];
    numberOfElementsLastRow++;
  }
  return finalArray;
}

/**
 * * For find the percentage value
 * @param amountValue 100
 * @param Percent 10
 * @returns 10
 */
export function findPercentage(
  amountValue: number = 0,
  Percent: number = 0,
): number {
  return (amountValue * Percent) / 100;
}

/**
 * * validate the value is not a number
 * @param value EX.1=>demo2 || EX.2=>demo
 * @returns     Ex.1=>false || EX.2=>true
 */
export function isNAN(value: string = ''): boolean {
  return REGEX.isNAN.test(value);
}

/**
 * * validate email format
 * @param email Demo1@dome.com
 * @returns true
 */
export function validateEmail(email: string = ''): boolean {
  return REGEX.email.test(email);
}

/**
 * * validate password format
 * @param password Demo@123
 * @returns true
 */
export function validatePassword(password: string = ''): boolean {
  return REGEX.password.test(password);
}

/**
 * * validate password strength
 * @param N 1
 * @param passValue Demo1
 * @returns '60%'
 * N = 1 to get percentage
 * N = 2 to get color
 * N = 3 to get text
 */
export function validatePasswordStrength(
  N: number = 1,
  passValue: string = '',
): string {
  const {passwordStrong, passwordMedium, passwordSoSo, passwordWeek} = REGEX;

  if (passwordStrong.test(passValue)) {
    return N === 1 ? '100%' : N === 2 ? COLORS.green : STRINGS.textStrong;
  } else if (passwordMedium.test(passValue)) {
    return N === 1 ? '80%' : N === 2 ? COLORS.yellow : STRINGS.textMedium;
  } else if (passwordSoSo.test(passValue)) {
    return N === 1 ? '60%' : N === 2 ? COLORS.orange : STRINGS.textSoSo;
  } else if (passwordWeek.test(passValue)) {
    return N === 1 ? '40%' : N === 2 ? COLORS.orange1 : STRINGS.textWeak;
  } else {
    return N === 1 ? '20%' : N === 2 ? COLORS.red : STRINGS.textVeryWeek;
  }
}

/**
 * * For change the string format
 * @param stringValue 'test Key'
 * @param isFirstCap true
 * @param replace true
 * @param replaceWith ' '
 * @param replaceTo '-'
 * @returns 'Test-key'
 */
export function stringFormat(
  stringValue: string = '',
  isFirstCap: boolean = true,
  replace: boolean = false,
  replaceWith: string = ' ',
  replaceTo: string = '_',
): string {
  let mainString = stringValue?.trim();
  if (isFirstCap) {
    mainString =
      mainString.charAt(0).toUpperCase() + mainString.slice(1).toLowerCase();
  }
  if (replace) {
    mainString = mainString.split(replaceWith).join(replaceTo);
  }
  return mainString;
}

export function isNullValue(value: string) {
  console.log('valll', value);

  if (
    value === 'null' ||
    value === 'undefined' ||
    value === undefined ||
    value === 'Invalid date' ||
    value === null
  )
    return '';
  else return value;
}
/**
 * * validate if string is Empty
 * @param value 'test string'
 * @param isTrim true
 * @param isDash false
 * @param uppercase false
 * @returns 'test string'
 */
export function validateString(
  value: string = '',
  isTrim: boolean = true,
  isDash: boolean = false,
  uppercase: boolean = false,
) {
  let string = value ?? ''; // it(??) will check value !== undefined && value !== null
  string = value !== 'null' && value !== '' && value !== '' ? value : '';
  if (string === '') {
    string = isDash ? '-' : '';
  } else {
    if (isTrim) {
      string = typeof string === 'string' ? string?.trim() : string;
    }
    if (uppercase) {
      string = typeof string === 'string' ? string?.toUpperCase() : string;
    }
  }
  return string;
}

/**
 * * Pass the character which need to allow in the regular expression
 * @param value 'A-Za-z'
 * @param onlyAllow true
 * @returns /[^A-Za-z]/g
 */
export function generateRegExp(value: string = '', onlyAllow: boolean = true) {
  return new RegExp('[' + (onlyAllow ? '^' : '') + value + ']', 'g');
}

/**
 * * Check for internet connectivity
 */
export async function isConnected() {
  const state = await NetInfo.fetch();
  return state.isConnected;
}

/**
 * * Check for IOS Platform
 */
export function isIOS() {
  return Platform.OS === 'ios';
}

export const currentScreen = (Screen: any) => {
  return console.log('Current-', Screen);
};

export const numberFormat = (numValue: any) => {
  let number2 = parseFloat(numValue);
  return number2.toLocaleString('en-US', {maximumFractionDigits: 2});
};
// export const encryptData = plaintext => {
//   const buffer = Buffer.from(plaintext, 'utf8');
//   const encryptedBuffer = crypto.publicEncrypt(CONSTANTS.PublicKey, buffer);
//   const encryptedBase64 = encryptedBuffer.toString('base64');
//   return encryptedBase64;
// };

// export const decryptData = encryptedBase64 => {
//   const encryptedBuffer = Buffer.from(encryptedBase64, 'base64');
//   const decryptedBuffer = crypto.privateDecrypt(
//     CONSTANTS.PrivateKey,
//     encryptedBuffer,
//   );
//   const decryptedData = decryptedBuffer.toString('utf8');
//   return decryptedData;
// };

export const encryptData = plaintext => {
  
  // const encrypted = CryptoJS.AES.encrypt(
  //   plaintext,
  //   CONSTANTS.PublicKey,
  // ).toString();
  // return encrypted;
  
   // Assuming PUBLIC_BASE64 is defined elsewhere in your code
   const publicBase64 = CONSTANTS.PublicKey;
   const publicPem = base64.decode(publicBase64); // Decode base64

   // Create a forge public key
   const publicKey = forge.pki.publicKeyFromPem(publicPem);

   // Encrypt the data using the public key
   const ciphertext = publicKey.encrypt(plaintext, 'RSA-OAEP');

   // Convert the ciphertext to a base64-encoded string
   const ciphertextBase64 = forge.util.encode64(ciphertext);

   return ciphertextBase64;
};

export const decryptData = encryptedBase64 => {
  const decrypted = CryptoJS.AES.decrypt(
    encryptedBase64,
    CONSTANTS.PublicKey,
  ).toString(CryptoJS.enc.Utf8);
  return decrypted;
};
export const openPhone = (number: number) => {
  console.log('number--->', number);
  Linking.openURL(`tel:${number}`);
};
/**
 * * padding
 */
export const PaddingTopForFooter = () => {
  if (isTab) {
    return responsivePixels.size10;
  } else if (deviceInfoModule.hasNotch()) {
    return responsivePixels.size15;
  } else {
    return responsivePixels.size20;
  }
};

/**
 * * Format the Phone Number in (3) 3-4 format.
 */
export const formatPhoneNumber = (phoneNumber: any) => {
  console.log('phoneNumber', phoneNumber);

  // const cleanedNumber = phoneNumber.replace(/\D/g, '');
  const cleanedNumber = phoneNumber.toString().replace(/\D/g, ''); // Remove non-digit characters
  const areaCode = cleanedNumber.substring(0, 3);
  const firstPart = cleanedNumber.substring(3, 6);
  const secondPart = cleanedNumber.substring(6, 10);

  return `(${areaCode}) ${firstPart}-${secondPart}`;
};

export function formatNumber(number: any) {
  console.log('number', number);

  return number.replace(/^(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

export const getImageType = (uri: any) => {
  const parts = uri.split('/');
  const fileName = parts[parts.length - 1];

  // Extract the file extension (type) from the file name
  const fileExtension = fileName.split('.').pop();

  // console.log('File Name:', fileName);
  // console.log('File Extension:', fileExtension);

  return {name: fileName, type: 'image/' + fileExtension};
};

export function changeDateFormat(inputDate: any) {
  console.log('changeDateFormat', inputDate);
  // Parse the input date string into a JavaScript Date object
  const date = new Date(inputDate);
  console.log('datedate', date);
  // Extract the day, month, and year components
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  // Format the date in DD-MM-YYYY
  // const formattedDate = `${day}-${month}-${year}`;
  const formattedDate = `${month}-${day}-${year}`;
  console.log('formattedDateFun', formattedDate);
  return formattedDate;
}

export function sendDateFormat(inputDate: any) {
  const parts = inputDate.split('-');

  const formattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`;

  console.log(formattedDate);
  return formattedDate;
}
export function todayDateSendFormat() {
  var date = String(new Date().getDate()).padStart(2, '0');
  var month = String(new Date().getMonth() + 1).padStart(2, '0');;
  var year = new Date().getFullYear();

  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate);
  return formattedDate;
}

export function ConvertDatewithFormat(
  date: any,
  toformat: any,
  lastForamt: any,
) {
  let momentObj = moment(date, toformat);
  let showDate = moment(momentObj).format(lastForamt);
  console.log('finalll', showDate);

  return showDate;
}

export const validateFnameForm = (value:any) =>{
  return checkValidate(
    REGEX.username,
    value,
    contactInfo.firstName,
  )
}
export const validateLnameForm = (value:any) =>{
  return checkValidate(
    REGEX.username,
    value,
    contactInfo.lastName,
  )
}
export const validateEmailForm = (value:any) =>{
  return checkValidate(
    REGEX.email,
    value,
    contactInfo.emailAddress,
  )
}
export const validateContactForm = (value:any) =>{
  return checkValidate(
    REGEX.contactNumber,
    value,
    contactInfo.contactNumber,
  )
}
export const validateDOBForm = (value:any) =>{
  return checkValidate(
    REGEX.isNonEmpty,
    value,
    contactInfo.dateOfBirth,
  )
}
export const validateLicenseForm = (value:any) =>{
  return checkValidate(
    REGEX.isNonEmpty,
    value,
    contactInfo.licenseNumber,
  )
}
export const validateBillingAddForm = (value:any) =>{
  return checkValidate(
    REGEX.isNonEmpty,
    value,
    contactInfo.billingAddress,
  )
}
export const validateRelationForm = (value:any) =>{
  return checkValidate(
    REGEX.isNonEmpty,
    value,
    secondContactInfo.relationship,
  )
}

export const checkValidate = (regex: any, checkData: any, fieldName: any) => {
  console.log(
    'regex',
    regex,
    'checkData',
    checkData,
    fieldName,
    STRINGS.contactInfo.contactNumber,
  );

  const regexValidate = regex.test(checkData);
  // if (!checkData) return emptyError + fieldName.toLowerCase();
  if (!checkData) {
    return fieldName + requiredError;
  }
  if (fieldName !== addCreditCard.addCardNumberInputLabel) {
    if (!regexValidate)
      if (fieldName == STRINGS.contactInfo.contactNumber) {
        // console.log('hjuiuhui');
        return 'Phone Number must be at least 10 and at most 14 numbers';
      } else return validErrorMessage + fieldName.toLowerCase();
  }
  return '';
};
/**
 * * De-format the Phone Number to Dail in phone
 */
export const deformatPhoneNumber = (phoneNumber: any) => {
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters

  return formattedPhoneNumber;
};

/**
 * * Open with phone for calling
 */
export const openWithPhone = (number: any) => {
  Linking.openURL(`tel:${number.replace(/\D/g, '')}`);
};

/**
 * * Open with email for mail
 */
export const openWithEmail = (email: string) => {
  return Linking.openURL('mailto:' + email);
};
export const getStateFromAddress = (address: any, type: any) => {
  
  let addressString = address?.split(",").pop();
  addressString = addressString.trim();
  console.log('LOCAL ADDRESS',addressString)
  // const regex = /,\/([A-Z]{2})\s*(\d+)/; ///,\s*([A-Z]{2})\s*(\d{5}(?:-\d{4})?)/;
  const match = addressString.slice(0,2);
  console.log('matchmatch', match);

  // Extract state and postal code from the match
  // const state = match ? match[1] : '';
  // const postalCode = match ? match[2] : '';
  // console.log('statestate', state);
  // console.log('postalCodepostalCode', postalCode);

  // console.log('matchmatch', match);

  // const stringData = match ? match[type] : 'N/A';
  return match;
};
export function API_Log(URL: any, headers: any, Body: any) {
  console.log(`${URL} : ==`);
  console.log('headers', headers);
  console.log('Body:=>', Body);
  console.log('----------------------');
}

export const ConvertEmptyString = (data: any) => {
  for (const key in data) {
    if (data[key] === 'null' || data[key] === null) {
      data[key] = '';
    }
  }
  return data;
};

export const formatDateToString = (data: any) => {
  console.log('dataformat1111', data);

  const originalDateStr = data;
  const parts: any = originalDateStr.split('-');
  const year = parts[2];
  // const month = parts[1] - 1; // Adjust the month by subtracting 1 because months are 0-based.
  // const day = parts[0];

  const day = parts[1];
  const month = parts[0] - 1;

  const dateObject = new Date(year, month, day);

  console.log('dateObject', dateObject);

  return dateObject;
};

export const maxDate = () => {
  const maxDate = new Date(); // Current date
  const maximumDate = maxDate.setFullYear(maxDate.getFullYear() - 10);

  const date = new Date(maximumDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  console.log('formattedDate', formattedDate);

  return maximumDate;
};

/**
 *
 * @param key CONSTANT.EMAIL
 * @param val developer@yopmail.com
 * @returns string
 */
export function validateForm(key: string = '', val: string = '') {
  const {validation, changePassword} = STRINGS;
  switch (key) {
    case CONSTANTS.FIRST_NAME:
      return val.length === 0 ? validation.emptyFirstName : '';
    case CONSTANTS.LAST_NAME:
      return val.length === 0 ? validation.emptyLastName : '';
    case CONSTANTS.EMAIL:
      return val.length === 0
        ? validation.emptyEmail
        : !validateEmail(val)
          ? validation.validEmail
          : '';
    case CONSTANTS.PASSWORD:
      return val.length === 0
        ? validation.emptyPassword
        : !validatePassword(val)
          ? validation.validPassword
          : '';
    case CONSTANTS.OLD_PASSWORD:
      return val.length === 0
        ? changePassword.emptyOldPassword
        : !validatePassword(val)
          ? changePassword.validOldPassword
          : '';
    case CONSTANTS.NEW_PASSWORD:
      return val.length === 0
        ? changePassword.emptyNewPassword
        : !validatePassword(val)
          ? changePassword.validNewPassword
          : '';
    case CONSTANTS.CONFIRM_PASSWORD:
      return val.length === 0
        ? changePassword.emptyConfirmPassword
        : !validatePassword(val)
          ? changePassword.validConfirmPassword
          : '';
    default:
      return '';
  }
}

/**
 *
 * @param array [true, true]
 * @returns true
 */
export function validationLengthCheck(array: Array<any> = []) {
  return array?.filter(obj => obj !== '')?.length === 0;
}
