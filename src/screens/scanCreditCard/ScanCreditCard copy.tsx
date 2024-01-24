import React, {useCallback, useContext, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
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
import {getImageType, isIOS} from 'utils/functions';
// import CardIO from 'react-native-awesome-card-io';
import {useCameraDevices, Camera, PhotoFile} from 'react-native-vision-camera';
import {Alert} from 'react-native';
//import CardIO from 'react-native-card-io';
interface IProps {
  navigation: StackNavigationProp<AppStackParamList, 'ScanCreditCard'>;
}

const ScanCreditCard = (props: IProps) => {
  const {navigation} = props;
  const cameraRef = useRef<Camera>(null);
  const isFocused = useIsFocused();

  const isPortrait = useOrientation();
  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {darkMode, setDarkMode, language, setLanguage},
  } = context;
  const styles = STYLES({...theme, isPortrait});

  const scanCardd = async () => {
    try {
      const cardInfo = await CardIO.scanCard();
      console.log('cardInfocardInfo', cardInfo);
    } catch (e) {
      console.error(e);
    }
  };
  const captureAndRecognize = useCallback(() => {
    console.log('take photo');
    if (cameraRef.current) {
      cameraRef?.current
        ?.takePhoto({
          flash,
          enableAutoStabilization: true,
        })
        .then(async (file: PhotoFile) => {
          console.log('taken photo');
          console.log(file);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      Alert.alert(
        'Camera Error',
        'Camera reference pending. Please try again.',
        [
          {
            text: 'Close',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  }, []);
  // Cardscan.scan().then(({action, payload, canceled_reason}) => {
  //   if (action === 'scanned') {
  //     const {number, expiryMonth, expiryYear, issuer, legalName} = payload;

  //     console.log('payloadd', payload);

  //     // Display information
  //   } else if (action === 'canceled') {
  //     if (canceled_reason === 'enter_card_manually') {
  //       // the user elected to enter a card manually
  //     } else if (canceled_reason === 'camera_error') {
  //       // there was an error with the camera
  //     } else if (canceled_reason === 'fatal_error') {
  //       // there was an error during the scan
  //     } else if (canceled_reason === 'user_canceled') {
  //       // the user canceled the scan
  //     } else {
  //       // the scan was canceled for an unknown reason
  //     }
  //   } else if (action === 'skipped') {
  //     // User skipped
  //   } else if (action === 'unknown') {
  //     // Unknown reason for scan canceled
  //   }
  // });
  // };
  const scanDocument = async () => {
    // start the document scanner
    // const scannedImage: any = await DocumentScanner.scanDocument();

    // console.log('scannedImages[0]', scannedImage.scannedImages[0]);
    // const imagePath = scannedImage.scannedImages[0];
    // setLicenseImage(imagePath);

    const options: any = {
      // responseType: 'base64',
      ImageFilePath: 'ImageFilePath',
      maxNumDocuments: 1,
    };

    DocumentScanner.scanDocument(options)
      .then(response => {
        // Handle the response here

        console.log('Scanned document response:', response?.scannedImages[0]);
        const imagePath: any = response?.scannedImages[0];

        const imgResponse: any = getImageType(imagePath);
        console.log('imgResponse', {...imgResponse, uri: imagePath});
        toastRef.current.success(STRINGS.licenseScanSuccess);
        // setResponseObj({...imgResponse, uri: imagePath});

        // setLicenseImage(`data:image/png;base64,${imagePath}`);

        // setLicenseImg(`data:image/png;base64,${imagePath}`);
        // setDocumentImg({...imgResponse, uri: imagePath});
        console.log('Card-Image', `data:image/png;base64,${imagePath}`);
      })
      .catch(error => {
        console.error('Scanning failed:', error);
      });
  };

  const onScanLicense = async () => {
    if (isIOS()) {
      scanDocument();
    } else if (!isIOS()) {
      const cameraPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (cameraPermission === true) {
        scanDocument();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Camera permission has been granted.');
            scanDocument();
          } else {
            console.log('Camera permission has been denied.');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    }
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <Text style={styles.screenHeader}>
        {STRINGS.scanCreditCards.scanCreditCardHeader}
      </Text>
      <TouchableOpacity
        style={styles.scannerContainer}
        onPress={captureAndRecognize}>
        {/* <View style={styles.scannerContainer}> */}
        <FastImage
          source={IMAGES.ic_scanner}
          style={styles.imgStyle}
          resizeMode="contain"
        />
        {/* {!licenseImage ? ( */}
        <Text style={styles.cameraText}>{STRINGS.scanLicense.cameraText}</Text>
        {/* ) : null} */}
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

      <View style={styles.btnContainer}>
        <Clickable
          containerStyle={styles.nextBtn}
          onPress={() => navigation.navigate(CONSTANTS.SUMMARY_OF_CHARGES)}>
          <Text style={styles.btntxt}>{STRINGS.btnNext}</Text>
        </Clickable>
      </View>
    </View>
  );
};

export default ScanCreditCard;
