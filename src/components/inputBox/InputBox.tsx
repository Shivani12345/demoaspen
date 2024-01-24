import React, {useContext} from 'react';
import {
  KeyboardType,
  KeyboardTypeAndroid,
  KeyboardTypeIOS,
  Text,
  View,
} from 'react-native';
import {Input, InputProps} from 'react-native-elements';

import {ContextData} from 'components/globalContext/globalContext';
import {IContext} from 'interfaces/common';

import STYLES from './InputBox.style';
import MainButton from 'components/button';
import COLORS from 'common/colors';
import common from 'common/common.styles';
import FastImage from 'react-native-fast-image';

interface InputBoxProps extends InputProps {
  refInput?: any;
  autoFocus: boolean;
  rightIconTitle?: string | undefined;
  mainStyle?: object | undefined;
  textStyle?: object | undefined;
  onPress?: () => void;
  inputHeader?: String;
  autoComplete?: any;
  viewStyle?: any;
  imageStyle?: any;
  titleImage?: number | {uri: string} | undefined;
  titleViewStyle?: any;
  rightIcon?: any;
  keyboardType?: KeyboardType | KeyboardTypeAndroid | KeyboardTypeIOS;
  onRightIconPress?: any | undefined;
  onInputPress?: any | undefined;
  isRequired?: boolean;
  errorMesage?: String;
  isError?: boolean | undefined;
  loadingRight?: boolean;
}

const propsDefaultData: InputBoxProps = {
  onRightIconPress: () => {},
  placeholder: 'Select',
  autoFocus: false,
  rightIconTitle: '',
  mainStyle: {},
  onChangeText: () => {},
  onInputPress: () => {},
};

const InputBox = (props: InputBoxProps) => {
  const context: IContext = useContext(ContextData);
  const {theme} = context;
  const styles = STYLES({...theme});

  const {
    inputHeader,
    refInput,
    autoComplete,
    value,
    placeholder,
    autoFocus,
    containerStyle,
    inputContainerStyle,
    inputStyle,
    rightIconTitle,
    mainStyle,
    textStyle,
    onPress,
    onChangeText,
    viewStyle,
    titleImage,
    imageStyle,
    titleViewStyle,
    rightIcon,
    keyboardType,
    onRightIconPress,
    errorMesage,
    isError,
    loadingRight,
  } = props;

  return (
    <View style={[styles.view, viewStyle]}>
      <View style={[styles.titleView, titleViewStyle]}>
        <Text style={styles.text}>
          {inputHeader}
          {props.isRequired ? (
            <View>
              <Text style={styles.requiredText}> *</Text>
            </View>
          ) : (
            ''
          )}
        </Text>
        {titleImage != null && (
          <FastImage
            source={titleImage}
            style={[{...common.image14}, imageStyle]}
            resizeMode="contain"
          />
        )}
      </View>

      <Input
        {...props}
        ref={refInput}
        // autoCompleteType={undefined}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={COLORS.bombay}
        autoCorrect={false}
        autoCapitalize="none"
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        // style={[styles.style]}
        containerStyle={[
          styles.containerStyle,
          containerStyle,
          {borderColor: isError ? COLORS.red : COLORS.gray},
        ]}
        inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
        inputStyle={[styles.inputStyle, inputStyle]}
        rightIcon={
          (rightIcon != null && (
            <FastImage
              source={rightIcon}
              style={styles.rightIconImageStyle}
              resizeMode="contain"
              // onPress={onRightIconPress}
            />
          )) ||
          (rightIconTitle != null && (
            <MainButton
              title={rightIconTitle}
              mainStyle={mainStyle}
              titleTextStyle={textStyle}
              loading={loadingRight}
              onPress={onPress}
            />
          ))
        }
        onChangeText={onChangeText}
      />
      {isError ? (
        <Text style={styles.errorMessage}>{errorMesage}</Text>
      ) : (
        <Text> </Text>
      )}
    </View>
  );
};

InputBox.defaultProps = propsDefaultData;

export default InputBox;
