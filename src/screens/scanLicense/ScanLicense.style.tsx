import {Platform, StyleSheet} from 'react-native';

import {ITheme} from 'interfaces/common';
import COLORS from 'common/colors';
import responsivePixels from 'utils/responsivePixels';
import SIZES from 'utils/sizes';
import common from 'common/common.styles';
import {isIOS} from 'utils/functions';
import FONTS from 'common/fonts';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    screenHeader: {
      color: COLORS.ebonyClayHex,
      ...common.font_24_28_13,
      fontWeight: '500',
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size25,
    },
    scannerContainer: {
      paddingHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imgStyle: {
      height: responsivePixels.size210,
      width: responsivePixels.size340,
      alignSelf: 'center',
    },
    licenseImage: {
      borderWidth: responsivePixels.size1,
      borderColor: COLORS.darkgray,
      height: responsivePixels.size197,
      width: isIOS() ? responsivePixels.size290 : responsivePixels.size330,
      marginTop: responsivePixels.size13,
    },
    scanerDefaultTxt: {
      ...common.font_14_16_41_Italic,
      fontWeight: '400',
      marginTop: responsivePixels.size15_39,
      alignSelf: 'center',
      color: COLORS.osloGray,
      letterSpacing: responsivePixels.size0_3,
    },
    nextBtn: {
      backgroundColor: COLORS.darkOrange,
      marginHorizontal: responsivePixels.size20,
      height: responsivePixels.size54,
      borderRadius: responsivePixels.size6,
      justifyContent: 'center',
      alignItems: 'center',
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
      textAlign: 'center',
    },
    cameraText: {
      textAlign: 'center',
      position: 'absolute',
      ...common.font_28_28_13,
      color: COLORS.darkOrange,
    },
    leftIcon: {
      ...common.image24,
      alignSelf: 'center',
    },
    renderLeft: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      margin: 10,
      justifyContent: 'flex-start',
    },
  });

export default styles;
