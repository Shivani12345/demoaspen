import {StyleSheet} from 'react-native';

import {ITheme} from 'interfaces/common';
import common from 'common/common.styles';
import COLORS from 'common/colors';
import responsivePixels from 'utils/responsivePixels';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    view: {marginTop: responsivePixels.size15},
    containerStyle: {
      alignSelf: 'center',
      // marginTop: responsivePixels.size8,
      marginTop: responsivePixels.size8,
      borderRadius: responsivePixels.size6,
      borderWidth: responsivePixels.size1,
      borderColor: COLORS.gray,
      paddingHorizontal: responsivePixels.size15,
      height: responsivePixels.size54,
    },
    titleView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputContainerStyle: {
      height: '100%',
      borderBottomWidth: 0,
    },
    inputStyle: {
      ...common.font_13_15_23_RR,
      fontWeight: '400',
      color: COLORS.black,
    },
    rightIconImageStyle: {
      ...common.image24,
      marginRight: -responsivePixels.size10,
    },
    text: {
      ...common.font_13_15_23_RM,
      fontWeight: '500',
      color: COLORS.mediumGray,
    },
    requiredContainer: {
      marginBottom: 1,
      // backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
    requiredText: {
      ...common.font_13_15_23_RM,
      fontWeight: '500',
      color: COLORS.red,
    },
    errorMessage: {
      color: COLORS.red,
      marginTop: 2,
      fontSize: responsivePixels.size10,
    },
  });

export default styles;
