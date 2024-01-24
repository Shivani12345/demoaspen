import {StyleSheet} from 'react-native';

import {ITheme} from 'interfaces/common';
import COLORS from 'common/colors';
import responsivePixels from 'utils/responsivePixels';
import common from 'common/common.styles';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    unitDetailsText: {
      marginTop: responsivePixels.size25,
      color: COLORS.mediumGray,
      ...common.font_16_18_75,
      fontWeight: '500',
      marginLeft: responsivePixels.size20,
    },
    detailsContainer: {
      borderWidth: responsivePixels.size1,
      borderColor: COLORS.bombay,
      borderRadius: responsivePixels.size6,
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size5,
      padding: responsivePixels.size15,
    },
    unitContent: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: responsivePixels.size18,
    },
    unitImg: {
      height: responsivePixels.size40,
      width: responsivePixels.size40,
    },
    insuranceImg: {
      height: responsivePixels.size40,
      width: responsivePixels.size40,
    },
    unitText: {
      ...common.font_13_15_23_RM,
      color: COLORS.rollingStone,
      fontWeight: '400',
    },
    unit: {
      color: COLORS.ebonyClay,
      ...common.font_14_16_41,

      fontWeight: '400',

      marginTop: responsivePixels.size5,
    },
    unitValue: {
      color: COLORS.darkOrange,

      ...common.font_14_16_41,
      fontWeight: '600',
    },
    unitValueContainer: {
      justifyContent: 'center',
    },
    details1: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    details2: {
      flexDirection: 'row',
      marginVertical: responsivePixels.size10,
      marginHorizontal: responsivePixels.size15,
    },
    rentalInfo: {
      color: COLORS.mediumGray,

      ...common.font_16_18_75,
      fontWeight: '500',

      marginTop: responsivePixels.size12,
      marginLeft: responsivePixels.size20,
    },
    rentalInfoContainer: {height: 200},
    infoComman: {
      flexDirection: 'row',
    },
    infoCommanConatiner: {
      flexDirection: 'row',
      marginTop: responsivePixels.size12,
    },
    info1Text: {
      flex: 1,
      color: COLORS.ebonyClay,
      ...common.font_14_16_41,
      fontWeight: '400',
    },
    info1Value: {
      ...common.font_14_16_41,
      color: COLORS.rollingStone,
      fontWeight: '400',
    },
    cutLine: {
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
      marginRight: responsivePixels.size5,
    },
    info2Value: {
      ...common.font_14_16_41,
      color: COLORS.rollingStone,

      fontWeight: '400',
    },
    info3Value: {
      ...common.font_14_16_41,
      color: COLORS.rollingStone,

      fontWeight: '400',
    },
    info4Value: {
      ...common.font_14_16_41,
      color: COLORS.rollingStone,

      fontWeight: '400',
    },
    info5Value: {
      ...common.font_14_16_41,
      color: COLORS.rollingStone,

      fontWeight: '400',

      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
    },
    info6Value: {
      ...common.font_14_16_41,
      color: COLORS.rollingStone,

      fontWeight: '400',
    },
    dateRange: {
      ...common.font_14_16_41,
      color: COLORS.rollingStone,

      fontWeight: '400',
      marginBottom: responsivePixels.size10,
      marginTop: responsivePixels.size5,
    },
    totalContent: {
      backgroundColor: COLORS.lightOrange,
      paddingVertical: responsivePixels.size15,
      paddingHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size12,
    },
    totalContainer1: {
      flexDirection: 'row',
    },
    totalContainer2: {
      flexDirection: 'row',
      marginTop: responsivePixels.size15,
    },
    totalContainer3: {
      flexDirection: 'row',
    },
    leftText: {
      flex: 1,
      ...common.font_14_16_41,
      fontWeight: '600',
      color: COLORS.ebonyClay,
    },
    feeText: {
      ...common.font_14_16_41,
      color: COLORS.rollingStone,

      fontWeight: '400',
    },
    textValue: {
      ...common.font_14_16_41,
      color: COLORS.rollingStone,

      fontWeight: '400',
    },
    totalValue: {
      ...common.font_20_23_44,
      color: COLORS.denim,

      fontWeight: '700',
    },
    leftTotalText: {
      flex: 1,
      ...common.font_20_23_44,
      fontWeight: '600',

      color: COLORS.ebonyClay,
    },
    dividerImg: {
      width: '100%',
      // height: 0,
    },
    applyCodeInput: {
      marginHorizontal: responsivePixels.size20,
      marginTop: -responsivePixels.size30,
    },
    enteredText: {
      ...common.font_13_15_23_RM,
      fontWeight: '400',
    },
    codeContainer: {
      borderColor: COLORS.bombay,
      borderWidth: responsivePixels.size1,
      borderRadius: responsivePixels.size6,
      paddingLeft: responsivePixels.size15,
      // paddingTop: responsivePixels.size15,
      // paddingBottom: responsivePixels.size14,
      height: responsivePixels.size44,
    },
    mainApplybtn: {
      backgroundColor: COLORS.denim,
      width: 130,
      height: responsivePixels.size44,
      // paddingHorizontal: responsivePixels.size23,
      marginRight: -responsivePixels.size20,
    },
    applyButtonText: {
      color: COLORS.white,
      ...common.font_18_21_9,
      fontWeight: '600',
    },
    footerView: {
      alignItems: 'flex-end',
      marginHorizontal: responsivePixels.size20,
      marginVertical: responsivePixels.size20,
    },
    footerButton: {
      borderRadius: responsivePixels.size6,
      height: responsivePixels.size54,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 0,
      width: '100%',
      backgroundColor: COLORS.lightGreen,
    },
    footerButtonTitle: {
      ...common.font_18_21_9,
      fontWeight: '600',
      color: COLORS.white,
    },
    insuranceAgreementText: {
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size10,
      fontSize: responsivePixels.size14,
      color: COLORS.red,
    },
    promoerrorText: {
      // marginHorizontal: responsivePixels.size20,
      // marginTop: -responsivePixels.size10,
      fontSize: responsivePixels.size14,
    },
    cardValue: {
      ...common.font_13_15_23_RM,
      fontWeight: '400',
      color: COLORS.bombay,
      marginTop: responsivePixels.size5,
    },
    cardDesc: {
      ...common.font_13_15_23_RM,
      fontWeight: '500',
      marginVertical: responsivePixels.size5,
      color: COLORS.mediumGray,
    },
    flatlistStyle: {
      maxHeight: responsivePixels.size205_61,
      minHeight: 0,
      borderColor: COLORS.bombay,
      borderRadius: responsivePixels.size6,
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size5,
      paddingTop: responsivePixels.size12,
      paddingBottom: responsivePixels.size12,
      paddingHorizontal: responsivePixels.size15,
    },
  });

export default styles;
