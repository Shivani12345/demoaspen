import {
  Text,
  TextInputProps,
  StyleProp,
  TextInput as RNTextInput,
  StyleSheet,
  View,
  Image,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, {FC, useState} from 'react';

import {fontPixel, widthPixel} from './Normalize';
import {numberWithSpace} from './NumberWithSpaces';
import {checkCreditCard} from './ValidateCard';
import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';
import responsivePixels from 'utils/responsivePixels';
import {isIOS} from 'utils/functions';
import SIZES from 'utils/sizes';

interface InputProps extends TextInputProps {
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputWrapStyle?: StyleProp<ViewStyle>;
  cardInputContainerStyle?: StyleProp<ViewStyle>;
  errorColor?: string;
  labelColor?: string;
  focusColor?: string;
  defaultBorderColor?: string;
  placeholder?: string;
  error?: string;
  label?: string;
  touched?: boolean;
  focus?: boolean;
  value?: string;
  onChangeText: (text: string, name: string) => void;
  updateTextVal: (text: string) => void;
  setLocalCardType: (text: string) => void;
}

const CardNumberInput: FC<InputProps> = ({
  labelStyle,
  cardInputContainerStyle,
  inputWrapStyle,
  onChangeText,
  updateTextVal,
  labelColor,
  focusColor,
  inputStyle,
  defaultBorderColor,
  label,
  placeholder,
  error,
  touched,
  focus,
  value,
  errorColor,
  setLocalCardType,
  ...props
}) => {
  const [iconName, setIconName] = useState(require('./credit-card.png'));
  const [cardName, setCardName] = useState('');
  const [cardError, setCardError] = useState(null);
  const [cardType, setCardType] = useState('' as any);

  const checkCard = (cardNum: string) => {
    const {message, type,cardTypeId} = checkCreditCard(cardNum);
    console.log('=---> ',cardTypeId)
    setCardError(message);
    if (type === null) {
      setIconName(require('./credit-card.png'));
      setCardName('');
    } else if (type === 'MasterCard') {
      setIconName(require('./mastercard.png'));
      setCardName('MasterCard');
      setLocalCardType('5')
    } else if (type === 'AmEx') {
      setIconName(require('./american-express.png'));
      setCardName('AmEx');
      setLocalCardType('7')
    } else if (type === 'Visa') {
      setIconName(require('./visa.png'));
      setCardName('Visa');
      setLocalCardType('6')
    } else if (type === 'Discover') {
      setIconName(require('./discover.png'));
      setCardName('Discover');
      setLocalCardType('8')
    } else if (type === 'VisaElectron') {
      setIconName(require('./visa-e.png'));
      setCardName('VisaElectron');
    } else if (type === 'Maestro') {
      setIconName(require('./maestro.png'));
      setCardName('Maestro');
    } 
    else if (type === 'DinersClub') {
      setIconName(require('./diners.png'));
      setCardName('DinersClub');
      setLocalCardType('9')
    } 
    else if (type === 'Solo') {
      setIconName(require('./solo-card.png'));
      setCardName('Solo');
    } else {
      setIconName(require('./credit-card.png'));
      setCardName('');
    }
    // updateTextVal(numberWithSpace(cardNum));
    updateTextVal(numberWithSpace(cardNum));
    console.log('iconName', type);
    // cardImage(cardImage)
    return {type,cardTypeId};
  };

  const cardImage = () => {
    const {message, type} = checkCreditCard(value);
    console.log('myyyy', type, value);

    if (type === null) {
      return require('./credit-card.png');
      // setCardName('');
    } else if (type === 'MasterCard') {
      return require('./mastercard.png');
      // setCardName('MasterCard');
    } else if (type === 'AmEx') {
      return require('./american-express.png');
      // setCardName('AmEx');
    } else if (type === 'Visa') {
      return require('./visa.png');
      // setCardName('Visa');
    } else if (type === 'Discover') {
      return require('./discover.png');
      // setCardName('Discover');
    } else if (type === 'VisaElectron') {
      return require('./visa-e.png');
    } else if (type === 'Maestro') {
      return require('./maestro.png');
    } else if (type === 'Solo') {
      return require('./solo-card.png');
    } else {
      return require('./credit-card.png');
    }
  };

  let validationColor = !touched
    ? defaultBorderColor
    : cardError
    ? '#FF5A5F'
    : focus
    ? focusColor
    : defaultBorderColor;
  console.log('vallll', value, cardName, cardError);

  return (
    <View style={[cardInputContainerStyle, styles.container]}>
      <Text
        style={[
          {
            color: labelColor,
          },
          styles.label,
          labelStyle,
        ]}>
        {label}
      </Text>
      <View
        style={[
          {
            borderColor: validationColor,
          },
          [
            styles.inputWrap,
            {borderColor: cardError || error ? COLORS.red : COLORS.gray},
          ],
          inputWrapStyle,
        ]}>
        <RNTextInput
          {...props}
          onChangeText={text => {
            console.log('checkCard(text)-> ',checkCard(text))
            checkCard(text);
          }}
          value={value}
          clearButtonMode="while-editing"
          returnKeyLabel={'Next'}
          returnKeyType={'done'}
          keyboardType="number-pad"
          placeholder={placeholder}
          style={[styles.input, inputStyle]}
          maxLength={CONSTANTS.CREDIT_CARD_NUMBER_MAX_LENGTH}
        />
        <View style={styles.cardIcon}>
          <Image
            source={cardImage()}
            style={{
              marginRight: 15,
              width: 35,
              height: 35,
              resizeMode: 'cover',
            }}
          />
        </View>
      </View>
      <View
        style={{
          paddingBottom: 20,
          justifyContent: 'flex-start',
        }}>
        {(cardError || error) && (
          <Text
            // style={[styles.errorMessage, {color: errorColor}]}
            style={{
              color: COLORS.red,
              marginTop: 2,
              fontSize: responsivePixels.size10,
            }}>
            {cardError ? cardError : error}
          </Text>
        )}
        {/* {error && touched && (
          <Text style={{color: COLORS.red, marginTop: 2, fontSize: 10}}>
            {error}
          </Text>
        )} */}
      </View>
      {/* <View
        style={{
          paddingBottom: 20,
          justifyContent: 'flex-start',
        }}>
        {error && touched && (
          // <Text style={[styles.errorMessage, {color: errorColor}]}>
          <Text
            style={{
              color: COLORS.red,
              marginTop: 2,
              fontSize: responsivePixels.size10,
            }}>
            {error}
          </Text>
        )}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  cardDateInputContainer: {
    width: widthPixel(120),
    justifyContent: 'flex-start',
  },
  input: {
    alignItems: 'center',
    width: '90%',
    fontSize: fontPixel(16),
    paddingHorizontal: 20,
    height: '100%',
    // backgroundColor: 'red',
  },
  cardDateInput: {
    alignItems: 'center',
    width: '100%',
    fontSize: fontPixel(16),
    padding: 10,
    height: '100%',
  },
  label: {
    textTransform: 'capitalize',
    marginLeft: 10,
  },
  errorMessage: {
    position: 'absolute',
    right: 10,
    lineHeight: 15,
    fontSize: fontPixel(10),
    textTransform: 'capitalize',
  },
  cardIcon: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  inputWrap: {
    height: isIOS() ? (SIZES.isNotch ? 60 : 46) : 54,
    marginTop: 8,
    // marginBottom: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

export default CardNumberInput;
