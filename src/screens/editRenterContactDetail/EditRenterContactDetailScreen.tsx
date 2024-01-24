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

import CheckBox from 'react-native-check-box';
import {StackNavigationProp} from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RouteProp} from '@react-navigation/native';

import Modal from 'react-native-modal';

import {IContext} from 'interfaces/common';

import MainButton from 'components/button';
import {ContextData, toastRef} from 'components/globalContext/globalContext';
import InputBox from 'components/inputBox';

import {AppStackParamList} from 'navigations/AppStack';

import STRINGS from 'common/strings';
import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';

import responsivePixels from 'utils/responsivePixels';

import STYLES from '../contactDetails/ContactDetails.styles';
import REGEX from 'common/regex';
import common from 'common/common.styles';
import {
  changeDateFormat,
  checkValidate,
  ConvertEmptyString,
  formatDateToString,
  isIOS,
  isNullValue,
  maxDate,
  sendDateFormat,
} from 'utils/functions';
import {API_Call_With_Out_Token} from 'services/api';
import {API, METHODS, STATUS_CODE} from 'services/apiConfig';
import RenderDropDown from 'components/renderDropDown';


interface IProps {
  navigation: StackNavigationProp<
    AppStackParamList,
    'EditRenterContactDetailScreen'
  >;
  route: RouteProp<AppStackParamList, 'EditRenterContactDetailScreen'>;
}

