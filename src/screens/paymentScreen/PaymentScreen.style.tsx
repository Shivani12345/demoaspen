import {Platform, StyleSheet} from 'react-native';

import {ITheme} from 'interfaces/common';
import COLORS from 'common/colors';
import responsivePixels from 'utils/responsivePixels';
import SIZES from 'utils/sizes';
import common from 'common/common.styles';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    paymentSuccessContainer: {
      backgroundColor: COLORS.lightOrange,
      borderColor: COLORS.darkOrange,
      borderRadius: responsivePixels.size6,
      flexDirection: 'row',
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size25,
      borderWidth: responsivePixels.size1,
    },
    imageStyle: {
      marginTop: responsivePixels.size20,
      marginLeft: responsivePixels.size20,
      height: responsivePixels.size53,
      width: responsivePixels.size53,
    },
    textContainer: {
      marginLeft: responsivePixels.size15,
      marginVertical: responsivePixels.size20,
      marginHorizontal: responsivePixels.size40,
      marginRight: responsivePixels.size100,
    },
    paymentSuccessText: {
      ...common.font_20_23_44,
      fontWeight: '600',
      color: COLORS.ebonyClay,
    },
    paymentContentText: {
      marginTop: responsivePixels.size6,
      ...common.font_14_19,
      fontWeight: '400',
      color: COLORS.ebonyClay,
    },
    paymentItem: {
      marginTop: responsivePixels.size20,
      flexDirection: 'row',
      // backgroundColor: 'pink',
      alignItems: 'center',

      marginHorizontal: responsivePixels.size20,
    },
    unitNumber: {
      borderWidth: responsivePixels.size1,
      marginRight: responsivePixels.size7_5,
      borderRadius: responsivePixels.size6,

      // justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',

      flex: 1,
      paddingHorizontal: responsivePixels.size20,
      borderColor: COLORS.mischka,
    },
    gateCode: {
      flex: 1,
      borderWidth: responsivePixels.size1,
      borderRadius: responsivePixels.size6,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: COLORS.mischka,
      height: responsivePixels.size210,
    },
    insuranceAgreementText: {
      marginHorizontal: responsivePixels.size10,
      marginTop: responsivePixels.size5,
      fontSize: responsivePixels.size14,
      textAlign: 'center',
      color: COLORS.black,
    },
    unitNumberText: {
      ...common.font_14_15_23,
      color: COLORS.rollingStone,
      marginTop: responsivePixels.size15,
      textAlign: 'center',
    },
    unitNumTxt: {
      color: COLORS.darkOrange,
      ...common.font_20_23_44,
      fontWeight: 'normal',
      textAlign: 'center',
      marginBottom: responsivePixels.size15,

      // marginBottom: 5,
    },
    numberContent: {
      color: COLORS.ebonyClay,
      ...common.font_14_15_23,
      marginTop: responsivePixels.size20,
      marginBottom: responsivePixels.size5,
      textAlign: 'center',
    },

    gateCodeText: {
      ...common.font_14_16_41,
      fontWeight: '500',
      color: COLORS.rollingStone,
    },
    codeText: {
      color: COLORS.darkOrange,
      ...common.font_40_46,
      fontWeight: '700',
      marginTop: 5,
    },
    contactInfo: {
      color: COLORS.mediumGray,
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size20,
      ...common.font_16_18_75,
      fontWeight: '500',
    },
    infoContainer: {
      padding: 20,
      marginHorizontal: responsivePixels.size20,
      borderWidth: responsivePixels.size1,
      borderColor: COLORS.denim,
      borderRadius: responsivePixels.size6,
      marginTop: responsivePixels.size10,
      backgroundColor: COLORS.aliceBlue,
    },
    callinfoContainer: {
      flexDirection: 'row',
    },
    contactNumberContainer: {
      flex: 1,
    },
    callOnText: {
      ...common.font_14_16_41,
      fontWeight: '400',
      color: COLORS.rollingStone,
    },
    contactNumber: {
      ...common.font_18_21_9,
      fontWeight: '500',
      color: COLORS.ebonyClay,
      marginTop: responsivePixels.size5,
    },
    callIconContainer: {
      backgroundColor: COLORS.denim,
      justifyContent: 'center',
      alignItems: 'center',
      height: responsivePixels.size42,
      width: responsivePixels.size42,
      borderRadius: responsivePixels.size24,
    },
    callIcon: {
      alignSelf: 'center',
      height: responsivePixels.size22,
      width: responsivePixels.size22,
    },
    dividerImg: {
      width: '100%',
      marginVertical: responsivePixels.size10,
    },
    emailInfo: {
      flexDirection: 'row',
    },
    emailConainer: {
      flex: 1,
    },
    writeOnText: {
      ...common.font_14_16_41,
      fontWeight: '400',
      color: COLORS.rollingStone,
    },
    emailText: {
      ...common.font_18_21_9,
      fontWeight: '500',

      color: COLORS.ebonyClay,
      marginTop: responsivePixels.size5,
    },
    btnContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginTop: responsivePixels.size95,
      marginBottom: responsivePixels.size34,
    },
    footerView: {
      alignItems: 'flex-end',
      marginHorizontal: responsivePixels.size20,
    },
    footerButton: {
      borderRadius: responsivePixels.size6,
      height: responsivePixels.size54,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: responsivePixels.size20,
      marginTop: 0,
      width: '100%',
    },
    footerButtonTitle: {
      ...common.font_18_21_9,
      fontWeight: '600',
      color: COLORS.white,
    },
  });

export default styles;
