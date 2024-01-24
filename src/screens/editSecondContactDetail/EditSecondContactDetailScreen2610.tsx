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

import COLORS from 'common/colors';
import STRINGS from 'common/strings';
import CONSTANTS from 'common/constants';

import {ContextData} from 'components/globalContext/globalContext';
import MainButton from 'components/button';
import InputBox from 'components/inputBox';

import {AppStackParamList} from 'navigations/AppStack';

import STYLES from './EditSecondContactDetail.styles';

import responsivePixels from 'utils/responsivePixels';
import {
  IRenterDetail,
  ISecondContactDetail,
} from 'screens/contactDetails/ContactDetailsScreen';
import REGEX from 'common/regex';

interface IProps {
  navigation: StackNavigationProp<
    AppStackParamList,
    'EditSecondContactDetailScreen'
  >;
  route: RouteProp<AppStackParamList, 'EditSecondContactDetailScreen'>;
}

const EditSecondContactDetailScreen: FunctionComponent<IProps> = props => {
  const {navigation} = props;
  const {editSecondContactDetail, btnUpdate} = STRINGS;

  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {darkMode},
  } = context;
  const styles = STYLES(theme);

  const secondContactDetail = props.route.params.secondContactDetail;
  console.log('secondContactDetail', secondContactDetail);

  const [secondContactName, setSecondContactName] = useState<any>({
    value: secondContactDetail?.secondary_contact_first_name,
    error: '',
  });
  const [secondContactPhone, setSecondContactPhone] = useState<any>({
    value: secondContactDetail?.secondary_contact_phone,
    error: '',
  });
  const [secondContactEmail, setSecondContactEmail] = useState<any>({
    value: secondContactDetail?.secondary_contact_email,
    error: '',
  });
  const [secondContactInsurance, setSecondContactInsurance] = useState();
  // secondContactDetail.secondContactInsurance,
  const [sizeTypeUnit, setSizeTypeUnit] = useState();
  // secondContactDetail.sizeType,

  const updateRenterData: ISecondContactDetail = {
    // secondContactName: secondContactName,
    // secondContactPhone: secondContactPhone,
    // secondContactEmail: secondContactEmail,
    // secondContactInsurance: secondContactInsurance,
    // sizeType: sizeTypeUnit,
    ...secondContactDetail,
    secondary_contact_first_name: secondContactName,
    secondary_contact_phone: secondContactPhone,
    secondary_contact_email: secondContactEmail,
  };

  console.log('updateRenterData------------>2', updateRenterData);

  const checkValidate = (regex: any, checkData: any) => {
    console.log('regex', regex, 'checkData', checkData);
    const regexValidate = regex.test(checkData);
    if (!checkData) return "Filed can't be empty";
    if (!regexValidate) return 'Please enter a valid data';
    return '';

    // const regexValidate = regex.test(checkData);
    // if (regexValidate) {
    //   return '';
    // } else {
    //   // console.log('Invalid Data');
    //   return 'Please Enter Valid Data';
    // }
  };

  const onUpdatePress = () => {
    const renterNameError = checkValidate(
      REGEX.username,
      secondContactName.value,
    );

    const conNumberError = checkValidate(
      REGEX.contactNumber,
      secondContactPhone.value,
    );
    const emailError = checkValidate(REGEX.email, secondContactEmail.value);

    if (renterNameError || conNumberError || emailError) {
      setSecondContactName({...secondContactName, error: renterNameError});

      setSecondContactPhone({...secondContactPhone, error: conNumberError});
      setSecondContactEmail({...secondContactEmail, error: emailError});

      return;
    }

    // if (
    //   secondContactName != '' &&
    //   secondContactEmail != '' &&
    //   secondContactPhone != '' &&
    //   secondContactInsurance != '' &&
    //   sizeTypeUnit != ''
    // ) {

    console.log('updateRenterDetails------------>2-update', updateRenterData);

    navigation.navigate(CONSTANTS.CONTACT_DETAILS_SCREEN, {
      updateRenterData: updateRenterData,
    });
    // }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}>
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
            {editSecondContactDetail.editSecondContactDetailHeader}
          </Text>

          <InputBox
            inputHeader={
              editSecondContactDetail.editSecondContactNameInputLabel
            }
            value={secondContactName.value}
            placeholder={
              editSecondContactDetail.editTypeSecondContactNameInputLabel
            }
            onChangeText={(txt: any) =>
              setSecondContactName({value: txt, error: ''})
            }
            inputStyle={styles.inputStyle}
            keyboardType="name-phone-pad"
            autoFocus={true}
            isError={secondContactName.error}
            errorMesage={secondContactName.error}
          />

          <InputBox
            inputHeader={
              editSecondContactDetail.editSecondContactPhoneInputLabel
            }
            value={secondContactPhone.value}
            placeholder={
              editSecondContactDetail.editTypeSecondContactPhoneInputLabel
            }
            onChangeText={(txt: any) =>
              setSecondContactPhone({value: txt, error: ''})
            }
            inputStyle={styles.inputStyle}
            keyboardType="phone-pad"
            // maxLength={10}
            isError={secondContactPhone.error}
            errorMesage={secondContactPhone.error}
          />

          <InputBox
            inputHeader={
              editSecondContactDetail.editSecondContactEmailInputLabel
            }
            value={secondContactEmail.value}
            placeholder={
              editSecondContactDetail.editTypeSecondContactEmailInputLabel
            }
            onChangeText={(txt: any) =>
              setSecondContactEmail({value: txt, error: ''})
            }
            inputStyle={styles.inputStyle}
            keyboardType="email-address"
            isError={secondContactEmail.error}
            errorMesage={secondContactEmail.error}
          />

          <InputBox
            inputHeader={
              editSecondContactDetail.editSecondContactInsuranceInputLabel
            }
            value={
              secondContactInsurance ||
              secondContactDetail.secondContactInsurance
            }
            placeholder={
              editSecondContactDetail.editTypeSecondContactInsuranceInputLabel
            }
            onChangeText={(txt: any) => setSecondContactInsurance(txt)}
            inputStyle={styles.inputStyle}
            keyboardType="default"
          />

          <InputBox
            inputHeader={editSecondContactDetail.editSecondSizeTypeInputLabel}
            value={sizeTypeUnit || secondContactDetail.sizeType}
            placeholder={
              editSecondContactDetail.editTypeSecondSizeTypeInputLabel
            }
            onChangeText={(txt: any) => setSizeTypeUnit(txt)}
            inputStyle={styles.inputStyle}
            keyboardType="default"
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
export default EditSecondContactDetailScreen;
