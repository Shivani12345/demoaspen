import { StyleSheet } from 'react-native';

import COLORS from 'common/colors';
import common from 'common/common.styles';

const styles = StyleSheet.create({
  container: {
    ...common.wrapper,
  },
  absoluteContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.transparentWhite,
  },
  text: {
    ...common.font_10_14,
  },
});

export default styles;
