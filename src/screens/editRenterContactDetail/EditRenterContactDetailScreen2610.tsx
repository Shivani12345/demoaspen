import React, {FunctionComponent, useContext, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {IContext} from 'interfaces/common';

import STRINGS from 'common/strings';
import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';

import MainButton from 'components/button';
import InputBox from 'components/inputBox';
import {ContextData} from 'components/globalContext/globalContext';

import {AppStackParamList} from 'navigations/AppStack';

import STYLES from './EditRenterContactDetail.styles';

import responsivePixels from 'utils/responsivePixels';
import {formatPhoneNumber} from 'utils/functions';

import {IRenterDetail} from 'screens/contactDetails/ContactDetailsScreen';
import REGEX from 'common/regex';

interface IProps {
  navigation: StackNavigationProp<
    AppStackParamList,
    'EditRenterContactDetailScreen'
  >;
  route: RouteProp<AppStackParamList, 'EditRenterContactDetailScreen'>;
}

const EditRenterContactDetailScreen: FunctionComponent<IProps> = props => {
  const {navigation} = props;
  const {editRenterContactDetail, btnUpdate} = STRINGS;

  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {darkMode},
  } = context;
  const styles = STYLES(theme);

  const renterDetail = props.route.params.renterDetail;
  console.log('renterDetail', renterDetail);

  const [renterName, setRenterName] = useState<any>({
    value: renterDetail?.renter_first_name,
    error: '',
  });
  const [address, setAddress] = useState<any>({
    value: renterDetail?.renter_address_line_1,
    error: '',
  });
  const [emailAddress, setEmailAddress] = useState<any>({
    value: renterDetail?.renter_email,
    error: '',
  });
  const [billingAddress, setBillingAddress] = useState<any>({
    value: renterDetail?.billing_address,

    error: '',
  });
  const [phoneNumber, setPhoneNumber] = useState<any>({
    value: renterDetail?.renter_phone,
    error: '',
  });

  console.log('renterName', renterName);

  const updateRenterData: IRenterDetail = {
    // renterName: renterName,
    // renterAddress: address,
    // renterPhone: phoneNumber,
    // renterEmail: emailAddress,
    // renterBillingAddress: billingAddress,
    ...renterDetail,
    renter_first_name: renterName.value,
    renter_address_line_1: address.value,
    renter_phone: phoneNumber.value,
    renter_email: emailAddress.value,
    billing_address: billingAddress.value,
  };

  console.log('updateRenterData------>', updateRenterData);

  const checkValidate = (regex: any, checkData: any) => {
    console.log('regex', regex, 'checkData', checkData);
    const regexValidate = regex.test(checkData);
    if (!checkData) return "Filed can't be empty";
    if (!regexValidate) return 'Please enter a valid data';
    return '';
  };

  const onUpdatePress = () => {
    const renterNameError = checkValidate(REGEX.username, renterName.value);
    const addressError = checkValidate(REGEX.username, address.value);
    const conNumberError = checkValidate(
      REGEX.contactNumber,
      phoneNumber.value,
    );
    const emailError = checkValidate(REGEX.email, emailAddress.value);
    const billingAddressError = checkValidate(
      REGEX.username,
      billingAddress.value,
    );

    if (
      renterNameError ||
      addressError ||
      conNumberError ||
      emailError ||
      billingAddressError
    ) {
      setRenterName({...renterName, error: renterNameError});
      setAddress({...address, error: addressError});
      setPhoneNumber({...phoneNumber, error: conNumberError});
      setEmailAddress({...emailAddress, error: emailError});
      setBillingAddress({...billingAddress, error: billingAddressError});
      return;
    }

    console.log('updateRenterData------>', updateRenterData);

    navigation.navigate(CONSTANTS.CONTACT_DETAILS_SCREEN, {
      updateRenterData: updateRenterData,
    });
    // }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
      style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={responsivePixels.size84}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.secondContactInfo}>
            {editRenterContactDetail.editRenterContactDetailHeader}
          </Text>

          <InputBox
            inputHeader={
              editRenterContactDetail.editRenterContactNameInputLabel
            }
            value={renterName.value}
            placeholder={
              editRenterContactDetail.editTypeRenterContactNameInputLabel
            }
            onChangeText={(txt: any) => setRenterName({value: txt, error: ''})}
            inputStyle={styles.inputStyle}
            keyboardType="name-phone-pad"
            autoFocus={true}
            isError={renterName.error}
            errorMesage={renterName.error}
          />

          <InputBox
            inputHeader={
              editRenterContactDetail.editRenterContactAddressInputLabel
            }
            value={address.value}
            placeholder={
              editRenterContactDetail.editTypeRenterContactAddressInputLabel
            }
            onChangeText={(txt: any) => setAddress({value: txt, error: ''})}
            inputStyle={styles.inputStyle}
            keyboardType="default"
            isError={address.error}
            errorMesage={address.error}
          />

          <InputBox
            inputHeader={
              editRenterContactDetail.editRenterContactPhoneInputLabel
            }
            // value={phoneNumber || formatPhoneNumber(renterDetail.renterPhone)}
            value={phoneNumber.value}
            placeholder={
              editRenterContactDetail.editTypeRenterContactPhoneInputLabel
            }
            onChangeText={(txt: any) => setPhoneNumber({value: txt, error: ''})}
            inputStyle={styles.inputStyle}
            keyboardType="number-pad"
            maxLength={10}
            isError={phoneNumber.error}
            errorMesage={phoneNumber.error}
          />

          <InputBox
            inputHeader={
              editRenterContactDetail.editRenterContactEmailInputLabel
            }
            value={emailAddress.value}
            placeholder={
              editRenterContactDetail.editTypeRenterContactEmailInputLabel
            }
            onChangeText={(txt: any) =>
              setEmailAddress({value: txt, error: ''})
            }
            inputStyle={styles.inputStyle}
            keyboardType="email-address"
            isError={emailAddress.error}
            errorMesage={emailAddress.error}
          />

          <InputBox
            inputHeader={
              editRenterContactDetail.editRenterContactBillingAddressInputLabel
            }
            value={billingAddress.value}
            placeholder={
              editRenterContactDetail.editTypeRenterContactBillingAddressInputLabel
            }
            onChangeText={(txt: any) =>
              setBillingAddress({value: txt, error: ''})
            }
            inputStyle={styles.inputStyle}
            keyboardType="default"
            isError={billingAddress.error}
            errorMesage={billingAddress.error}
          />

          <View style={styles.footerView}>
            <MainButton
              title={btnUpdate}
              titleTextStyle={styles.footerButtonTitle}
              mainStyle={[styles.footerButton]}
              onPress={() => onUpdatePress()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};
export default EditRenterContactDetailScreen;
