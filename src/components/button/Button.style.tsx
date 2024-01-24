import {Platform, StyleSheet} from 'react-native';

import common from 'common/common.styles';
import {ITheme} from 'interfaces/common';
import responsivePixels from 'utils/responsivePixels';

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
  });

export default styles;
