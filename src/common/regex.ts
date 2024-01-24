/* eslint-disable no-useless-escape */
const REGEX = {
  // email: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
  email: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/),
  // contactNumber: new RegExp('^[0-9]$'),
  contactNumber: new RegExp(/^(\+\d{1,})?(\d{1,})[0-9 ]{9,14}$/), //('^[+]{1}[0-9-\\s]{13}$'), //allow white space,+,-,[0-9]
  password: new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
  ),
  passwordStrong: new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
  ),
  passwordMedium: new RegExp(
    '^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9]))|((?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9])))(?=.{7,})',
  ),
  passwordSoSo: new RegExp(
    '^(((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{5,})',
  ),
  passwordWeek: new RegExp('^(((?=.*[a-z]))|((?=.*[A-Z])))(?=.{3,})'),
  isNAN: new RegExp(/[a-zA-Z]/g),
  isNonEmpty: new RegExp(/\S/),
  // username: 'A-Za-z',
  // username: new RegExp('^[A-Za-z]+$'),
  username: new RegExp('^[a-zA-Z_ ]*$'),
  cvvRegex: new RegExp('^[0-9]{3}$'),
  creditCardNumber: new RegExp('^4[0-9]{12}(?:[0-9]{3})?$ '),
};

export default REGEX;
