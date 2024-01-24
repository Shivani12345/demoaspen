import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import {IContext} from 'interfaces/common';
import {AppStackParamList} from 'navigations/AppStack';
import {useOrientation} from 'utils/useOrientation';
import responsivePixels from 'utils/responsivePixels';
import {formatNumber, openWithEmail, openWithPhone} from 'utils/functions';

import {ContextData} from 'components/globalContext/globalContext';
import CustomImage from 'components/customImage';
import MainButton from 'components/button';

import CONSTANTS from 'common/constants';
import COLORS from 'common/colors';
import IMAGES from 'common/images';
import STRINGS from 'common/strings';

import STYLES from './PaymentScreen.style';

interface IProps {
  navigation: StackNavigationProp<AppStackParamList, 'PaymentScreen'>;
}

const PaymentScreen = (props: IProps) => {
  const {navigation} = props;
  useEffect(() => {
    console.log('props 0-<>',props)
  },[]);
  const [paymentDetail, setPaymentDetail] = useState(props?.route?.params?.data)
  const {payment, btnFinishClickHere} = STRINGS;

  const isPortrait = useOrientation();
  const context: IContext = useContext(ContextData);
  const {
    theme,
  } = context;
  const styles = STYLES({...theme, isPortrait});


  return (
    <View style={styles.screenContainer}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={responsivePixels.size84}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.screenContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.screenContainer}>
          <View style={styles.paymentSuccessContainer}>
            <View>
              <FastImage
                source={IMAGES.ic_paymentSuccess}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.paymentSuccessText}>
                {payment.paymentSuccessful}
              </Text>
              <Text style={styles.paymentContentText}>
                {payment.paymentSuccessfulContent}
              </Text>
            </View>
          </View>

          <View style={styles.paymentItem}>
            <View
              style={[
                styles.unitNumber,
                {
                  height: responsivePixels.size210,
                  justifyContent: 'center',
                },
              ]}>
              <Text style={styles.unitNumberText}>Your Unit Number</Text>

              <Text style={styles.codeText}>{paymentDetail?.storage?.s_unit_name}</Text>

              <Text style={[styles.numberContent, {marginTop: 5}]}>
                {payment?.unitText}
              </Text>
            </View>

            <View style={styles.gateCode}>
              <Text style={styles.gateCodeText}>{payment.paymentGateCode}</Text>

              <Text style={styles.codeText}>{paymentDetail?.gate_code}</Text>
            </View>
          </View>

          <View style={styles.paymentItem}>
            <View style={styles.unitNumber}>
              <Text
                style={[
                  styles.unitNumberText,
                  {marginTop: responsivePixels.size25},
                ]}>
                Enter UNIT NUMBER Followed by '#' and GATE CODE Followed by '*'
                {/* {payment.directionhowtoget} */}
              </Text>

              <Text style={styles.numberContent}>
                Please enter this into the gate code box
                {/* {payment.enterNumberUnit} */}
              </Text>
              <Text style={styles.unitNumTxt}>{paymentDetail?.storage?.s_unit_name}#{paymentDetail?.gate_code}*</Text>
            </View>
          </View>

          <Text style={styles.contactInfo}>{payment.contactInfo}</Text>

          <View style={styles.infoContainer}>
            <View style={styles.callinfoContainer}>
              <View style={styles.contactNumberContainer}>
                <Text style={styles.callOnText}>{payment.callOn}</Text>
                <Text style={styles.contactNumber}>
                  {formatNumber(payment.number.toString())}
                </Text>
              </View>

              <CustomImage
                source={IMAGES.ic_call}
                imageStyle={styles.callIcon}
                containerStyle={styles.callIconContainer}
                onPress={() => openWithPhone(payment.number)}
              />
            </View>

            <CustomImage
              source={IMAGES.ic_divider}
              imageStyle={styles.dividerImg}
              tintColor={COLORS.skyBlue}
            />

            <View style={styles.emailInfo}>
              <View style={styles.emailConainer}>
                <Text style={styles.writeOnText}>{payment.writeOn}</Text>
                <Text style={styles.emailText}>{CONSTANTS.EMAIL_ID}</Text>
              </View>

              <CustomImage
                source={IMAGES.ic_sms}
                imageStyle={styles.callIcon}
                containerStyle={styles.callIconContainer}
                onPress={() => openWithEmail(CONSTANTS.EMAIL_ID)}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footerView}>
          <MainButton
            title={btnFinishClickHere}
            titleTextStyle={styles.footerButtonTitle}
            mainStyle={styles.footerButton}
            onPress={() =>
              props.navigation.reset({
                routes: [{name: CONSTANTS.RENT_NOW_SCREEN}],
              })
            }
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PaymentScreen;
