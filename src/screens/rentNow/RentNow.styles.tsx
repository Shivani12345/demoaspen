import {Platform, StyleSheet} from 'react-native';
import {ITheme} from 'interfaces/common';

import responsivePixels from 'utils/responsivePixels';
import SIZES from 'utils/sizes';
import COLORS from 'common/colors';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    logoStyle: {
      width: responsivePixels.size220_25,
      height: responsivePixels.size70,
      marginTop: SIZES.isNotch
        ? responsivePixels.size20
        : responsivePixels.size60,
      alignSelf: 'center',
    },
    mainButton: {
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size184,
    },
    splashImageView: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    splashImage: {
      width: responsivePixels.size323_77,
      height: responsivePixels.size281,
      // backgroundColor: 'red',
      // marginBottom: SIZES.isNotch
      //   ? -responsivePixels.size1_5
      //   : -responsivePixels.size1,
    },
    policyViewContainer:{
      marginTop: responsivePixels.size10,
      display:'flex',
      alignItems:'center',
      justifyContent: 'center'
    },
    languageContainer: {
      display:'flex',
      alignItems: 'center',
      justifyContent:'center',
      marginTop: responsivePixels.size40,
    },
    btnEnglish: {
      flex: 1,
      alignItems: 'flex-end',
      marginRight: responsivePixels.size20,
    },
    languageIcon: {
      height: responsivePixels.size70,
      width: responsivePixels.size70,
      borderRadius: responsivePixels.size10,
      alignSelf: 'center',
    },

    selectedLanguage: {
      height: responsivePixels.size70,
      width: responsivePixels.size70,
      borderRadius: responsivePixels.size10,
      borderWidth: 1,
      borderColor: COLORS.darkOrange,
    },
    btnSpanish: {
      flex: 1,
      alignItems: 'flex-start',
      marginLeft: responsivePixels.size20,
    },
    conditionContainer: {
      flexDirection: 'row',
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size25,
    },
    termsconditionContainer: {
      flexDirection: 'row',
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size5,
    },
    conditiontext: {
      textDecorationLine: 'underline',
      marginRight: responsivePixels.size6,
      fontSize: responsivePixels.size12,
      fontWeight: '500',
      // marginLeft:responsivePixels.size15,
      color: COLORS.dodgerblue,

      // textAlign:'center'
      alignSelf: 'center',
      // marginTop: responsivePixels.size30,
    },
    termsandconditiontext: {
      textDecorationLine: 'underline',
      marginLeft: responsivePixels.size6,
      fontSize: responsivePixels.size12,
      fontWeight: '500',
      // marginLeft:responsivePixels.size15,
      color: COLORS.dodgerblue,

      // textAlign:'center'
      alignSelf: 'center',
      // marginTop: responsivePixels.size10,
    },
    rentNowMainButton: {
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size30,
    },
    languagetext: {
      color: COLORS.black,
      fontSize: responsivePixels.size14,
      marginTop: responsivePixels.size5,
      alignSelf: 'center',
    },
    selectedapptext: {
      color: COLORS.darkOrange,
      fontSize: responsivePixels.size14,
      marginTop: responsivePixels.size5,
      alignSelf: 'center',
    },
    btn: {
      alignSelf: 'center',
      marginHorizontal: responsivePixels.size20,
      paddingHorizontal: responsivePixels.size10,
      paddingVertical: responsivePixels.size5,
    },

    selectedBtn: {
      alignSelf: 'center',
      marginHorizontal: responsivePixels.size20,
      borderWidth: responsivePixels.size1,
      borderColor: COLORS.darkOrange,
      borderRadius: responsivePixels.size10,
      paddingHorizontal: responsivePixels.size10,
      paddingVertical: responsivePixels.size5,
    },
    closetext: {
      fontSize: responsivePixels.size15,
      color: COLORS.white,
      alignSelf: 'center',
    },
    modelContainer: {
      flex: 1,

      justifyContent: 'center',

      // height: SIZES.deviceHeight / 1.5,
      borderWidth: responsivePixels.size2,
      marginHorizontal: responsivePixels.size20,
      borderRadius: responsivePixels.size10,
      // marginTop:responsivePixels.size100,
      // paddingTop:responsivePixels.size2,
      padding: responsivePixels.size2,
      backgroundColor: COLORS.white,
      marginVertical: responsivePixels.size100,
    },
    closebtn: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: COLORS.darkOrange,
      paddingHorizontal: responsivePixels.size20,
      paddingVertical: responsivePixels.size5,
      borderRadius: responsivePixels.size20,
      marginVertical: 20,
    },
    indicator: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  });

export default styles;