const EditRenterContactDetailScreen: FunctionComponent<IProps> = props => {
  const {navigation} = props;
  const {contactInfo, editRenterContactDetail, btnUpdate, btnOk} = STRINGS;

  const renterDetail: any = ConvertEmptyString(props.route.params.renterDetail);

  console.log('renterDetail', renterDetail);

  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {darkMode},
    isCheckedAddress,
  } = context;
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

  const styles = STYLES(theme);
  const ValObj = {value: '', error: ''};
  const [firstName, setFirstName] = useState<any>({
    value: renterDetail?.renter_first_name,
    error: '',
  });
  const [middleName, setMiddleName] = useState<any>({
    value: renterDetail?.renter_middle_name,
    error: '',
  });
  const [lastName, setLastName] = useState<any>({
    value: renterDetail?.renter_last_name,
    error: '',
  });
  const [contactNumber, setContactNumber] = useState<any>({
    value: renterDetail?.renter_phone,
    error: '',
  });
  const [licenseNo, setLicenseNo] = useState<any>({
    value: isNullValue(renterDetail?.id_proof_number),
    error: '',
  });
  const [emailAddress, setEmailAddress] = useState<any>({
    value: renterDetail?.renter_email,
    error: '',
  });
  const [address1, setAddress1] = useState<any>({
    value: isNullValue(renterDetail?.renter_address_line_1),
    error: '',
  });
  const [address2, setAddress2] = useState<any>({
    value: isNullValue(renterDetail?.renter_address_line_2),
    error: '',
  });
  const [country, setCountry] = useState<any>({
    value: isNullValue(renterDetail?.renter_country),
    error: '',
  });
  const [state, setState] = useState<any>({
    value: isNullValue(renterDetail?.renter_state),
    error: '',
  });
  const [city, setCity] = useState<any>({
    value: isNullValue(renterDetail?.renter_city),
    error: '',
  });
  const [postalCode, setPostalCode] = useState<any>({
    value: isNullValue(renterDetail?.renter_postel_code),
    error: '',
  });
  const [showModal, setShowModal] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [maximumDate, setMaximumDate] = useState<any>();

  // Outputs: "26-10-2023"

  const [date, setDate] = useState<any>({
    value: changeDateFormat(renterDetail?.renter_dob),
    error: '',
  });

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [billingAddress, setBillingAddress] = useState<any>({
    value: renterDetail?.billing_address,
    error: '',
  });
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(false);
  // const firstNameRef = useRef<TextInput | null>(null);
  // const middleNameRef = useRef<TextInput | null>(null);
  const [StateLists, setStateLists] = useState<any>([]);

  useEffect(() => {
    setIsChecked(isCheckedAddress);
    setBillingAddress({
      value: billingAddress.value,
      error: '',
    });
    const maxDateValue = maxDate();

    setMaximumDate(maxDateValue);
  }, []);

  const onUpdatePress = async () => {
    const fNameError = checkValidate(
      REGEX.username,
      firstName.value,
      contactInfo.firstName,
    );
    const midNameError = checkValidate(
      REGEX.username,
      middleName.value,
      contactInfo.middleName,
    );
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
      setFirstName({...firstName, error: fNameError});
      // setMiddleName({...middleName, error: midNameError});
      setLastName({...lastName, error: lNameError});
      setContactNumber({...contactNumber, error: conNumberError});
      setEmailAddress({...emailAddress, error: emailError});
      setDate({...date, error: dateError});
      setLicenseNo({...licenseNo, error: licenseError});
      setBillingAddress({...billingAddress, error: billingAddressError});
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
        eventErrorScroll(licNumRef, scrollY + 250);

        return;
      }

      if (billingAddressError) {
        eventErrorScroll(billingAddressRef, scrollY);
        return;
      }
    }
    setLoading(true);
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
      iTenantID: renterDetail?.tenant_id,
      sGateCode: renterDetail?.gate_code,
      id_proof_number: licenseNo.value,
    };
    console.log('UPDATEDATA', data);
    const contactInfoData = {
      ...renterDetail,
      ...data,
    };

    console.log('data', contactInfoData);

    var formData = new FormData();
    Object.entries(contactInfoData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log('formData', JSON.stringify(formData));

    try {
      let API_Data = await API_Call_With_Out_Token(
        API.CREATE_CUSTOMER,
        formData,
        METHODS.POST,
      );

      let ResponseJson = API_Data.ResponseJson;
      var ResponseJson_Data = ResponseJson?.data;
      console.log('response apiCallPrivacyPolicy', JSON.stringify(API_Data));

      if (API_Data?.code == STATUS_CODE.noInternet) {
        toastRef.current.error(STRINGS.errorNoNetwork);
        // this.validationError(STRINGS.Error_No_Network);
        setLoading(false);
      } else if (ResponseJson?.code == STATUS_CODE.success) {
        //! Response Success
        setLoading(false);
        console.log('ResponseJson_Data.data', ResponseJson_Data);

        //  navigation.navigate(CONSTANTS.CONTACT_DETAILS_SCREEN,);

        navigation.navigate(CONSTANTS.CONTACT_DETAILS_SCREEN, {
          contactInfoData: ResponseJson_Data,
        });
        // setData(ResponseJson_Data.description_en);
      } else if (ResponseJson?.code == STATUS_CODE.unauthorized) {
        console.log('unauthorizedd', API_Data?.msg);
        toastRef.current.error(API_Data?.msg);
        setLoading(false);
        //Toast.callToast('dfewdf',CONSTANTS.ERROR)
      } else {
        setLoading(false);
        console.log('ERRORR', ResponseJson?.msg);
        toastRef.current.error(ResponseJson?.msg);
      }
    } catch (error) {
      // toastRef.current.error(error);
      setLoading(false);
      console.log('Catch error', error);
      // this.validationError();
    }

    // }
  };
  const eventErrorScroll = (textInputRef: any, position: number) => {
    console.log('referencereference', position);
    if (scrollViewRef.current && textInputRef.current) {
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
    }
  };
  const setCheckValue = () => {
    // setIsChecked(!isChecked);
    const addressBilling =
      address1.value +
        ' ' +
        address2.value +
        ' ' +
        country.value +
        ' ' +
        state.value ==
      'Please Select'
        ? ''
        : state.value + ' ' + city.value + ' ' + postalCode.value;

    let allElementsAreSpaces = true;
    for (let i = 0; i < addressBilling.length; i++) {
      if (addressBilling[i] !== ' ') {
        allElementsAreSpaces = false;
        break;
      }
    }

    // if (!allElementsAreSpaces) {
    //   setIsChecked(!isChecked);
    // } else if (isChecked) {
    //   setIsChecked(false);
    // }

    // if (!isChecked && addressBilling.length > 0 && !allElementsAreSpaces) {
    //   console.log('ischecked---->', isChecked);

    //   setBillingAddress({
    //     value: addressBilling,
    //     error: '',
    //   });
    // } else {
    //   console.log(' not ischecked---->', isChecked);
    //   setBillingAddress(ValObj);
    // }
  };

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
  };

  const hideDatePicker = () => {
    setShowModal(false);
    !date.value && handleDateChange({type:'set'}, new Date());
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    if (event.type === 'set') {
      console.log('Selected Date:', selectedDate);

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
    setShowDatePicker(false); // Hide the date picker
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <KeyboardAvoidingView
        // style={styles.keyboardAvoidingView}
        style={{flex: 1}}
        // keyboardVerticalOffset={0}
        // behavior={Platform.OS === 'android' ? 'height' : undefined}
        keyboardVerticalOffset={responsivePixels.size84}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text
          // style={styles.yourContactInfo}
          style={{
            ...common.font_24_28_13,
            fontWeight: '500',
            color: COLORS.ebonyClay,
            marginTop: responsivePixels.size25,
          }}>
          {editRenterContactDetail.editRenterContactDetailHeader}
        </Text>

        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onLayout={event => {
            setScrollY(event.nativeEvent.layout.height);
            console.log('heeee', event.nativeEvent.layout);
          }}
          style={{marginBottom: responsivePixels.size80}}>
          <InputBox
            refInput={fnameRef}
            inputHeader={contactInfo.firstName}
            value={firstName.value}
            placeholder={contactInfo.typeFirstName}
            onChangeText={(txt: any) => setFirstName({value: txt, error: ''})}
            keyboardType="name-phone-pad"
            autoFocus={true}
            isRequired={true}
            isError={firstName.error}
            errorMesage={firstName.error}
            maxLength={CONSTANTS.NAME_MAX_LENGTH}
          />

          <InputBox
            refInput={lnameRef}
            inputHeader={contactInfo.lastName}
            value={lastName.value}
            placeholder={contactInfo.typeLastName}
            onChangeText={(txt: any) => setLastName({value: txt, error: ''})}
            keyboardType="name-phone-pad"
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
            maxLength={CONSTANTS.CONTACT_NUMBER_MAX_LENGTH}
            isRequired={true}
            isError={contactNumber.error}
            errorMesage={contactNumber.error}
          />

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
              // value={new Date()}
              value={
                date.value === '' ? new Date() : formatDateToString(date.value)
              }
              mode="date"
              is24Hour={true}
              positiveButtonLabel={btnOk}
              display={isIOS() ? 'spinner' : 'default'}
              onChange={handleDateChange}
              // maximumDate={new Date()}
              maximumDate={new Date(maximumDate)}
            />
          )}
          <InputBox
            refInput={licNumRef}
            inputHeader={contactInfo.licenseNumber}
            value={licenseNo.value}
            placeholder={contactInfo.typeLicenseNumber}
            onChangeText={(txt: any) => setLicenseNo({value: txt, error: ''})}
            keyboardType="default"
            autoFocus={false}
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

          <RenderDropDown // Dropdown Component
            setState={setState}
            StateLists={StateLists}
            state={state}
            contactInfo={contactInfo}
            labelField="state_name_en"
            valueField="state_name_en"
            ref={stateRef}
            setStateLists={setStateLists}
            infoData={""}
          />

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

          <InputBox
            inputHeader={contactInfo.postalCode}
            value={postalCode.value}
            placeholder={contactInfo.typePostalCode}
            onChangeText={(txt: any) => setPostalCode({value: txt, error: ''})}
            keyboardType="default"
            autoFocus={false}
            // maxLength={10}
          />
          <View
            // style={styles.conditionContainer}
            style={{flexDirection: 'row', marginVertical: 5}}>
            <CheckBox
              onClick={setCheckValue}
              isChecked={isChecked}
              checkBoxColor={COLORS.darkOrange}
              uncheckedCheckBoxColor={COLORS.darkOrange}
            />

            <Text
              // style={styles.conditionText}
              style={{
                paddingTop: responsivePixels.size2,
                paddingRight: responsivePixels.size20,
                marginLeft: responsivePixels.size12,
                color: COLORS.ebonyClayHex,
                ...common.font_14_20_RR,
                fontWeight: '400',
              }}>
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
            keyboardType="name-phone-pad"
            containerStyle={{
              height: responsivePixels.size75,
              alignItems: 'flex-start',
            }}
            inputStyle={{alignSelf: 'flex-start'}}
            isRequired={false}
            multiline={true}
            editable={isChecked ? false : true}
            maxLength={CONSTANTS.BILLING_ADDRESS_MAX_LENGTH}
            isError={billingAddress.error}
            errorMesage={billingAddress.error}
          />
          {/* )} */}
        </ScrollView>
        <View
          // style={styles.footerView}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            alignItems: 'flex-end',
            paddingHorizontal: responsivePixels.size20,
            paddingBottom: responsivePixels.size20,
          }}>
          <MainButton
            title={btnUpdate}
            titleTextStyle={styles.footerButtonTitle}
            mainStyle={[styles.footerButton]}
            onPress={() => onUpdatePress()}
            loading={loading}
          />
        </View>
      </KeyboardAvoidingView>

      <Modal
        transparent={true}
        backdropOpacity={0.7}
        backdropColor="#000"
        animationType="slide"
        isVisible={showModal}
        onRequestClose={hideDatePicker}>
        <View
          // style={styles.modal}
          style={{
            backgroundColor: COLORS.white,
            borderRadius: responsivePixels.size10,
          }}>
          <DateTimePicker
            // value={selectedDate}
            value={
              date.value === '' ? new Date() : formatDateToString(date.value)
            }
            mode="date"
            is24Hour={true}
            display="spinner"
            positiveButtonLabel={btnOk}
            onChange={handleDateChange}
            // maximumDate={new Date()}
            maximumDate={new Date(maximumDate)}
          />
          <Button title="Close" onPress={hideDatePicker} />
        </View>
      </Modal>
    </View>
  );
};

export default EditRenterContactDetailScreen;
