import React, {useContext} from 'react';
import {
  PressableProps,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import {ContextData} from 'components/globalContext/globalContext';
import {IContext} from 'interfaces/common';

import STYLES from './Clickable.style';

interface IProps extends PressableProps {
  children?: JSX.Element | undefined;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  disabled?: boolean;
  onPress?: () => void;
  activeOpacity?: number;
}

const DefaultProps = {
  containerStyle: {},
  disabled: false,
  onPress: () => {},
  activeOpacity: 0.7,
};

const Clickable = (props: IProps) => {
  const context: IContext = useContext(ContextData);
  const {theme} = context;
  const styles = STYLES({...theme});

  const {onPress, children, containerStyle, activeOpacity} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={[styles.container, containerStyle]}>
      {children}
    </TouchableOpacity>
  );
};

Clickable.defaultProps = DefaultProps;

export default Clickable;
