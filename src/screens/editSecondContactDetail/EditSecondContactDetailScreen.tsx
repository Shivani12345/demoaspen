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
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';

import SelectDropdown from 'react-native-select-dropdown';
import {StackNavigationProp} from '@react-navigation/stack';

import {IContext} from 'interfaces/common';

import STRINGS from 'common/strings';
import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';

import MainButton from 'components/button';
import InputBox from 'components/inputBox';
import {ContextData} from 'components/globalContext/globalContext';

import {AppStackParamList} from 'navigations/AppStack';

import STYLES from '../secondContactInfo/SecondContactInfo.styles';

import responsivePixels from 'utils/responsivePixels';
import REGEX from 'common/regex';

import {toastRef} from 'components/globalContext/globalContext';
import {API, METHODS, STATUS_CODE} from 'services/apiConfig';
import {apiCall, API_Call_With_Out_Token} from 'services/api';
import {
  checkValidate,
  ConvertEmptyString,
  validateContactForm,
  validateDOBForm,
  validateEmailForm,
  validateFnameForm,
  validateLnameForm,
} from 'utils/functions';
import DATA from 'utils/data';
import FastImage from 'react-native-fast-image';
import IMAGES from 'common/images';
import RenderDropDown from 'components/renderDropDown';


interface IProps {
  route: any;
  navigation: StackNavigationProp<AppStackParamList, 'SecondContactInfoScreen'>;
}

