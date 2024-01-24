import React, {FunctionComponent, useContext} from 'react';
import {RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {IContext, ITheme} from 'interfaces/common';

import CONSTANTS from 'common/constants';
import Header from 'components/header';

import STRINGS from 'common/strings';

import ContactDetailsScreen, {
  IRenterDetail,
  ISecondContactDetail,
} from 'screens/contactDetails/ContactDetailsScreen';
import ScanCreditCard from 'screens/scanCreditCard';
import ScanLicense from 'screens/scanLicense';
import AddCreditCardScreen from 'screens/addCreditCard';
import EditSecondContactDetailScreen from 'screens/editSecondContactDetail';
import EditRenterContactDetailScreen from 'screens/editRenterContactDetail';
import SecondContactInfoScreen from 'screens/secondContactInfo';
import ContactInfoScreen from 'screens/contactInfo';
import SignAgreement from 'screens/signAgreement';
import SummaryOfCharges from 'screens/summaryOfCharges';
import PaymentScreen from 'screens/paymentScreen';
import {ContextData} from 'components/globalContext/globalContext';
import InsurancePlanScreen from 'screens/insurancePlan';
import StorageSpaceSelectionScreen from 'screens/StorageSpaceSelection';
import RentNowScreen from 'screens/rentNow';
import ChooseLocationScreen from 'screens/chooseLocation';

interface IProps {
  theme: ITheme;
}

export type AppStackParamList = {
  RentNowScreen: undefined;
  ChooseLocationScreen: undefined;
  InsurancePlanScreen: undefined;
  StorageSpaceSelectionScreen: undefined;
  ScanLicense: undefined;
  ScanCreditCard: undefined;
  SignAgreement: undefined;
  PaymentScreen: undefined;
  SummaryOfCharges: undefined;
  ContactInfoScreen: undefined;
  SecondContactInfoScreen: undefined;
  ContactDetailsScreen: {
    updateRenterData: IRenterDetail;
    updateSecondContactData: ISecondContactDetail;
  };
  EditRenterContactDetailScreen: {renterDetail: IRenterDetail};
  EditSecondContactDetailScreen: {secondContactDetail: ISecondContactDetail};
  AddCreditCardScreen: undefined;
};

export type RootRouteProps<RouteName extends keyof AppStackParamList> =
  RouteProp<AppStackParamList, RouteName>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: FunctionComponent<IProps> = props => {
  const {theme} = props;

  const context: IContext = useContext(ContextData);
  const {
    commonContext: {
      darkMode,
      setDarkMode,
      language,
      setLanguage,
      signInsurance,
      setSignInsurance,
    },
  } = context;

  return (
    <Stack.Navigator
      initialRouteName={CONSTANTS.RENT_NOW_SCREEN}
      screenOptions={() => ({
        header: props => <Header {...props} theme={theme} />,
        animation: 'slide_from_right',
        animationDuration: 250,
      })}>
      <Stack.Screen
        name={CONSTANTS.RENT_NOW_SCREEN}
        component={RentNowScreen}
        options={() => ({headerShown: false})}
      />
      <Stack.Screen
        name={CONSTANTS.CHOOSE_LOCATION_SCREEN}
        component={ChooseLocationScreen}
        options={() => ({headerShown: false})}
      />

      <Stack.Screen
        name={CONSTANTS.STORAGE_SPACE_SELECTION_SCREEN}
        component={StorageSpaceSelectionScreen}
        options={() => ({headerShown: false})}
      />

      <Stack.Screen
        name={CONSTANTS.INSURANCE_PLAN_SCREEN}
        component={InsurancePlanScreen}
        options={() => ({
          headerShown: true,

          title: STRINGS.insurancePlan.screenHeader,
        })}
      />
      <Stack.Screen
        name={CONSTANTS.CONTACT_INFO_SCREEN}
        component={ContactInfoScreen}
        options={() => ({
          headerShown: true,
          title: STRINGS.contactInfo.screenHeader,
        })}
      />
      <Stack.Screen
        name={CONSTANTS.SECOND_CONTACT_INFO_SCREEN}
        component={SecondContactInfoScreen}
        options={() => ({
          headerShown: true,
          title: STRINGS.secondContactInfo.screenHeader,
        })}
      />
      <Stack.Screen
        name={CONSTANTS.CONTACT_DETAILS_SCREEN}
        component={ContactDetailsScreen}
        options={() => ({
          headerShown: true,
          title: STRINGS.contactDetails.screenHeader,
        })}
      />
      <Stack.Screen
        name={CONSTANTS.EDIT_RENTER_CONTACT_DETAIL_SCREEN}
        component={EditRenterContactDetailScreen}
        options={() => ({
          headerShown: true,
        })}
      />
      <Stack.Screen
        name={CONSTANTS.EDIT_SECOND_CONTACT_DETAIL_SCREEN}
        component={EditSecondContactDetailScreen}
        options={() => ({
          headerShown: true,
        })}
      />
      <Stack.Screen
        name={CONSTANTS.ADD_CREDIT_CARD_SCREEN}
        component={AddCreditCardScreen}
        options={() => ({
          headerShown: true,
          title: STRINGS.addCreditCard.screenHeader,
        })}
      />
      <Stack.Screen
        name={CONSTANTS.SCAN_LICENSE}
        component={ScanLicense}
        options={() => ({
          headerShown: true,
          title: STRINGS.scanLicense.scanLicense,
        })}
      />
      <Stack.Screen
        name={CONSTANTS.SCAN_CREDIT_CARD}
        component={ScanCreditCard}
        options={() => ({
          headerShown: true,
          title: STRINGS.scanCreditCards.scanCreditCard,
          showRight: true,
        })}
      />
      <Stack.Screen
        name={CONSTANTS.SIGN_AGREEMENT}
        component={SignAgreement}
        options={() => ({
          headerShown: true,
          title: STRINGS.signAgreements.signAgreement,
        })}
      />
      <Stack.Screen
        name={CONSTANTS.SUMMARY_OF_CHARGES}
        component={SummaryOfCharges}
        options={() => ({
          headerShown: true,
          title: STRINGS.summaryofCharge.summaryofCharges,
        })}
      />
      <Stack.Screen
        name={CONSTANTS.PAYMENT_SCREEN}
        component={PaymentScreen}
        options={() => ({
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
