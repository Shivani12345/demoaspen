import { StyleSheet } from 'react-native';

import common from 'common/common.styles';
import COLORS from 'common/colors';

const styles = () => StyleSheet.create({
  container: {
    height: 30,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.maroon,
    bottom: 0,
  },
  textStyle: {
    ...common.font_16_20,
    color: COLORS.white,
  },
});

export default styles;
