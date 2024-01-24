import COLORS from './colors';

export const theme = {
  colors: {
    background: COLORS.white,
    foreground: COLORS.black,
    text: COLORS.mediumGray,
    buttonBackground: COLORS.darkOrange,
    buttonText: COLORS.white,
    borderColor: COLORS.black,
    tintColor: COLORS.black,
    primary: COLORS.purple,
    success: COLORS.green,
    danger: COLORS.red,
    failure: COLORS.red,
    buttonLoaderColor: COLORS.white,
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: COLORS.black,
    foreground: COLORS.white,
    text: COLORS.mediumGray,
    buttonBackground: COLORS.darkOrange,
    buttonText: COLORS.black,
    tintColor: COLORS.white,
    borderColor: COLORS.white,
    buttonLoaderColor: COLORS.black,

  },
};
