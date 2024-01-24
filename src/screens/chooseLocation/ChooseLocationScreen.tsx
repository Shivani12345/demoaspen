import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import {AppStackParamList} from 'navigations/AppStack';

import {IContext} from 'interfaces/common';
import {ContextData} from 'components/globalContext/globalContext';

import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';
import STRINGS from 'common/strings';
import IMAGES from 'common/images';

import STYLES from './ChooseLocation.styles';

import {toastRef} from 'components/globalContext/globalContext';
import {API_Call_With_Out_Token} from 'services/api';
import {API, METHODS, STATUS_CODE} from 'services/apiConfig';
import MainButton from 'components/button';
import Footer from 'components/footer';
import {storeLocation} from 'utils/asyncStorage';
interface IProps {
  navigation: StackNavigationProp<AppStackParamList, 'ChooseLocationScreen'>;
}

const ChooseLocationScreen: FunctionComponent<IProps> = props => {
  const {navigation} = props;
  const {chooseLocation} = STRINGS;

  const [selectedIndex, setSelectedIndex] = useState();
  const [locationData, setLocationData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {language},
  } = context;
  const styles = STYLES(theme);

  const onPressCheckBox = (
    index: any,
    item: {firstAddress: string; city: string; state: string; pincode: string},
  ) => {
    setSelectedIndex(index);
    console.log('iteeme', language == 'en' ? item.address_en : item.address_es);
    const locationchoose = language == 'en' ? item.address_en : item.address_es;
    storeLocation(locationchoose);
    navigation.navigate(CONSTANTS.STORAGE_SPACE_SELECTION_SCREEN, {item: item}); //{data: item}
  };

  const apiCallGetLocation = async () => {
    setIsLoading(true);
    try {
      let API_Data = await API_Call_With_Out_Token(
        API.LOCATIONS,
        {},
        METHODS.GET,
      );

      let ResponseJson = API_Data?.ResponseJson;
      var ResponseJson_Data = ResponseJson?.data;
      console.log('response LocationData', JSON.stringify(API_Data));
      if (API_Data?.code == STATUS_CODE.noInternet) {
        toastRef.current.error(STRINGS.errorNoNetwork);
        setReload(true);
        setIsLoading(false);
      } else if (ResponseJson?.code == STATUS_CODE.success) {
        setReload(false);
        setIsLoading(false);
        //! Response Success
        setLocationData(ResponseJson_Data);
      } else if (ResponseJson?.code == STATUS_CODE.unauthorized) {
        setReload(true);
        setIsLoading(false);
        toastRef.current.error(ResponseJson?.msg);
      } else {
        setReload(true);
        setIsLoading(false);
      }
    } catch (e) {
      setReload(true);
      setIsLoading(false);
      // toastRef.current.error(e);

      // console.log('Catch error', error);
      // this.validationError();
    }

    //
  };

  useEffect(() => {
    // toastRef.current.error(CONSTANTS.ERRORMESSAGE);
    apiCallGetLocation();
  }, []);

  const renderItem = (
    item: {
      address_en: any;
      firstAddress: string;
      city: string;
      state: string;
      pincode: string;
    },
    index: number,
  ) => {
    return (
      <TouchableOpacity
        key={index.toString()}
        activeOpacity={1}
        onPress={() => onPressCheckBox(index, item)}
        style={[
          selectedIndex === index ? styles.selectedItemView : styles.itemView,
        ]}>
        <View style={[styles.itemCheckBox]}>
          {selectedIndex === index ? (
            <Image source={IMAGES.ic_check} style={styles.check} />
          ) : null}
        </View>

        <Text
          numberOfLines={1}
          style={[
            selectedIndex === index ? styles.selectedItemText : styles.itemText,
          ]}>
          {/* {`${item.firstAddress} ${item.city}, ${item.state} ${item.pincode}`} */}
          {`${language === 'en' ? item.address_en : item.address_es}`}
        </Text>
      </TouchableOpacity>
    );
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPressBack}
          style={styles.renderLeft}>
          <FastImage
            source={IMAGES.ic_back}
            style={styles.leftIcon}
            tintColor={COLORS.grayHex}
            resizeMode="contain"
          />
          <Text style={styles.back}>{STRINGS.btnBack}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

        <Header />
        <View style={{flex: 1}}>
          <FastImage
            source={IMAGES.ic_appLogo}
            style={styles.logoStyle}
            resizeMode="contain"
          />

          <Text style={[styles.textStyle]}>
            {chooseLocation.chooseLocationTxt}
          </Text>
          <>
            {isLoading ? (
              <ActivityIndicator style={styles.indicator} />
            ) : (
              <FlatList
                data={locationData}
                scrollEnabled={true}
                style={{flexGrow: 0}}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => renderItem(item, index)}
              />
            )}
            {reload ? (
              <MainButton
                title={STRINGS.btnReload}
                loading={isLoading}
                titleTextStyle={styles.footerButtonTitle}
                mainStyle={styles.footerButton}
                onPress={() => apiCallGetLocation()}
              />
            ) : null}
            {/* </View> */}
          </>

          <View
            style={{
              bottom: 0,
              backgroundColor: 'white',
              position: 'absolute',
              width: '100%',
            }}>
            <FastImage
              source={IMAGES.ic_chooseLocation}
              style={styles.chooseLocationImage}
              resizeMode="contain"
            />
          </View>
          <Footer />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChooseLocationScreen;
