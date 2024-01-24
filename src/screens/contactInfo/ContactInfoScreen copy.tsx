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
  Keyboard,
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
import REGEX from 'common/regex';
import common from 'common/common.styles';
import {
  isIOS,
  checkValidate,
  changeDateFormat,
  formatDateToString,
  maxDate,
  sendDateFormat,
  currentScreen,
  isNullValue,
} from 'utils/functions';
import IMAGES from 'common/images';
import moment from 'moment';

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

  const {contactInfo, btnClear, btnNext, btnClose, btnOk} = STRINGS;

  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {darkMode, infoData, setInfoData},
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
  // const firstNameRef = useRef<TextInput | null>(null);
  // const middleNameRef = useRef<TextInput | null>(null);

  // useIsFocused as shown
  // useEffect(() => {
  //   console.log('emailRef.current:', fnameRef.current);
  // }, [fnameRef.current]); // Empty dependency array means it runs only once after mounting

  useEffect(() => {
    currentScreen('ContactInfoScreen');
    // whenever you are in the current screen, it will be true vice versa
    if (focus == true) {
      // if condition required here because it will call the function even when you are not focused in the screen as well, because we passed it as a dependencies to useEffect hook
      console.log('infoData', infoData);
      setDefaultData(infoData);
    }

    const maxDateValue = maxDate();
    console.log('maxDateValue', maxDateValue);
    setMaximumDate(maxDateValue);
  }, [focus]);

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
      setCountry({value: isNullValue(infoData.renter_country), error: ''});
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

  const onSubmitPress = () => {
    console.log('submit');
    console.log('scrolllrefff', scrollViewRef, fnameRef);

    // scrollViewRef.current.scrollTo({
    //   y: emailRef.current.offsetTop,
    //   animated: true,
    // });

    const fNameError = checkValidate(
      REGEX.username,
      firstName.value,
      contactInfo.firstName,
    );
    // const midNameError = checkValidate(
    //   REGEX.username,
    //   middleName.value,
    //   contactInfo.middleName,
    // );
    const lNameError = checkValidate(
      REGEX.username,
      lastName.value,
      contactInfo.lastName,
    );
    const conNumberError = checkValidate(
      REGEX.contactNumber,
      contactNumber.value,
      contactInfo.contactNumber,
    );
    const emailError = checkValidate(
      REGEX.email,
      emailAddress.value,
      contactInfo.emailAddress,
    );
    const dateError = checkValidate(
      REGEX.isNonEmpty,
      date.value,
      contactInfo.dateOfBirth,
    );
    const licenseError = checkValidate(
      REGEX.isNonEmpty,
      licenseNo.value,
      contactInfo.licenseNumber,
    );
    const billingAddressError = checkValidate(
      REGEX.isNonEmpty,
      billingAddress.value,
      contactInfo.billingAddress,
    );
    //////////////////////////////////////////////
    // if (fNameError) {
    //   setFirstName({
    //     ...firstName,
    //     error: fNameError,
    //     event: eventErrorScroll(fnameRef, 0),
    //   });
    //   return;
    // }

    // if (lNameError) {
    //   setLastName({
    //     ...lastName,
    //     error: lNameError,
    //     event: eventErrorScroll(lnameRef, 0),
    //   });
    //   return;
    // }

    // if (emailError) {
    //   setEmailAddress({
    //     ...emailAddress,
    //     error: emailError,
    //     event: eventErrorScroll(emailRef, 0),
    //   });

    //   return;
    // }

    // if (conNumberError) {
    //   setContactNumber({
    //     ...contactNumber,
    //     error: conNumberError,
    //     event: eventErrorScroll(contactRef, 0),
    //   });
    //   return;
    // }
    // if (dateError) {
    //   setDate({
    //     ...date,
    //     error: dateError,
    //     event: eventErrorScroll(dobRef, scrollY / 2),
    //   });
    //   return;
    // }

    // if (licenseError) {
    //   setLicenseNo({
    //     ...licenseNo,
    //     error: licenseError,
    //     event: eventErrorScroll(licNumRef, scrollY / 2),
    //   });
    //   return;
    // }

    // if (billingAddressError) {
    //   setBillingAddress({
    //     ...billingAddress,
    //     error: billingAddressError,
    //     event: eventErrorScroll(billingAddressRef, scrollY),
    //   });
    //   return;
    // }
    /////////////////////////////////////////
    if (
      fNameError ||
      // midNameError ||
      lNameError ||
      conNumberError ||
      emailError ||
      dateError ||
      licenseError ||
      billingAddressError
    ) {
      setFirstName({
        ...firstName,
        error: fNameError,
      });
      // setMiddleName({...middleName, error: midNameError});
      setLastName({
        ...lastName,
        error: lNameError,
      });

      setEmailAddress({
        ...emailAddress,
        error: emailError,
      });
      setContactNumber({
        ...contactNumber,
        error: conNumberError,
      });

      setDate({
        ...date,
        error: dateError,
      });
      setLicenseNo({
        ...licenseNo,
        error: licenseError,
      });
      setBillingAddress({
        ...billingAddress,
        error: billingAddressError,
      });

      if (fNameError) {
        eventErrorScroll(fnameRef, 0);

        return;
      }

      if (lNameError) {
        eventErrorScroll(lnameRef, 0 + 50);

        return;
      }

      if (emailError) {
        eventErrorScroll(emailRef, 100);

        return;
      }

      if (conNumberError) {
        eventErrorScroll(contactRef, 170);

        return;
      }
      if (dateError) {
        eventErrorScroll(dobRef, scrollY + 100);

        return;
      }

      if (licenseError) {
        eventErrorScroll(licNumRef, scrollY + 230);

        return;
      }

      if (billingAddressError) {
        eventErrorScroll(billingAddressRef, scrollY);
        return;
      }
    }

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
    setInfoData(data);
    navigation.navigate(CONSTANTS.SECOND_CONTACT_INFO_SCREEN, {
      contactInfoData: data,
    });

    console.log('data=======', data);
    // }
  };

  const eventErrorScroll = (textInputRef: any, position: number) => {
    console.log('referencereference', position);
    if (scrollViewRef.current && textInputRef.current) {
      // const handle = findNodeHandle(textInputRef.current);

      // UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      //   scrollViewRef.current.scrollTo({y: pageY, animated: true});
      // });

      // const handle = findNodeHandle(dobRef.current);
      // UIManager.measureLayoutRelativeToParent(
      //   handle,
      //   e => {
      //     console.error('eeeeee', e);
      //   },
      //   (x, y, w, h) => {
      //     console.log('offset', x, y, w, h);
      //     scrollViewRef.current.scrollTo({
      //       y: 16,
      //       animated: true,
      //     });
      //   },
      // );

      // const contentHeight = scrollViewRef.current.getContentHeight();

      // Scroll to the middle

      if (textInputRef == billingAddressRef) {
        scrollViewRef.current.scrollToEnd({animated: true});
        textInputRef.current.focus();
      } else {
        scrollViewRef.current.scrollTo({
          //////===================
          y: position,
          animated: true,
        });
        textInputRef.current.focus();
      }
      // scrollViewRef.current.scrollTo({
      //   y: textInputRef.current.offsetTop,
      //   animated: true,
      // });
      // const inputPosition = textInputRef.current.measureLayout(
      //   scrollViewRef.current.getInnerViewNode(),
      //   (x, y, width, height) => {
      //     scrollViewRef.current.scrollTo({y: y, animated: true});
      //   },
      // );
    }
    // if (scrollViewRef.current && billingAddressRef.current) {
    //   scrollViewRef.current.scrollTo({
    //     y: billingAddressRef.current.offsetTop,
    //     animated: true,
    //   });
    // }
  };
  const setCheckValue = () => {
    // setIsChecked(!isChecked)
    const addressBilling =
      address1.value +
      ' ' +
      address2.value +
      ' ' +
      country.value +
      ' ' +
      state.value +
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

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const showDatePicker1 = () => {
    setShowModal(true);
    // handleDateChange('', new Date());
  };

  const hideDatePicker = () => {
    setShowModal(false);
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    if (event.type === 'set') {
      console.log('Selected Date:', selectedDate);
      setShowDatePicker(false);
      const inputDate = selectedDate;

      const day = inputDate.getDate();
      const month = inputDate.getMonth() + 1;
      const year = inputDate.getFullYear();

      const formattedDay = day.toString().padStart(2, '0');
      const formattedMonth = month.toString().padStart(2, '0');

      // const formattedDate: any = `${formattedDay}-${formattedMonth}-${year}`;
      const formattedDate: any = `${formattedMonth}-${formattedDay}-${year}`;

      console.log(formattedDate);
      setDate({value: formattedDate, error: ''});
    }
    showDatePicker ? setShowDatePicker(false) : null; // Hide the date picker
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        // keyboardVerticalOffset={0}
        // behavior={Platform.OS === 'android' ? 'height' : undefined}
        // keyboardVerticalOffset={responsivePixels.size84}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text style={styles.yourContactInfo}>
          {contactInfo.yourContactInfo}
        </Text>
        <View>
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onLayout={event => {
              setScrollY(event.nativeEvent.layout.height);
              console.log('heeee', event.nativeEvent.layout);
            }}
            contentContainerStyle={styles.scrollview}>
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

            {/* <InputBox
            // refInput={middleNameRef}
            inputHeader={contactInfo.middleName}
            value={middleName.value}
            placeholder={contactInfo.typeMiddleName}
            onChangeText={(txt: any) => setMiddleName({value: txt, error: ''})}
            keyboardType="name-phone-pad"
            autoFocus={false}
            isRequired={true}
            isError={middleName.error}
            errorMesage={middleName.error}
            maxLength={CONSTANTS.NAME_MAX_LENGTH}
          /> */}

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

            {/* <View style={{marginTop: responsivePixels.size15}}>
            <Text style={styles.text}>
              {contactInfo.dateOfBirth}

              <Text style={styles.requiredText}> *</Text>
            </Text>
            <TouchableOpacity
              style={styles.dobBtn}
              onPress={isIOS() ? showDatePicker1 : toggleDatePicker}>
              <Text style={styles.dateText}>{date}</Text>
            </TouchableOpacity>
          </View> */}

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
                pointerEvents="none"
                isError={date.error}
                errorMesage={date.error}
              />
            </TouchableOpacity>

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

            <InputBox
              inputHeader={contactInfo.address2}
              value={address2.value}
              placeholder={contactInfo.typeAddress2}
              onChangeText={(txt: any) => setAddress2({value: txt, error: ''})}
              keyboardType="default"
              autoFocus={false}
              maxLength={CONSTANTS.ADDRESS_MAX_LENGTH}
            />

            <InputBox
              inputHeader={contactInfo.country}
              value={country.value}
              placeholder={contactInfo.typeCountry}
              onChangeText={(txt: any) => setCountry({value: txt, error: ''})}
              keyboardType="default"
              autoFocus={false}
              maxLength={CONSTANTS.ADDRESS_MAX_LENGTH}
            />

            <InputBox
              inputHeader={contactInfo.state}
              value={state.value}
              placeholder={contactInfo.typeState}
              onChangeText={(txt: any) => setState({value: txt, error: ''})}
              keyboardType="default"
              autoFocus={false}
              maxLength={CONSTANTS.ADDRESS_MAX_LENGTH}
            />

            <InputBox
              inputHeader={contactInfo.city}
              value={city.value}
              placeholder={contactInfo.typeCity}
              onChangeText={(txt: any) => setCity({value: txt, error: ''})}
              keyboardType="default"
              autoFocus={false}
              maxLength={CONSTANTS.ADDRESS_MAX_LENGTH}
            />

            <InputBox
              inputHeader={contactInfo.postalCode}
              value={postalCode.value}
              placeholder={contactInfo.typePostalCode}
              onChangeText={(txt: any) =>
                setPostalCode({value: txt, error: ''})
              }
              keyboardType="numeric"
              autoFocus={false}
              // maxLength={10}
            />
            <View style={styles.conditionContainer}>
              {/* <Image
              resizeMode="stretch"
              source={isChecked ? IMAGES.ic_checked : IMAGES.ic_unchecked}
              style={{
                height: 25,
                width: 25,
              }}
            /> */}

              <CheckBox
                onClick={setCheckValue}
                isChecked={isChecked}
                checkBoxColor={COLORS.darkOrange}
                uncheckedCheckBoxColor={COLORS.darkOrange}
                style={{paddingRight: responsivePixels.size10}}
                // checkedImage={
                //   <Image
                //     source={IMAGES.ic_check}
                //     style={{
                //       height: responsivePixels.size15,
                //       width: responsivePixels.size15,
                //     }}
                //   />
                // }
                // unCheckedImage={
                //   <Image
                //     source={IMAGES.ic_unchecked}
                //     style={{
                //       height: responsivePixels.size21,
                //       width: responsivePixels.size21,
                //     }}
                //   />
                // }
              />
              <Text style={styles.conditionText}>
                {STRINGS.contactInfo.useAboveBilling}
              </Text>
            </View>
            {/* {isChecked && ( */}
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
            {/* )} */}
          </ScrollView>
        </View>

        <View style={styles.footerView}>
          <MainButton
            title={btnClear}
            titleTextStyle={styles.footerButtonTitle}
            onPress={() => onClearPress()}
            mainStyle={[
              styles.footerButton,
              {backgroundColor: COLORS.silverSand},
            ]}
          />

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
    </TouchableOpacity>
  );
};

export default ContactInfoScreen;
