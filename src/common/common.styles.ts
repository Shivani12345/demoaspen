import {Platform, StyleSheet} from 'react-native';

import responsivePixels from 'utils/responsivePixels';
import COLORS from 'common/colors';
import FONTS from './fonts';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalMargin: {marginHorizontal: 16},
  shadow: {
    shadowOffset: {
      width:
        Platform.OS === 'ios'
          ? responsivePixels.size4
          : -responsivePixels.size2,
      height: responsivePixels.size5,
    },
    shadowColor:
      Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.07)' : COLORS.cynicalBlack,
    shadowOpacity:
      Platform.OS === 'ios' ? responsivePixels.size1 : responsivePixels.size0_2,
    shadowRadius: responsivePixels.size4,
    elevation: responsivePixels.size4,
    backgroundColor: 'white', // Required for Android shadows
    borderRadius: responsivePixels.size4, // Adjust this value based on your needs
  },
  image100Per: {
    height: '100%',
    width: '100%',
  },
});

const texts = StyleSheet.create({
  font_10_12: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size10,
    lineHeight: responsivePixels.size12,
  },
  font_10_14: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size10,
    lineHeight: responsivePixels.size14,
  },
  font_11_14: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size11,
    lineHeight: responsivePixels.size14,
  },
  font_11_5_14: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size11_5,
    lineHeight: responsivePixels.size14,
  },
  font_11_15_23: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size11,
    lineHeight: responsivePixels.size15_23,
  },
  font_11_12_89: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size11,
    lineHeight: responsivePixels.size12_89,
  },
  font_12_14: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size12,
    lineHeight: responsivePixels.size14,
  },
  font_12_15_23: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size12,
    lineHeight: responsivePixels.size15_23,
  },
  font_12_5_15_23: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size12_5,
    lineHeight: responsivePixels.size15_23,
  },
  font_12_16: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size12,
    lineHeight: responsivePixels.size16,
  },
  font_12_3_16: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size12_3,
    lineHeight: responsivePixels.size16,
  },
  font_12_5_18: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size12_5,
    lineHeight: responsivePixels.size18,
  },
  font_12_15_23_RR: {
    fontFamily: FONTS.robotoRegular,
    fontSize: responsivePixels.size12,
    lineHeight: responsivePixels.size15_23,
  },
  font_13_15_23_RM: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size13,
    lineHeight: responsivePixels.size15_23,
  },
  font_13_15_23_RR: {
    fontFamily: FONTS.robotoRegular,
    fontSize: responsivePixels.size13,
    lineHeight: responsivePixels.size15_23,
  },
  font_16_16_RR: {
    fontFamily: FONTS.robotoRegular,
    fontSize: responsivePixels.size16,
    lineHeight: responsivePixels.size16,
  },
  font_13_15_RR: {
    fontFamily: FONTS.robotoRegular,
    fontWeight: 'bold',
    fontSize: responsivePixels.size13,
    lineHeight: responsivePixels.size15,
  },
  font_13_3_15_23: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size13_3,
    lineHeight: responsivePixels.size15_23,
  },
  font_13_5_15_23: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size13_5,
    lineHeight: responsivePixels.size15_23,
  },
  font_13_18: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size13,
    lineHeight: responsivePixels.size18,
  },
  font_13_20: {
    fontFamily: FONTS.robotoRegular,
    fontSize: responsivePixels.size13,
    lineHeight: responsivePixels.size20,
  },
  font_14_15_23: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size14,
    lineHeight: responsivePixels.size15_23,
  },
  font_14_5_18: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size14_5,
    lineHeight: responsivePixels.size18,
  },
  font_14_18_23: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size14,
    lineHeight: responsivePixels.size18_23,
  },
  font_14_16_41: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size14,
    lineHeight: responsivePixels.size16_41,
  },

  font_18_18: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size18,
    lineHeight: responsivePixels.size18,
  },
  font_14_16_41_Italic: {
    // fontFamily: FONTS.robotoRegular,
    // fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: responsivePixels.size14,
    lineHeight: responsivePixels.size16_41,
  },
  font_14_18: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size14,
    lineHeight: responsivePixels.size18,
  },
  font_14_19: {
    fontFamily: FONTS.robotoRegular,
    fontWeight: 'bold',
    fontSize: responsivePixels.size14,
    lineHeight: responsivePixels.size19,
  },
  font_14_20_RR: {
    fontFamily: FONTS.robotoRegular,
    // fontWeight: 'bold',
    fontSize: responsivePixels.size14,
    lineHeight: responsivePixels.size20,
  },
  font_14_20: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size14,
    lineHeight: responsivePixels.size20,
  },
  font_15_18: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size15,
    lineHeight: responsivePixels.size18,
  },
  font_15_18_75: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size15,
    lineHeight: responsivePixels.size18_75,
  },

  font_15_5_18_75: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size15_5,
    lineHeight: responsivePixels.size18_75,
  },
  font_15_20: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size15,
    lineHeight: responsivePixels.size20,
  },
  font_15_5_20: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size15_5,
    lineHeight: responsivePixels.size20,
  },
  font_16_18_75: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size16,
    lineHeight: responsivePixels.size18_75,
  },
  font_16_20: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size16,
    lineHeight: responsivePixels.size20,
  },
  font_16_24: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size16,
    lineHeight: responsivePixels.size24,
  },
  font_17_23: {
    fontFamily: FONTS.robotoMedium,
    // fontWeight: 'bold',
    fontSize: responsivePixels.size17,
    lineHeight: responsivePixels.size23,
  },
  font_17_23_RR: {
    fontFamily: FONTS.robotoRegular,
    // fontWeight: 'bold',
    fontSize: responsivePixels.size17,
    lineHeight: responsivePixels.size23,
  },

  font_16_23_RR: {
    fontFamily: FONTS.robotoRegular,
    // fontWeight: 'bold',
    fontSize: responsivePixels.size16,
    lineHeight: responsivePixels.size23,
  },
  font_15_23_RR: {
    fontFamily: FONTS.robotoRegular,
    // fontWeight: 'bold',
    fontSize: responsivePixels.size15,
    lineHeight: responsivePixels.size23,
  },
  font_17_23_NST: {
    fontFamily: FONTS.notoSerifThai,
    // fontFamily: FONTS.robotoMedium,
    fontSize: responsivePixels.size17,
    lineHeight: responsivePixels.size23,
  },
  font_18_21_9: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size18,
    lineHeight: responsivePixels.size21_09,
  },
  font_15_21_9: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size15,
    lineHeight: responsivePixels.size21_09,
  },
  font_18_26: {
    fontFamily: FONTS.robotoRegular,
    // fontWeight: 'bold',
    fontSize: responsivePixels.size18,
    lineHeight: responsivePixels.size26,
  },
  font_19_26: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size19,
    lineHeight: responsivePixels.size26,
  },
  font_20_26: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size20,
    lineHeight: responsivePixels.size26,
  },
  font_23_34: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size23,
    lineHeight: responsivePixels.size34,
  },
  font_20_23_44: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size20,
    lineHeight: responsivePixels.size23_44,
  },
  font_24_28_13: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size24,
    lineHeight: responsivePixels.size28_13,
  },
  font_28_28_13: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size28,
    lineHeight: responsivePixels.size28_13,
  },
  font_24_34: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size24,
    lineHeight: responsivePixels.size34,
  },
  font_26_34: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size26,
    lineHeight: responsivePixels.size30,
  },
  font_22_25_78: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size22,
    lineHeight: responsivePixels.size25_78,
  },
  font_40_46: {
    fontFamily: FONTS.robotoMedium,
    fontWeight: 'bold',
    fontSize: responsivePixels.size40,
    lineHeight: responsivePixels.size46_88,
  },
});

const common = StyleSheet.create({
  ...styles,
  ...texts,

  image10: {width: responsivePixels.size10, height: responsivePixels.size10},
  image12: {width: responsivePixels.size12, height: responsivePixels.size12},
  image14: {width: responsivePixels.size14, height: responsivePixels.size14},
  image20: {width: responsivePixels.size20, height: responsivePixels.size20},
  image22: {width: responsivePixels.size22, height: responsivePixels.size22},
  image24: {width: responsivePixels.size24, height: responsivePixels.size24},
  image30: {width: responsivePixels.size30, height: responsivePixels.size30},
  image40: {width: responsivePixels.size40, height: responsivePixels.size40},
});

export default common;
