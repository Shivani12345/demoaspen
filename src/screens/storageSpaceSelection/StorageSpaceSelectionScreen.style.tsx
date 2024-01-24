import {Platform, StatusBar, StyleSheet} from 'react-native';

import {ITheme} from 'interfaces/common';
import COLORS from 'common/colors';
import responsivePixels from 'utils/responsivePixels';

import common from 'common/common.styles';
import {getStatusBarHeight} from 'common/statusBar';

import SIZES from 'utils/sizes';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    renderLeft: {
      flexDirection: 'row',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    renderText: {
      flexDirection: 'row',
      // marginHorizontal: 5,
      marginVertical: 10,
    },
    leftIcon: {
      ...common.image20,
      alignSelf: 'center',
    },
    menuIcon: {
      ...common.image20,
      marginHorizontal: 5,
      alignSelf: 'center',
    },
    headerContainer: {
      alignItems: 'flex-start',
      marginLeft: -responsivePixels.size5,
      marginRight: responsivePixels.size5,
      marginTop: responsivePixels.size5,
      // marginHorizontal:responsivePixels.size20
    },
    title: {
      ...common.font_14_16_41,
      fontWeight: '500',
      color: COLORS.darkOrange,
      textAlign: 'center',
    },
    back: {
      ...common.font_15_23_RR,
      // ...common.font_17_23_NST,
      letterSpacing: responsivePixels.size0_48,
      marginLeft: responsivePixels.size5,
      fontWeight: '400',
      color: COLORS.grayHex,
      // textAlignVertical: 'center',
      // textAlign: 'center',
    },
    shadowContainer: {
      width: '100%',
      paddingTop: getStatusBarHeight(true),
      paddingVertical: responsivePixels.size5,
      ...common.shadow,
      flexDirection: 'row',
    },
    headerItem: {
      flex: 1,
      height: responsivePixels.size45,
      paddingHorizontal: responsivePixels.size20,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      alignSelf: 'flex-end',
    },
    selectedCountryLang: {
      flexDirection: 'row',
    },
    headerimg: {
      height: responsivePixels.size31,
      width: responsivePixels.size100,
      marginLeft: responsivePixels.size10,
    },
    dropdown: {
      height: responsivePixels.size24,
      width: responsivePixels.size79,
      borderWidth: responsivePixels.size1,
      borderColor: COLORS.selectedBorder,
      borderRadius: responsivePixels.size24,
      backgroundColor: COLORS.white,
      paddingHorizontal: 0,
    },
    dropdownContainer: {
      borderRadius: responsivePixels.size4,
      backgroundColor: COLORS.white,
      marginTop: StatusBar.currentHeight,
      height: responsivePixels.size100,
      width: responsivePixels.size90,
    },
    downArrow: {
      width: responsivePixels.size16,
      height: responsivePixels.size16,
      marginRight: responsivePixels.size8,
    },
    selectedTextStyle: {
      ...common.font_11_12_89,
      marginLeft: responsivePixels.size8,
      fontWeight: '400',
      color: COLORS.ebonyClayHex,
    },
    iconStyle: {
      width: responsivePixels.size16,
      height: responsivePixels.size16,
      right: responsivePixels.size4,
    },
    questionimg: {
      height: responsivePixels.size24,
      width: responsivePixels.size24,
      marginLeft: responsivePixels.size15,
    },
    titletxt: {
      marginLeft: responsivePixels.size20,
      marginTop: responsivePixels.size25,
      color: COLORS.ebonyClayHex,
      ...common.font_24_34,
      fontWeight: '500',
    },
    itemimg: {
      marginHorizontal: responsivePixels.size30,
      top: responsivePixels.size10,
    },
    itemtoptxt: {
      ...common.font_14_16_41,
      fontWeight: '500',
      lineHeight: responsivePixels.size16_41,
      color: COLORS.ebonyClayHex,
    },
    itembottomtxt: {
      ...common.font_14_16_41,
      marginTop: responsivePixels.size20,
      fontWeight: '500',
      color: COLORS.ebonyClayHex,
    },
    renderItemMainView: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: responsivePixels.size20,
      marginHorizontal: responsivePixels.size7_5,
    },
    renderitem: {
      flex: 1,
      alignItems: 'center',
      borderRadius: responsivePixels.size6,
      paddingVertical: responsivePixels.size10,
      backgroundColor: COLORS.wildSand,
      paddingHorizontal: responsivePixels.size17,
    },
    selectedItem: {
      borderWidth: responsivePixels.size1,
      borderRadius: responsivePixels.size6,
      borderColor: COLORS.selectedBorder,
      backgroundColor: COLORS.lightOrange,
    },
    row: {
      flex: 1,
      justifyContent: 'space-around',
    },
    listcontainer: {
      marginHorizontal: responsivePixels.size12_5,
      backgroundColor: COLORS.white,
      marginTop: responsivePixels.size30,
    },
    clickable: {
      flexDirection: 'row',
      marginTop: responsivePixels.size15,
      marginHorizontal: responsivePixels.size20,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    fontStyle: {
      ...common.font_14_16_41,
      marginVertical: responsivePixels.size7,
      marginHorizontal: responsivePixels.size20,
    },
    buttonContainerStyle: {
      borderWidth: responsivePixels.size1,
      borderRadius: responsivePixels.size6,
      borderColor: COLORS.gallery,
      height: responsivePixels.size32,
      marginRight: responsivePixels.size10,
    },
    selectedbuttonContainerStyle: {
      borderWidth: responsivePixels.size1,
      borderRadius: responsivePixels.size6,
      borderColor: COLORS.westSide,
      backgroundColor: COLORS.westSide,
      height: responsivePixels.size32,
      marginRight: responsivePixels.size10,
    },
    scrollBtnContainer: {
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size15,
    },
    selectedbutton: {
      borderWidth: responsivePixels.size1,
      borderRadius: responsivePixels.size6,
      borderColor: COLORS.westSide,
      backgroundColor: COLORS.westSide,
      height: responsivePixels.size32,
    },
    unselectedbutton: {
      borderWidth: responsivePixels.size1,
      borderRadius: responsivePixels.size6,
      borderColor: COLORS.gallery,
      height: responsivePixels.size32,
    },
    buttonText: {
      ...common.font_14_16_41,
      color: COLORS.dimGray,
      fontWeight: '400',
    },
    selectedButtonText: {
      ...common.font_14_16_41,
      color: COLORS.white,
      fontWeight: '500',
    },
    howToUseCenteredView: {
      flex: 1,
      justifyContent: 'center',
    },
    howToUseModalView: {
      backgroundColor: COLORS.white,
      borderRadius: responsivePixels.size8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: responsivePixels.size2,
      },
      width: '100%',
      shadowOpacity: responsivePixels.size0_2,
      shadowRadius: responsivePixels.size4,
      elevation: responsivePixels.size5,
      height: responsivePixels.size550,
    },
    howToUseTitle: {
      marginTop: responsivePixels.size20,
      ...common.font_24_28_13,
      fontWeight: '500',
      color: COLORS.ebonyClayHex,
    },
    howToUseDescription: {
      marginHorizontal: responsivePixels.size20,
      marginTop: responsivePixels.size10,
      color: COLORS.ebonyClayHex,
      // backgroundColor: 'pink',
    },
    howToUsePolicyList: {marginTop: responsivePixels.size11},
    howToUsePolicyItemView: {
      flexDirection: 'row',
      paddingHorizontal: responsivePixels.size20,
      marginVertical: responsivePixels.size4,
    },
    howToUseItemPointImage: {
      ...common.image10,
      marginTop: responsivePixels.size6,
    },
    howToUseItemPointText: {
      ...common.font_13_20,
      fontWeight: '400',
      marginHorizontal: responsivePixels.size12,
      color: COLORS.ebonyClayHex,
    },
    howToUseFooterView: {
      // height: responsivePixels.size74,
      backgroundColor: COLORS.wildSand,
      borderRadius: responsivePixels.size8,
      marginTop: responsivePixels.size6,
    },
    howToUseFooterButton: {
      marginHorizontal: responsivePixels.size20,
      marginVertical: responsivePixels.size10,
      backgroundColor: COLORS.darkOrange,
      borderRadius: responsivePixels.size6,
      height: responsivePixels.size54,
      alignItems: 'center',
      justifyContent: 'center',
    },
    howToUseFooterButtonTitle: {
      ...common.font_18_21_9,
      fontWeight: '600',
      textAlign: 'center',
      color: COLORS.white,
    },
    dropdown3BtnStyle: {
      backgroundColor: COLORS.white,
      borderWidth: responsivePixels.size1,
    },
    dropdown3BtnChildStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dropdown3BtnImage: {
      width: responsivePixels.size24,
      height: responsivePixels.size24,
      borderRadius: responsivePixels.size24,
    },
    dropdown3BtnTxt: {
      color: COLORS.ebonyClayHex,
      textAlign: 'center',
      ...common.font_11_12_89,
      fontWeight: '400',
      marginLeft: responsivePixels.size5,
    },
    dropdown3RowStyle: {
      // height: responsivePixels.size24,
      // width: responsivePixels.size79,
      height: responsivePixels.size50,
      width: responsivePixels.size200,
      backgroundColor: COLORS.white,
    },
    dropdown3RowChildStyle: {
      width: responsivePixels.size79,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    dropdownRowImage: {
      width: responsivePixels.size25,
      height: responsivePixels.size25,
      borderRadius: responsivePixels.size20,
      marginLeft: responsivePixels.size5,
    },
    dropdown3RowTxt: {
      color: COLORS.black,
      textAlign: 'center',
      ...common.font_11_12_89,
      fontWeight: '400',
      marginLeft: responsivePixels.size5,
    },
    dropdown3searchInputStyleStyle: {
      backgroundColor: COLORS.slateGray,
      borderBottomWidth: 1,
      borderBottomColor: '#FFF',
    },
    dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
    indicator: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    storageSpaceView:{
      display:'flex',alignItems:'center'
    }
  });

export default styles;
