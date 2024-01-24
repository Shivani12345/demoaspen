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
    screenHeader: {
      ...common.font_24_34,
      color: COLORS.ebonyClayHex,
      fontWeight: '500',
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size25,
    },
    scannerContainer: {
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size15,
      // backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imgStyle: {
      width: '100%',
      height: responsivePixels.size205_61,
      alignSelf: 'center',
    },
    scanerDefaultTxt: {
      ...common.font_14_16_41_Italic,
      fontWeight: '400',
      marginTop: responsivePixels.size15_39,
      alignSelf: 'center',
      color: COLORS.osloGray,
    },
    nextBtn: {
      backgroundColor: COLORS.darkOrange,
      marginHorizontal: responsivePixels.size20,
      height: responsivePixels.size54,
      borderRadius: responsivePixels.size6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    warningContainer: {
      borderWidth: responsivePixels.size1,
      marginHorizontal: responsivePixels.size20,
      backgroundColor: COLORS.lightOrange,
      borderColor: COLORS.darkOrange,
      borderRadius: responsivePixels.size6,
      marginTop: responsivePixels.size50,
      padding: responsivePixels.size15,
      flexDirection: 'row',
    },
    warningIcon: {
      height: responsivePixels.size22,
      width: responsivePixels.size22,
      marginTop: responsivePixels.size2,
    },
    warningText: {
      marginLeft: responsivePixels.size15,
      flex: 1,
      ...common.font_13_20,
      fontWeight: '400',
      color: COLORS.mediumGray,
    },
    btnContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: responsivePixels.size20,
    },
    btntxt: {
      ...common.font_18_21_9,
      color: COLORS.white,
      fontWeight: '600',
    },
    cameraText: {
      textAlign: 'center',
      position: 'absolute',
      ...common.font_28_28_13,
      color: COLORS.darkOrange,
    },
  });

export default styles;
