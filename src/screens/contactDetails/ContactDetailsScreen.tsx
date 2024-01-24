import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {IContext} from 'interfaces/common';

import STRINGS from 'common/strings';
import CONSTANTS from 'common/constants';
import IMAGES from 'common/images';
import COLORS from 'common/colors';

import {ContextData} from 'components/globalContext/globalContext';
import CustomImage from 'components/customImage';
import MainButton from 'components/button';

import {AppStackParamList} from 'navigations/AppStack';

import STYLES from './ContactDetails.styles';

import {
  ConvertEmptyString,
  formatNumber,
  formatPhoneNumber,
  isNullValue,
} from 'utils/functions';
import responsivePixels from 'utils/responsivePixels';
import common from 'common/common.styles';

interface IProps {
  navigation: StackNavigationProp<AppStackParamList, 'ContactDetailsScreen'>;
  route: RouteProp<AppStackParamList, 'ContactDetailsScreen'>;
}

export interface IRenterDetail {
  renterName: string | any;
  renterAddress: string | any;
  renterPhone: number | any;
  renterEmail: string | any;
  renterBillingAddress: string | any;
}

export interface ISecondContactDetail {
  secondContactName: string | any;
  secondContactPhone: number | any;
  secondContactEmail: string | any;
  secondContactInsurance: string | any;
  sizeType: string | any;
}

