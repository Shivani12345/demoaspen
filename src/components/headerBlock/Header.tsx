import React, {useContext} from 'react';
import {
  ActivityIndicator,
  ColorValue,
  StatusBar,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import styleMain from './Header.style';

import {IContext} from 'interfaces/common';
import {ContextData} from 'components/globalContext/globalContext';
import COLORS from 'common/colors';
import STRINGS from 'common/strings';
import CustomImage from 'components/customImage';
import IMAGES from 'common/images';
import FastImage from 'react-native-fast-image';

type IProps = {
  children?: JSX.Element | undefined;
  title: string;
  titleDisable?: string;
  disabled?: boolean;
  loading?: boolean;
  loaderColor?: ColorValue | undefined;
  mainStyle?: StyleProp<ViewStyle> | undefined;
  titleTextStyle?: StyleProp<TextStyle> | undefined;
  containerStyle?: StyleProp<TextStyle> | undefined;
  onPress: () => void;
  onPressLeft: () => void;
  onPressRight: () => void;
  showRight: boolean;
  isLeftdisable: boolean;
};

const DefaultProps = {
  disabled: false,
  loading: false,
  onPress: () => {},
  children: undefined,
  onPressLeft: () => {},
  onPressRight: () => {},
  isLeftdisable: false,
  showRight: false,
};

const Header = ({children, ...props}: IProps): JSX.Element => {
  const context: IContext = useContext(ContextData);
  const {theme} = context;
  const styles = styleMain(theme);

  const {
    title,
    titleDisable,
    disabled,
    titleTextStyle,
    onPressLeft,
    onPressRight,
    isLeftdisable,
    showRight,
  } = props;

  const buttonText = disabled ? titleDisable || title : title;
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
        disabled={isLeftdisable}
        onPress={onPressLeft}
        style={styles.renderLeft}>
        <FastImage
          source={IMAGES.ic_back}
          style={styles.leftIcon}
          resizeMode="contain"
        />
        <Text style={styles.back}>{STRINGS.btnBack}</Text>
      </TouchableOpacity>
    );
  };

  const RenderHeader = () => {
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  const RenderRight = () => {
    return (
      <CustomImage
        onPress={onPressRight}
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
          {showRight ? RenderRight() : null}
          {/* {!isAuthStack && showProfile && RenderRight()} */}
        </View>
        {children}
      </View>
    </View>
  );
};

export default Header;

Header.defaultProps = DefaultProps;
