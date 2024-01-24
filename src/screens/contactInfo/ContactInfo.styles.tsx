import {StatusBar, StyleSheet} from 'react-native';
import {ITheme} from 'interfaces/common';

import common from 'common/common.styles';
import responsivePixels from 'utils/responsivePixels';
import COLORS from 'common/colors';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainerStyle: {
      flexGrow: 1,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    yourContactInfo: {
      ...common.font_24_28_13,
      fontWeight: '500',
      color: COLORS.ebonyClay,
      marginTop: responsivePixels.size25,
    },
    footerView: {
      paddingHorizontal: responsivePixels.size20,
      paddingBottom: responsivePixels.size20,
      paddingTop: 5,
      flexDirection: 'row',
      backgroundColor: COLORS.white,
      justifyContent: 'space-between',
    },
    footerButton: {
      borderRadius: responsivePixels.size6,
      height: responsivePixels.size54,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerButtonTitle: {
      ...common.font_18_21_9,
      fontWeight: '600',
      color: COLORS.white,
      textTransform: 'capitalize',
    },
    text: {
      ...common.font_13_15_23_RM,
      fontWeight: '500',
      color: COLORS.mediumGray,
    },
    requiredText: {
      ...common.font_13_15_23_RM,
      fontWeight: '500',
      color: COLORS.red,
    },
    dobBtn: {
      flex: 1,
      marginTop: responsivePixels.size8,
      justifyContent: 'center',
      borderRadius: responsivePixels.size6,
      borderWidth: responsivePixels.size1,
      borderColor: COLORS.gray,
      paddingHorizontal: responsivePixels.size15,
      height: responsivePixels.size54,
    },
    modal: {
      backgroundColor: COLORS.white,
      borderRadius: responsivePixels.size10,
    },
    scrollview: {
      paddingBottom: responsivePixels.size80,
    },
    dateText: {
      ...common.font_13_15_23_RR,
      fontWeight: '400',
      color: COLORS.black,
    },
    conditionContainer: {
      flexDirection: 'row',
      // alignItems: 'center',
      // marginVertical: 5,
      // padding: responsivePixels.size15,
      marginTop: responsivePixels.size15,
      // padding: responsivePixels.size5,
      // marginHorizontal: responsivePixels.size20,
      // // marginVertical: responsivePixels.size20,
      // backgroundColor: 'pink',
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
      // marginLeft: responsivePixels.size10,
      color: COLORS.ebonyClayHex,
      ...common.font_14_20_RR,
      fontWeight: '400',

      // marginTop: responsivePixels.size2,
    },
    
  });

export default styles;
