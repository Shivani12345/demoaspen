import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {IContext} from 'interfaces/common';
import {getLanguage, getTheme} from 'utils/asyncStorage';
import {toastRef, ContextData} from 'components/globalContext/globalContext';

import NoInternet from 'components/noInternet';
import CONSTANTS from 'common/constants';
import STRINGS from 'common/strings';
import Loader from 'components/loader';
import Toast from 'components/toast';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

interface IProps {
  stackName: string;
}

const RootNavigation = (props: IProps) => {
  const {stackName} = props;

  const context: IContext = useContext(ContextData);
  const {
    theme,
    signInContext: {signInResponse},
    commonContext: {isOffline, setDarkMode, setLanguage, language},
  } = context;

  const [loading, setLoading] = useState(true);
  const [stack, setStack] = useState<undefined | string>(stackName);

  useEffect(() => {
    const init = async () => {
      let language = await getLanguage();
      console.log('language', language);

      language = language ?? CONSTANTS.ENGLISH;
      console.log('language', language);

      STRINGS.setLanguage(language);
      setLanguage(language);

      const themeMode = await getTheme();
      setDarkMode(themeMode === CONSTANTS.THEME_DARK);
      setLoading(false);
    };

    init();
  }, []);

  useEffect(() => {
    if (signInResponse?.token) {
      setStack(CONSTANTS.APP_STACK);
    }
    console.log('stack', stack);

    if (
      signInResponse !== undefined &&
      Object.keys(signInResponse)?.length === 0
    ) {
      setStack(CONSTANTS.AUTH_STACK);
    }
  }, [signInResponse]);

  return (
    <NavigationContainer>
      {/* {stack === CONSTANTS.APP_STACK && <AuthStack theme={theme} />} */}
      {stack === CONSTANTS.APP_STACK && <AppStack theme={theme} />}
      {loading && <Loader overScreen={true} />}
      {/* {isOffline && <NoInternet />} */}
      {/* <Toast ref={toastRef} /> */}
      <Toast ref={toastRef} />
    </NavigationContainer>
  );
};

export default RootNavigation;