const ContactDetailsScreen: FunctionComponent<IProps> = props => {
  const {navigation} = props;
  const {contactDetails, btnNext} = STRINGS;

  const [contactInfoDetails, setContactInfoDetails] = useState(
    props.route?.params?.contactInfoData,
  );

  const updateSecondContactDetails =
    props.route.params?.updateSecondContactData;

  const context: IContext = useContext(ContextData);
  const {
    theme,
    commonContext: {
      storageSize,
      insurance,
      setInfoData,
      documentImg,
    },
  } = context;
  const styles = STYLES(theme);

  useEffect(() => {
    let contactInfoDetails = ConvertEmptyString(
      props.route.params.contactInfoData,
    );
    contactInfoDetails = {...contactInfoDetails, id_proof_image: documentImg};
    setContactInfoDetails(contactInfoDetails);
    setInfoData(contactInfoDetails);

    console.log('sfsdfhdsfds', contactInfoDetails);

  }, [props.route.params.contactInfoData]);

  console.log('storageSize--', storageSize);
  console.log('insurance', insurance);

  const RenterCard = ({
    onEditPress,
  }: any) => {
    return (
      <View style={styles.renterCardView}>
        <View style={styles.cardNameView}>
          <View style={{flex: 1}}>
            <Text style={styles.cardLabel}>
              {contactDetails.renterNameLabel}
            </Text>
            <Text style={styles.cardValue}>
              {contactInfoDetails?.renter_first_name +
                ' ' +
                contactInfoDetails?.renter_last_name}
            </Text>
          </View>

          <CustomImage
            source={IMAGES.ic_edit}
            containerStyle={{paddingHorizontal: responsivePixels.size20}}
            imageStyle={styles.cardEditImage}
            onPress={onEditPress}
            resizeMode={'contain'}
          />
        </View>
        {isNullValue(contactInfoDetails?.renter_address_line_1) && (
          <View style={styles.cardTextView}>
            <Text style={styles.cardLabel}>
              {contactDetails.renterAddressLabel}
            </Text>
            <Text style={styles.cardValue}>
              {isNullValue(contactInfoDetails?.renter_address_line_1)}
            </Text>
          </View>
        )}
        <View style={styles.cardTextView}>
          <Text style={styles.cardLabel}>
            {contactDetails.renterPhoneLabel}
          </Text>
          <Text style={styles.cardValue}>
            {formatPhoneNumber(contactInfoDetails?.renter_phone)}
          </Text>
        </View>

        <View style={styles.cardTextView}>
          <Text style={styles.cardLabel}>
            {contactDetails.renterEmailLabel}
          </Text>
          <Text style={styles.cardValue}>
            {contactInfoDetails?.renter_email}
          </Text>
        </View>

        <View style={styles.cardTextView}>
          <Text style={styles.cardLabel}>
            {contactDetails.renterBillingAddressLabel}
          </Text>
          <Text style={styles.cardValue}>
            {contactInfoDetails?.billing_address}
          </Text>
        </View>
      </View>
    );
  };

  const SecondContactCard = ({onEditPress}: any) => {
    return (
      <View style={styles.secondContactCardView}>
        <View style={styles.cardNameView}>
          <View style={{flex: 1}}>
            <Text style={styles.cardLabel}>
              {contactDetails.secondContactNameLabel}
            </Text>
            <Text style={styles.cardValue}>
              {contactInfoDetails?.secondary_contact_first_name +
                ' ' +
                contactInfoDetails?.secondary_contact_last_name}
            </Text>
          </View>

          <CustomImage
            source={IMAGES.ic_edit}
            imageStyle={styles.cardEditImage}
            onPress={onEditPress}
            containerStyle={{paddingHorizontal: responsivePixels.size20}}
          />
        </View>

        <View style={styles.cardTextView}>
          <Text style={styles.cardLabel}>
            {contactDetails.secondContactPhoneLabel}
          </Text>
          <Text style={styles.cardValue}>
            {formatPhoneNumber(contactInfoDetails?.secondary_contact_phone)}
          </Text>
        </View>

        <View style={styles.cardTextView}>
          <Text style={styles.cardLabel}>
            {contactDetails.secondContactEmailLabel}
          </Text>
          <Text style={styles.cardValue}>
            {contactInfoDetails?.secondary_contact_email}
          </Text>
        </View>
      </View>
    );
  };

  const ThirdContactCard = () => {
    return (
      <View style={styles.secondContactCardView}>
        <View>
          <Text
            style={{
              ...common.font_13_15_23_RM,
              fontWeight: '500',
              color: COLORS.mediumGray,
            }}>
            {contactDetails.unit}
          </Text>
          <Text style={styles.cardValue}>
            {contactDetails.size}: {storageSize?.storageSizeValue}
          </Text>
          <Text style={styles.cardValue}>{storageSize?.storagePerMonth}</Text>
        </View>
        <View style={{marginTop: responsivePixels.size15}}>
          <Text
            style={{
              ...common.font_13_15_23_RM,
              fontWeight: '500',
              color: COLORS.mediumGray,
            }}>
            {contactDetails.insurance}
          </Text>
          <Text style={styles.cardValue}>{insurance?.insurancePerMonth}</Text>
          <Text style={styles.cardValue}>{insurance?.coverages}</Text>
        </View>
      </View>
    );
  };

  const renterDetail: IRenterDetail = {
    renterName: contactInfoDetails?.renter_first_name,
    renterAddress: contactInfoDetails?.renter_address_line_1,
    renterPhone: contactInfoDetails?.renter_phone,
    renterEmail: contactInfoDetails?.renter_email,
    renterBillingAddress: contactInfoDetails?.billing_address,
  };

  const secondContactDetail: ISecondContactDetail = {
    secondContactName: contactInfoDetails?.secondary_contact_first_name,
    secondContactPhone: contactInfoDetails?.secondary_contact_phone,
    secondContactEmail: contactInfoDetails?.secondary_contact_email,
    secondContactInsurance:
      updateSecondContactDetails?.secondContactInsurance ||
      contactDetails.secondContactInsuranceValue,
    sizeType:
      updateSecondContactDetails?.sizeType || contactDetails.sizeTypeValue,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Text style={styles.contactDetails} numberOfLines={3}>
          {contactDetails.contactDetails}
        </Text>

        <RenterCard
          renterNameValue={contactDetails.renterNameValue}
          renterAddressValue={contactDetails.renterAddressValue}
          renterPhoneValue={contactDetails.renterPhoneValue}
          renterEmailValue={contactDetails.renterEmailValue}
          renterBillingAddressValue={contactDetails.renterBillingAddressValue}
          onEditPress={() => {
            navigation.navigate(CONSTANTS.EDIT_RENTER_CONTACT_DETAIL_SCREEN, {
              renterDetail: contactInfoDetails,
            });
          }}
        />

        <SecondContactCard
          secondContactNameValue={contactDetails.secondContactNameValue}
          secondContactPhoneValue={contactDetails.secondContactPhoneValue}
          secondContactEmailValue={contactDetails.secondContactEmailValue}
          secondContactInsuranceValue={
            contactDetails.secondContactInsuranceValue
          }
          sizeTypeValue={contactDetails.sizeTypeValue}
          onEditPress={() =>
            navigation.navigate(CONSTANTS.EDIT_SECOND_CONTACT_DETAIL_SCREEN, {
              secondContactDetail: contactInfoDetails,
            })
          }
        />

        <ThirdContactCard
          secondContactNameValue={contactDetails.secondContactNameValue}
          secondContactPhoneValue={contactDetails.secondContactPhoneValue}
          secondContactEmailValue={contactDetails.secondContactEmailValue}
          secondContactInsuranceValue={
            contactDetails.secondContactInsuranceValue
          }
          sizeTypeValue={contactDetails.sizeTypeValue}
        />
      </ScrollView>

      <MainButton
        title={btnNext}
        titleTextStyle={styles.footerButtonTitle}
        mainStyle={styles.footerButton}
        onPress={() => navigation.navigate(CONSTANTS.SCAN_CREDIT_CARD)}
      />
    </View>
  );
};

export default ContactDetailsScreen;
