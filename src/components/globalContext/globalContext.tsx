import React, {useState, useEffect, createRef} from 'react';
import NetInfo from '@react-native-community/netinfo';

import {theme, darkTheme} from 'common/theme';

import CONSTANTS from 'common/constants';
import {IContext} from 'interfaces/common';

export const toastRef = createRef<any>();

export const ContextData = React.createContext<IContext>(null);

const GlobalContext = (props: {children: any}) => {
  const {children} = props;

  // Common Context
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(CONSTANTS.ENGLISH);
  const [darkMode, setDarkMode] = useState(false);
  const [isOffline, setOfflineStatus] = useState(false);
  const [signInsurance, setSignInsurance] = useState<boolean>(false);
  const [insurance, setInsurance] = useState<any>();
  const [storageSize, setStorageSize] = useState<any>();
  const [infoData, setInfoData] = useState();
  const [licenseImg, setLicenseImg] = useState<string>('');
  const [documentImg, setDocumentImg] = useState<any>();
  const [isCheckedAddress, setIsCheckedAddress] = useState(false);
  const [creditCardDetail, setCreditCardDetail] = useState<any>();

  const commonContext = {
    loading,
    setLoading,
    language,
    setLanguage,
    infoData,
    setInfoData,
    darkMode,
    setDarkMode,
    isOffline,
    signInsurance,
    setSignInsurance,
    insurance,
    setInsurance,
    storageSize,
    setStorageSize,
    licenseImg,
    setLicenseImg,
    documentImg,
    setDocumentImg,
    isCheckedAddress, 
    setIsCheckedAddress,
    creditCardDetail,
    setCreditCardDetail
  };

  // SignIn Context
  const [signInResponse, setSignInResponse] = useState(undefined);

  const signInContext = {signInResponse, setSignInResponse};

  // SignUp Context
  const [signUpResponse, setSignUpResponse] = useState(undefined);

  const signUpContext = {signUpResponse, setSignUpResponse};

  // Forgot Password Context
  const [forgotPasswordResponse, setForgotPasswordResponse] =
    useState(undefined);

  const forgotPasswordContext = {
    forgotPasswordResponse,
    setForgotPasswordResponse,
  };

  // Change Password Context
  const [changePasswordResponse, setChangePasswordResponse] =
    useState(undefined);

  const changePasswordContext = {
    changePasswordResponse,
    setChangePasswordResponse,
  };

  // Handle Network State
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected /* && state.isInternetReachable */);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  const context = {
    theme: darkMode ? darkTheme : theme,
    commonContext,
    signInContext,
    signUpContext,
    forgotPasswordContext,
    changePasswordContext,
    signInsurance,
    isCheckedAddress,
    creditCardDetail
  };

  return (
    <ContextData.Provider value={context}>{children}</ContextData.Provider>
  );
};

export default GlobalContext;
