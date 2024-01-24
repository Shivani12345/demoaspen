import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from 'react-native';

import {AppStackParamList} from 'navigations/AppStack';
import {StackNavigationProp} from '@react-navigation/stack';
import WebView from 'react-native-webview';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';

import {IContext} from 'interfaces/common';
import {ContextData} from 'components/globalContext/globalContext';

import MainButton from 'components/button';
import Clickable from 'components/clickable';

import STRINGS from 'common/strings';
import IMAGES from 'common/images';
import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';

import STYLES from './RentNow.styles';

import {storeLanguage} from 'utils/asyncStorage';

import {
  PRIVACY_POLICY_EN,
  PRIVACY_POLICY_SP,
  TERMS_CONDITION_EN,
  TERMS_CONDITION_SP,
} from 'services/apiConfig';
import {currentScreen} from 'utils/functions';
import Footer from 'components/footer';

interface IProps {
  navigation: StackNavigationProp<AppStackParamList, 'RentNowScreen'>;
}

const RentNowScreen = (props: IProps) => {
  const {navigation} = props;
  const {rentNow} = STRINGS;

  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {darkMode, language, setLanguage},
  } = context;

  const [selectLanguage, setSelectLanguage] = useState(language ? true : false);
  const [termsConditionModel, setTermsConditionModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [appLanguage, setAppLanguage] = useState(language);
  const [source, setSource] = useState('');

  const languageLists = [
    // language lists
    {
      title: rentNow.english,
      img: IMAGES.ic_appImageEnglish,
      languageString: CONSTANTS.ENGLISH,
      key: 'en',
    },
    {
      title: rentNow.spanish,
      img: IMAGES.ic_appImageSpanish,
      languageString: CONSTANTS.SPANISH,
      key: 'sp',
    },
  ];

  const policiesLists = [
    // policies lists
    {
      title: rentNow.privacyPolicy,
      details: language === 'en' ? PRIVACY_POLICY_EN : PRIVACY_POLICY_SP,
    },
    {
      title: rentNow.condition,
      details: language === 'en' ? TERMS_CONDITION_EN : TERMS_CONDITION_SP,
    },
  ];

  const styles = STYLES(theme);

  useEffect(() => {
    currentScreen('RentNowScreen');
    setAppLanguage(language);
  });

  const onPressRentNow = () => {
    navigation.navigate(CONSTANTS.CHOOSE_LOCATION_SCREEN);
  };

  // handle policies click 
  const handleToShowPolicies = (language: any) => {
    setTermsConditionModel(true);
    setSource(language);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // change language function
  const changeLanguage = (language: any) => {
    setAppLanguage(language);
    setSelectLanguage(true);
    STRINGS.setLanguage(language);
    setLanguage(language);
    storeLanguage(language);
  };

  // render language icon with title
  const renderLanguage = (language: any) => {
    return (
      <TouchableOpacity
        style={appLanguage == language.key ? styles.selectedBtn : styles.btn}
        onPress={() => {
          changeLanguage(language.languageString);
        }}>
        <FastImage
          source={language.img}
          style={styles.languageIcon}
          resizeMode="contain"
        />
        <Text
          style={
            appLanguage == language.key
              ? styles.selectedapptext
              : styles.languagetext
          }>
          {language.title}
        </Text>
      </TouchableOpacity>
    );
  };

  // render policies 
  const renderPolicies = (policy: any) => {
    return (
      <Text
        style={styles.conditiontext}
        onPress={() => {
          handleToShowPolicies(policy.details)
        }}>
        {policy.title}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container]}>
        <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

        <FastImage
          source={IMAGES.ic_appLogo}
          style={styles.logoStyle}
          resizeMode="contain"
        />

        {/* language selection view */}
        <View style={styles.languageContainer}>
          <FlatList
            data={languageLists}
            scrollEnabled={true}
            horizontal
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => renderLanguage(item)}></FlatList>
        </View>

        {/* main rendt now buttone */}
        <MainButton
          title={rentNow.btnRentNow}
          onPress={onPressRentNow}
          mainStyle={styles.rentNowMainButton}
        />

        {/* policies & term-conditions view */}
        <View style={styles.policyViewContainer}>
          <FlatList
            data={policiesLists}
            scrollEnabled={true}
            horizontal
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => renderPolicies(item)}></FlatList>
        </View>

        <View style={styles.splashImageView}>
          <FastImage
            source={IMAGES.ic_rentNow}
            style={styles.splashImage}
            resizeMode="contain"
          />
          <Footer />
        </View>

        <Modal
          backdropOpacity={0.7}
          isVisible={termsConditionModel}
          style={{flex: 1}}
          onBackdropPress={() => {
            setTermsConditionModel(false);
          }}>
          <View style={styles.modelContainer}>
            {isLoading ? (
              <ActivityIndicator style={styles.indicator} />
            ) : (
              <WebView source={{uri: source}} textZoom={70} />
            )}

            <Clickable
              onPress={() => setTermsConditionModel(false)}
              containerStyle={styles.closebtn}>
              <Text style={styles.closetext}>{STRINGS.btnClose}</Text>
            </Clickable>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default RentNowScreen;
