import {Platform, StyleSheet} from 'react-native';
import {ITheme} from 'interfaces/common';

import common from 'common/common.styles';
import responsivePixels from 'utils/responsivePixels';
import COLORS from 'common/colors';
import {PaddingTopForFooter} from 'utils/functions';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: responsivePixels.size20,
      backgroundColor: theme.colors.background,
    },
    contactDetails: {
      ...common.font_24_34,
      fontWeight: '500',
      color: COLORS.ebonyClay,
      marginTop: responsivePixels.size25,
    },
    scrollView: {flex: 1},
    contentContainerStyle: {
      paddingBottom: responsivePixels.size5,
    },
    renterCardView: {
      padding: responsivePixels.size20,
      borderColor: COLORS.gray,
      borderWidth: responsivePixels.size1,
      borderRadius: responsivePixels.size6,
      marginTop: responsivePixels.size15,
    },
    cardNameView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardEditImage: {
      ...common.image24,
      marginRight: -responsivePixels.size25,
      paddingRight: 10,
      // flex: 1,
      // backgroundColor: 'pink',
    },
    cardTextView: {
      marginTop: responsivePixels.size15,
    },
    cardLabel: {
      ...common.font_13_15_23_RM,
      fontWeight: '500',
      color: COLORS.mediumGray,
    },
    cardValue: {
      // ...common.font_13_15_23_RR,
      ...common.font_16_16_RR,
      fontWeight: '400',
      color: COLORS.bombay,
      marginTop: responsivePixels.size5,
      // backgroundColor: 'red',
    },
    secondContactCardView: {
      padding: responsivePixels.size20,
      borderColor: COLORS.gray,
      borderWidth: responsivePixels.size1,
      borderRadius: responsivePixels.size6,
      marginTop: responsivePixels.size20,
    },
    footerButton: {
      borderRadius: responsivePixels.size6,
      height: responsivePixels.size54,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: responsivePixels.size20,
      marginTop: 0,
    },
    footerButtonTitle: {
      ...common.font_18_21_9,
      fontWeight: '600',
      color: COLORS.white,
    },
  });

export default styles;
