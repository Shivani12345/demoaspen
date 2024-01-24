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
import {
  changeDateFormat,
  getImageType,
  isIOS,
  ConvertDatewithFormat,
  getStateFromAddress,
} from 'utils/functions';
import MainButton from 'components/button';
import {API, METHODS, STATUS_CODE} from 'services/apiConfig';
import {API_Call_With_Out_Token} from 'services/api';
import responsivePixels from 'utils/responsivePixels';
import common from 'common/common.styles';
import Header from 'components/headerBlock';

interface IProps {
  navigation: StackNavigationProp<AppStackParamList, 'ScanLicense'>;
}

const ScanLicense = (props: IProps) => {
  const {navigation} = props;
  const [licenseImage, setLicenseImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseObj, setResponseObj] = useState<any>();

  const focus = useIsFocused();

  const isPortrait = useOrientation();
  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {
      setLicenseImg,
      infoData,
      setInfoData,
      licenseImg,
      setDocumentImg,
    },
  } = context;

  useEffect(() => {
    if (focus == true) {
      console.log('infoData', infoData);
      setDefaultData(infoData);
    }
  }, [focus]);


  const setDefaultData = (infoData: any) => {
    if (infoData?.id_proof_image) {
      console.log('licenseImg', licenseImg);
      console.log('yessinfoData', infoData);

      setLicenseImage(infoData?.id_proof_image);
      setResponseObj(infoData?.id_proof_image);
    }
  };

  const styles = STYLES({...theme, isPortrait});

  const scanDocument = async () => {
    // start the document scanner

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
        setResponseObj({...imgResponse, uri: imagePath});

        setLicenseImage(`data:image/png;base64,${imagePath}`);

        setLicenseImg(`data:image/png;base64,${imagePath}`);
        setDocumentImg({...imgResponse, uri: imagePath});
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
    console.log('responseObj--------->>>>>', responseObj);

    if (licenseImage !== '') {
      
      var formData = new FormData();

      formData.append('image', {
        uri: responseObj.uri,
        type: responseObj.type,
        name: responseObj.name,
      });
      console.log('responseObj.uri--------->>>>>', responseObj.uri);
      console.log('responseObj.type--------->>>>>', responseObj.type);
      console.log('responseObj.filename--------->>>>>', responseObj.name);
      console.log('formData--------->>>>>', JSON.stringify(formData));

      setLoading(true);
      try {
        // API for getting scan card data
        let API_Data = await API_Call_With_Out_Token(
          API.LICENSESCAN,
          formData,
          METHODS.POST,
          true,
        );

        console.log('response onScanLicense', API_Data);
        let ResponseJson = API_Data?.ResponseJson;
        let Responsedata = ResponseJson?.data;
        console.log('response onScanLicense', ResponseJson);

        if (API_Data?.code == STATUS_CODE.noInternet) {
          toastRef.current.error(STRINGS.errorNoNetwork);
          setLoading(false);
        } else if (ResponseJson?.code == STATUS_CODE.success) {
          //! Response Success
          setLoading(false);
          const obJData = {
            // billing_address: Responsedata.Address,
            renter_address_line_1: Responsedata.Address,
            renter_dob: Responsedata.DOB
              ? ConvertDatewithFormat(
                  Responsedata.DOB,
                  CONSTANTS.MMDDYYYY,
                  CONSTANTS.YYYYMMDD,
                )
              : '',
            renter_first_name: Responsedata.Name,
            renter_last_name: Responsedata.Surname,

            id_proof_image: responseObj,
            renter_state: getStateFromAddress(Responsedata.Address, 1),
            // renter_postel_code: getStateFromAddress(Responsedata.Address, 2),
            id_proof_number: Responsedata.License_number,
          };
          console.log('ResponseJson_Data.data', obJData);
          
          setInfoData(obJData);

          navigation.navigate(CONSTANTS.CONTACT_INFO_SCREEN);
        } else if (ResponseJson?.code == STATUS_CODE.unauthorized) {
          setLoading(false);
          console.log('unauthorizedd', API_Data?.msg);
          toastRef.current.error(API_Data?.msg);
        } else {
          console.log('ERRORR', ResponseJson?.msg);
          toastRef.current.error(ResponseJson?.msg);
          setLoading(false);
        }
      } catch (error) {
        console.log('Catch error', error);
        setLoading(false);
      }
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

      {/* card scan TouchableOpacity*/}
      <TouchableOpacity style={styles.scannerContainer} onPress={onScanLicense}>
        <FastImage
          source={!licenseImage ? IMAGES.ic_scanner : {uri: responseObj.uri}}
          style={
            !licenseImage
              ? styles.imgStyle
              : [styles.imgStyle, styles.licenseImage]
          }
          resizeMode={!licenseImage ? 'contain' : 'stretch'}
        />
        {!licenseImage ? (
          <Text style={styles.cameraText}>
            {STRINGS.scanLicense.cameraText}
          </Text>
        ) : null}
      </TouchableOpacity>

      <Text style={styles.scanerDefaultTxt}>
        {STRINGS.scanLicense.scanLicenseDefaultText}
      </Text>

      {/* next button */}
      <View style={styles.btnContainer}>
        <MainButton
          mainStyle={styles.nextBtn}
          title={STRINGS.btnNext}
          onPress={() => onPressNext()}
          titleTextStyle={styles.btntxt}
          loading={loading}
          disabled={!licenseImage ? true : false}
        />
      </View>
    </View>
  );
};

export default ScanLicense;
