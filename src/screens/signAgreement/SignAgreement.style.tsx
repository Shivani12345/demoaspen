import {StyleSheet} from 'react-native';

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
    signAgreementText: {
      ...common.font_24_28_13,
      fontWeight: '500',
      marginLeft: responsivePixels.size20,
      marginTop: responsivePixels.size25,
      color: COLORS.ebonyClayHex,
    },
    text: {
      ...common.font_16_18_75,
      fontWeight: '500',
      marginTop: responsivePixels.size8,
      marginLeft: responsivePixels.size20,
      color: COLORS.rollingStone,
    },
    content: {
      flex: 1,
      paddingBottom: responsivePixels.size15,
    },
    agreementContent: {flex: 1},
    agreementContentContainer: {
      // maxHeight: '82%',
      flex: 1,
      marginHorizontal: responsivePixels.size20,
      borderWidth: responsivePixels.size1,
      borderColor: COLORS.mischka,
      borderRadius: responsivePixels.size8,
      marginTop: responsivePixels.size20,
      paddingHorizontal: responsivePixels.size5,
    },
    contentText: {
      ...common.font_14_20_RR,
      fontWeight: '400',
      color: COLORS.ebonyClayHex,
    },
    conditionContainer: {
      flexDirection: 'row',
      padding: responsivePixels.size5,
      marginHorizontal: responsivePixels.size20,
      marginVertical: responsivePixels.size20,
      alignItems: 'center',
    },
    checkBoxContainer: {
      borderRadius: responsivePixels.size4,
      height: responsivePixels.size20,
      width: responsivePixels.size20,
      borderColor: COLORS.darkOrange,
      borderWidth: responsivePixels.size2,
      marginTop: responsivePixels.size2,
    },
    conditionText: {
      // paddingTop: responsivePixels.size2,
      paddingRight: responsivePixels.size20,
      marginLeft: responsivePixels.size12,
      color: COLORS.ebonyClayHex,
      ...common.font_14_20_RR,
      fontWeight: '400',
      // marginTop: responsivePixels.size2,
    },
    modalcontainer: {
      backgroundColor: COLORS.white,
      // marginTop: responsivePixels.size267,
      // marginBottom: responsivePixels.size254,
      borderRadius: responsivePixels.size8,
      width: '100%',
    },
    closeImg: {
      alignSelf: 'flex-end',
      marginTop: responsivePixels.size15,
      marginRight: responsivePixels.size15,
    },
    addSignText: {
      alignSelf: 'center',
      ...common.font_22_25_78,
      fontWeight: '500',
      color: COLORS.ebonyClayHex,
    },
    imgStyle: {
      height: responsivePixels.size75_86,
      width: responsivePixels.size90,
    },
    signImgcontainer: {
      marginTop: responsivePixels.size29,
      borderWidth: responsivePixels.size1,
      borderStyle: 'dashed',
      borderRadius: responsivePixels.size4,
      borderColor: 'gray',
      marginHorizontal: responsivePixels.size30,
      paddingTop: responsivePixels.size20,
      paddingBottom: responsivePixels.size20_14,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: responsivePixels.size20,
      marginHorizontal: responsivePixels.size30,
      justifyContent: 'space-between',
      marginBottom: responsivePixels.size20,
    },
    closeBtn: {
      height: responsivePixels.size50,
      backgroundColor: COLORS.silverSand,
      marginRight: responsivePixels.size7_5,
      width: responsivePixels.size150,
    },
    closeText: {
      color: COLORS.white,
      marginTop: responsivePixels.size10,
      marginBottom: responsivePixels.size9,
      ...common.font_18_21_9,
      fontWeight: '500',
    },

    submitBtn: {
      height: responsivePixels.size50,
      backgroundColor: COLORS.darkOrange,
      marginLeft: responsivePixels.size7_5,

      width: responsivePixels.size150,
    },
    submitText: {
      color: COLORS.white,
      marginTop: responsivePixels.size10,
      marginBottom: responsivePixels.size9,
      ...common.font_18_21_9,
      fontWeight: '500',
    },

    resetBtn: {
      width: responsivePixels.size70,
      height: responsivePixels.size25,
      backgroundColor: COLORS.darkOrange,
      marginRight: responsivePixels.size20,
      // marginVertical: 5,
      alignSelf: 'flex-end',
    },
    resetText: {
      color: COLORS.white,
      fontWeight: 'bold',
      ...common.font_12_3_16,
    },
  });

export default styles;
