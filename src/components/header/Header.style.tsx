import {StyleSheet} from 'react-native';

import {getStatusBarHeight} from 'common/statusBar';
import {ITheme} from 'interfaces/common';

import CONSTANTS from 'common/constants';
import common from 'common/common.styles';
import COLORS from 'common/colors';
import responsivePixels from 'utils/responsivePixels';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: CONSTANTS.HEADER_HEIGHT + getStatusBarHeight(true),
      paddingTop: getStatusBarHeight(true),
      ...common.shadow,
      flexDirection: 'row',
      paddingHorizontal: responsivePixels.size9,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftContainer: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: COLORS.white,
      flex: 0.5,
      alignSelf: 'center',
    },
    renderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftIcon: {
      ...common.image24,
      alignSelf: 'center',
    },
    back: {
      ...common.font_17_23_RR,
      // ...common.font_17_23_NST,
      letterSpacing: responsivePixels.size0_48,
      marginLeft: responsivePixels.size5,
      fontWeight: '400',
      color: COLORS.grayHex,
      // textAlignVertical: 'center',
      // textAlign: 'center',
    },
    menuIcon: {
      ...common.image24,
      alignSelf: 'center',
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.white,
    },
    title: {
      ...common.font_16_18_75,
      fontWeight: '400',
      textTransform: 'capitalize',
      color: COLORS.dimBlack,
      textAlign:'center'
    },
    rightContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      backgroundColor: COLORS.white,
      flex: 0.5,
    },
    profileIcon: {
      height: responsivePixels.size30,
      width: responsivePixels.size30,
      borderRadius: responsivePixels.size30 / responsivePixels.size2,
    },
    rightText: {
      ...common.font_13_15_23_RM,
      color: COLORS.darkOrange,
      fontWeight: '500',
      textAlignVertical: 'center',
      textAlign: 'center',
    },
  });

export default styles;
