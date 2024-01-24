import React from 'react';
import { View, Text, ActivityIndicator, ActivityIndicatorProps, StyleProp, ViewStyle, TextStyle } from 'react-native';

// import COLORS from 'common/colors';
// import CONSTANTS from 'common/constants';
// import { validateString } from 'utils/functions';
import COLORS from 'common/colors';
import CONSTANTS from 'common/constants';
import { validateString } from 'utils/functions';
import styles from './Loader.style';

interface IProps extends ActivityIndicatorProps {
  noDataText: string | undefined,
  overScreen: boolean,
  withLoading: boolean,
  containerStyle: StyleProp<ViewStyle> | undefined,
  textStyle: StyleProp<TextStyle> | undefined,
}

const DefaultProps = {
  size: CONSTANTS.LARGE,
  color: COLORS.blue,
  noDataText: '',
  overScreen: false,
  withLoading: false,
  containerStyle: {},
  textStyle: {},
};

const Loader = (props: IProps) => {
  const { size, color, withLoading, overScreen, containerStyle, textStyle, noDataText } = props;

  const getStyle = () => {
    return {
      containerStyle: overScreen ? styles.absoluteContainer : {},
    };
  };

  return (
    <View style={[styles.container, getStyle().containerStyle, containerStyle]}>
      {
        (validateString(noDataText) !== '') ?
          withLoading ?
            <View>
              <ActivityIndicator size={size} color={color} />
              <Text style={[styles.text, textStyle]}>{noDataText}</Text>
            </View>
            :
            <Text style={[styles.text, textStyle]}>{noDataText}</Text>
          :
          <ActivityIndicator size={size} color={color} />
      }
    </View>
  );
};

Loader.defaultProps = DefaultProps;

export default Loader;
