import {Platform, StyleSheet} from 'react-native';

import common from 'common/common.styles';
import {ITheme} from 'interfaces/common';
import responsivePixels from 'utils/responsivePixels';
import COLORS from 'common/colors';
import {getStatusBarHeight} from 'common/statusBar';
import CONSTANTS from 'common/constants';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    mainStyle: {
      backgroundColor: theme.colors.buttonBackground,

      height: responsivePixels.size104,
      // width: responsivePixels.size335,
      borderRadius: responsivePixels.size6,
      overflow: 'hidden',
      // marginTop: responsivePixels.size184,
      alignItems: 'center',
      justifyContent: 'center',
      // marginHorizontal: responsivePixels.size20,
    },
    textStyle: {
      ...common.font_40_46,
      color: theme.colors.buttonText,
      fontWeight: '600',
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
      letterSpacing: responsivePixels.size0_48,
      marginLeft: responsivePixels.size5,
      fontWeight: '400',
      color: COLORS.grayHex,
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
      textAlign: 'center',
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
  });

export default styles;
