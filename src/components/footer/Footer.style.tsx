import {StyleSheet} from 'react-native';

import {getStatusBarHeight} from 'common/statusBar';
import {ITheme} from 'interfaces/common';

import CONSTANTS from 'common/constants';
import common from 'common/common.styles';
import COLORS from 'common/colors';
import responsivePixels from 'utils/responsivePixels';
import FONTS from 'common/fonts';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.darkOrange,
      position: 'absolute',
      justifyContent: 'center',
      width: '100%',
      bottom: 0,
      height: responsivePixels.size79,
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
      paddingVertical: 5,
      justifyContent: 'center',
      marginHorizontal: responsivePixels.size4,
      flex: 1,
    },
    leftIcon: {
      ...common.image20,
      alignSelf: 'center',
      marginHorizontal: 5,
    },

    menuIcon: {
      ...common.image20,
      alignSelf: 'center',
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.white,
    },
    title: {
      ...common.font_14_15_23,
      fontWeight: '500',
      color: COLORS.white,
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
    rightText: {
      ...common.font_13_15_23_RM,
      color: COLORS.darkOrange,
      fontWeight: '500',
      textAlignVertical: 'center',
      textAlign: 'center',
    },
    horizontalview: {
      height: responsivePixels.size4,
      backgroundColor: COLORS.grayHex,
    },
    rowView: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginHorizontal: responsivePixels.size4,
    },
  });

export default styles;
