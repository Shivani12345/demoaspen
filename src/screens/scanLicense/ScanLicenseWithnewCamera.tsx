import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
  StyleSheet,
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
import {
  useCameraDevices,
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
interface IProps {
  navigation: StackNavigationProp<AppStackParamList, 'ScanLicense'>;
}

const ScanLicense = (props: IProps) => {
  const {navigation} = props;
  const [licenseImage, setLicenseImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseObj, setResponseObj] = useState<any>();
  const [is_active, setActive] = useState(true);

  const camera = useRef(null);
  const focus = useIsFocused();
  let device = useCameraDevice('back', {
    physicalDevices: ['wide-angle-camera'],
  });
  const format = useCameraFormat(device, [
    {videoResolution: {width: 1920, height: 1080}},
    {fps: 60},
  ]);
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

  const onChangeTheme = (value: boolean) => {
    setDarkMode(value);
    storeTheme(value ? CONSTANTS.THEME_DARK : CONSTANTS.THEME_LIGHT);
  };

  const onChangeLanguage = (value: string) => {
    STRINGS.setLanguage(value);
    setLanguage(value);
    storeLanguage(value);
  };

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
    // navigation.navigate(CONSTANTS.CONTACT_INFO_SCREEN);

    if (licenseImage !== '') {
      const data = {
        image: responseObj,
      };
      var formData = new FormData();
      // Object.entries(data).forEach(([key, value]) => {
      // formData.append('image', {
      //   fileName: 'DOCUMENT_SCAN_0_20231103_1515133317411358199465388.jpg',
      //   type: 'image/jpg',
      //   uri: 'file:///storage/emulated/0/Android/data/com.aspenkiosk/files/Pictures/DOCUMENT_SCAN_0_20231103_1515133317411358199465388.jpg',
      // });
      // });

      formData.append('image', {
        uri: responseObj.uri,
        type: responseObj.type,
        name: responseObj.name,
      });
      console.log('responseObj.uri--------->>>>>', responseObj.uri);
      console.log('responseObj.type--------->>>>>', responseObj.type);
      console.log('responseObj.filename--------->>>>>', responseObj.name);
      console.log('formData--------->>>>>', JSON.stringify(formData));

      // const obJData = {
      //   billing_address: Responsedata?.Address,
      //   renter_dob: Responsedata?.DOB,
      //   renter_first_name: Responsedata?.Name,
      //   renter_last_name: Responsedata?.Surname,
      //   renter_postel_code: Responsedata?.Zip_code,
      // };
      // console.log('obJData', obJData);

      // setInfoData(obJData);
      // navigation.navigate(CONSTANTS.CONTACT_INFO_SCREEN);
      setLoading(true);
      try {
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
          // this.validationError(STRINGS.Error_No_Network);
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
            // renter_state: getStateFromAddress(Responsedata.Address, 1),
            // renter_postel_code: getStateFromAddress(Responsedata.Address, 2),
            id_proof_number: Responsedata.License_number,
          };
          console.log('ResponseJson_Data.data', obJData);

          setInfoData(obJData);

          navigation.navigate(CONSTANTS.CONTACT_INFO_SCREEN);

          //  navigation.navigate(CONSTANTS.CONTACT_DETAILS_SCREEN,);

          // navigation.navigate(CONSTANTS.CONTACT_DETAILS_SCREEN, {
          //   contactInfoData: ResponseJson_Data,
          // });
          // navigation.navigate(CONSTANTS.CONTACT_INFO_SCREEN);
        } else if (ResponseJson?.code == STATUS_CODE.unauthorized) {
          setLoading(false);
          console.log('unauthorizedd', API_Data?.msg);
          toastRef.current.error(API_Data?.msg);

          //Toast.callToast('dfewdf',CONSTANTS.ERROR)
        } else {
          console.log('ERRORR', ResponseJson?.msg);
          toastRef.current.error(ResponseJson?.msg);
          setLoading(false);
        }
      } catch (error) {
        console.log('Catch error', error);
        // toastRef.current.error(error);
        setLoading(false);

        // this.validationError();
      }

      // navigation.navigate(CONSTANTS.CONTACT_INFO_SCREEN);
    } else {
      toastRef.current.error(STRINGS.licenseError);
    }
  };
  const capturePhoto = async () => {
    console.log('hii');
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({
        width: responsivePixels.size340,
        height: responsivePixels.size254,
      });
      // setImageSource(photo.path);
      // setShowCamera(false);
      const imagePath = 'file:///' + photo.path;
      const imgResponse: any = getImageType(imagePath);
      console.log('imgResponse', imgResponse, photo);
      toastRef.current.success(STRINGS.licenseScanSuccess);
      setResponseObj({...imgResponse, uri: imagePath});

      setLicenseImage(`data:image/png;base64,${imagePath}`);

      setLicenseImg(`data:image/png;base64,${imagePath}`);
      setDocumentImg({...imgResponse, uri: imagePath});

      console.log('=========', photo.path);
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

      <View style={styles.scannerContainer}>
        <FastImage
          // source={IMAGES.ic_scanner}
          // style={styles.imgStyle}
          // source={licenseImage === '' ? IMAGES.ic_scanner : {uri: licenseImage}}
          source={!licenseImage ? IMAGES.ic_scanner : {uri: responseObj.uri}}
          style={
            !licenseImage
              ? styles.imgStyle
              : [styles.imgStyle, styles.licenseImage]
          }
          resizeMode={!licenseImage ? 'contain' : 'stretch'}
        />
        {!licenseImage ? (
          <View
            style={{
              height: 300,
              width: isIOS()
                ? responsivePixels.size340
                : responsivePixels.size340,
              position: 'absolute',
              // marginTop: -10,
              justifyContent: 'center',
              alignItems: 'center',

              alignSelf: 'center',
              backgroundColor: 'pink',
            }}>
            <Camera
              ref={camera}
              style={styles.camera}
              device={device}
              isActive={is_active}
              // codeScanner={codeScanner}
              format={format}
              // orientation="landscape-left"
              resizeMode="contain"
              enableZoomGesture
              ratio="9:16"
              photo={true}
            />
          </View>
        ) : // <View
        //   style={
        //     {
        //       height: responsivePixels.size254,
        //       width: isIOS()
        //         ? responsivePixels.size340
        //         : responsivePixels.size340,
        //       position: 'absolute',
        //       // marginTop: -10,
        //       justifyContent: 'center',
        //       alignItems: 'center',

        //       alignSelf: 'center',
        //     }

        //     //   {
        //     //   // alignSelf: 'center',
        //     //   // alignItems: 'center',
        //     //   // justifyContent: 'center',
        //     //   // position: 'absolute',
        //     //   // height: responsivePixels.size197,
        //     //   // width: isIOS()
        //     //   //   ? responsivePixels.size290
        //     //   //   : responsivePixels.size330,

        //     //   // backgroundColor: 'pink',

        //     //   // flex: 1,
        //     // }
        //   }>
        //   <Camera
        //     ref={camera}
        //     style={{
        //       height: responsivePixels.size254,
        //       width: isIOS()
        //         ? responsivePixels.size340
        //         : responsivePixels.size340,
        //       // width: '95%',
        //       // height: '95%',
        //       // marginTop: 5,
        //       marginLeft: -responsivePixels.size10,
        //       // alignSelf: 'center',
        //     }}
        //     enableFrameProcessor
        //     enableAutoDistortionCorrection
        //     device={device}
        //     isActive={true}
        //     // codeScanner={codeScanner}
        //     // format={format}
        //     // orientation="portrait"
        //     resizeMode="cover"
        //     enableZoomGesture
        //     photo={true}
        //     // enableHighQualityPhotos={false}
        //     // torch={useTorch ? 'on' : 'off'}
        //   />
        // </View>
        // <Camera style={styles.cameraView} device={device} isActive={true} />
        // <Text style={styles.cameraText}>
        //   {STRINGS.scanLicense.cameraText}
        // </Text>
        null}
      </View>
      <View style={{flexDirection: 'row'}}>
        <MainButton
          mainStyle={styles.captureBtn}
          title={'Capture Image'}
          onPress={() => capturePhoto()}
          titleTextStyle={styles.btntxt}
          // loading={loading}
          // disabled={!licenseImage ? true : false}
        />
        <MainButton
          mainStyle={styles.captureBtn}
          title={'Retake'}
          onPress={() => setLicenseImage('')}
          titleTextStyle={styles.btntxt}
          // loading={loading}
          // disabled={!licenseImage ? true : false}
        />
      </View>
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
          disabled={!licenseImage ? true : false}
        />
      </View>
    </View>
  );
};

export default ScanLicense;
