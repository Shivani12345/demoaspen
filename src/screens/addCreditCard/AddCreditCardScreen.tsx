import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  View,
  StatusBar,
  Text,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';

import Modal from 'react-native-modal';
import MonthPicker from 'react-native-month-year-picker';
import FastImage from 'react-native-fast-image';

import {StackNavigationProp} from '@react-navigation/stack';

import {AppStackParamList} from 'navigations/AppStack';

import {IContext} from 'interfaces/common';

import InputBox from 'components/inputBox';
import MainButton from 'components/button';
import {ContextData} from 'components/globalContext/globalContext';

import STRINGS from 'common/strings';
import IMAGES from 'common/images';
import COLORS from 'common/colors';
import CONSTANTS from 'common/constants';

import STYLES from './AddCreditCard.styles';

import responsivePixels from 'utils/responsivePixels';
import {checkValidate, currentScreen} from 'utils/functions';
import REGEX from 'common/regex';
import common from 'common/common.styles';
import CreditCardInput from 'components/creditCardInput';
import {numberWithSpace} from 'components/creditCardInput/NumberWithSpaces';
import moment from 'moment';

interface IProps {
  navigation: StackNavigationProp<AppStackParamList, 'AddCreditCardScreen'>;
}

const AddCreditCardScreen: FunctionComponent<IProps> = props => {
  const {navigation} = props;
  const {addCreditCard, btnAddNow, select} = STRINGS;

  const valObj = {value: '', error: ''};

  const [cardNumber, setCardNumber] = useState<any>(valObj);
  const [date, setDate] = useState<any>(valObj);
  const [open, setOpen] = useState<any>(false);
  const [cvv, setCVV] = useState<any>(valObj);
  const [cardHolderName, setCardHolderName] = useState<any>(valObj);
  const [cardType, setCardType] = useState<any>(valObj);
  const [localCardType, setLocalCardType] = useState<any>(valObj);
  const [isPolicyTermsModalVisible, setIsPolicyTermsModalVisible] =
    useState(false);
  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {darkMode, insurance, infoData, setCreditCardDetail},
  } = context;
  const styles = STYLES(theme);

  const showPicker = useCallback((value: any) => setOpen(value), []);
  useEffect(() => {
    console.log('props.route.params?.payload', infoData);
    currentScreen('AddCreditCardScreen');
    if (props.route.params?.payload)
      setDefaultData(props.route.params?.payload);
  }, []);

  const setDefaultData = (infoData: any) => {
    if (infoData) {
      console.log('yessPayload', infoData);
      setCardNumber({value: numberWithSpace(infoData.number), error: ''});
      if (infoData?.expiryMonth) {
        setDate({
          value: infoData.expiryMonth + '' + infoData.expiryYear,
          error: '',
        });
      }
      // setCVV({...cvv, error: ''});
      setCardHolderName({value: infoData.cardholderName, error: ''});
      setCardType({value: infoData.issuer, error: ''});
    }
  };
  const onValueChange = useCallback(
    (event: any, newDate: Date) => {
      const selectedDate = newDate || date.value;
      console.log('date-->', newDate, date);
      console.log('selectedDate', selectedDate);

      showPicker(false);
      setDate({value: selectedDate, error: ''});
    },
    [date.value, showPicker],
  );

  const formatDate = (date: Date) => {
    console.log('formatDate@@@@', date);
    if (date) {
      if (date.toString().length > 4) {
        // date===2031-10-31T18:30:00.000Z in format
        const dateFormat = new Date(date);

        const year = dateFormat.getFullYear().toString().slice(-2); // Get the last two digits of the year
        const month = (dateFormat.getMonth() + 1).toString().padStart(2, '0'); // Month as two digits

        console.log('direct enterr scann dateFormat', month, year);
        return `${month}/${year}`;
      } else {
        const dateFormat = new Date(date);

        const year = dateFormat.getFullYear().toString().slice(-2); // Get the last two digits of the year
        const month = date?.slice(0, 2); // Month as two digits
        console.log('from scann dateFormat', month, year);
        return `${month}/${year}`;
      }
    }
  };

  const TermsPolicyModal = () => {
    return (
      <Modal
        deviceHeight={'100%'}
        backdropColor={COLORS.black}
        isVisible={isPolicyTermsModalVisible}
        onBackdropPress={() => {
          setIsPolicyTermsModalVisible(!isPolicyTermsModalVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.confirmtext}>{STRINGS.Button_Confirm}!</Text>
          <View
            style={{
              backgroundColor: COLORS.gray,
              width: '100%',
              height: 1,
              marginBottom: 5,
            }}></View>
          <Text style={styles.terms}>{STRINGS.addCreditCard.alertMessage}</Text>

          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <MainButton
              mainStyle={styles.understood}
              title={STRINGS.Button_Cancel}
              onPress={() => {
                setIsPolicyTermsModalVisible(false);
              }}
              titleTextStyle={styles.understoodTxt}
              // loading={loading}
              // disabled={!licenseImage ? true : false}
            />
            <MainButton
              mainStyle={styles.understood}
              title={STRINGS.Button_Confirm}
              onPress={() => {
                setIsPolicyTermsModalVisible(false);
                setCreditCardDetail({
                  cardType: localCardType,
                  cardNumber: cardNumber.value,
                  cvv: cvv.value,
                  date: moment(date.value).format('YYYY-MM-DD'),
                });
                console.log('LOCALLL CARD ',localCardType)
                // console.log(this)
                navigation.navigate(CONSTANTS.SUMMARY_OF_CHARGES);
              }}
              titleTextStyle={styles.understoodTxt}
              // loading={loading}
              // disabled={!licenseImage ? true : false}
            />
          </View>
        </View>
      </Modal>
    );
  };
  const onAddNowPress = () => {
    const cardNumberError = checkValidate(
      REGEX.creditCardNumber,
      cardNumber.value,
      addCreditCard.addCardNumberInputLabel,
    );

    const dateError = checkValidate(
      REGEX.isNonEmpty,
      date.value,
      addCreditCard.addCardExipryInputLabel,
    );

    const cvvError = checkValidate(
      REGEX.cvvRegex,
      cvv.value,
      addCreditCard.addCardCVVInputLabel,
    );

    const cardHolderError = checkValidate(
      REGEX.username,
      cardHolderName.value,
      addCreditCard.addCardCardHolderNameLabel,
    );
    console.log(
      'cardNumberError || dateError || cvvError || cardHolderError',
      cardNumber.value.trim().length,
      cardNumberError,
      dateError,
      cvvError,
      cardHolderError,
    );

    if (cardNumberError || dateError || cvvError || cardHolderError) {
      setCardNumber({...cardNumber, error: cardNumberError});
      setDate({...date, error: dateError});
      setCVV({...cvv, error: cvvError});
      setCardHolderName({...cardHolderName, error: cardHolderError});
      return;
    }

    if (!cardNumber.value.trim().length) {
      setCardNumber({...cardNumber, error: cardNumberError});
      return;
    }
    if (cardNumber.value.trim().length < 16) {
      setCardNumber({...cardNumber, error: cardNumberError});
      return;
    }
    setIsPolicyTermsModalVisible(true);
  };

  return (
    // <View style={styles.container}>
    <TouchableOpacity
      activeOpacity={1}
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: responsivePixels.size20,
      }}
      onPress={() => Keyboard.dismiss()}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={responsivePixels.size82}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.addCardDetail} numberOfLines={1}>
            {addCreditCard.addCardDetail}
          </Text>

          <FastImage
            source={IMAGES.ic_creaditCard}
            style={styles.creditCardImage}
            resizeMode="contain"
          />

          <View style={{marginTop: responsivePixels.size30}}>
            <CreditCardInput
              errorColor={'red'}
              labelColor={'#ddd'}
              focusColor={'#1c32a0'}
              defaultBorderColor={'#ddd'}
              placeholder={STRINGS.addCreditCard.addCardNumberInputLabel}
              label={STRINGS.addCreditCard.addCardNumberInputLabel}
              // focus={focusCardNum}
              touched={true}
              updateTextVal={t => {
                console.log('updateTextValt', t);

                setCardNumber({value: t, error: ''});
              }}
              onChangeText={t => {

                console.log('onChangeText TYPEEE', t);
                // updateText(t);
                // numberWithSpace(cardNum), type
              }}
              setLocalCardType={setLocalCardType}
              // onFocus={() => setFocusCardNum(true)}
              labelStyle={{
                // fontWeight: '400',
                // backgroundColor: 'red',
                marginLeft: 0,
                ...common.font_13_15_23_RM,
                fontWeight: '500',
                color: COLORS.mediumGray,
              }}
              inputWrapStyle={
                {
                  // backgroundColor: 'red',
                }
              }
              placeholderTextColor={'#ccc'}
              // value={cardValue}
              // defaultValue={cardValue}
              inputStyle={{
                // color: '#333',
                // fontWeight: 'bold',
                ...common.font_13_15_23_RM,
                fontWeight: '500',
                color: COLORS.mediumGray,
              }}
              value={cardNumber.value}
              error={cardNumber.error}
            />
          </View>

          <View style={styles.inputView}>
            <TouchableOpacity
              style={[styles.dateInputBtn]}
              onPress={() => setOpen(true)}>
              <InputBox
                pointerEvents='none'
                // selectTextOnFocus={false}
                inputHeader={addCreditCard.addCardExipryInputLabel}
                // value={date.value != null ? formatDate(date.value) : ''}
                value={date.value != null ? formatDate(date.value) : ''}
                editable={false}
                onChangeText={(txt: any) => setDate({value: txt, error: ''})}
                placeholder={addCreditCard.expityDatePlaceholder}
                viewStyle={styles.inputBoxView}
                rightIcon={IMAGES.ic_calendar}
                onRightIconPress={() => setOpen(true)}
                onInputPress={() => setOpen(true)}
                // inputStyle={
                //   date.value != null ? styles.expiryText : styles.selectText
                // }
                // style={{backgroundColor:'red'}}
                isError={date.error}
                errorMesage={date.error}
              />
            </TouchableOpacity>

            <InputBox
              titleImage={IMAGES.ic_info}
              imageStyle={styles.titleImageStyle}
              inputHeader={addCreditCard.addCardCVVInputLabel}
              value={cvv.value}
              maxLength={CONSTANTS.CVV_MAX_LENGTH}
              onChangeText={(txt: any) => setCVV({value: txt, error: ''})}
              placeholder={addCreditCard.addCardCVVInputLabel}
              keyboardType="number-pad"
              secureTextEntry={true}
              viewStyle={[styles.cvvInputBoxView]}
              isError={cvv.error}
              errorMesage={cvv.error}
            />
          </View>

          <InputBox
            inputHeader={addCreditCard.addCardCardHolderNameLabel}
            value={cardHolderName.value}
            onChangeText={(txt: any) =>
              setCardHolderName({value: txt, error: ''})
            }
            placeholder={addCreditCard.addCardInputPlaceholder}
            viewStyle={styles.cardHolderInputBoxView}
            keyboardType="name-phone-pad"
            isError={cardHolderName.error}
            errorMesage={cardHolderName.error}
          />

          <View style={styles.footerView}>
            <MainButton
              title={btnAddNow}
              titleTextStyle={styles.addNowBtnTitle}
              mainStyle={styles.addNowBtn}
              onPress={() => onAddNowPress()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {TermsPolicyModal()}
      {open && (
        <MonthPicker
          onChange={onValueChange}
          value={date.value || new Date()}
          minimumDate={new Date()}
          // maximumDate={new Date()}
          locale="en"
          mode="number"
        />
      )}
    </TouchableOpacity>
    // </View>
  );
};

export default AddCreditCardScreen;
