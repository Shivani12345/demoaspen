import React, {forwardRef, useRef, useState, useImperativeHandle} from 'react';
import {View, Animated, Text, StatusBar} from 'react-native';

import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';

import styles from './Toast.style';
import {useIsFocused} from '@react-navigation/native';
import {Layout} from 'react-native-reanimated';

const ToastNew = forwardRef((props, ref) => {
  const isFocused: any = useIsFocused();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [modalShown, setModalShown] = useState(false);
  const [message, setMessage] = useState('Success!');
  const [toastColor, setToastColor] = useState(COLORS.lightGreen);
  const [textColor, setTextColor] = useState(COLORS.white);
  const [messageType, setMessageType] = useState(0);

  const callToast = (messageText: string, type: string) => {
    if (modalShown) {
      setModalShown(false);
      // return;
    }
    setToastType(messageText, type);
    setModalShown(true);
    Animated.sequence([
      Animated.timing(animatedValue, CONSTANTS.Animation_Open),
      Animated.timing(animatedValue, CONSTANTS.Animation_Close),
    ]).start(() => {
      StatusBar.setBarStyle('default');
      console.log('Start Animation', modalShown);

      // setTimeout(() => {
      setModalShown(false);
      // }, 350);
      // setModalShown(false);
    });
  };

  let animation = animatedValue.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [-100, -10, 0],
  });

  useImperativeHandle(ref, () => ({
    success(messageText: string) {
      return callToast(messageText, 'success');
      // StatusBar.setBarStyle('dark-content');
    },
    error(messageText: string) {
      return callToast(messageText, 'error');
      // StatusBar.setBarStyle('dark-content');
    },
  }));

  const setToastType = (
    messageText: string = 'Success!',
    type: string = 'success',
  ) => {
    const isSuccess: boolean = type === 'success';
    const color: string = isSuccess ? COLORS.lightGreen : COLORS.red;
    const textColorValue: string = isSuccess ? COLORS.white : COLORS.white;
    setMessageType(isSuccess ? 0 : 1);
    setMessage(messageText);
    setToastColor(color);
    setTextColor(textColorValue);
  };

  return modalShown ? (
    // <Animated.View
    //   style={[
    //     styles.container,
    //     {backgroundColor: toastColor, transform: [{translateY: animation}]},
    //   ]}>
    //   <View style={styles.row}>
    //     <Text style={[styles.message, {color: textColor}]}>{message}</Text>
    //   </View>
    // </Animated.View>

    <Animated.View
      key={isFocused}
      style={{
        transform: [{translateY: animation}],
        height: 45,
        backgroundColor: toastColor,
        position: 'absolute',
        left: 10,
        top: 45,
        right: 10,
        justifyContent: 'center',
        zIndex: 1000,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 4,
          height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6.27,
      }}>
      <Text style={[styles.message, {color: textColor}]}>{message}</Text>
      {/* <View style={{flexDirection:'row'}}>
          <View style={{back}}></View>
        <View >
      <Text style={[styles.message, {color: textColor}]}>
        {messageType == 0 ? 'Success' : 'Error'}
      </Text>
      <Text style={[styles.message, {color: textColor}]}>{message}</Text>
      </View>
      </View> */}
    </Animated.View>
  ) : null;
});

export default ToastNew;
