/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ITheme} from 'interfaces/common';

// import CONSTANTS from 'common/constants';
import Header from 'components/header';

// import LandingScreen from 'screens/landing';
// import SignInScreen from 'screens/signIn';
// import SignUpScreen from 'screens/signUp';
// import ForgotPasswordScreen from 'screens/forgotPassword';

const Stack = createNativeStackNavigator();

interface IProps {
  theme: ITheme;
}

const MainStack = (props: IProps) => {
  const {theme} = props;

  return (
    <Stack.Navigator
      // initialRouteName={CONSTANTS.LANDING_SCREEN}
      screenOptions={() => ({
        header: props => <Header {...props} theme={theme} isAuthStack={true} />,
      })}>
      {/* <Stack.Screen name={CONSTANTS.LANDING_SCREEN} component={LandingScreen} options={() => ({ headerShown: false })} />
      <Stack.Screen name={CONSTANTS.SIGN_IN_SCREEN} component={SignInScreen} options={{ title: 'Sign In' }} />
      <Stack.Screen name={CONSTANTS.SIGN_UP_SCREEN} component={SignUpScreen} options={{ title: 'Sign Up' }} />
      <Stack.Screen name={CONSTANTS.FORGOT_PASSWORD_SCREEN} component={ForgotPasswordScreen} options={{ title: 'Forgot Password' }} /> */}
    </Stack.Navigator>
  );
};

export default MainStack;
