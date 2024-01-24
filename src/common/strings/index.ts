// import Localization from 'react-native-localization';
// import STRINGS_ENGLISH from './english';
// // import STRINGS_HINDI from './hindi';
// import STRINGS_SPANISH from './spanish'

// const STRINGS = new Localization({
//  STRINGS_ENGLISH,
//   // STRINGS_HINDI,
//   STRINGS_SPANISH
// });


// export default STRINGS;


import LocalizedStrings from 'react-native-localization';
import STRINGS_ENGLISH from './english/stringsEnglish';
import STRINGS_SPANISH from './spanish/stringsSpanish';

let STRINGS = new LocalizedStrings({
  en: STRINGS_ENGLISH,
  sp: STRINGS_SPANISH,
});

export default STRINGS;
