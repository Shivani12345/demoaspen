import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {IContext, INavigation} from 'interfaces/common';

import {storeLanguage, storeTheme} from 'utils/asyncStorage';
import {useOrientation} from 'utils/useOrientation';

import Clickable from 'components/clickable';
import CustomImage from 'components/customImage';
import {ContextData, toastRef} from 'components/globalContext/globalContext';
import Cardscan from 'react-native-cardscan';
import CONSTANTS from 'common/constants';
import IMAGES from 'common/images';
import STRINGS from 'common/strings';

import STYLES from './ScanCreditCard.style';

import DocumentScanner from 'react-native-document-scanner-plugin';

import {AppStackParamList} from 'navigations/AppStack';
import COLORS from 'common/colors';
import FastImage from 'react-native-fast-image';
import {currentScreen, getImageType, isIOS} from 'utils/functions';
import MainButton from 'components/button';


interface IProps {
  navigation: StackNavigationProp<AppStackParamList, 'ScanCreditCard'>;
}

const ScanCreditCard = (props: IProps) => {
  const {navigation} = props;
  const isFocused = useIsFocused();

  const isPortrait = useOrientation();
  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {darkMode, setDarkMode, language, setLanguage},
  } = context;
  const styles = STYLES({...theme, isPortrait});
  const [compatible, setCompatible] = useState(null);
  const [card, setCard] = useState(null);
  const [recentAction, setRecentAction] = useState('none');
  const onChangeTheme = (value: boolean) => {
    setDarkMode(value);
    storeTheme(value ? CONSTANTS.THEME_DARK : CONSTANTS.THEME_LIGHT);
  };

  const onChangeLanguage = (value: string) => {
    STRINGS.setLanguage(value);
    setLanguage(value);
    storeLanguage(value);
  };

  const checkCompatible = useCallback(async () => {
    const isCompatible = await Cardscan.isSupportedAsync();
    setCompatible(isCompatible);
  }, [setCompatible]);

  useEffect(() => {
    currentScreen('ScanCreditCard');
    checkCompatible();
  }, []);
  const scanCard = useCallback(async () => {
    const {action, scanId, payload, canceledReason} = await Cardscan.scan();
   
    setRecentAction(action);
    if (action === 'scanned') {
      var issuer = payload.issuer || '??';
      if (issuer === 'MasterCard') {
        issuer = 'master-card';
      } else if (issuer === 'American Express') {
        issuer = 'american-express';
      } else {
        issuer = issuer.toLowerCase();
      }
      console.log('CARFDDDFDF_____+++++', payload);
      setCard({
        number: payload.number,
        expiryDay: payload.expiryDay || '',
        expiryMonth: payload.expiryMonth || '??',
        expiryYear: payload.expiryYear || '??',
        issuer: issuer,
        cvc: payload.cvc || '??',
        cardholderName: payload.cardholderName || '??',
        error: payload.error || '',
      });

      toastRef.current.success('Card Successfully Scanned');
      navigation.navigate(CONSTANTS.ADD_CREDIT_CARD_SCREEN, {payload: payload});
    }

    if (action === 'canceled') {
      if (canceledReason === 'enter_card_manually') {
        toastRef.current.error('Enter card manually');
      }

      if (canceledReason === 'user_canceled') {
        toastRef.current.error('User canceled the scan of the credit card.');
      }

      if (canceledReason === 'camera_error') {
        toastRef.current.error('Camera error during scan');
      }

      if (canceledReason === 'fatal_error') {
        toastRef.current.error('Processing error during scan');
      }

      if (canceledReason === 'unknown') {
        toastRef.current.error('Unknown reason for scan cancellation');
      }
    }
  }, [setCard, setRecentAction]);
  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <Text style={styles.screenHeader}>
        {STRINGS.scanCreditCards.scanCreditCardHeader}
      </Text>

      {/* scan credit card TouchableOpacity*/}
      <TouchableOpacity style={styles.scannerContainer} onPress={scanCard}>
        <FastImage
          source={IMAGES.ic_scanner}
          style={styles.imgStyle}
          resizeMode="contain"
        />
        <Text style={styles.cameraText}>{STRINGS.scanLicense.cameraText}</Text>
      </TouchableOpacity>

      <Text style={styles.scanerDefaultTxt}>
        {STRINGS.scanCreditCards.scanCreditCardDefaultText}
      </Text>

      <View style={styles.warningContainer}>
        <FastImage
          source={IMAGES.ic_warningIcon}
          style={styles.warningIcon}
          resizeMode="contain"
        />
        <Text style={styles.warningText}>
          {STRINGS.scanCreditCards.scannerWarning}
        </Text>
      </View>

      {/* next button */}
      <View style={styles.btnContainer}>
        <MainButton
          mainStyle={styles.nextBtn}
          title={STRINGS.btnNext}
          onPress={() => navigation.navigate(CONSTANTS.SUMMARY_OF_CHARGES)}
          titleTextStyle={styles.btntxt}
          // loading={loading}
          disabled={true}
        />
      </View>
    </View>
  );
};

export default ScanCreditCard;
