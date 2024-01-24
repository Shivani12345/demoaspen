import React from 'react';
import {View, Text, StatusBar, Platform, TouchableOpacity} from 'react-native';
import {DrawerHeaderProps} from '@react-navigation/drawer';

import {ITheme} from 'interfaces/common';

import CustomImage from 'components/customImage';
import CONSTANTS from 'common/constants';
import IMAGES from 'common/images';
import COLORS from 'common/colors';

import STYLES from './Header.style';

import common from 'common/common.styles';
import FastImage from 'react-native-fast-image';
import STRINGS from 'common/strings';

interface IProps extends DrawerHeaderProps {
  children?: JSX.Element | JSX.Element[] | undefined;
  isAuthStack: boolean;
  theme: ITheme;
}

function isMenuScreen(routeName: string) {
  // NOTE: we can add more screen for show menu
  return (
    routeName === CONSTANTS.HOME_SCREEN ||
    routeName === CONSTANTS.PROFILE_SCREEN
  );
}

function isShowProfile(routeName: string) {
  // NOTE: we can add more screen for hide profile
  return routeName !== CONSTANTS.CHANGE_PASSWORD_SCREEN;
}

function isShowText(routeName: string) {
  return routeName === CONSTANTS.SCAN_CREDIT_CARD;
}

const Header = (props: IProps) => {
  const {route, navigation, options, children, isAuthStack, theme} = props;

  const styles = STYLES({...theme});

  const showRight: boolean = isShowText(route?.name);

  const onPressMenu = () => {
    navigation?.toggleDrawer();
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressProfile = () => {
    navigation.navigate(CONSTANTS.PROFILE_SCREEN);
  };

  const onPressAddManually = () => {
    navigation.navigate(CONSTANTS.ADD_CREDIT_CARD_SCREEN);
  };

  const RenderLeft = () => {
    // if (showMenu) {
    //   return (
    // <FastImage
    //   onPress={onPressMenu}
    //   source={IMAGES.ic_menu}
    //   imageStyle={styles.menuIcon}
    //   tintColor={COLORS.blue}
    //   resizeMode='contain'
    // />
    //   );
    // }
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressBack}
        style={styles.renderLeft}>
        <FastImage
          source={IMAGES.ic_back}
          style={styles.leftIcon}
          tintColor={COLORS.grayHex}
          resizeMode="contain"
        />
        <Text style={styles.back}>{STRINGS.btnBack}</Text>
      </TouchableOpacity>
    );
  };

  const RenderHeader = () => {
    return (
      <View>
        <Text style={styles.title}>{options?.title}</Text>
      </View>
    );
  };

  const RenderRight = (onPress: () => void) => {
    if (showRight) {
      return (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.rightText}>{STRINGS.btnAddManually}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <CustomImage
        onPress={onPressProfile}
        showLoader={true}
        source={{uri: IMAGES.ic_userUri}}
        imageStyle={styles.profileIcon}
      />
    );
  };

  return (
    <View>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <View style={styles.container}>
        <View style={styles.leftContainer}>{RenderLeft()}</View>
        <View style={styles.titleContainer}>{RenderHeader()}</View>
        <View style={styles.rightContainer}>
          {showRight ? RenderRight(onPressAddManually) : null}
          {/* {!isAuthStack && showProfile && RenderRight()} */}
        </View>
        {children}
      </View>
    </View>
  );
};

const DefaultProps = {
  isAuthStack: false,
};

Header.defaultProps = DefaultProps;

export default Header;
