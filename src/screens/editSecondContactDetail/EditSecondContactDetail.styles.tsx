import {StyleSheet} from 'react-native';
import {ITheme} from 'interfaces/common';

import common from 'common/common.styles';
import responsivePixels from 'utils/responsivePixels';
import COLORS from 'common/colors';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: responsivePixels.size20,
    },
    contentContainerStyle: {
      flexGrow: 1,
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
    inputStyle: {
      color: COLORS.scorpion,
    },
    footerView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
      alignItems: 'flex-end',
      marginVertical: responsivePixels.size20,
    },
    footerButton: {
      borderRadius: responsivePixels.size6,
      height: responsivePixels.size54,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerButtonTitle: {
      ...common.font_18_21_9,
      fontWeight: '600',
      color: COLORS.white,
    },
  });

export default styles;
