import React = require('react');
import COLORS from 'common/colors';
import common from 'common/common.styles';
import {Text} from 'react-native';
import responsivePixels from 'utils/responsivePixels';

const STRINGS_ENGLISH = {
  //text.... Simple text show in the app
  //btn.... Button name

  rentNow: {
    btnRentNow: 'Rent Now',
    english: 'English',
    spanish: 'Spanish',
    condition: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy',
  },
  chooseLocation: {
    chooseLocationTxt: 'Choose Location',
  },

  insurancePlan: {
    screenHeader: 'Insurance Plan',
    insurancePlan: 'Which Insurance Do You Want?',
    plansHeader: 'What You’ll Get',
    policyTerms1: 'Boats, Cars and Trailers are ',
    policyTerms2: 'NOT covered ',
    policyTerms3:
      ' under insurance. Click here to confirm you understand this. ',
    insuranceValue: 'a month',
    coverageValue: 'in coverage',
    month: 'Month',
    understood: 'I understood',
    vehicaleBoats:
      'Vehicles & Boats cannot be covered by insurance.Please review terms and condition in your insurance agreement.This is a third-party insurance carrier and not affiliated with Planet Storage LLC.',
  },

  storageSpaceSelection: {
    chooseYourSize: 'Choose Your Size',
    all: 'All',
    medium: 'Medium',
    large: 'large',
    small: 'Small',
    large1: 'Large',
    howToUse: 'How to Use',
    howToUseDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    understoodButtonTitle: 'Ok, I Understood',
  },
  contactInfo: {
    screenHeader: 'Contact Info',
    yourContactInfo: 'Your Contact Info',
    firstName: 'First Name',
    middleName: 'Middle Name',
    lastName: 'Last Name',
    contactNumber: 'Contact Number',
    dateOfBirth: 'Date Of Birth',
    address1: 'Address Line 1',
    address2: 'Address Line 2',
    country: 'Country',
    state: 'State',
    city: 'City',
    postalCode: 'Postal Code',
    licenseNumber: 'License Number',

    typeFirstName: 'Enter Your First Name',
    typeMiddleName: 'Enter Your Middle Name',
    typeLastName: 'Enter Your Last Name',
    typeContactNumber: 'Enter Your Contact Number',
    typeDateOfBirth: 'Enter Your Date Of Birth',
    typeAddress1: 'Enter Your Address 1',
    typeAddress2: 'Enter Your Address 2',
    typeCountry: 'Enter Your Country',
    typeState: 'Enter Your State',
    selectState: 'Select Your State',
    searchState: 'Search Your State',
    typeCity: 'Enter Your City',
    typePostalCode: 'Enter Your Postal Code',
    typeLicenseNumber: 'Enter Your License Number',
    phoneNumber: 'Phone Number',
    typePhoneNumber: 'Enter Your Phone Number',
    alternatePhoneNumber: 'Alternate Phone Number',
    typeAlternatePhoneNumber: 'Enter Your Alternate Phone Number',
    emailAddress: 'Email Address',
    typeEmailAddress: 'Enter Your Email Address',
    useAboveBilling: 'Use Above Address As Billing Address',
    billingAddress: 'Billing Address',
    typeBillingAddress: 'Enter Your Billing Address',
  },
  secondContactInfo: {
    screenHeader: 'Second Contact Info',
    secondContactInfo:
      'We need a second point of contact in case we can not get ahold of you',
    secondContactName: 'Second Contact Name',
    firstName: 'First Name',
    middleName: 'Middle Name',
    lastName: 'Last Name',
    contactNumber: 'Contact Number',
    typeFirstName: 'Enter Your First Name',
    typeMiddleName: 'Enter Your Middle Name',
    typeLastName: 'Enter Your Last Name',
    typeContactNumber: 'Enter Your Contact Number',
    typeRelationship: 'Enter Your Relationship',
    typeSecondContactName: 'Type Second Contact Name',
    relationship: 'Relationship',
    phoneNumber: 'Phone Number',
    typePhoneNumber: 'Enter Your Phone Number',
    emailAddress: 'Email Address',
    typeEmailAddress: 'Enter Your Email Address',
  },
  contactDetails: {
    screenHeader: 'Contact Details',
    contactDetails: 'Does everything look correct? If NOT please make changes',
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
    unit: 'Unit',
    insurance: 'Insurance',
    size: 'Size',
  },
  editRenterContactDetail: {
    editRenterContactDetailHeader:
      'Please Edit Below Field with Correct Details',
    editRenterContactNameInputLabel: 'Renter Name',
    editRenterContactAddressInputLabel: 'Renter Address',
    editRenterContactPhoneInputLabel: 'Renter Phone',
    editRenterContactEmailInputLabel: 'Renter Email',
    editRenterContactBillingAddressInputLabel: 'Renter Billing Address',

    editTypeRenterContactNameInputLabel: 'Enter Your Name',
    editTypeRenterContactAddressInputLabel: 'Enter Your Address',
    editTypeRenterContactPhoneInputLabel: 'Enter Your Phone Number',
    editTypeRenterContactEmailInputLabel: 'Enter Your Email Address',
    editTypeRenterContactBillingAddressInputLabel: 'Enter Your Billing Address',
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
    editTypeSecondContactPhoneInputLabel: 'Enter Your Phone Number',
    editTypeSecondContactEmailInputLabel: 'Enter Your Email Address',
    editTypeSecondContactInsuranceInputLabel: 'Type Insurance You Want',
    editTypeSecondSizeTypeInputLabel: 'Size and Type of Unit',
  },
  scanLicense: {
    scanLicense: 'Scan License',
    screenHeader: 'Scan Your Driver License with Camera',
    scanLicenseDefaultText: 'Your scan copy will appear here',
    cameraText: 'Tap to capture',
  },
  scanCreditCards: {
    scanCreditCard: 'Scan Credit Card',
    scanCreditCardHeader: 'Scan Your Credit Card with Camera',
    scanCreditCardDefaultText: 'Your scan copy will appear here',
    scannerWarning:
      'All rent payment will be charged to your credit/debit card automatically each month',
  },
  signAgreements: {
    signAgreement: 'Sign Agreement',
    signInsuranceAgreement: 'Sign Insurance Agreement',
    signAgreementContent1:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.\n \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    signAgreementCondition: 'Please accept and ',
    // 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    signContractAgreement: 'Sign Rental Agreement',
    addSignature: 'Add Signature',
  },
  summaryofCharge: {
    summaryofCharges: 'Summary of Charges',
    unitDetails: 'Unit Details',
    rentalInformation: 'Rental Information',
    firstMonthRent: 'First Month’s Rent',
    firstRentProrated: 'First Rent Prorated',
    administrationFee: 'Administration Fee',
    taxes: 'Taxes',
    total: 'Total',
    apply: 'Apply',
    reservationFee: 'Reservation Fee',
    protectionPlan: 'Protection Plan - $2,000.00',
    applyPromoCode: 'Apply Promo Code',
    unitVS: 'Unit VS 107',
    unitValue: '10x40',
    $145: '$145/month',
    $43: '$43.50',
    $25: '$25',
    $145_0: '$145',
    date: '(10/05/23 - 31/05/23)',
    $82: '$82.10',
    $0: '$0',
    agreementDetails1: 'Moving forward your card will be charged ',
    agreementDetails2: 'All monthly payments will be autopay.',
    // 'Refer to lease agreement for details',
  },
  addCreditCard: {
    expityDatePlaceholder: 'Select Exp Date',
    screenHeader: 'Add Credit Card',
    addCardDetail: 'Add Details to Add Your Card',
    addCardNumberInputLabel: 'Card Number',
    addCardInputPlaceholder: 'Please Enter Cardholder Name',
    addCardExipryInputLabel: 'Expiry Date',
    addCardCVVInputLabel: 'CVV',
    addCardCardHolderNameLabel: 'Cardholder Name',
    alertMessage: 'Please confirm the card details.',
  },
  payment: {
    paymentSuccessful: 'Payment Successful',
    paymentSuccessfulContent:
      'You’re ready to move in. A receipt has been emailed to you',
    paymentUnitNumber: 'Your Unit Number',
    paymentUnitContent: 'There will be a complimentary lock in your unit',
    paymentGateCode: 'Your Gate Code',
    contactInfo: 'Contact Info for Questions',
    callOn: 'Call On',
    writeOn: 'Write On',
    directionhowtoget: 'Direction on how to open your gate',
    enterNumberUnit:
      'Enter UNIT NUMBER Followed by # and GATE CODE Followed by star *',
    number: 9181112233,
    unitNumber: '305#1234*',
    gateCode: 1234,
    unitText: 'A NEW PADLOCK IS IN YOUR UNIT ON THE FLOOR',
  },
  signUp: {
    header: 'Registration Form',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    password: 'Password',
    btnSignUp: 'SIGN UP',
  },
  login: {
    header: 'Login Form',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password ?',
    btnSignIn: 'SIGN IN',
  },
  forgotPassword: {
    header: 'Forgot Password',
    email: 'Email',
  },
  changePassword: {
    header: 'Change Password',
    oldPassword: 'Old Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    emptyOldPassword: 'Please enter old password',
    emptyNewPassword: 'Please enter new password',
    emptyConfirmPassword: 'Please enter confirm password',
    validOldPassword: 'Please enter valid old password',
    validNewPassword: 'Please enter valid new password',
    validConfirmPassword: 'Please enter valid confirm password',
  },
  validation: {
    emptyFirstName: 'Please enter first name',
    emptyLastName: 'Please enter last name',
    emptyEmail: 'Please enter email',
    emptyPassword: 'Please enter password ',
    validEmail: 'Please enter valid email',
    validPassword: 'Please enter valid password',
  },
  hello: 'Hello',

  english: 'English',
  hindi: 'हिंदी',
  spanish: 'Spanish',
  theme: 'Theme',

  textStrong: 'Strong',
  textMedium: 'Medium',
  textSoSo: 'So-so',
  textWeak: 'Weak',
  textVeryWeek: 'Very Week',
  textNoData: 'No records available',
  select: 'Select',

  btnReset: 'RESET',
  btnSubmit: 'SUBMIT',
  btnClear: 'Clear',
  btnUpdate: 'Update',
  btnNext: 'Next',
  btnReload: 'Try Again',
  btnClose: 'CLOSE',
  btnSubmit1: 'Submit',
  btnAddNow: 'Add Now',
  btnPayNow: 'Pay Now',
  btnFinishClickHere: 'Finish Click Here',
  btnBack: 'Back',
  btnOk: 'OK',
  btnAddManually: 'Add Manually',
  emptyFieldError: `Filed can't be empty`,
  validateErrorMessage: 'Please enter a valid data',

  validErrorMessage: 'Please enter valid ',

  dateOfBirthError: 'Please select date of birth',
  emptyError: 'Please enter a ',
  requiredError: ' is required.',
  contactNumberError: 'Please enter 10 digit number',
  emailError: `Please enter email address follows the format: 'username@domain.com'`,
  nameError: 'Please use only alphabetical characters',

  licenseError: 'Please Scan Your License',
  licenseScanSuccess: 'Document Captured Successfully',

  errorNetwork: 'Please try after sometimes as there is some technical issues.',
  errorNoNetwork: 'No Internet Connection',
  // 'No internet connection available. Please check your connection and try again.',
  errorNetworkTimeOut: 'Login timed out. Please try again after some time.',
  copyrightFooter: ' Aspen Mini Storage | All rights reserved',
  month: 'Month',
  Button_Confirm: 'Confirm',
  Button_Cancel: 'Cancel',
};

export default STRINGS_ENGLISH;