const SecondContactInfoScreen: FunctionComponent<IProps> = props => {
  const {navigation} = props;
  const {secondContactInfo, editSecondContactDetail, btnUpdate} = STRINGS;

  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {darkMode},
  } = context;
  const scrollViewRef = useRef(null);
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const emailRef = useRef(null);
  const contactRef = useRef(null);
  const styles = STYLES(theme);

  const secondContactDetail = ConvertEmptyString(
    props.route.params.secondContactDetail,
  );

  console.log('secondContactDetail', secondContactDetail);

  const [loading, setLoading] = useState(false);
  // const contactINfoData = props.route.params?.contactInfoData;
  // console.log('contactINfoData', contactINfoData);

  const [relationship, setRelationship] = useState<any>({
    value: secondContactDetail.secondary_contact_relationship,
    error: '',
  });

  const [firstName, setFirstName] = useState<any>({
    value: secondContactDetail.secondary_contact_first_name,
    error: '',
  });
  const [middleName, setMiddleName] = useState<any>({
    value: secondContactDetail.secondary_contact_middle_name,
    error: '',
  });
  const [lastName, setLastName] = useState<any>({
    value: secondContactDetail.secondary_contact_last_name,
    error: '',
  });
  const [contactNumber, setContactNumber] = useState<any>({
    value: secondContactDetail.secondary_contact_phone,
    error: '',
  });

  const [emailAddress, setEmailAddress] = useState<any>({
    value: secondContactDetail.secondary_contact_email,
    error: '',
  });

  const [scrollY, setScrollY] = useState(0);
  const onPressUpdate = async () => {
    if (
      validateFnameForm(firstName.value) ||
      validateLnameForm(lastName.value) ||
      validateEmailForm(emailAddress.value) ||
      validateContactForm(contactNumber.value)
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
    }

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

    setLoading(true);
    const data = {
      secondary_contact_first_name: firstName.value,
      // secondary_contact_middle_name: middleName.value,
      secondary_contact_last_name: lastName.value,
      secondary_contact_email: emailAddress.value,
      secondary_contact_relationship: relationship.value,
      secondary_contact_phone: contactNumber.value,
      iTenantID: secondContactDetail?.tenant_id,
      sGateCode: secondContactDetail?.gate_code,
    };

    const contactInfoData = {
      ...secondContactDetail,
      ...data,
    };

    console.log('secondContactDetail-data', contactInfoData);

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
        setLoading(false);
        // this.validationError(STRINGS.Error_No_Network);
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
  };
  const eventErrorScroll = (textInputRef: any, position: number) => {
    console.log('referencereference', position);
    if (scrollViewRef.current && textInputRef.current) {
      scrollViewRef.current.scrollTo({
        //////===================
        y: position,
        animated: true,
      });
      textInputRef.current.focus();
    }
  };
  const renderDropdownIcon = () => {
    return (
      <FastImage
        source={IMAGES.ic_dropdown}
        style={[styles.renderDropdownIcon]}
        resizeMode="contain"
      />
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={responsivePixels.size84}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollViewRef}
          bounces={false}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          onLayout={event => {
            setScrollY(event.nativeEvent.layout.height);
            console.log('heeee', event.nativeEvent.layout);
          }}>
          <View>
            <Text style={styles.secondContactInfo}>
              {editSecondContactDetail.editSecondContactDetailHeader}
            </Text>

            <InputBox
              refInput={fnameRef}
              inputHeader={secondContactInfo.firstName}
              value={firstName.value}
              placeholder={secondContactInfo.typeFirstName}
              onChangeText={(txt: any) => setFirstName({value: txt, error: ''})}
              keyboardType="default"
              isRequired={true}
              isError={firstName.error}
              errorMesage={firstName.error}
              maxLength={CONSTANTS.NAME_MAX_LENGTH}
            />

            {/* <InputBox
              inputHeader={secondContactInfo.middleName}
              value={middleName.value}
              placeholder={secondContactInfo.typeMiddleName}
              onChangeText={(txt: any) =>
                setMiddleName({value: txt, error: ''})
              }
              keyboardType="default"
              isRequired={true}
              isError={middleName.error}
              errorMesage={middleName.error}
              maxLength={CONSTANTS.NAME_MAX_LENGTH}
            /> */}

            <InputBox
              refInput={lnameRef}
              inputHeader={secondContactInfo.lastName}
              value={lastName.value}
              placeholder={secondContactInfo.typeLastName}
              onChangeText={(txt: any) => setLastName({value: txt, error: ''})}
              keyboardType="default"
              isRequired={true}
              isError={lastName.error}
              errorMesage={lastName.error}
              maxLength={CONSTANTS.NAME_MAX_LENGTH}
            />

            <View style={styles.listDropDown}>
              <Text style={styles.text}>
                {secondContactInfo.relationship}
                <View>
                  <Text style={styles.requiredIcon}> *</Text>
                </View>
              </Text>

              <RenderDropDown // Dropdown Component
                setState={setRelationship}
                StateLists={DATA?.Relationship}
                state={relationship}
                contactInfo={DATA.Relationship[0].title}
                labelField="title"
                valueField="title"
              />

            </View>

            <InputBox
              refInput={contactRef}
              inputHeader={secondContactInfo.contactNumber}
              value={contactNumber.value}
              placeholder={secondContactInfo.typeContactNumber}
              onChangeText={(txt: any) =>
                setContactNumber({value: txt, error: ''})
              }
              keyboardType="phone-pad"
              isRequired={true}
              maxLength={CONSTANTS.CONTACT_NUMBER_MAX_LENGTH}
              isError={contactNumber.error}
              errorMesage={contactNumber.error}
            />

            <InputBox
              refInput={emailRef}
              inputHeader={secondContactInfo.emailAddress}
              value={emailAddress.value}
              placeholder={secondContactInfo.typeEmailAddress}
              onChangeText={(txt: any) =>
                setEmailAddress({value: txt, error: ''})
              }
              keyboardType="email-address"
              isRequired={true}
              isError={emailAddress.error}
              errorMesage={emailAddress.error}
            />
          </View>
        </ScrollView>

        <View style={styles.footerView}>
          <MainButton
            title={btnUpdate}
            titleTextStyle={styles.footerButtonTitle}
            mainStyle={[styles.footerButton]}
            onPress={() => onPressUpdate()}
            loading={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default SecondContactInfoScreen;
