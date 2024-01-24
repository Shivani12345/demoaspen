import {StyleSheet} from 'react-native';
import {ITheme} from 'interfaces/common';

import common from 'common/common.styles';
import responsivePixels from 'utils/responsivePixels';
import COLORS from 'common/colors';
import SIZES from 'utils/sizes';
import FONTS from 'common/fonts';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    screenHeader: {
      ...common.font_23_34,
      fontWeight: '500',
      // alignSelf: 'center',
      color: COLORS.ebonyClay,
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size25,
    },
    insurancePlanCardViewCheck: {
      flex: 1,
      borderColor: COLORS.selectedBorder,
      borderWidth: responsivePixels.size1,
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size10,
      borderRadius: responsivePixels.size8,
      paddingBottom: responsivePixels.size5,
    },
    insurancePlanCardViewUncheck: {
      flex: 1,
      borderColor: COLORS.mischka,
      borderWidth: responsivePixels.size1,
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size10,
      borderRadius: responsivePixels.size8,
      paddingBottom: responsivePixels.size5,
    },
    insurancePlanCardHeaderView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
      marginHorizontal: responsivePixels.size15,
    },
    insurancePlanCardHeader: {
      flex: 1,
      alignItems: 'center',
    },
    insurancePlanCardMonthTextStyle: {
      ...common.font_24_34,
      fontWeight: '400',
      textAlign: 'center',
      color: COLORS.black,
    },
    insurancePlanCardCoverageTextStyle: {
      ...common.font_18_18,
      fontWeight: '700',
      color: COLORS.white,
      borderRadius: 5,
      padding: 5,
      overflow: 'hidden',

      // flexWrap: 'wrap',
      // flex: 1,
      // width: 210,
      marginBottom: 5,
      backgroundColor: COLORS.darkOrange,
    },
    insurancePlanCardDivider: {
      height: responsivePixels.size1,
      width: '90%',
      backgroundColor: 'transparent',
      marginTop: responsivePixels.size8,
      alignSelf: 'center',
    },
    insurancePlanView: {
      marginHorizontal: responsivePixels.size20,
    },
    plansHeader: {
      ...common.font_16_18_75,
      fontWeight: '600',
      color: COLORS.bombay,
      marginVertical: responsivePixels.size8,
    },
    insurancePlan: {
      flexDirection: 'row',
      marginBottom: responsivePixels.size5,
    },
    insurancePlanUncheck: {
      height: responsivePixels.size20,
      width: responsivePixels.size20,
      borderRadius: responsivePixels.size20,
      borderWidth: responsivePixels.size2,
      borderColor: COLORS.lightGray,
      alignItems: 'center',
      justifyContent: 'center',
    },
    insurancePlanStatementCheck: {
      ...common.image12,
      marginTop: responsivePixels.size4,
    },
    textStyle: {
      ...common.font_13_18,
      fontFamily: FONTS.robotoMedium,
      fontWeight: '400',
      flex: 1,
      flexWrap: 'wrap',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
    },
    modalView: {
      width: '100%',
      paddingVertical: responsivePixels.size30,
      backgroundColor: COLORS.white,
      borderRadius: responsivePixels.size8,
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      alignSelf: 'center',
    },
    termsPoliyImage: {
      height: responsivePixels.size139,
      width: '100%',
      marginTop: responsivePixels.size5,
    },
    termsConditiontext: {
      color: COLORS.denim,
      ...common.font_18_26,
      fontWeight: '500',
      letterSpacing: responsivePixels.size0_2,
    },
    termsPolicyText: {
      ...common.font_18_26,
      marginTop: responsivePixels.size20,
      // marginHorizontal: responsivePixels.size28,
      textAlign: 'center',
      color: COLORS.ebonyClayHex,
      fontWeight: '400',
      letterSpacing: responsivePixels.size0_2,
      width: responsivePixels.size310_04,
      marginBottom: 35,
      // width: '72%',
    },
    understood: {
      backgroundColor: COLORS.darkOrange,
      height: responsivePixels.size40,
      paddingVertical: responsivePixels.size5,
      paddingHorizontal: responsivePixels.size10,
    },
    understoodTxt: {
      color: COLORS.white,
      ...common.font_16_23_RR,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textDecorationColor: COLORS.darkOrange,
    },
  });

export default styles;
