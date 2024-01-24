import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  FlatList,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';

import {IContext} from 'interfaces/common';
import {AppStackParamList} from 'navigations/AppStack';

import {useOrientation} from 'utils/useOrientation';
import responsivePixels from 'utils/responsivePixels';

import {ContextData, toastRef} from 'components/globalContext/globalContext';
import CustomImage from 'components/customImage';
import InputBox from 'components/inputBox';
import MainButton from 'components/button';

import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';
import IMAGES from 'common/images';
import STRINGS from 'common/strings';

import STYLES from './SummaryOfCharges.style';
import {
  changeDateFormat,
  currentScreen,
  decryptData,
  encryptData,
  numberFormat,
  todayDateSendFormat,
} from 'utils/functions';
import {API_Call_With_Out_Token, API_Call_With_Out_Token_RAW} from 'services/api';
import {API, METHODS, STATUS_CODE} from 'services/apiConfig';
import common from 'common/common.styles';
import {ActivityIndicator} from 'react-native';

interface IProps {
  navigation: StackNavigationProp<AppStackParamList, 'SummaryOfCharges'>;
}

const SummaryOfCharges = (props: IProps) => {
  const {navigation} = props;
  const {summaryofCharge, btnPayNow, contactDetails} = STRINGS;

  const isPortrait = useOrientation();
  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {
      storageSize,
      insurance,
      infoData,creditCardDetail
    },
  } = context;
  const styles = STYLES({...theme, isPortrait});
  const [paymentSummaryData, setPaymentSummaryData] = useState([]);
  const [promoText, setPromoText] = useState({
    value: '',
    error: '',
    success: '',
  });
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [payNowLoading, setPayNowLoading] = useState(false);

  useEffect(() => {
    currentScreen('SummaryOfCharges');
    apiCallGetChargeSummary('');
    console.log('PROPs ',creditCardDetail)
  
  }, []);

  const apiCallGetChargeSummary = async (promo: any) => {
    // payment-summary?unit_id=43801&insurance_coverage_id=2999&move_in_date=2023-10-27 
    // payment-summary?unit_id=34547&insurance_coverage_id=2998&move_in_date=2024-1-09
    let URL =
      API.PAYMENTSUMMARYDETAILS +
      `?unit_id=${storageSize.storageUnitId}&insurance_coverage_id=${
        insurance.insuranceCoverageId
      }&move_in_date=${todayDateSendFormat()}`;

    if (promo) {
      URL = URL.concat(`&concession_plan_id=${promoText.value}`);
      setLoading(true);
    }
    // URL = "payment-summary?unit_id=43801&insurance_coverage_id=2999&move_in_date=2023-10-27 "
    setDataLoading(true);
    try {
      let API_Data = await API_Call_With_Out_Token(URL, {}, METHODS.GET);

      let ResponseJson = API_Data?.ResponseJson;
      var ResponseJson_Data = ResponseJson?.data;
      console.log('response apiCallGetChargeSummary', API_Data);

      if (API_Data?.code == STATUS_CODE.noInternet) {
        toastRef.current.error(STRINGS.errorNoNetwork);
        setLoading(false);
        setDataLoading(false);
      } else if (ResponseJson?.code == STATUS_CODE.success) {
        setLoading(false);
        setDataLoading(false);
        //! Response Success
        if (ResponseJson_Data.length) {
          setPaymentSummaryData(ResponseJson_Data);
          console.log('tablee', ResponseJson_Data);
        } else {
          console.log('nooo', ResponseJson_Data);
        }
        if (promo) {
          setPromoText({...promoText, success: ResponseJson?.msg});
        }
      } else if (ResponseJson?.code == STATUS_CODE.unauthorized) {
        console.log('unauthorizedd', API_Data?.msg);
        toastRef.current.error(API_Data?.msg);
        setLoading(false);
        setDataLoading(false);
      } else {
        setLoading(false);
        setDataLoading(false);
        if (promo) {
          setPromoText({...promoText, error: ResponseJson?.msg});
        }
        console.log('ERRORR', ResponseJson?.msg);
      }
    } catch (error) {
      setLoading(false);
      setDataLoading(false);
      console.log('Catch error', error);
    }
  };
  const renderItem = (item: any) => {
    return (
      <View>
        <View style={styles.infoComman}>
          <Text style={styles.info1Text}>{item.ChargeDescription}</Text>
          <View style={styles.infoComman}>
            {item.dcDiscount > 0 && (
              <Text style={[styles.info1Value, styles.cutLine]}>
                ${numberFormat(item.ChargeAmount)}
              </Text>
            )}
            <Text style={styles.info1Value}>${numberFormat(item.dcTotal)}</Text>
          </View>
        </View>
        <Text style={styles.dateRange}>
          ({changeDateFormat(item.StartDate)} TO{' '}
          {changeDateFormat(item.EndDate)})
        </Text>
      </View>
    );
  };
  const sumOfarray = () => {
    let sum = 0;
    // Calculation the sum using forEach
    paymentSummaryData.forEach(item => {
      sum += parseFloat(item.dcTotal);
    });
    console.log('sumsum', sum);

    return numberFormat(sum);
  };

  const handlePayNow = async() => {
    let cardData ={
      "credit_card_type": creditCardDetail.cardType,
      "credit_card_number": creditCardDetail.cardNumber,
      "credit_card_cvv": creditCardDetail.cvv,
      "credit_card_expiration_date": creditCardDetail.date,
      "tenant_id": infoData?.tenant_id,
      "unit_id": infoData?.iunit_id,
      "payment_amount": sumOfarray(),
      "insurance_coverage_id": insurance.insuranceCoverageId,
    }
    if(promoText.value){
      cardData.concession_plan_id  = promoText.value
    }
    const cardEncrypt = encryptData(JSON.stringify(cardData))
    console.log('DATA',cardData)
    console.log('DATA',cardEncrypt)
    const Body_Data = JSON.stringify({"request": cardEncrypt})
    try {
      setPayNowLoading(true)
      let API_Data = await API_Call_With_Out_Token_RAW(API.PAY_NOW, Body_Data, METHODS.POST);
      console.log('response apiCallPAYNOW', API_Data);

      let ResponseJson = API_Data?.ResponseJson;
      var ResponseJson_Data = ResponseJson?.data;

      if (API_Data?.code == STATUS_CODE.noInternet) {
        toastRef.current.error(STRINGS.errorNoNetwork);
        setPayNowLoading(false);
      } else if (ResponseJson?.code == STATUS_CODE.success) {
        console.log('*-*-*-*-*-*-*-*-*-*- ',ResponseJson)
        setPayNowLoading(false);
        navigation.navigate(CONSTANTS.SIGN_AGREEMENT)
      } else if (ResponseJson?.code == STATUS_CODE.unauthorized) {
        console.log('unauthorizedd', API_Data?.msg);
        toastRef.current.error(API_Data?.msg);
        setPayNowLoading(false);
        
      } else {
        setPayNowLoading(false);
        console.log('ERRORR', ResponseJson);
        // toastRef.current.error(ResponseJson?.msg);
      }
    } catch (error) {
      setPayNowLoading(false);
      console.log('Catch error', error);
    }
    
  }



  return (
    <View style={styles.screenContainer}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={responsivePixels.size84}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.screenContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={{flex: 1}}>
            <Text style={styles.unitDetailsText}>
              {summaryofCharge.unitDetails}
            </Text>
            <View style={styles.detailsContainer}>
              <View style={styles.details1}>
                <FastImage
                  source={IMAGES.ic_unit}
                  style={styles.unitImg}
                  resizeMode="contain"
                />

                <View style={{marginHorizontal: 10, flex: 1}}>
                  <Text style={styles.cardValue}>{contactDetails.unit}</Text>
                  <Text style={styles.cardDesc}>
                    {contactDetails.size}: {storageSize?.storageSizeValue}
                  </Text>
                </View>
                <Text style={styles.cardDesc}>
                  {storageSize?.storagePerMonth}
                </Text>
              </View>
              <View style={[styles.details1, {marginTop: 10}]}>
                <FastImage
                  source={IMAGES.ic_unit}
                  style={styles.insuranceImg}
                  resizeMode="contain"
                />

                <View style={{marginHorizontal: 10, flex: 1}}>
                  <Text style={styles.cardValue}>
                    {contactDetails.insurance}
                  </Text>
                  <Text style={styles.cardDesc}>
                    {insurance?.insurancePerMonth}
                  </Text>
                </View>
                <Text style={styles.cardDesc}>{insurance?.coverages}</Text>
              </View>
            </View>
            <Text style={styles.rentalInfo}>
              {summaryofCharge.rentalInformation}
            </Text>

            {!paymentSummaryData.length ? (
              <ActivityIndicator
                color={'black'}
                size={'small'}
                style={{width: '100%', height: 200}}
              />
            ) : (
              <View>
                <FlatList
                  data={paymentSummaryData}
                  nestedScrollEnabled
                  style={[
                    styles.flatlistStyle,
                    {
                      borderWidth: paymentSummaryData.length
                        ? responsivePixels.size1
                        : 0,
                    },
                  ]}
                  contentContainerStyle={{paddingBottom: 20}}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({index, item}) => renderItem(item)}
                />

                <View style={styles.applyCodeInput}>
                  <InputBox
                    rightIconTitle={summaryofCharge.apply}
                    onPress={() => {
                      Keyboard.dismiss();
                      if (promoText.value)
                        apiCallGetChargeSummary(promoText.value);
                    }}
                    placeholderTextColor={COLORS.bombay}
                    placeholder={summaryofCharge.applyPromoCode}
                    containerStyle={styles.codeContainer}
                    mainStyle={styles.mainApplybtn}
                    textStyle={styles.applyButtonText}
                    keyboardType="phone-pad"
                    onChangeText={txt =>
                      setPromoText({value: txt, error: '', success: ''})
                    }
                    value={promoText.value}
                    loadingRight={loading}
                  />
                </View>
                {(promoText.error || promoText.success) && (
                  <View
                    style={{
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      paddingVertical: 10,
                      marginHorizontal: 20,
                      borderRadius: 5,
                      marginTop: -10,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                      shadowOpacity: 0.1,
                      shadowRadius: 5,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={[
                        styles.promoerrorText,
                        {
                          color: promoText.success
                            ? COLORS.lightGreen
                            : COLORS.red,
                          flex: 1,
                          marginLeft: 10,
                          alignSelf: 'center',
                          textAlignVertical: 'center',
                          justifyContent: 'center',
                        },
                      ]}>
                      {promoText.success ? promoText.success : promoText.error}
                    </Text>

                    <Text
                      style={[
                        styles.promoerrorText,
                        {
                          ...common.font_15_23_RR,
                          color: COLORS.red,
                          fontWeight: 'normal',
                          textAlignVertical: 'center',
                          marginRight: 10,
                          paddingHorizontal: 5,
                          paddingVertical: 5,
                        },
                      ]}
                      onPress={() => {
                        setPromoText({value: '', error: '', success: ''});
                        apiCallGetChargeSummary('');
                      }}>
                      Remove
                    </Text>
                  </View>
                )}

                <View style={styles.totalContent}>
                  <View style={styles.totalContainer1}>
                    <Text style={styles.leftText}>
                      {summaryofCharge.administrationFee}
                    </Text>
                    <Text style={styles.feeText}>{summaryofCharge.$0}</Text>
                  </View>

                  <View style={styles.totalContainer2}>
                    <Text style={styles.leftText}>{summaryofCharge.taxes}</Text>
                    <Text style={styles.textValue}>{summaryofCharge.$0}</Text>
                  </View>

                  <CustomImage
                    source={IMAGES.ic_divider}
                    imageStyle={styles.dividerImg}
                    tintColor={COLORS.mediumOrange}
                  />

                  <View style={styles.totalContainer3}>
                    <Text style={styles.leftTotalText}>
                      {summaryofCharge.total}
                    </Text>
                    <Text style={styles.totalValue}>${sumOfarray()}</Text>
                  </View>
                </View>
                <Text style={styles.insuranceAgreementText}>
                  {summaryofCharge.agreementDetails2}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footerView}>
          <MainButton
            title={btnPayNow}
            titleTextStyle={styles.footerButtonTitle}
            mainStyle={styles.footerButton}
            onPress={() => handlePayNow()}
            loading={payNowLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SummaryOfCharges;
