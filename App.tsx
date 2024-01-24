import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';

import RootNavigation from 'navigations/RootNavigation';
import GlobalContext from 'components/globalContext';
import CONSTANTS from 'common/constants';

import {getToken} from 'utils/asyncStorage';

const App = () => {
  const [stackName, setStackName] = useState<undefined | string>(undefined);

  useEffect(() => {
    const init = async () => {
      // do multiple sync or async tasks
      const authToken = await getToken();
      if (authToken) {
        setStackName(CONSTANTS.APP_STACK);
      } else {
        setStackName(CONSTANTS.APP_STACK);
      }
    };

    init().finally(async () => {
      SplashScreen.hide();
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);

  return (
    <GlobalContext>
      {stackName !== undefined && <RootNavigation stackName={stackName} />}
    </GlobalContext>
  );
};

export default App;
