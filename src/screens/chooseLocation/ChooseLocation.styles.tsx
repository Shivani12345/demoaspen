import {StyleSheet} from 'react-native';
import {ITheme} from 'interfaces/common';

import common from 'common/common.styles';
import responsivePixels from 'utils/responsivePixels';
import COLORS from 'common/colors';
import {isIOS} from 'utils/functions';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    renderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftIcon: {
      ...common.image22,
      alignSelf: 'center',
    },
    headerContainer: isIOS()
      ? {
          alignItems: 'flex-start',
          marginHorizontal: responsivePixels.size20,
          marginTop: responsivePixels.size20,
        }
      : {
          alignItems: 'flex-start',
          marginHorizontal: responsivePixels.size20,
          marginTop: responsivePixels.size20,
        },
    back: {
      ...common.font_16_23_RR,
      letterSpacing: responsivePixels.size0_48,
      marginLeft: responsivePixels.size5,
      fontWeight: '400',
      color: COLORS.grayHex,
    },
    indicator: {
      justifyContent: 'center',
      alignItems: 'center',
      height: responsivePixels.size50,
    },
    logoStyle: {
      width: responsivePixels.size220_25,
      height: responsivePixels.size70,
      marginTop: responsivePixels.size60,
      alignSelf: 'center',
    },
    textStyle: {
      ...common.font_13_15_23_RM,
      fontWeight: '500',
      color: theme.colors.text,
      marginTop: responsivePixels.size50,
      marginLeft: responsivePixels.size20,
    },
    itemView: {
      borderWidth: responsivePixels.size1,
      borderColor: COLORS.lightGray,
      marginHorizontal: responsivePixels.size20,
      paddingHorizontal: responsivePixels.size15,
      height: responsivePixels.size50,
      marginTop: responsivePixels.size15,
      borderRadius: responsivePixels.size6,
      backgroundColor: COLORS.white,
      alignItems: 'center',
      flexDirection: 'row',
    },
    selectedItemView: {
      borderWidth: responsivePixels.size1,
      borderColor: COLORS.selectedBorder,
      marginHorizontal: responsivePixels.size20,
      paddingHorizontal: responsivePixels.size15,
      height: responsivePixels.size50,
      marginTop: responsivePixels.size15,
      borderRadius: responsivePixels.size6,
      backgroundColor: COLORS.lightOrange_03,
      alignItems: 'center',
      flexDirection: 'row',
    },
    itemCheckBox: {
      height: responsivePixels.size20,
      width: responsivePixels.size20,
      borderRadius: responsivePixels.size20,
      borderWidth: responsivePixels.size2,
      borderColor: COLORS.lightGray,
      alignItems: 'center',
      justifyContent: 'center',
    },
    check: {
      height: responsivePixels.size20,
      width: responsivePixels.size20,
    },
    itemText: {
      ...common.font_13_15_23_RR,
      fontWeight: '400',
      color: COLORS.dimGray,
      marginHorizontal: responsivePixels.size10,
      letterSpacing: responsivePixels.size0_1,
    },
    selectedItemText: {
      ...common.font_13_15_23_RM,
      fontWeight: '500',
      color: COLORS.darkOrange,
      marginLeft: responsivePixels.size10,
      letterSpacing: responsivePixels.size0_1,
    },
    chooseLocationImage: {
      width: responsivePixels.size327_71,
      height: responsivePixels.size320,
      alignSelf: 'center',
      marginBottom: -responsivePixels.size1,
    },
    footerButton: {
      borderRadius: responsivePixels.size6,
      height: responsivePixels.size54,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
      marginTop: 30,
    },
    footerButtonTitle: {
      ...common.font_18_21_9,
      fontWeight: '600',
      color: COLORS.white,
      // textTransform:''
    },
  });

export default styles;
