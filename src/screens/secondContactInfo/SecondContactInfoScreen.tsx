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
import FastImage from 'react-native-fast-image';

import {IContext} from 'interfaces/common';

import STRINGS from 'common/strings';
import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';
import IMAGES from 'common/images';

import MainButton from 'components/button';
import InputBox from 'components/inputBox';
import {ContextData} from 'components/globalContext/globalContext';

import {AppStackParamList} from 'navigations/AppStack';

import STYLES from './SecondContactInfo.styles';

import DATA from 'utils/data';
import responsivePixels from 'utils/responsivePixels';
import common from 'common/common.styles';
import REGEX from 'common/regex';

import {toastRef} from 'components/globalContext/globalContext';
import {API, METHODS, STATUS_CODE} from 'services/apiConfig';
import {apiCall, API_Call_With_Out_Token} from 'services/api';
import {
  checkValidate,
  ConvertEmptyString,
  validateContactForm,
  validateEmailForm,
  validateFnameForm,
  validateLnameForm,
  validateRelationForm,
} from 'utils/functions';
import {useIsFocused} from '@react-navigation/native';
import RenderDropDown from 'components/renderDropDown';

interface IProps {
  route: any;
  navigation: StackNavigationProp<AppStackParamList, 'SecondContactInfoScreen'>;
}

const SecondContactInfoScreen: FunctionComponent<IProps> = props => {
  const focus = useIsFocused();
  const {navigation} = props;
  const {secondContactInfo, btnClear, btnSubmit, select} = STRINGS;

  const context: IContext = useContext(ContextData);
  const scrollViewRef = useRef(null);
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const emailRef = useRef(null);
  const contactRef = useRef(null);
  const {
    theme,
    commonContext: {
      darkMode,
      infoData,
      licenseImg,
      storageSize,
      insurance,
      documentImg,
    },
  } = context;
  const styles = STYLES(theme);

  const ValObj = {value: '', error: ''};
  const [loading, setLoading] = useState(false);
  const [relationship, setRelationship] = useState({
    value: DATA.Relationship[0].title,
    error: '',
  });

  const [firstName, setFirstName] = useState<any>(ValObj);
  const [middleName, setMiddleName] = useState<any>(ValObj);
  const [lastName, setLastName] = useState<any>(ValObj);
  const [scrollY, setScrollY] = useState(0);
  const [contactNumber, setContactNumber] = useState<any>({
    value: '',
    error: '',
  });

  const [emailAddress, setEmailAddress] = useState<any>(ValObj);

  useEffect(() => {
    // whenever you are in the current screen, it will be true vice versa
    if (focus == true) {
      // if condition required here because it will call the function even when you are not focused in the screen as well, because we passed it as a dependencies to useEffect hook
      console.log('infoData', infoData);
      setDefaultData(infoData);
    }
  }, [focus]);

  const setDefaultData = (infoData: any) => {
    if (infoData?.secondary_contact_first_name) {
      console.log('secondyessinfoData', infoData);

      setFirstName({value: infoData.secondary_contact_first_name, error: ''});
      setMiddleName({value: infoData.secondary_contact_middle_name, error: ''});
      setLastName({value: infoData.secondary_contact_last_name, error: ''});
      setContactNumber({value: infoData.secondary_contact_phone, error: ''});
      setEmailAddress({value: infoData.secondary_contact_email, error: ''});
      setRelationship({
        value: infoData.secondary_contact_relationship,
        error: '',
      });
    }
  };

  // clear all form detail
  const onClearPress = () => {
    setFirstName(ValObj);
    setMiddleName(ValObj);
    setLastName(ValObj);
    setContactNumber(ValObj);
    setEmailAddress(ValObj);
    setRelationship({value: DATA.Relationship[0].title, error: ''});
  };

  // call funcation when press submit button
  const onSubmitPress = async () => {
    // form validate conditions
    if (
      validateFnameForm(firstName.value) ||
      validateLnameForm(lastName.value) ||
      validateContactForm(contactNumber.value) ||
      validateEmailForm(emailAddress.value) ||
      validateRelationForm(relationship.value)
    ) {
      setFirstName({...firstName, error: validateFnameForm(firstName.value)});
      setLastName({...lastName, error: validateLnameForm(lastName.value)});
      setContactNumber({
        ...contactNumber,
        error: validateContactForm(contactNumber.value),
      });
      setEmailAddress({
        ...emailAddress,
        error: validateEmailForm(emailAddress.value),
      });
      setRelationship({
        ...relationship,
        error: validateRelationForm(relationship.value),
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

    setLoading(true);

    const data = {
      secondary_contact_first_name: firstName.value,
      secondary_contact_last_name: lastName.value,
      secondary_contact_email: emailAddress.value,
      secondary_contact_relationship: relationship.value,
      secondary_contact_phone: contactNumber.value,
      id_proof_image: documentImg,
      id_proof_number: props.route.params?.contactInfoData.id_proof_number,
      iunit_id: storageSize.storageUnitId,
      insurance_coverage_id: insurance.insuranceCoverageId,
    };

    console.log('API infoData---->', infoData);

    if (infoData?.iTenantID) {
      data.iTenantID = infoData?.tenant_id;
      data.sGateCode = infoData?.gate_code;
    }

    const contactInfoData = {
      ...ConvertEmptyString(props.route.params?.contactInfoData),
      ...ConvertEmptyString(data),
    };

    console.log('API DATA-data---->', contactInfoData);

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

        // navigate to contact detail screen
        navigation.navigate(CONSTANTS.CONTACT_DETAILS_SCREEN, {
          contactInfoData: ResponseJson_Data,
        });
      } else if (ResponseJson?.code == STATUS_CODE.unauthorized) {
        setLoading(false);
        console.log('unauthorizedd', API_Data);
      } else {
        setLoading(false);
        console.log('ERRORR', ResponseJson);
      }
    } catch (error) {
      setLoading(false);
      console.log('Catch error', error);
    }
  };

  // function of error scroll wherever occurred
  const eventErrorScroll = (textInputRef: any, position: number) => {
    console.log('referencereference', position);
    if (scrollViewRef.current && textInputRef.current) {
      if (textInputRef == emailAddress) {
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
          onLayout={event => {
            setScrollY(event.nativeEvent.layout.height);
            console.log('heeee', event.nativeEvent.layout);
          }}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.secondContactInfo}>
            {secondContactInfo.secondContactInfo}
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

            {relationship.error && (
              <Text style={styles.requiredIcon}> {relationship.error}</Text>
            )}
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
        </ScrollView>

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
            title={btnSubmit}
            titleTextStyle={styles.footerButtonTitle}
            onPress={() => onSubmitPress()}
            mainStyle={[
              styles.footerButton,
              {marginLeft: responsivePixels.size20},
            ]}
            loading={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default SecondContactInfoScreen;
