import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import CheckBox from 'react-native-check-box';
import {StackNavigationProp} from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';

import Modal from 'react-native-modal';

import {IContext} from 'interfaces/common';

import MainButton from 'components/button';
import {ContextData} from 'components/globalContext/globalContext';
import InputBox from 'components/inputBox';

import {AppStackParamList} from 'navigations/AppStack';

import STRINGS from 'common/strings';
import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';

import responsivePixels from 'utils/responsivePixels';

import STYLES from './ContactInfo.styles';

import {
  isIOS,
  formatDateToString,
  maxDate,
  sendDateFormat,
  currentScreen,
  isNullValue,
  validateFnameForm,
  validateLnameForm,
  validateEmailForm,
  validateContactForm,
  validateDOBForm,
  validateLicenseForm,
  validateBillingAddForm,
} from 'utils/functions';
import {API_Call_With_Out_Token} from 'services/api';
import {METHODS} from 'services/apiConfig';
import RenderDropDown from 'components/renderDropDown';
import IMAGES from 'common/images';


interface IProps {
  navigation: StackNavigationProp<AppStackParamList, 'ContactInfoScreen'>;
}

const ContactInfoScreen: FunctionComponent<IProps> = props => {
  const focus = useIsFocused();
  const {navigation} = props;
  const scrollViewRef = useRef(null);
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const emailRef = useRef(null);
  const contactRef = useRef(null);
  const dobRef = useRef(null);
  const licNumRef = useRef(null);
  const billingAddressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);

  const {contactInfo, btnClear, btnNext, btnOk} = STRINGS;

  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {darkMode, infoData, setInfoData, setIsCheckedAddress},
    isCheckedAddress,
    handleStateFetchApi
  } = context;
  const styles = STYLES(theme);
  const ValObj = {value: '', error: ''};
  const [firstName, setFirstName] = useState<any>(ValObj);
  const [middleName, setMiddleName] = useState<any>(ValObj);
  const [lastName, setLastName] = useState<any>(ValObj);
  const [contactNumber, setContactNumber] = useState<any>({
    value: '',
    error: '',
  });

  const [emailAddress, setEmailAddress] = useState<any>(ValObj);
  const [address1, setAddress1] = useState<any>(ValObj);
  const [address2, setAddress2] = useState<any>(ValObj);
  const [country, setCountry] = useState<any>(ValObj);
  const [licenseNo, setLicenseNo] = useState<any>(ValObj);
  const [state, setState] = useState<any>(ValObj);
  const [city, setCity] = useState<any>(ValObj);
  const [postalCode, setPostalCode] = useState<any>(ValObj);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [maximumDate, setMaximumDate] = useState<any>();
  const [scrollY, setScrollY] = useState(0);
  const [date, setDate] = useState<any>({
    value: '',
    error: '',
  });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [billingAddress, setBillingAddress] = useState<any>({
    value: '',
    error: '',
  });
  const [StateLists, setStateLists] = useState<any>([]);

  useEffect(() => {
    currentScreen('ContactInfoScreen');
    // whenever you are in the current screen, it will be true vice versa
    if (focus == true) {
      // if condition required here because it will call the function even when you are not focused in the screen as well, because we passed it as a dependencies to useEffect hook
      setDefaultData(infoData);
    }

    const maxDateValue = maxDate();
    console.log('maxDateValue', maxDateValue);
    setMaximumDate(maxDateValue);
  }, [focus]);

  // set localstorage data by default
  const setDefaultData = (infoData: any) => {
    if (infoData) {
      console.log('yessinfoData', infoData);
      setFirstName({value: infoData.renter_first_name, error: ''});
      // setMiddleName({value: infoData.renter_middle_name, error: ''});
      setLastName({value: infoData.renter_last_name, error: ''});
      setContactNumber({value: infoData.renter_phone, error: ''});
      setEmailAddress({value: infoData.renter_email, error: ''});
      setLicenseNo({value: infoData.id_proof_number, error: ''});
      setAddress1({
        value: isNullValue(infoData.renter_address_line_1),
        error: '',
      });
      setAddress2({
        value: isNullValue(infoData.renter_address_line_2),
        error: '',
      });
      // setCountry({value: isNullValue(infoData.renter_country), error: ''});
      setState({value: isNullValue(infoData.renter_state), error: ''});
      setCity({value: isNullValue(infoData.renter_city), error: ''});
      setPostalCode({
        value: isNullValue(infoData.renter_postel_code),
        error: '',
      });
      setDate({
        value: isNullValue(infoData.renter_dob) ? infoData.renter_dob : '',
        error: '',
      });
      setBillingAddress({value: infoData.billing_address, error: ''});
    }
  };

  // remove all data
  const onClearPress = () => {
    setFirstName(ValObj);
    setMiddleName(ValObj);
    setLastName(ValObj);
    setContactNumber(ValObj);
    setEmailAddress(ValObj);
    setAddress1(ValObj);
    setAddress2(ValObj);
    setCountry(ValObj);
    setState(ValObj);
    setCity(ValObj);
    setPostalCode(ValObj);
    setDate(ValObj);
    setLicenseNo(ValObj);
    setBillingAddress(ValObj);
    setIsChecked(false);
  };

  // call funcation when press submit button
  const onSubmitPress = () => {
    console.log('submit');
    console.log('scrolllrefff', validateEmailForm(emailAddress.value));

    // form validate conditions
    if (
      validateFnameForm(firstName.value) ||
      validateLnameForm(lastName.value) ||
      validateEmailForm(emailAddress.value) ||
      validateContactForm(contactNumber.value) ||
      validateDOBForm(date.value) ||
      validateLicenseForm(licenseNo.value) ||
      validateBillingAddForm(billingAddress.value)
    ) {
      setFirstName({...firstName, error: validateFnameForm(firstName.value)});
      setLastName({...lastName, error: validateLnameForm(lastName.value)});
      setEmailAddress({
        ...emailAddress,
        error: validateEmailForm(emailAddress.value),
      });
      setContactNumber({
        ...contactNumber,
        error: validateContactForm(contactNumber.value),
      });
      setDate({...date, error: validateDOBForm(date.value)});
      setLicenseNo({...licenseNo, error: validateLicenseForm(licenseNo.value)});
      setBillingAddress({
        ...billingAddress,
        error: validateBillingAddForm(billingAddress.value),
      });
    }

    // find form erorr and scroll there
    if (validateFnameForm(firstName.value)) {
      eventErrorScroll(fnameRef, 0);
      return;
    }

    if (validateLnameForm(lastName.value)) {
      eventErrorScroll(lnameRef, 0 + 50);
      return;
    }

    if (validateEmailForm(emailAddress.value)) {
      eventErrorScroll(emailRef, 100);
      return;
    }

    if (validateContactForm(contactNumber.value)) {
      eventErrorScroll(contactRef, 170);
      return;
    }
    if (validateDOBForm(date.value)) {
      eventErrorScroll(dobRef, scrollY + 100);
      return;
    }

    if (validateLicenseForm(licenseNo.value)) {
      eventErrorScroll(licNumRef, scrollY + 230);
      return;
    }

    if (validateBillingAddForm(billingAddress.value)) {
      eventErrorScroll(billingAddressRef, scrollY);
      return;
    }
    // start erorr place scroll

    const data = {
      renter_first_name: firstName.value,
      // renter_middle_name: middleName.value,
      renter_last_name: lastName.value,
      renter_email: emailAddress.value,
      renter_dob: sendDateFormat(date.value),
      renter_phone: contactNumber.value,
      renter_address_line_1: address1.value,
      renter_address_line_2: address2.value,
      renter_country: country.value,
      renter_state: state.value,
      renter_city: city.value,
      renter_postel_code: postalCode.value,
      billing_address: billingAddress.value,
      id_proof_number: licenseNo.value,
    };

    console.log('data ContactInfo->', data);
    setInfoData({...infoData, ...data});
    navigation.navigate(CONSTANTS.SECOND_CONTACT_INFO_SCREEN, {
      contactInfoData: data,
    });

    console.log('data=======', data);
  };

  // function of error scroll wherever occurred
  const eventErrorScroll = (textInputRef: any, position: number) => {
    if (scrollViewRef?.current && textInputRef?.current) {
      if (textInputRef == billingAddressRef) {
        scrollViewRef?.current?.scrollToEnd({animated: true});
        textInputRef?.current?.focus();
      } else {
        scrollViewRef?.current?.scrollTo({
          //////===================
          y: position,
          animated: true,
        });
        textInputRef?.current?.focus();
      }
    }
  };

  const setCheckValue = () => {
    // setIsChecked(!isChecked)
    const localState = state.value == 'Please Select' ? '' : state.value;
    const addressBilling =
      address1.value +
      ' ' +
      address2.value +
      ' ' +
      country.value +
      ' ' +
      localState +
      ' ' +
      city.value +
      ' ' +
      postalCode.value;

    let allElementsAreSpaces = true;
    for (let i = 0; i < addressBilling.length; i++) {
      if (addressBilling[i] !== ' ') {
        allElementsAreSpaces = false;
        break;
      }
    }
    setIsCheckedAddress(true);

    if (!allElementsAreSpaces) {
      setIsChecked(!isChecked);
    } else if (isChecked) {
      setIsChecked(false);
    }

    if (!isChecked && addressBilling.length > 0 && !allElementsAreSpaces) {
      console.log('ischecked---->', isChecked);

      setBillingAddress({
        value: addressBilling,
        error: '',
      });
    } else {
      console.log(' not ischecked---->', isChecked);
      setBillingAddress(ValObj);
    }
  };

  // whenever state change address string combine with selected state effect using this useeffect
  useEffect(() => {
    const localState = state.value == 'Please Select' ? '' : state.value;
    const addressBilling =
      address1.value +
      ' ' +
      address2.value +
      ' ' +
      country.value +
      ' ' +
      localState +
      ' ' +
      city.value +
      ' ' +
      postalCode.value;
    if (isCheckedAddress) {
      setBillingAddress({
        value: addressBilling,
        error: '',
      });
    }
  }, [state]);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const showDatePicker1 = () => {
    setShowModal(true);
    // handleDateChange('', new Date());
  };

  const hideDatePicker = () => {
    setShowModal(false);
    console.log('closed... datepicker',date)
    !date.value && handleDateChange({type:'set'}, new Date());
  };

  // change Date Of Birth
  const handleDateChange = (event: any, selectedDate: any) => {
    console.log('Selected Date BDY',selectedDate)
    console.log('Selected Date BDY EVENT',event)
    if (event.type === 'set') {
      console.log('Selected Date:', selectedDate);
      setShowDatePicker(false);
      const inputDate = selectedDate;

      const day = inputDate.getDate();
      const month = inputDate.getMonth() + 1;
      const year = inputDate.getFullYear();

      const formattedDay = day.toString().padStart(2, '0');
      const formattedMonth = month.toString().padStart(2, '0');

      const formattedDate: any = `${formattedMonth}-${formattedDay}-${year}`;

      console.log(formattedDate);
      setDate({value: formattedDate, error: ''});
    }
    showDatePicker ? setShowDatePicker(false) : null; // Hide the date picker
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        // keyboardVerticalOffset={0}
        // behavior={Platform.OS === 'android' ? 'height' : undefined}
        keyboardVerticalOffset={responsivePixels.size84}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{paddingHorizontal: 20, flex: 1}}>
          {/* header text */}
          <Text style={styles.yourContactInfo}>
            {contactInfo.yourContactInfo}
          </Text>

          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onLayout={event => {
              setScrollY(event.nativeEvent.layout.height);
              console.log('heeee', event.nativeEvent.layout);
            }}
            style={styles.scrollview}>
            {/* first name Input */}
            <InputBox
              refInput={fnameRef}
              inputHeader={contactInfo.firstName}
              value={firstName.value}
              placeholder={contactInfo.typeFirstName}
              onChangeText={(txt: any) => setFirstName({value: txt, error: ''})}
              keyboardType="ascii-capable"
              // autoFocus={true}
              isRequired={true}
              isError={firstName.error}
              errorMesage={firstName.error}
              maxLength={CONSTANTS.NAME_MAX_LENGTH}
            />

            {/* lastname Input */}
            <InputBox
              refInput={lnameRef}
              inputHeader={contactInfo.lastName}
              value={lastName.value}
              placeholder={contactInfo.typeLastName}
              onChangeText={(txt: any) => setLastName({value: txt, error: ''})}
              keyboardType="name-phone-pad"
              autoFocus={false}
              isRequired={true}
              isError={lastName.error}
              errorMesage={lastName.error}
              maxLength={CONSTANTS.NAME_MAX_LENGTH}
            />

            {/* email Input */}
            <InputBox
              refInput={emailRef}
              inputHeader={contactInfo.emailAddress}
              value={emailAddress.value}
              placeholder={contactInfo.typeEmailAddress}
              onChangeText={(txt: any) =>
                setEmailAddress({value: txt, error: ''})
              }
              keyboardType="email-address"
              isRequired={true}
              isError={emailAddress.error}
              errorMesage={emailAddress.error}
            />

            {/* contact number Input */}
            <InputBox
              refInput={contactRef}
              inputHeader={contactInfo.contactNumber}
              value={contactNumber.value}
              placeholder={contactInfo.typeContactNumber}
              onChangeText={(txt: any) =>
                setContactNumber({value: txt, error: ''})
              }
              keyboardType="phone-pad"
              autoFocus={false}
              maxLength={CONSTANTS.CONTACT_NUMBER_MAX_LENGTH}
              isRequired={true}
              isError={contactNumber.error}
              errorMesage={contactNumber.error}
            />

            {/* DOB change touchableOpacity */}
            <TouchableOpacity
              onPress={isIOS() ? showDatePicker1 : toggleDatePicker}>
              <InputBox
                refInput={dobRef}
                inputHeader={contactInfo.dateOfBirth}
                value={date.value}
                placeholder={contactInfo.typeDateOfBirth}
                // onChangeText={(txt: any) => setContactNumber(txt)}
                keyboardType="phone-pad"
                isRequired={true}
                editable={false}
                rightIcon={IMAGES.ic_calendar}
                pointerEvents="none"
                isError={date.error}
                errorMesage={date.error}
              />
            </TouchableOpacity>

            {/* date picker for DOB */}
            {showDatePicker && (
              <DateTimePicker
                value={
                  date.value === ''
                    ? new Date(maximumDate)
                    : formatDateToString(date.value)
                }
                // value={
                //   date.value === ''
                //     ? formatDateToString(maximumDate)
                //     : formatDateToString(date)
                // }
                mode="date"
                is24Hour={true}
                // maximumDate={new Date()}
                maximumDate={new Date(maximumDate)}
                positiveButtonLabel={btnOk}
                display={isIOS() ? 'spinner' : 'default'}
                onChange={handleDateChange}
              />
            )}

            {/* license number Input */}
            <InputBox
              refInput={licNumRef}
              inputHeader={contactInfo.licenseNumber}
              value={licenseNo.value}
              placeholder={contactInfo.typeLicenseNumber}
              onChangeText={(txt: any) => setLicenseNo({value: txt, error: ''})}
              keyboardType="default"
              maxLength={CONSTANTS.CONTACT_NUMBER_MAX_LENGTH}
              isRequired={true}
              isError={licenseNo.error}
              errorMesage={licenseNo.error}
            />

            {/* address line 1 Input */}
            <InputBox
              inputHeader={contactInfo.address1}
              value={address1.value}
              placeholder={contactInfo.typeAddress1}
              onChangeText={(txt: any) => setAddress1({value: txt, error: ''})}
              keyboardType="default"
              autoFocus={false}
              // isError={errorMsg !== '' ? true : false}
              // errorMesage={errorMsg}
              maxLength={CONSTANTS.ADDRESS_MAX_LENGTH}
            />

            {/* address line 2 Input */}
            <InputBox
              inputHeader={contactInfo.address2}
              value={address2.value}
              placeholder={contactInfo.typeAddress2}
              onChangeText={(txt: any) => setAddress2({value: txt, error: ''})}
              keyboardType="default"
              autoFocus={false}
              maxLength={CONSTANTS.ADDRESS_MAX_LENGTH}
            />

            {/* select state component */}
            <RenderDropDown // Dropdown Component
              setState={setState}
              StateLists={StateLists}
              state={state}
              contactInfo={contactInfo}
              labelField="state_name_en"
              valueField="state_name_en"
              ref={stateRef}
              setStateLists={setStateLists}
              infoData={infoData}
            />

            {/* city Input */}
            <InputBox
              refInput={cityRef}
              inputHeader={contactInfo.city}
              value={city.value}
              placeholder={contactInfo.typeCity}
              onChangeText={(txt: any) => setCity({value: txt, error: ''})}
              keyboardType="default"
              autoFocus={false}
              maxLength={CONSTANTS.ADDRESS_MAX_LENGTH}
            />

            {/* postalcode Input */}
            <InputBox
              inputHeader={contactInfo.postalCode}
              value={postalCode.value}
              placeholder={contactInfo.typePostalCode}
              onChangeText={(txt: any) =>
                setPostalCode({value: txt, error: ''})
              }
              keyboardType="numeric"
              autoFocus={false}
            />

            {/* set default address checkbox view */}
            <View style={styles.conditionContainer}>
              <CheckBox
                onClick={setCheckValue}
                isChecked={isChecked}
                checkBoxColor={COLORS.darkOrange}
                uncheckedCheckBoxColor={COLORS.darkOrange}
                style={{paddingRight: responsivePixels.size10}}
              />
              <Text style={styles.conditionText}>
                {STRINGS.contactInfo.useAboveBilling}
              </Text>
            </View>

            {/* billing address Input  */}
            <InputBox
              refInput={billingAddressRef}
              inputHeader={contactInfo.billingAddress}
              value={billingAddress.value}
              placeholder={contactInfo.typeBillingAddress}
              onChangeText={(txt: any) =>
                setBillingAddress({value: txt, error: ''})
              }
              containerStyle={{
                height: responsivePixels.size75,
                alignItems: 'flex-start',
              }}
              inputStyle={{alignSelf: 'flex-start'}}
              keyboardType="default"
              isRequired={false}
              multiline={true}
              isError={billingAddress.error}
              errorMesage={billingAddress.error}
              editable={isChecked ? false : true}
              maxLength={CONSTANTS.BILLING_ADDRESS_MAX_LENGTH}
            />
          </ScrollView>
        </View>
        <View style={styles.footerView}>
          {/* clear main button component  */}
          <MainButton
            title={btnClear}
            titleTextStyle={styles.footerButtonTitle}
            onPress={() => onClearPress()}
            mainStyle={[
              styles.footerButton,
              {backgroundColor: COLORS.silverSand},
            ]}
          />

          {/* submit main button component  */}
          <MainButton
            title={btnNext}
            titleTextStyle={styles.footerButtonTitle}
            onPress={() => onSubmitPress()}
            mainStyle={[
              styles.footerButton,
              {marginLeft: responsivePixels.size20},
            ]}
          />
        </View>
      </KeyboardAvoidingView>

      {/* modal of date picker */}
      <Modal
        transparent={true}
        backdropOpacity={0.7}
        backdropColor="#000"
        animationType="slide"
        isVisible={showModal}
        onBackdropPress={hideDatePicker}
        onRequestClose={hideDatePicker}>
        <View style={styles.modal}>
          <DateTimePicker
            // value={selectedDate}
            value={
              date.value === ''
                ? new Date(maximumDate)
                : formatDateToString(date.value)
            }
            mode="date"
            // maximumDate={new Date()}
            maximumDate={new Date(maximumDate)}
            is24Hour={true}
            display="spinner"
            positiveButtonLabel={btnOk}
            onChange={handleDateChange}
          />

          <Button title={btnOk} onPress={hideDatePicker} />
        </View>
      </Modal>
    </View>
  );
};

export default ContactInfoScreen;
