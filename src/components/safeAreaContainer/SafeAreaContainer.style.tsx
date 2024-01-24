import { StyleSheet } from 'react-native';

import { ITheme } from 'interfaces/common';

const styles = (theme: ITheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default styles;
