import React, {createRef, useContext, useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import RenderHTML from 'react-native-render-html';
import CheckBox from 'react-native-check-box';
import Modal from 'react-native-modal';

import {IContext} from 'interfaces/common';
import {AppStackParamList} from 'navigations/AppStack';
import {toastRef} from 'components/globalContext/globalContext';
import {useOrientation} from 'utils/useOrientation';

import Clickable from 'components/clickable';
import CustomImage from 'components/customImage';
import {ContextData} from 'components/globalContext/globalContext';

import COLORS from 'common/colors';
import CONSTANTS from 'common/constants';
import IMAGES from 'common/images';
import STRINGS from 'common/strings';

import STYLES from './SignAgreement.style';

import responsivePixels from 'utils/responsivePixels';

import {API, API_CONFIG, INSURANCE_SIGN_AGREEMENT, METHODS, RENTAL_SIGN_AGREEMENT, STATUS_CODE} from 'services/apiConfig';
import {API_Call_With_Out_Token} from 'services/api';
import SignatureScreen from 'react-native-signature-canvas';

import SIZES from 'utils/sizes';
import MainButton from 'components/button';
import Loader from 'components/loader';
import WebView from 'react-native-webview';
interface IProps {
  navigation: StackNavigationProp<AppStackParamList, 'SignAgreement'>;
}

const SignAgreement = (props: IProps) => {
  // const signEmp = useRef(null);
  const signEmp = useRef();
  const {navigation} = props;
  const [isFirst, setIsfirst] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [data, setData] = useState();
  const [signature, setSignature] = useState('' as any);
  const [isAfterInsurance, setIsAfterInsurance] = useState(false);
  const [loading, setLoading] = useState(false);

  const [insuranceAggreementSignature, setInsuranceAggreementSignature] =
    useState('');
  const [contractAggreementSignature, setContractAggreementSignature] =
    useState('');

  const isPortrait = useOrientation();
  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {signInsurance, setSignInsurance, infoData},
  } = context;

  const styles = STYLES({...theme, isPortrait});

  const setCheckValue = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setModalVisible(true);
    }
  };

  // navigate to summary charges
  const navigateToSummaryOfCharges = () => {
    setLoading(true);
    signAgreementAPI();
  };

  const signAgreementAPI = async () => {
    var formData = new FormData();

    formData.append('tenant_id', infoData?.tenant_id);
    formData.append('contract_sign', contractAggreementSignature);
    formData.append('insurance_sign', insuranceAggreementSignature);
    console.log('BODYADATA AGREEMENT', formData);
    try {
      let API_Data = await API_Call_With_Out_Token(
        API.SIGN_AGREEMENT,
        formData,
        METHODS.POST,
      );
      let ResponseJson = API_Data?.ResponseJson;
      var ResponseJson_Data = ResponseJson?.data;
      console.log('response Agreement 88 line no', API_Data);

      if (API_Data?.code == STATUS_CODE.noInternet) {
        toastRef.current.error(STRINGS.errorNoNetwork);
        setLoading(false);
      } else if (ResponseJson?.code == STATUS_CODE.success) {
        //! Response Success
        navigation.navigate(CONSTANTS.PAYMENT_SCREEN, {
          data: ResponseJson_Data,
        });

        setIsChecked(false);

        setIsfirst(false);

        setSignInsurance(false);
        setLoading(false);
      } else if (ResponseJson?.code == STATUS_CODE.unauthorized) {
        console.log('unauthorizedd', API_Data?.msg);
        toastRef.current.error(API_Data?.msg);
        setLoading(false);
      } else {
        toastRef.current.error(API_Data?.msg);
        console.log('ERRORR', API_Data?.msg);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);

      console.log('Error ', err);
    }
  };

  // modal close function
  const onClose = () => {
    console.log('onClose');
    setModalVisible(false);
    setIsChecked(false);
  };

  // API for policy about signature
  const apiCallPrivacyPolicy = async () => {
    try {
      let API_Data = await API_Call_With_Out_Token(
        API.PRIVACYPOLICY_CMS,
        {},
        METHODS.GET,
      );

      let ResponseJson = API_Data?.ResponseJson;
      var ResponseJson_Data = ResponseJson?.data;
      // console.log('response apiCallPrivacyPolicy', API_Data);

      if (API_Data?.code == STATUS_CODE.noInternet) {
        toastRef.current.error(STRINGS.errorNoNetwork);
      } else if (ResponseJson?.code == STATUS_CODE.success) {
        //! Response Success
        setData(ResponseJson_Data.description_en);
      } else if (ResponseJson?.code == STATUS_CODE.unauthorized) {
        console.log('unauthorizedd', API_Data?.msg);
        toastRef.current.error(API_Data?.msg);
      } else {
        toastRef.current.error(API_Data?.msg);
        console.log('ERRORR', API_Data?.msg);
      }
    } catch (error) {
      console.log('Catch error', error);
    }
  };

  useEffect(() => {
    console.log('SignAgreement Page', infoData);
    apiCallPrivacyPolicy();
    console.log('signInsurance', signInsurance);
  }, []);

  // modal submit aggree the aggrement
  const onSubmit = (type: any) => {
    // if (!isFirst)
    setModalVisible(false);
    console.log(
      'onSubmitonSubmit',
      signInsurance,
      insuranceAggreementSignature,
    );
    console.log('onSubmitonSubmitCONNNTNTNT', contractAggreementSignature);

    // if (!isAfterInsurance) {
    //   setIsAfterInsurance(true);
    // }
    setIsChecked(false);
    // isAfterInsurance ? navigateToSummaryOfCharges() : setIsChecked(false);
    if (!isFirst) setIsfirst(true);

    if (isFirst) navigateToSummaryOfCharges();

    if (!signInsurance) {
      setSignInsurance(true);
    }
  };

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = signature => {
    console.log('isFirst Sisssssg', isFirst, signature);
    if (isFirst) setContractAggreementSignature(signature);
    else setInsuranceAggreementSignature(signature);
    // onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log('Empty');
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    signEmp.current.clearSignature();
    console.log('clear success!');
  };

  // Called after end of stroke
  const handleEnd = () => {
    signEmp.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = data => {
    console.log(data);
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.signAgreementText}>
        {isFirst
          ? STRINGS.signAgreements.signContractAgreement
          : STRINGS.signAgreements.signInsuranceAgreement}
      </Text>
      <Text style={styles.text}>{isFirst ? '(2/2)' : '(1/2)'}</Text>

      <View style={styles.agreementContent}>
        <View style={styles.agreementContentContainer}>
          {
            !isFirst ? 
            <WebView source={{uri: API_CONFIG.agreement_url+"en"+INSURANCE_SIGN_AGREEMENT}} style={{flex:1,height:400}} textZoom={200} />:
            <WebView source={{uri: API_CONFIG.agreement_url+"en"+RENTAL_SIGN_AGREEMENT+infoData?.tenant_id}} style={{flex:1,height:400}} textZoom={200} />
          }
          {/* <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: responsivePixels.size25}}>
            <Text style={styles.contentText}>
              {STRINGS.signAgreements.signAgreementContent1}
            </Text>
            <RenderHTML contentWidth={100} source={{html: data}} />
          </ScrollView> */}
        </View>
        <View style={styles.conditionContainer}>
          <CheckBox
            onClick={setCheckValue}
            isChecked={isChecked}
            checkBoxColor={COLORS.darkOrange}
            uncheckedCheckBoxColor={COLORS.darkOrange}
          />

          <Text style={styles.conditionText}>
            {STRINGS.signAgreements.signAgreementCondition}
            {isFirst
              ? STRINGS.signAgreements.signContractAgreement
              : STRINGS.signAgreements.signInsuranceAgreement}
          </Text>
        </View>
      </View>

      {/* aggreement modal of signature */}
      <Modal
        statusBarTranslucent={true}
        deviceHeight={'100%'}
        backdropColor={COLORS.black}
        isVisible={modalVisible}>
        <View style={styles.modalcontainer}>
          <CustomImage
            source={IMAGES.ic_close}
            containerStyle={styles.closeImg}
            onPress={onClose}
          />

          <Text style={styles.addSignText}>
            {STRINGS.signAgreements.addSignature}
          </Text>

          <View
            style={{
              marginHorizontal: 15,
              marginVertical: 10,
              borderWidth: 1,
              borderRadius: 10,
              height: SIZES.deviceHeight / 4,
              width: '90%',
              borderStyle: 'dashed',
              paddingBottom: 2,
            }}>
            {/* {!isFirst ? ( */}
            <SignatureScreen
              scrollable={false}
              ref={signEmp}
              onEnd={handleEnd}
              onOK={handleOK}
              onEmpty={handleEmpty}
              // clearText="Clear"
              // onClear={handleClear}
              onGetData={handleData}
              autoClear={false}
              descriptionText={'asda'}
            />
            {/* )} */}
          </View>

          {/* <CustomImage
            source={IMAGES.ic_sign}
            containerStyle={styles.signImgcontainer}
            imageStyle={styles.imgStyle}
          /> */}
          <MainButton
            mainStyle={styles.resetBtn}
            title={STRINGS.btnReset}
            onPress={() => handleClear()}
            titleTextStyle={styles.resetText}
            // loading={loading}
            disabled={loading}
          />

          <View style={styles.buttonContainer}>
            {/* <Clickable containerStyle={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>{STRINGS.btnClose}</Text>
            </Clickable> */}

            <MainButton
              mainStyle={styles.closeBtn}
              title={STRINGS.btnClose}
              onPress={onClose}
              titleTextStyle={styles.closeText}
            />

            <MainButton
              mainStyle={styles.submitBtn}
              title={STRINGS.btnSubmit}
              onPress={() => onSubmit(isFirst ? 2 : 1)}
              titleTextStyle={styles.submitText}
              loading={loading}
              disabled={loading}
            />

            {/* <Clickable
              containerStyle={styles.submitBtn}
              onPress={() => onSubmit(isFirst ? 2 : 1)}>
              <Text style={styles.submitText}>
                { STRINGS.btnSubmit1}
              </Text>
            </Clickable> */}
          </View>
        </View>
      </Modal>
      {loading && <Loader overScreen={true} size="small" color={COLORS.darkOrange}/>}
    </View>
  );
};

export default SignAgreement;
