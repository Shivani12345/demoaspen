import {Platform, StatusBar, StyleSheet} from 'react-native';
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
      paddingBottom: 50,
      marginBottom: 20,
      paddingHorizontal: responsivePixels.size20,
      // flex: 1,
      // flexGrow: 1,
      // backgroundColor: 'red',
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    secondContactInfo: {
      ...common.font_24_34,
      fontWeight: '500',
      color: COLORS.ebonyClay,
      marginTop: responsivePixels.size25,
    },
    text: {
      ...common.font_13_15_23_RM,
      fontWeight: '500',
      color: COLORS.mediumGray,
    },
    requiredIcon: {
      ...common.font_13_15_23_RM,
      fontWeight: '500',
      color: COLORS.red,
    },
    listDropDown: {
      marginTop: responsivePixels.size8,

      // backgroundColor: 'pink',
      width: '100%',
    },
    dropdownBtn: {
      alignSelf: 'center',
      marginTop: responsivePixels.size8,
      borderRadius: responsivePixels.size6,

      borderColor: COLORS.gray,
      height: responsivePixels.size54,

      // width: '100%',
    },
    dropdownBtnText: {
      ...common.font_13_15_23_RR,
      fontWeight: '400',
      textAlignVertical: 'center',
      textAlign: 'left',
    },
    dropdown: {
      backgroundColor: COLORS.transparent,
      borderWidth: responsivePixels.size1,
      borderRadius: responsivePixels.size6,
      borderColor: COLORS.gray,
      width: '100%',

      marginTop: 5,

      height: responsivePixels.size50,
      // width: responsivePixels.size79,
      // borderWidth: responsivePixels.size1,
      // borderColor: COLORS.selectedBorder,
      // borderRadius: responsivePixels.size24,
      // backgroundColor: COLORS.white,
      // paddingHorizontal: 0,
      // marginTop: -responsivePixels.size200,
    },
    dropdown3RowStyle: {
      // height: responsivePixels.size24,
      // width: responsivePixels.size79,
      height: responsivePixels.size50,
      // width: '80%',
      // borderTopRightRadius: responsivePixels.size6,
      // borderBottomEndRadius: responsivePixels.size6,
      paddingHorizontal: 5,
      backgroundColor: COLORS.white,
    },
    dropdown3RowTxt: {
      color: COLORS.black,
      ...common.font_11_12_89,
      marginLeft: responsivePixels.size5,
    },
    dropdown3BtnTxt: {
      color: COLORS.ebonyClayHex,
      ...common.font_11_12_89,
      fontWeight: '400',
      marginLeft: responsivePixels.size5,
    },
    dropdownContainer: {
      borderRadius: responsivePixels.size4,
      backgroundColor: COLORS.white,
      paddingHorizontal: 5,
      height: responsivePixels.size200,
      // width: responsivePixels.size90,
    },
    dropdown3RowChildStyle: {
      width: responsivePixels.size79,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    renderDropdownIcon: {
      ...common.image20,
      marginRight: responsivePixels.size5,
    },
    footerView: {
      paddingHorizontal: responsivePixels.size20,
      paddingBottom: responsivePixels.size20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    footerButton: {
      borderRadius: responsivePixels.size6,
      height: responsivePixels.size54,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 0,
    },
    footerButtonTitle: {
      ...common.font_18_21_9,
      fontWeight: '600',
      color: COLORS.white,
      textTransform: 'capitalize',
    },
    leftIcon: {
      ...common.image24,
      alignSelf: 'center',
    },
    renderLeft: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginHorizontal: 10,
      marginTop: 10,
      justifyContent: 'flex-start',
    },
  });

export default styles;
