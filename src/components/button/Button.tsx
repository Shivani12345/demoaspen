import React, {useContext} from 'react';
import {
  ActivityIndicator,
  ColorValue,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import styleMain from './Button.style';

import {IContext} from 'interfaces/common';
import {ContextData} from 'components/globalContext/globalContext';

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
};

const DefaultProps = {
  disabled: false,
  loading: false,
  onPress: () => {},
  children: undefined,
};

const MainButton = ({children, ...props}: IProps): JSX.Element => {
  const context: IContext = useContext(ContextData);
  const {theme} = context;
  const styles = styleMain(theme);

  const {
    title,
    titleDisable,
    disabled,
    loading,
    loaderColor,
    mainStyle,
    titleTextStyle,
    containerStyle,
    onPress,
  } = props;

  const buttonText = disabled ? titleDisable || title : title;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      disabled={disabled}
      style={[styles.mainStyle, {opacity: disabled ? 0.5 : 1}, mainStyle]}>
      {children ? (
        children
      ) : (
        <>
          {loading ? (
            <ActivityIndicator
              color={loaderColor || theme.colors.buttonLoaderColor}
            />
          ) : (
            <Text style={[styles.textStyle, titleTextStyle]}>{buttonText}</Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default MainButton;

MainButton.defaultProps = DefaultProps;
