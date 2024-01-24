import React, {useState} from 'react';
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
  updateTextVal: (text: string) => void;
}

const CardNumberInput = (props: InputProps) => {
  const {
    labelStyle,
    cardInputContainerStyle,
    inputWrapStyle,

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
  } = props;
  const [iconName, setIconName] = useState(require('./credit-card.png'));
  const [cardName, setCardName] = useState(require(''));
  const [cardError, setCardError] = useState(null);

  const checkCard = (cardNum: string) => {
    const {message, type} = checkCreditCard(cardNum);
    setCardError(message);
    if (type === null) {
      setIconName(require('./credit-card.png'));
      setCardName('');
    } else if (type === 'MasterCard') {
      setIconName(require('./mastercard.png'));
      setCardName('MasterCard');
    } else if (type === 'AmEx') {
      setIconName(require('./american-express.png'));
      setCardName('AmEx');
    } else if (type === 'Visa') {
      setIconName(require('./visa.png'));
      setCardName('Visa');
    } else if (type === 'Discover') {
      setIconName(require('./discover.png'));
      setCardName('Discover');
    } else if (type === 'VisaElectron') {
      setIconName(require('./visa-e.png'));
      setCardName('VisaElectron');
    } else if (type === 'Maestro') {
      setIconName(require('./maestro.png'));
      setCardName('Maestro');
    } else if (type === 'Solo') {
      setIconName(require('./solo-card.png'));
      setCardName('Solo');
    } else {
      setIconName(require('./credit-card.png'));
      setCardName('');
    }
  };

  let validationColor = !touched
    ? defaultBorderColor
    : cardError
    ? '#FF5A5F'
    : focus
    ? focusColor
    : defaultBorderColor;

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
          styles.inputWrap,
          inputWrapStyle,
        ]}>
        <RNTextInput
          {...props}
          onChangeText={text => {
            updateTextVal(numberWithSpace(text));
            checkCard(text);
          }}
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
            source={iconName}
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
        {cardError && (
          <Text
            // style={[styles.errorMessage, {color: errorColor}]}
            style={{
              color: COLORS.red,
              marginTop: 2,
              fontSize: responsivePixels.size10,
            }}>
            {cardError}
          </Text>
        )}
      </View>
      <View
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
      </View>
    </View>
  );
};

// const CardNumberInput: FC<InputProps> = ({
//   labelStyle,
//   cardInputContainerStyle,
//   inputWrapStyle,

//   updateTextVal,
//   labelColor,
//   focusColor,
//   inputStyle,
//   defaultBorderColor,
//   label,
//   placeholder,
//   error,
//   touched,
//   focus,
//   value,
//   errorColor,
//   ...props
// }) => {
//   const [iconName, setIconName] = useState(require('./credit-card.png'));
//   const [cardName, setCardName] = useState(require(''));
//   const [cardError, setCardError] = useState(null);

//   const checkCard = (cardNum: string) => {
//     const {message, type} = checkCreditCard(cardNum);
//     setCardError(message);
//     if (type === null) {
//       setIconName(require('./credit-card.png'));
//       setCardName('');
//     } else if (type === 'MasterCard') {
//       setIconName(require('./mastercard.png'));
//       setCardName('MasterCard');
//     } else if (type === 'AmEx') {
//       setIconName(require('./american-express.png'));
//       setCardName('AmEx');
//     } else if (type === 'Visa') {
//       setIconName(require('./visa.png'));
//       setCardName('Visa');
//     } else if (type === 'Discover') {
//       setIconName(require('./discover.png'));
//       setCardName('Discover');
//     } else if (type === 'VisaElectron') {
//       setIconName(require('./visa-e.png'));
//       setCardName('VisaElectron');
//     } else if (type === 'Maestro') {
//       setIconName(require('./maestro.png'));
//       setCardName('Maestro');
//     } else if (type === 'Solo') {
//       setIconName(require('./solo-card.png'));
//       setCardName('Solo');
//     } else {
//       setIconName(require('./credit-card.png'));
//       setCardName('');
//     }
//   };

//   let validationColor = !touched
//     ? defaultBorderColor
//     : cardError
//     ? '#FF5A5F'
//     : focus
//     ? focusColor
//     : defaultBorderColor;

//   return (
//     <View style={[cardInputContainerStyle, styles.container]}>
//       <Text
//         style={[
//           {
//             color: labelColor,
//           },
//           styles.label,
//           labelStyle,
//         ]}>
//         {label}
//       </Text>
//       <View
//         style={[
//           {
//             borderColor: validationColor,
//           },
//           styles.inputWrap,
//           inputWrapStyle,
//         ]}>
//         <RNTextInput
//           {...props}
//           onChangeText={text => {
//             updateTextVal(numberWithSpace(text));
//             checkCard(text);
//           }}
//           clearButtonMode="while-editing"
//           returnKeyLabel={'Next'}
//           returnKeyType={'done'}
//           keyboardType="number-pad"
//           placeholder={placeholder}
//           style={[styles.input, inputStyle]}
//           maxLength={CONSTANTS.CREDIT_CARD_NUMBER_MAX_LENGTH}
//         />
//         <View style={styles.cardIcon}>
//           <Image
//             source={iconName}
//             style={{
//               marginRight: 15,
//               width: 35,
//               height: 35,
//               resizeMode: 'cover',
//             }}
//           />
//         </View>
//       </View>
//       <View
//         style={{
//           paddingBottom: 20,
//           justifyContent: 'flex-start',
//         }}>
//         {cardError && (
//           <Text
//             // style={[styles.errorMessage, {color: errorColor}]}
//             style={{
//               color: COLORS.red,
//               marginTop: 2,
//               fontSize: responsivePixels.size10,
//             }}>
//             {cardError}
//           </Text>
//         )}
//       </View>
//       <View
//         style={{
//           paddingBottom: 20,
//           justifyContent: 'flex-start',
//         }}>
//         {error && touched && (
//           // <Text style={[styles.errorMessage, {color: errorColor}]}>
//           <Text
//             style={{
//               color: COLORS.red,
//               marginTop: 2,
//               fontSize: responsivePixels.size10,
//             }}>
//             {error}
//           </Text>
//         )}
//       </View>
//     </View>
//   );
// };

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
