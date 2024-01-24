import React, {useEffect, useState} from 'react';
import {Text, Animated} from 'react-native';

import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';

import styles from './Toast.style';

const Toast = (props: any) => {
  const [animatedValue] = useState(new Animated.Value(-500));
  const [modalShown, setModalShown] = useState(props.isOpen);
  const [toastColor, setToastColor] = useState(COLORS.green);
  const [message, setMessage] = useState(CONSTANTS.SUCCESS);

  const setToastType = (
    messageTitle = CONSTANTS.SUCCESS,
    type = CONSTANTS.SUCCESS,
  ) => {
    let color = '';
    if (type === CONSTANTS.ERROR) {
      color = COLORS.red;
    }
    if (type === CONSTANTS.SUCCESS) {
      color = COLORS.green;
    }
    setToastColor(color);
    setMessage(messageTitle);
  };

  useEffect(() => {
    if (props.isOpen) {
      callToast(props.msg, props.type);
    } else {
      closeToast;
    }
  }, [props.isOpen]);

  const closeToast = () => {
    setModalShown(false);
    Animated.timing(animatedValue, {
      toValue: -500,
      duration: 350,
      delay: props.delay ? props.delay : 3000,
      useNativeDriver: false,
    }).start();
  };

  const callToast = (messageTitle: string, type: string) => {
    if (modalShown) {
      return;
    }
    setToastType(messageTitle, type);
    setModalShown(true);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 350,
      useNativeDriver: false,
    }).start(closeToast);
  };

  return (
    <Animated.View
      style={[
        styles.tost,
        {transform: [{translateY: animatedValue}], backgroundColor: toastColor},
      ]}>
      <Text style={styles.toastMsg}>{message}</Text>
    </Animated.View>
  );
};

export default Toast;
