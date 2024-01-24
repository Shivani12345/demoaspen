import {StyleSheet} from 'react-native';

import COLORS from 'common/colors';

import responsivePixels from 'utils/responsivePixels';

import common from 'common/common.styles';

import {ITheme} from 'interfaces/common';
import SIZES from 'utils/sizes';
import FONTS from 'common/fonts';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: responsivePixels.size20,
    },
    contentContainerStyle: {
      flexGrow: 1,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    addCardDetail: {
      ...common.font_24_28_13,
      color: COLORS.ebonyClayHex,
      fontWeight: '500',
      marginTop: responsivePixels.size25,
      alignSelf: 'center',
    },
    creditCardImage: {
      marginTop: responsivePixels.size15,
      height: responsivePixels.size196,
      // width: responsivePixels.size335,
      // marginh,
      // width: SIZES.deviceWidth,
    },
    cardInputBoxView: {marginTop: responsivePixels.size30},
    inputView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginTop: -responsivePixels.size20,
    },
    dateInputBtn: {flex: 1},
    inputBoxView: {
      flex: 1,

      justifyContent: 'center',
    },
    titleImageStyle: {marginLeft: responsivePixels.size5},
    cvvInputBoxView: {
      flex: 1,
      marginLeft: responsivePixels.size15,
    },
    cardHolderInputBoxView: {
      // marginTop: responsivePixels.size15
      marginTop: 0,
      // backgroundColor: 'red',
    },
    footerView: {
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      // flex: 1,
      // alignItems: 'flex-end',
      // marginVertical: responsivePixels.size20,
      // alignItems: 'flex-end',
      // marginHorizontal: responsivePixels.size20,
      marginVertical: responsivePixels.size20,
    },
    termsConditiontext: {
      color: COLORS.denim,
      ...common.font_18_26,
      fontWeight: '500',
      letterSpacing: responsivePixels.size0_2,
    },
    modalView: {
      width: '100%',
      paddingVertical: responsivePixels.size10,
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
    terms: {
      color: COLORS.black,
      ...common.font_18_26,
      letterSpacing: responsivePixels.size0_2,
      paddingBottom: responsivePixels.size10,
      fontFamily: FONTS.robotoMedium,
      marginVertical: 10,
    },
    confirmtext: {
      color: COLORS.black,
      ...common.font_20_23_44,
      letterSpacing: responsivePixels.size0_2,
      paddingBottom: responsivePixels.size5,
      marginTop: 10,
      fontFamily: FONTS.robotoMedium,
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
      flex: 1,
      paddingVertical: responsivePixels.size5,
      paddingHorizontal: responsivePixels.size5,
      marginHorizontal: 15,

      marginVertical: 10,
    },
    understoodTxt: {
      color: COLORS.white,
      ...common.font_14_20,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textDecorationColor: COLORS.darkOrange,
    },
    addNowBtn: {
      height: responsivePixels.size54,
      flex: 1,
      borderRadius: responsivePixels.size6,
      backgroundColor: COLORS.darkOrange,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addNowBtnTitle: {
      ...common.font_18_21_9,
      alignSelf: 'center',
      fontWeight: '600',
      color: COLORS.white,
    },
    text: {
      ...common.font_13_15_23_RM,
      fontWeight: '500',
      color: COLORS.mediumGray,
    },
    expiryView: {
      marginTop: responsivePixels.size15,
      flex: 1,
    },
    expiryTouchable: {
      marginTop: responsivePixels.size8,
      borderRadius: responsivePixels.size6,
      borderWidth: responsivePixels.size1,
      borderColor: COLORS.gray,
      paddingLeft: responsivePixels.size15,
      paddingRight: responsivePixels.size20,
      height: responsivePixels.size54,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    selectText: {
      ...common.font_13_15_23_RR,
      color: COLORS.bombay,
      fontWeight: '400',
      marginLeft: responsivePixels.size5,
    },
    expiryText: {
      ...common.font_12_15_23_RR,
      color: COLORS.black,
      fontWeight: '400',
      marginLeft: responsivePixels.size5,
    },
    datePicker: {
      alignSelf: 'center',
      marginTop: responsivePixels.size8,
      borderRadius: responsivePixels.size6,
      borderWidth: responsivePixels.size1,
      borderColor: COLORS.gray,
      paddingHorizontal: responsivePixels.size15,
      height: responsivePixels.size54,
    },
    rightIconImageStyle: {
      ...common.image24,
      marginRight: -responsivePixels.size10,
      tintColor: COLORS.bombay,
    },
  });

export default styles;
