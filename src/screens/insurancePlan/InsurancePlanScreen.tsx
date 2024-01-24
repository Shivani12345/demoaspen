import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useIsFocused} from '@react-navigation/native';

import {IContext} from 'interfaces/common';

import STRINGS from 'common/strings';
import COLORS from 'common/colors';
import IMAGES from 'common/images';

import DATA from 'utils/data';
import responsivePixels from 'utils/responsivePixels';

import common from 'common/common.styles';
import {toastRef} from 'components/globalContext/globalContext';
import {ContextData} from 'components/globalContext/globalContext';

import {AppStackParamList} from 'navigations/AppStack';

import STYLES from './InsurancePlan.styles';

import {API, METHODS, STATUS_CODE} from 'services/apiConfig';
import {API_Call_With_Out_Token} from 'services/api';
import {
  numberFormat,
  currentScreen
} from 'utils/functions';
import CONSTANTS from 'common/constants';
import MainButton from 'components/button';

interface IProps {
  navigation: StackNavigationProp<AppStackParamList, 'InsurancePlanScreen'>;
  route: RouteProp<AppStackParamList, 'InsurancePlanScreen'>;
}

const InsurancePlanScreen: FunctionComponent<IProps> = props => {
  const {navigation, route} = props;
  const {insurancePlan} = STRINGS;

  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {darkMode, insurance, setInsurance, setInfoData, infoData},
  } = context;
  const styles = STYLES(theme);
  const focus = useIsFocused();
  const [isPlanChecked, setIsPlanChecked] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isPolicyTermsModalVisible, setIsPolicyTermsModalVisible] =
    useState(false);
  const [initialPage, setInitialPage] = useState(1);

  useEffect(() => {
    if (focus == true) {
      setDefaultData(infoData);
    }
  }, [focus]);
  useEffect(() => {
    currentScreen('InsurancePlanScreen');
    apiCallGetInsurances();
  }, []);
  const setDefaultData = (infoData: any) => {
    if (infoData) {
      setInfoData('');
    }
  };

  const PricingPlan = (index: any, plans: any, text = '') => {
    return (
      <View style={styles.insurancePlan}>
        {/* <FastImage
          source={IMAGES.ic_check_black}
          tintColor={
            plans[index]?.isPlanIncluded
              ? COLORS.ebonyClay
              : COLORS.ebonyClayDim
          }
          style={styles.insurancePlanStatementCheck}
          resizeMode="contain"
        /> */}

        <Text
          style={[
            styles.textStyle,
            {
              color: plans[index]?.isPlanIncluded
                ? COLORS.black
                : COLORS.ebonyClayDim,
            },
          ]}>
          {text !== '' ? text : plans[index]?.plan}
        </Text>
      </View>
    );
  };

  const [insurancePlanData, setInsurancePlanData] = useState([]);

  const apiCallGetInsurances = async (pageNumber = 1) => {
    // setIsLoading(true);
    try {
      let API_Data = await API_Call_With_Out_Token(
        API.INSTRUCTIONS,
        {},
        METHODS.GET,
      );

      let ResponseJson = API_Data.ResponseJson;
      var ResponseJson_Data = ResponseJson?.data;
      console.log('response apiCallGetInsurances', JSON.stringify(API_Data));

      if (API_Data?.code == STATUS_CODE.noInternet) {
        toastRef.current.error(STRINGS.errorNoNetwork);
        // this.validationError(STRINGS.Error_No_Network);
      } else if (ResponseJson?.code == STATUS_CODE.success) {
        //! Response Success
        setInsurancePlanData(ResponseJson_Data.data);
        console.log('pageNumber', pageNumber);
        if (pageNumber > 1) {
          console.log('getInsurancePlan_setIsLoading', [
            ...insurancePlanData,
            ...ResponseJson_Data.data,
          ]);
          if (ResponseJson_Data.data.length > 0) {
            setInsurancePlanData([
              ...insurancePlanData,
              ...ResponseJson_Data.data,
            ]);
            setTimeout(() => {
              setIsLoading(false);
            }, 1500);
          } else {
            setTimeout(() => {
              setIsLoading(false);
            }, 1500);
          }
        }
      } else if (ResponseJson?.code == STATUS_CODE.unauthorized) {
        console.log('unauthorizedd', API_Data?.msg);
        toastRef.current.error(API_Data?.msg);
        setIsLoading(false);
        //Toast.callToast('dfewdf',CONSTANTS.ERROR)
      } else {
        // toastRef.current.error(API_Data?.msg);
        setIsLoading(false);
        console.log('ERRORR', API_Data?.msg);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Catch error', error);
    }
  };

  const onPressIUnderstood = () => {
    setIsPolicyTermsModalVisible(!isPolicyTermsModalVisible);
    navigation.navigate(CONSTANTS.SCAN_LICENSE);
    // navigation.navigate(CONSTANTS.SUMMARY_OF_CHARGES);
    // navigation.navigate(CONSTANTS.ADD_CREDIT_CARD_SCREEN);
    // navigation.navigate(CONSTANTS.SCAN_CREDIT_CARD);
    // cryptoConvert();
  };

  const PricingPlanCard = (
    index: any,
    item: {
      monthamount?: string;
      coverageAmount?: string;
      plans?: {plan: string; isPlanIncluded: boolean}[];
    },
  ) => {
    console.log('item.dc_premium', item.dc_premium);

    return (
      <TouchableOpacity
        activeOpacity={1}
        key={index.toString()}
        onPress={() => {
          console.log(
            'itemitemitemitemitem====>',
            `$${item.dc_coverage} of coverages ($${item.dc_premium} a month)`,
            `${item.insurcoverage_id}`,
            // item,
            // item.dc_premium,
            // item.dc_coverage,
          );

          setInsurance({
            coverages: `$${numberFormat(item.dc_coverage)} ${
              insurancePlan.coverageValue
            }`,
            insurancePerMonth: `$${numberFormat(item.dc_premium)}/${
              insurancePlan.month
            }`,
            insuranceCoverageId: `${item.insurcoverage_id}`,
          });

          setIsPlanChecked(index);
          setIsPolicyTermsModalVisible(!isPolicyTermsModalVisible);
        }}
        style={
          isPlanChecked === index
            ? styles.insurancePlanCardViewCheck
            : styles.insurancePlanCardViewUncheck
        }>
        <View style={styles.insurancePlanCardHeaderView}>
          <View style={styles.insurancePlanCardHeader}>
            <Text
              style={styles.insurancePlanCardMonthTextStyle}>{`$${numberFormat(
              item.dc_premium,
            )} ${insurancePlan.insuranceValue}`}</Text>
          </View>

          {isPlanChecked === index ? (
            <FastImage
              source={IMAGES.ic_check}
              style={{...common.image20}}
              resizeMode="contain"
            />
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                console.log(
                  'itemitemitemitemitem====>',
                  `$${item.dc_coverage} of coverages ($${item.dc_premium} a month)`,
                  `${item.insurcoverage_id}`,
                  // item,
                  // item.dc_premium,
                  // item.dc_coverage,
                );

                setInsurance({
                  coverages: `$${item.dc_coverage} ${insurancePlan.coverageValue}`,
                  insurancePerMonth: `$${item.dc_premium}/${insurancePlan.month}`,
                  insuranceCoverageId: `${item.insurcoverage_id}`,
                });

                setIsPlanChecked(index);
                setIsPolicyTermsModalVisible(!isPolicyTermsModalVisible);
              }}
              style={styles.insurancePlanUncheck}
            />
          )}
        </View>
        <View style={styles.insurancePlanCardHeader}>
          <Text
            style={styles.insurancePlanCardCoverageTextStyle}>{`$${numberFormat(
            item.dc_coverage,
          )} ${insurancePlan.coverageValue}`}</Text>
        </View>
        <FastImage
          source={IMAGES.ic_divider}
          style={styles.insurancePlanCardDivider}
        />

        <View style={styles.insurancePlanView}>
          <Text style={styles.plansHeader}>{insurancePlan.plansHeader}</Text>

          {PricingPlan(0, DATA.princingPlan[0].plans, item.s_coverage_desc)}
          <Text
            style={[
              styles.textStyle,
              {
                color: COLORS.black,
                textAlign: 'center',
                marginVertical: 5,
              },
            ]}>
            {insurancePlan.vehicaleBoats}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const TermsPolicyModal = () => {
    return (
      <Modal
        deviceHeight={'100%'}
        statusBarTranslucent={true}
        backdropColor={COLORS.black}
        isVisible={isPolicyTermsModalVisible}
        onBackdropPress={() => {
          setIsPolicyTermsModalVisible(!isPolicyTermsModalVisible);
        }}>
        <View style={styles.modalView}>
          <FastImage
            source={IMAGES.ic_policyTerms}
            style={styles.termsPoliyImage}
            resizeMode="contain"
          />
          <Text style={[styles.termsPolicyText]}>
            <Text>
              {insurancePlan.policyTerms1}
              <Text style={styles.termsConditiontext}>
                {insurancePlan.policyTerms2}
              </Text>
              {insurancePlan.policyTerms3}
            </Text>
          </Text>
          <MainButton
            mainStyle={styles.understood}
            title={insurancePlan.understood}
            onPress={() => onPressIUnderstood()}
            titleTextStyle={styles.understoodTxt}
          />
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <Text style={styles.screenHeader}>{insurancePlan.insurancePlan}</Text>
      {insurancePlanData.length > 0 && (
        <FlatList
          data={insurancePlanData}
          showsHorizontalScrollIndicator={false}
          style={{marginVertical: responsivePixels.size10}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({index, item}) => PricingPlanCard(index, item)}
          onEndReached={({distanceFromEnd}) => {
            console.log('distanceend!', distanceFromEnd);
            if (distanceFromEnd == 0) {
            } else {
              if (!isLoading) {
                setIsLoading(true);
                const numberNew = initialPage + 1;
                setInitialPage(numberNew);
                apiCallGetInsurances(numberNew);
              }
            }
          }}
          onEndReachedThreshold={0.7}
          ListFooterComponent={() => {
            if (isLoading) {
              return (
                <View style={{marginBottom: 25}}>
                  <ActivityIndicator />
                </View>
              );
            }
          }}
        />
      )}
      {TermsPolicyModal()}
    </View>
  );
};

export default InsurancePlanScreen;
