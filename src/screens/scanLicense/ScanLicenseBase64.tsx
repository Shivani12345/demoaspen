import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';

import DocumentScanner from 'react-native-document-scanner-plugin';

import {toastRef} from 'components/globalContext/globalContext';
import {IContext, INavigation} from 'interfaces/common';
import {AppStackParamList} from 'navigations/AppStack';

import {storeLanguage, storeTheme} from 'utils/asyncStorage';
import {useOrientation} from 'utils/useOrientation';

import {ContextData} from 'components/globalContext/globalContext';

import CONSTANTS from 'common/constants';
import IMAGES from 'common/images';
import STRINGS from 'common/strings';
import COLORS from 'common/colors';

import STYLES from './ScanLicense.style';
import {isIOS} from 'utils/functions';
import MainButton from 'components/button';
import {API, METHODS} from 'services/apiConfig';
import {API_Call_With_Out_Token} from 'services/api';

interface IProps {
  navigation: StackNavigationProp<AppStackParamList, 'ScanLicense'>;
}

const ScanLicense = (props: IProps) => {
  const {navigation} = props;
  const [licenseImage, setLicenseImage] = useState('');
  const [loading, setLoading] = useState(false);
  const focus = useIsFocused();

  const isPortrait = useOrientation();
  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {
      darkMode,
      setDarkMode,
      language,
      setLanguage,
      setLicenseImg,
      infoData,
      licenseImg,
    },
  } = context;

  useEffect(() => {
    if (focus == true) {
      console.log('infoData', infoData);
      setDefaultData(infoData);
    }
  }, [focus]);

  const setDefaultData = (infoData: any) => {
    if (infoData) {
      console.log('licenseImg', licenseImg);
      console.log('yessinfoData', infoData);

      setLicenseImage(infoData?.id_proof_image);
    }
  };

  const styles = STYLES({...theme, isPortrait});

  const scanDocument = async () => {
    // start the document scanner
    // const scannedImage: any = await DocumentScanner.scanDocument();

    // console.log('scannedImages[0]', scannedImage.scannedImages[0]);
    // const imagePath = scannedImage.scannedImages[0];
    // setLicenseImage(imagePath);

    const options: any = {
      responseType: 'base64',
      // ImageFilePath: 'ImageFilePath',
      maxNumDocuments: 1,
    };

    DocumentScanner.scanDocument(options)
      .then(response => {
        // Handle the response here
        console.log('Scanned document response:', response?.scannedImages[0]);
        const imagePath: any = response?.scannedImages[0];
        setLicenseImage(`data:image/png;base64,${imagePath}`);
        setLicenseImg(`data:image/png;base64,${imagePath}`);
        console.log('License-Image', `data:image/png;base64,${imagePath}`);
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

  const onPressNext = async () => {
    if (licenseImage !== '') {
      const data = {
        image: licenseImage,
      };
      var formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // let API_Data = await API_Call_With_Out_Token(
      //   API.SCAN_LICENSE,
      //   formData,
      //   METHODS.POST,
      // );
      try {
        let API_Data = await API_Call_With_Out_Token(
          API.SCAN_LICENSE,
          formData,
          METHODS.POST,
        );

        let ResponseJson = API_Data.ResponseJson;
        var ResponseJson_Data = ResponseJson?.data;
        console.log('response apiCallPrivacyPolicy', JSON.stringify(API_Data));

        if (API_Data?.code == STATUS_CODE.noInternet) {
          toastRef.current.error(STRINGS.errorNoNetwork);
          setLoading(false);
          // this.validationError(STRINGS.Error_No_Network);
        } else if (ResponseJson?.code == STATUS_CODE.success) {
          //! Response Success
          setLoading(false);
          console.log('ResponseJson_Data.data', ResponseJson_Data);

          //  navigation.navigate(CONSTANTS.CONTACT_DETAILS_SCREEN,);

          // navigation.navigate(CONSTANTS.CONTACT_DETAILS_SCREEN, {
          //   contactInfoData: ResponseJson_Data,
          // });
          navigation.navigate(CONSTANTS.CONTACT_INFO_SCREEN);
        } else if (ResponseJson?.code == STATUS_CODE.unauthorized) {
          setLoading(false);
          console.log('unauthorizedd', API_Data?.msg);
          toastRef.current.error(API_Data?.msg);

          //Toast.callToast('dfewdf',CONSTANTS.ERROR)
        } else {
          toastRef.current.error(ResponseJson?.msg);
          setLoading(false);
          console.log('ERRORR', ResponseJson?.msg);
        }
      } catch (error) {
        // toastRef.current.error(error);
        setLoading(false);
        console.log('Catch error', error);
        // this.validationError();
      }

      // navigation.navigate(CONSTANTS.CONTACT_INFO_SCREEN);
    } else {
      toastRef.current.error(STRINGS.licenseError);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <Text style={styles.screenHeader}>
        {STRINGS.scanLicense.screenHeader}
      </Text>

      {/* <View style={styles.scannerContainer}>
        <FastImage
          source={IMAGES.ic_scanner}
          style={styles.imgStyle}
          resizeMode="contain"
        />
      </View> */}

      <TouchableOpacity style={styles.scannerContainer} onPress={onScanLicense}>
        <FastImage
          // source={IMAGES.ic_scanner}
          // style={styles.imgStyle}
          source={licenseImage === '' ? IMAGES.ic_scanner : {uri: licenseImage}}
          style={
            licenseImage === ''
              ? styles.imgStyle
              : [styles.imgStyle, styles.licenseImage]
          }
          resizeMode={licenseImage === '' ? 'contain' : 'stretch'}
        />
      </TouchableOpacity>

      <Text style={styles.scanerDefaultTxt}>
        {STRINGS.scanLicense.scanLicenseDefaultText}
      </Text>

      <View style={styles.btnContainer}>
        {/* <Clickable
          containerStyle={styles.nextBtn}
          onPress={() => onPressNext()}>
          <Text style={styles.btntxt}>{STRINGS.btnNext}</Text>
        </Clickable> */}
        <MainButton
          mainStyle={styles.nextBtn}
          title={STRINGS.btnNext}
          onPress={() => onPressNext()}
          titleTextStyle={styles.btntxt}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default ScanLicense;
