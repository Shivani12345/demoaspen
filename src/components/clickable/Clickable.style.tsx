import common from 'common/common.styles';
import {theme} from 'common/theme';
import {StyleSheet} from 'react-native';

const styles = (/* theme: ITheme */) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      /* width: '100%', */
    },
    textStyle: {
      ...common.font_40_46,
      color: theme.colors.buttonText,
      fontWeight: '600',
    },
  });

export default styles;
