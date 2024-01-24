import React from 'react';
import COLORS from 'common/colors';
import common from 'common/common.styles';
import {Text} from 'react-native';
import responsivePixels from 'utils/responsivePixels';

export default {
  
  rentNow: {
    btnRentNow: 'अभी किराए पर लें',
  },
  chooseLocation: {
    chooseLocationTxt: 'स्थान का चयन',
  },
  insurancePlan: {
    insurancePlan: 'बीमा योजना',
    screenHeader: 'आप कौन सा बीमा चाहते हैं?',
    plansHeader: 'आपको क्या मिलेगा',
    policyTerms: (
      <Text>
        {'नावें, कारें और ट्रेलर हैं '}
        <Text
          style={{
            color: COLORS.denim,
            ...common.font_19_26,
            fontWeight: '500',
            letterSpacing: responsivePixels.size0_1,
          }}>
          {'NOT covered '}
        </Text>
        {' बीमा के अंतर्गत. यह पुष्टि करने के लिए यहां क्लिक करें कि आप इसे समझते हैं। '}
      </Text>
    ),
    understood: 'मै समझा',
  },

  contactInfo: {
    screenHeader: 'संपर्क सूचना',
    yourContactInfo: 'आपकी संपर्क जानकारी',
    phoneNumber: 'फ़ोन नंबर',
    typePhoneNumber: 'अपना फ़ोन नंबर टाइप करें',
    alternatePhoneNumber: 'वैकल्पिक फ़ोन नंबर',
    typeAlternatePhoneNumber: 'अपना वैकल्पिक फ़ोन नंबर टाइप करें',
    emailAddress: 'मेल पता',
    typeEmailAddress: 'अपना ईमेल पता टाइप करें',
  },
  secondContactInfo: {
    screenHeader: 'Second Contact Info',
    secondContactInfo:
      'We need a second point of contact in case we can not get ahold of you',
    secondContactName: 'Second Contact Name',
    typeSecondContactName: 'Type Second Contact Name',
    relationship: 'Relationship',
    phoneNumber: 'Phone Number',
    typePhoneNumber: 'Type Your Phone Number',
    emailAddress: 'Email Address',
    typeEmailAddress: 'Type Your Email Address',
  },
  contactDetails: {
    screenHeader: 'Contact Details',
    contactDetails:
      'Copy Does everything look correct? If NOT please make changes',
    renterNameLabel: 'Renter Name',
    renterAddressLabel: 'Renter Address',
    renterPhoneLabel: 'Renter Phone',
    renterEmailLabel: 'Renter Email',
    renterBillingAddressLabel: 'Renter Billing Address',
    renterNameValue: 'Jacob Jones',
    renterAddressValue: '2715 Ash Dr. San Jose, South Dakota 83475',
    renterPhoneValue: '8085550111',
    renterEmailValue: 'tim.jennings@example.com',
    renterBillingAddressValue: '1901 Thornridge Cir. Shiloh, Hawaii 81063',

    secondContactNameLabel: 'Second Contact Name',
    secondContactPhoneLabel: 'Second Contact Number',
    secondContactEmailLabel: 'Second Contact Email',
    secondContactInsuranceLabel: 'Insurance You Want',
    sizeTypeInputLabel: 'Size and Type of Unit',
    secondContactNameValue: 'Annette Black',
    secondContactPhoneValue: '4055550128',
    secondContactEmailValue: 'willie.jennings@example.com',
    secondContactInsuranceValue: '$10,000 of coverages ($10.00 a month)',
    sizeTypeValue: '10’X40,',
  },
  editRenterContactDetail: {
    editRenterContactDetailHeader:
      'Please Edit Below Field with Correct Details',
    editRenterContactNameInputLabel: 'Renter Name',
    editRenterContactAddressInputLabel: 'Renter Address',
    editRenterContactPhoneInputLabel: 'Renter Phone',
    editRenterContactEmailInputLabel: 'Renter Email',
    editRenterContactBillingAddressInputLabel: 'Renter Billing Address',

    editTypeRenterContactNameInputLabel: 'Type Your Name',
    editTypeRenterContactAddressInputLabel: 'Type Your Address',
    editTypeRenterContactPhoneInputLabel: 'Type Your Phone Number',
    editTypeRenterContactEmailInputLabel: 'Type Your Email Address',
    editTypeRenterContactBillingAddressInputLabel: 'Type Your Billing Address',
  },
  editSecondContactDetail: {
    editSecondContactDetailHeader:
      'Please Edit Below Field with Correct Details',
    editSecondContactNameInputLabel: 'Second Contact Name',
    editSecondContactPhoneInputLabel: 'Second Contact Number',
    editSecondContactEmailInputLabel: 'Second Contact Email',
    editSecondContactInsuranceInputLabel: 'Insurance You Want',
    editSecondSizeTypeInputLabel: 'Size and Type of Unit',
    editTypeSecondContactNameInputLabel: 'Type Second Contact Name',
    editTypeSecondContactPhoneInputLabel: 'Type Your Phone Number',
    editTypeSecondContactEmailInputLabel: 'Type Your Email Address',
    editTypeSecondContactInsuranceInputLabel: 'Type Insurance You Want',
    editTypeSecondSizeTypeInputLabel: 'Size and Type of Unit',
  },
  storageSpaceSelection: {
    chooseYourSize: 'अपना आकार चुनें',
    howToUse: 'How to Use',
    howToUseDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    understoodButtonTitle: 'Ok, I Understood',
  },
  scanLicense: {
    scanLicense: 'लाइसेंस स्कैन करें',
    screenHeader: 'अपने ड्राइवर लाइसेंस को कैमरे से स्कैन करें',
    scanLicenseDefaultText: 'आपकी स्कैन कॉपी यहां दिखाई देगी',
  },
  scanCreditCards: {
    scanCreditCard: 'क्रेडिट कार्ड स्कैन करें',
    scanCreditCardHeader: 'अपने क्रेडिट कार्ड को कैमरे से स्कैन करें',
    scanCreditCardDefaultText: 'आपकी स्कैन कॉपी यहां दिखाई देगी',
    scannerWarning:
      'सभी किराये का भुगतान हर महीने आपके क्रेडिट/डेबिट कार्ड से स्वचालित रूप से लिया जाएगा',
    addManually: 'मैन्युअल रूप से जोड़ें',
  },
  signAgreements: {
    signAgreement: 'समझौते पर हस्ताक्षर करें',
    signInsuranceAgreement: 'बीमा अनुबंध पर हस्ताक्षर करें',
    signAgreementContent1:
      'लोरेम इप्सम डोलर सिट अमेट, कंसेक्टेचर एडिपिसिंग एलीट, सेड डू ईयसमॉड टेम्पोर इंसिडिडंट यूट लेबर। लोरेम इप्सम डोलर सिट अमेट, कंसेक्टेचर एडिपिसिंग एलीट, सेड डू ईयसमॉड टेम्पोर इंसिडिडंट यूट लेबर। लोरेम इप्सम डोलर सिट अमेट, कंसेक्टेचर एडिपिसिंग एलीट, सेड डू ईयसमॉड टेम्पोर इंसिडिडंट यूट लेबर। लोरेम इप्सम डोलर सिट अमेट, कंसेक्टेचर एडिपिसिंग एलीट, सेड डू ईयसमॉड टेम्पोर इंसिडिडंट यूट लेबर।',
    signAgreementCondition:
      'लोरेम इप्सम डोलर सिट अमेट, कंसेक्टेचर एडिपिसिंग एलीट, सेड डू ईयसमॉड टेम्पोर इंसिडिडंट यूट लेबर। लोरेम इप्सम डोलर सिट अमेट, कंसेक्टेचर एडिपिसिंग एलीट, सेड डू ईयसमॉड टेम्पोर इंसिडिडंट यूट लेबर।',
    signContractAgreement: 'अनुबंध पर हस्ताक्षर करें',
    addSignature:'हस्ताक्षर जोड़ें'
  },
  payment: {
    paymentSuccessful: 'भुगतान सफल',
    paymentSuccessfulContent:
      'आप अंदर जाने के लिए तैयार हैं। आपको एक रसीद ईमेल कर दी गई है',
    paymentUnitNumber: 'आपका यूनिट नंबर',
    paymentUnitContent: 'आपकी इकाई में एक मानार्थ लॉक होगा',
    paymentGateCode: 'आपका गेट कोड',
    contactInfo: 'प्रश्नों के लिए संपर्क जानकारी',
    callOn: 'अपील करना',
    writeOn: 'पर लिखना',

    number: 9181112233,
    unitNumber: 305,
    gateCode: 1234,
  },

  summaryofCharge: {
    summaryofCharges: 'शुल्कों का सारांश',
    unitDetails: 'इकाई विवरण',
    rentalInformation: 'किराये की जानकारी',
    firstMonthRent: 'पहले महीने का किराया',
    firstRentProrated: 'प्रथम किराया आनुपातिक',
    administrationFee: 'प्रशासन शुल्क',
    reservationFee: 'आरक्षण शुल्क',
    protectionPlan: 'सुरक्षा योजना - $2,000.00',
    applyPromoCode: 'प्रोमो कोड लागू करें',
    unitVS: 'Unit VS 107',
    unitValue: '10’x40’x13 Unit',
    $145: '$145/month',
    $43: '$43.50',
    $25: '$25.00',
    $145_0: '$145.00',
    date: '(10/05/23 - 31/05/23)',
    $82: '$82.10',
    $0: '$0.00',
  },
  addCreditCard: {
    screenHeader: 'Add Credit Card',
    addCardDetail: 'Add Details to Add Your Card',
    addCardNumberInputLabel: 'Enter Card Number',
    addCardInputPlaceholder: 'Please Enter',
    addCardExipryInputLabel: 'Expiry Date',
    addCardCVVInputLabel: 'Enter CVV',
    addCardCardHolderNameLabel: 'Cardholder Name',
  },
  signUp: {
    header: 'पंजीकरण फॉर्म',
    firstName: 'पहला नाम',
    lastName: 'उपनाम',
    email: 'ईमेल',
    password: 'पासवर्ड',
    btnSignUp: 'साइन अप करें',
  },
  login: {
    header: 'लॉगिन फॉर्म',
    email: 'ईमेल',
    password: 'पासवर्ड',
    forgotPassword: 'पासवर्ड भूल गए ?',
    btnSignIn: 'साइन इन करें',
  },
  forgotPassword: {
    header: 'पासवर्ड भूल गए',
    email: 'ईमेल',
  },
  changePassword: {
    header: 'पासवर्ड बदलें',
    oldPassword: 'पुराना पासवर्ड',
    newPassword: 'नया पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि कीजिये',
    emptyOldPassword: 'कृपया पुराना पासवर्ड दर्ज करें',
    emptyNewPassword: 'कृपया नया पासवर्ड दर्ज करें',
    emptyConfirmPassword: 'कृपया पुष्टि पासवर्ड दर्ज करें',
    validOldPassword: 'कृपया वैध पुराना पासवर्ड दर्ज करें',
    validNewPassword: 'कृपया वैध नया पासवर्ड दर्ज करें',
    validConfirmPassword: 'कृपया वैध पुष्टिकरण पासवर्ड दर्ज करें',
  },
  validation: {
    emptyFirstName: 'कृपया प्रथम नाम दर्ज करें',
    emptyLastName: 'कृपया अंतिम नाम दर्ज करें',
    emptyEmail: 'कृपया उपयोगकर्ता नाम दर्ज करें',
    emptyPassword: 'कृपया पासवर्ड दर्ज करें ',
    validEmail: 'कृपया वैध ईमेल दर्ज़ करें',
    validPassword: 'कृपया वैध पासवर्ड दर्ज करें',
  },
  hello: 'नमस्ते',

  english: 'अंग्रेज़ी',
  hindi: 'हिंदी',
  spanish:'Spanish',
  theme: 'थीम',

  textStrong: 'मज़बूत',
  textMedium: 'मध्यम',
  textSoSo: 'सो-सो',
  textWeak: 'कमज़ोर',
  textVeryWeek: 'बहुत कमजोर',
  textNoData: 'कोई रिकार्ड उपलब्ध नहीं है',
  select: 'Select',

  btnSubmit: 'जमा करें',
  btnClear: 'Clear',
  btnUpdate: 'Update',
  btnNext: 'Next',
  btnAddNow: 'Add Now',
  btnClose:'बंद करना',
  btnSubmit1:'जमा करना',
  btnPayNow: 'अब भुगतान करें',
  btnFinishClickHere: 'समाप्त यहाँ क्लिक करें',

  errorNetwork:
    'कृपया कुछ समय बाद प्रयास करें क्योंकि कुछ तकनीकी समस्याएं हैं।',
  errorNoNetwork:
    'कोई इंटरनेट कनेक्शन उपलब्ध नहीं है. अपने कनेक्शन की जांच करें और पुन: प्रयास करें।',
  errorNetworkTimeOut:
    'लॉगिन का समय समाप्त हो गया. कृपया कुछ समय बाद पुनः प्रयास करें.',
};
