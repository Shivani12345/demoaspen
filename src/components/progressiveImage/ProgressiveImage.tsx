import React from 'react';
import { View, StyleProp, ViewStyle, Animated, ImageStyle } from 'react-native';

import IMAGES from 'common/images';

import styles from './ProgressiveImage.style';

interface IProps {
  source: { uri: string } | number,
  thumbnailSource: { uri: string } | number,
  containerStyle?: StyleProp<ViewStyle>,
  imageStyle?: StyleProp<ImageStyle>,
  showLoader?: boolean
}

const DefaultProps = {
  source: IMAGES.ic_user,
  thumbnailSource: IMAGES.ic_user,
  containerStyle: {},
  imageStyle: {},
};

const ProgressiveImage = (props: IProps) => {
  const { source, thumbnailSource, containerStyle, imageStyle } = props;

  const thumbnailAnimated = new Animated.Value(0);

  const imageAnimated = new Animated.Value(0);

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.Image
        {...props}
        source={thumbnailSource}
        style={[imageStyle, { opacity: thumbnailAnimated }]}
        onLoad={handleThumbnailLoad}
        blurRadius={1}
      />
      <Animated.Image
        {...props}
        source={source}
        style={[styles.imageOverlay, { opacity: imageAnimated }, imageStyle]}
        onLoad={onImageLoad}
      />
    </View>
  );
};

ProgressiveImage.defaultProps = DefaultProps;

export default ProgressiveImage;
