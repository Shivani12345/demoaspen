import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';

import {StackNavigationProp} from '@react-navigation/stack';
import {AppStackParamList} from 'navigations/AppStack';

import SelectDropdown from 'react-native-select-dropdown';
import FastImage from 'react-native-fast-image';

import {IContext} from 'interfaces/common';
import {toastRef} from 'components/globalContext/globalContext';
import DATA from 'utils/data';
import {storeLanguage} from 'utils/asyncStorage';
import {useOrientation} from 'utils/useOrientation';

import CustomImage from 'components/customImage';
import {ContextData} from 'components/globalContext/globalContext';
import Clickable from 'components/clickable';

import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';
import IMAGES from 'common/images';
import STRINGS from 'common/strings';

import STYLES from './StorageSpaceSelectionScreen.style';

import responsivePixels from 'utils/responsivePixels';
import RenderHTML from 'react-native-render-html';

import {apiCall, API_Call_With_Out_Token} from 'services/api';
import {METHODS, STATUS_CODE} from 'services/apiConfig';
import {numberFormat, openWithEmail, openWithPhone} from 'utils/functions';

interface IProps {
  navigation: StackNavigationProp<
    AppStackParamList,
    'StorageSpaceSelectionScreen'
  >;
}

const StorageSpaceSelectionScreen = (props: IProps) => {
  const {navigation} = props;
  const {storageSpaceSelection} = STRINGS;

  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {
      language,
      setLanguage,
      setStorageSize,
    },
  } = context;

  const initialLanguage = language === 'en' ? 0 : 1;

  const [country, setCountry] = useState<any>(
    DATA.countriesWithFlags[initialLanguage],
  );
  const [selectedId, setSelectedId] = useState();
  const [size, setSize] = useState<string>('');
  const [data, setData] = useState<any[]>(DATA.SizeData);
  const [pageLoading, setPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [useResponse, sethowUseResponse] = useState({});

  const flatListRef = useRef(null);

  const [isHowToUseModalVisible, setIsHowToUseModalVisible] = useState(false);

  const isPortrait = useOrientation();

  const sizesList = [ //filter size lists
    {
      title: '',
      selectedSize: storageSpaceSelection.all,
      key: '',
    },
    {
      title: 'small',
      selectedSize: storageSpaceSelection.small,
      key: 'small',
    },
    {
      title: 'medium',
      selectedSize: storageSpaceSelection.medium,
      key: 'medium',
    },
    {
      title: 'large1',
      selectedSize: storageSpaceSelection.large1,
      key: 'large'
    },
  ]

  useEffect(() => {
    setPageLoading(true);
    apiCallGetStorage('');

    setTimeout(() => {
      setIsLoadingList(false);
    }, 500);
  }, []);

  useEffect(() => {
    setSize(storageSpaceSelection.all);
  }, [storageSpaceSelection.all]);

  const styles = STYLES({...theme, isPortrait});

  const onChangeLanguage = (value: string) => {
    STRINGS.setLanguage(value);
    setLanguage(value);
    storeLanguage(value);
  };

  const onPressIUnderstoodButton = () => {
    setIsHowToUseModalVisible(!isHowToUseModalVisible);
  };

  const selectedSize = (title: any) => {
    switch (title) {
      case storageSpaceSelection.all:
        setSize(title);
        break;
      case storageSpaceSelection.small:
        setSize(title);
        break;
      case storageSpaceSelection.medium:
        setSize(title);
        break;

      case storageSpaceSelection.large1:
        setSize(title);
        break;

      default:
        break;
    }
  };

  const onSelectLanguage = (selectedItem: any, index: number) => {
    console.log(selectedItem, index);
    setCountry(selectedItem);
    if (selectedItem?.title === 'English') {
      onChangeLanguage(CONSTANTS.ENGLISH);
    } else {
      onChangeLanguage(CONSTANTS.SPANISH);
    }
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

  const ScreenHeader = () => {
    return (
      <View style={styles.headerItem}>
        <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
        <View style={{flexDirection: 'row'}}>
          <Header />

          <FastImage
            source={IMAGES.ic_appLogo}
            style={styles.headerimg}
            resizeMode="contain"
          />
        </View>

        <View style={styles.selectedCountryLang}>
          <SelectDropdown
            statusBarTranslucent={true}
            data={DATA?.countriesWithFlags}
            onSelect={(selectedItem, index) => {
              onSelectLanguage(selectedItem, index);
            }}
            renderDropdownIcon={item => {
              return (
                <FastImage
                  source={IMAGES.ic_dropdown}
                  style={styles.downArrow}
                  resizeMode="contain"
                />
              );
            }}
            defaultValue={country}
            buttonStyle={styles.dropdown}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.dropdown3BtnChildStyle}>
                  {selectedItem ? (
                    <FastImage
                      source={selectedItem.image}
                      style={styles.dropdown3BtnImage}
                      resizeMode="contain"
                    />
                  ) : null}
                  <Text style={styles.dropdown3BtnTxt}>
                    {selectedItem
                      ? selectedItem.title?.slice(0, 3)
                      : 'Select country'}
                  </Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownContainer}
            rowStyle={styles.dropdown3RowStyle}
            renderCustomizedRowChild={(item, index) => {
              return (
                <View style={styles.dropdown3RowChildStyle}>
                  <FastImage
                    source={item.image}
                    style={styles.dropdownRowImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
                </View>
              );
            }}
          />

          <CustomImage
            source={IMAGES.ic_question}
            imageStyle={styles.questionimg}
            onPress={() => {
              setIsHowToUseModalVisible(!isHowToUseModalVisible);
              apiCallhowtoUSE();
            }}
          />
        </View>
      </View>
    );
  };

  const apiCallGetStorage = async (sizeName: string, initialPageNew = 1) => {
    console.log('loccc', props.route.params.item);
    setPageLoading(true);
    let URL = `storages?size_type=${sizeName}&page=${initialPageNew}&location_code=${props.route.params.item.s_location_code}`;
    try {
      let API_Data = await API_Call_With_Out_Token(URL, {}, METHODS.GET);

      let ResponseJson = API_Data.ResponseJson;
      var ResponseJson_Data = ResponseJson?.data;
      console.log('response LocationData', API_Data, STATUS_CODE.success);

      if (API_Data?.code == STATUS_CODE.noInternet) {
        toastRef.current.error(STRINGS.errorNoNetwork);
      } else if (ResponseJson?.code == STATUS_CODE.success) {
        //! Response Success
        setCurrentPage(ResponseJson_Data.current_page);
        setLastPage(ResponseJson_Data.last_page);
        setData(ResponseJson_Data.data);
      } else if (ResponseJson?.code == STATUS_CODE.unauthorized) {
        console.log('unauthorizedd', API_Data?.msg);
      } else {
        // console.log('ERRORR', API_Data?.msg);
      }
    } catch (error) {
      console.log('Catch error', error);
    }
    setTimeout(() => {
      setPageLoading(false);
    }, 700);
  };

  const apiCallhowtoUSE = async () => {
    console.log('loccc', props.route.params.item);

    let URL = `cms/how-to-use`;
    try {
      let API_Data = await API_Call_With_Out_Token(URL, {}, METHODS.GET);

      let ResponseJson = API_Data.ResponseJson;
      var ResponseJson_Data = ResponseJson?.data;
      console.log('response LocationData', API_Data, STATUS_CODE.success);

      if (API_Data?.code == STATUS_CODE.noInternet) {
        toastRef.current.error(STRINGS.errorNoNetwork);
      } else if (ResponseJson?.code == STATUS_CODE.success) {
        sethowUseResponse(ResponseJson_Data);
        //! Response Success
      } else if (ResponseJson?.code == STATUS_CODE.unauthorized) {
        console.log('unauthorizedd', API_Data?.msg);
        toastRef.current.error(API_Data?.msg);
        //Toast.callToast('dfewdf',CONSTANTS.ERROR)
      } else {
        console.log('ERRORR', API_Data);
        // toastRef.current.error(API_Data?.msg);
      }
    } catch (error) {
      // toastRef.current.error(error);
      console.log('Catch error', error);
      // this.validationError();
    }
  };

  const RenderItem = ({item, index}: any) => {
    return (
      <View key={index.toString()} style={styles.renderItemMainView}>
        <TouchableOpacity
          key={index.toString()}
          style={
            index === selectedId
              ? [{...styles.renderitem, ...styles.selectedItem}]
              : styles.renderitem
          }
          onPress={() => {
            console.log(
              'setStorageSize',
              `${item.dc_length} x ${item.dc_width}`,
              `$${item.dc_web_rate}/${STRINGS.month}`,
              `${item.unit_id}`,
            );

            setStorageSize({
              storageSizeValue: `${item.dc_length} x ${item.dc_width}`,
              storagePerMonth: `$${numberFormat(item.dc_web_rate)}/${
                STRINGS.month
              }`,
              storageUnitId: `${item.unit_id}`,
            });
            setSelectedId(index);
            navigation.navigate(CONSTANTS.INSURANCE_PLAN_SCREEN);
          }}>
          <Text
            style={
              styles.itemtoptxt
            }>{`${item.dc_length} x ${item.dc_width}`}</Text>
          <Image source={IMAGES.ic_listimg} style={styles.itemimg} />
          <Text style={styles.itembottomtxt}>{`$${numberFormat(
            item.dc_web_rate,
          )}/${STRINGS.month}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const apiCallGetStorageWithPage = async (
    sizeName: string,
    pageNumber: number,
  ) => {
    console.log('fjklsfhsfsdfsdfs', currentPage, lastPage, {
      sizeName,
      pageNumber,
    });
    const paramsData = {
      url: `storages?size_type=${sizeName}&page=${pageNumber}&location_code=${props.route.params.item.s_location_code}`,
      method: METHODS.GET,
      body: {
        size_type: sizeName,
      },
      isToken: '',
      header: 'X-localization',
    };
    const getStorage = await apiCall(paramsData);
    if (pageNumber > 1) {
      console.log('getStoragegetStoragegetStorage_setIsLoading', [
        ...data,
        ...getStorage.data.data,
      ]);
      if (getStorage.data.data.length > 0) {
        setData([...data, ...getStorage.data.data]);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    }
  };

  const HowToUseModal = () => {
    console.log('HowToUseModal', useResponse?.description_en);
    const divTagStart = '<div style="color:black">';
    const divTagEnd = '</div>';
    return (
      <Modal
        style={{height: '50%'}}
        backdropColor={COLORS.black}
        presentationStyle="overFullScreen"
        isVisible={isHowToUseModalVisible}
        onBackdropPress={() => {
          setIsHowToUseModalVisible(!isHowToUseModalVisible);
        }}>
        <View style={styles.howToUseModalView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            bounces={true}>
            <View style={styles.howToUseDescription}>
              <Text style={styles.howToUseTitle}>
                {language == 'en' ? useResponse.title_en : useResponse.title_es}
              </Text>
              <RenderHTML
                contentWidth={100}
                source={{
                  html:
                    language == 'en'
                      ? divTagStart.concat(
                          useResponse.description_en?.concat(divTagEnd),
                        )
                      : divTagStart.concat(
                          useResponse.description_es?.concat(divTagEnd),
                        ),
                }}
              />
            </View>
          </ScrollView>
          <View style={styles.howToUseFooterView}>
            <View
              style={{
                backgroundColor: COLORS.lightOrange,
                paddingVertical: responsivePixels.size15,
                paddingHorizontal: responsivePixels.size20,
                marginTop: responsivePixels.size2,
              }}>
              <TouchableOpacity
                style={styles.renderText}
                onPress={() => openWithEmail(CONSTANTS.EMAIL_ID)}>
                <FastImage
                  source={IMAGES.ic_sms}
                  style={styles.menuIcon}
                  tintColor={COLORS.darkOrange}
                  resizeMode="contain"
                />
                <Text style={styles.title}>{CONSTANTS.EMAIL_ID}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.renderText]}
                onPress={() => openWithPhone(CONSTANTS.PHONE_NUMBER)}>
                <FastImage
                  source={IMAGES.ic_phone}
                  style={styles.menuIcon}
                  tintColor={COLORS.darkOrange}
                  resizeMode="contain"
                />
                <Text style={styles.title}>{CONSTANTS.PHONE_NUMBER}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={onPressIUnderstoodButton}
              style={styles.howToUseFooterButton}>
              <Text style={styles.howToUseFooterButtonTitle}>
                {storageSpaceSelection.understoodButtonTitle}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const RenderStorageSize = (item: any) => {
    const itemSize = item.item;
    return (
      <Clickable
        onPress={() => {
          selectedSize(itemSize.selectedSize);
          setPageLoading(true);
          setCurrentPage(1);
          setData([]);
          apiCallGetStorage(itemSize.key, 1);
        }}
        containerStyle={
          size === itemSize.selectedSize
            ? styles.selectedbuttonContainerStyle
            : styles.buttonContainerStyle
        }>
        <Text
          style={[
            styles.fontStyle,
            size === itemSize.selectedSize ? styles.selectedButtonText : styles.buttonText,
          ]}>
          {itemSize.selectedSize}
        </Text>
      </Clickable>
    )
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.shadowContainer}>
        <ScreenHeader />
      </View>

      <Text style={styles.titletxt}>
        {storageSpaceSelection.chooseYourSize}
      </Text>

      {/* size list view */}
      <View style={styles.storageSpaceView}>
        <FlatList
          data={sizesList}
          horizontal
          renderItem={RenderStorageSize}
        >
        </FlatList>
      </View>

      {isLoadingList ? (
        <ActivityIndicator style={styles.indicator} />
      ) : (
        // storage space flatlist
        <FlatList
          ref={flatListRef}
          style={styles.listcontainer}
          showsVerticalScrollIndicator={false}
          data={data}
          numColumns={2}
          keyExtractor={(item: any, index: {toString: () => any}) =>
            index.toString()
          }
          renderItem={RenderItem}
          extraData={selectedId}
          onMomentumScrollBegin={() => {}}
          onEndReached={({distanceFromEnd}) => {
            console.log('distanceend!', distanceFromEnd);
            if (distanceFromEnd == 0) {
            } else {
              if (!isLoading && currentPage <= lastPage) {
                setIsLoading(true);
                const numberNew = currentPage + 1;
                setCurrentPage(numberNew);
                apiCallGetStorageWithPage('', numberNew);
              }
            }
          }}
          onEndReachedThreshold={0.7}
          ListFooterComponent={() => {
            if (isLoading) {
              return (
                <View style={{marginBottom: 25}}>
                  <ActivityIndicator />
                </View>
              );
            }
          }}
        />
      )}

      {HowToUseModal()}
    </View>
  );
};

export default StorageSpaceSelectionScreen;
