import {toastRef} from 'components/globalContext/globalContext';
import React, {useState, useCallback, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import Cardscan from 'react-native-cardscan';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [compatible, setCompatible] = useState(null);
  const [card, setCard] = useState(null);
  const [recentAction, setRecentAction] = useState('none');

  const scanCard = useCallback(async () => {
    const {action, scanId, payload, canceledReason} = await Cardscan.scan();
    setRecentAction(action);
    if (action === 'scanned') {
      var issuer = payload.issuer || '??';
      if (issuer === 'MasterCard') {
        issuer = 'master-card';
      } else if (issuer === 'American Express') {
        issuer = 'american-express';
      } else {
        issuer = issuer.toLowerCase();
      }
      console.log('CARFDDDFDF_____+++++', payload);
      // {"cardholderName": null, "cvc": null, "error": null, "expiryDay": null, "expiryMonth": null,
      // "expiryYear": null, "issuer": "MasterCard", "number": "5456134525427121"}
      // { expiryYear: '23',
      // expiryMonth: '12',
      // cardholderName: 'VIJAY KUMAR',
      // number: '4321012345676901' }
      setCard({
        number: payload.number,
        expiryDay: payload.expiryDay || '',
        expiryMonth: payload.expiryMonth || '??',
        expiryYear: payload.expiryYear || '??',
        issuer: issuer,
        cvc: payload.cvc || '??',
        cardholderName: payload.cardholderName || '??',
        error: payload.error || '',
      });

      toastRef.current.success('Card Successfully Scanned');
    }

    if (action === 'canceled') {
      if (canceledReason === 'enter_card_manually') {
        toastRef.current.error('Enter card manually');
      }

      if (canceledReason === 'user_canceled') {
        toastRef.current.error('User canceled scan');
      }

      if (canceledReason === 'camera_error') {
        toastRef.current.error('Camera error during scan');
      }

      if (canceledReason === 'fatal_error') {
        toastRef.current.error('Processing error during scan');
      }

      if (canceledReason === 'unknown') {
        toastRef.current.error('Unknown reason for scan cancellation');
      }
    }
  }, [setCard, setRecentAction]);

  const checkCompatible = useCallback(async () => {
    const isCompatible = await Cardscan.isSupportedAsync();
    setCompatible(isCompatible);
  }, [setCompatible]);

  useEffect(() => {
    const init = async () => {};

    init().finally(async () => {
      SplashScreen.hide();
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);
  useEffect(() => {
    console.log('tesssttt');

    checkCompatible();
  }, []);

  return (
    <SafeAreaView>
      {compatible && (
        <Text style={styles.textcard}>Recent action: {recentAction}</Text>
      )}
      {compatible && (
        <TouchableOpacity onPress={scanCard}>
          <Text style={styles.textcard}>Scan card</Text>
        </TouchableOpacity>
      )}
      {/* {card && ( */}
      <View
        style={{
          margin: 20,
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'center',
        }}>
        {/* <Text style={styles.textcard}>
          {card.number}{' '}
          {`${card.expiryMonth.padStart(2, '0')}/${card.expiryYear.slice(-2)}`}
        </Text> */}
        {/* <CardView
            number={card.number}
            expiry={`${card.expiryMonth.padStart(
              2,
              '0',
            )}/${card.expiryYear.slice(-2)}`}
            brand={card.issuer.toLowerCase()}
            name={card.cardholderName}
            cvc={card.cvc}
          /> */}
      </View>
      {/* )} */}
    </SafeAreaView>
  );
};

// import React, {useEffect, useState} from 'react';
// import SplashScreen from 'react-native-splash-screen';

// import RootNavigation from 'navigations/RootNavigation';
// import GlobalContext from 'components/globalContext';
// import CONSTANTS from 'common/constants';

// import {getToken} from 'utils/asyncStorage';

// const App = () => {
//   const [stackName, setStackName] = useState<undefined | string>(undefined);

//   useEffect(() => {
//     const init = async () => {
//       // do multiple sync or async tasks
//       const authToken = await getToken();
//       if (authToken) {
//         setStackName(CONSTANTS.APP_STACK);
//       } else {
//         setStackName(CONSTANTS.APP_STACK);
//       }
//     };

//     init().finally(async () => {
//       SplashScreen.hide();
//       console.log('Bootsplash has been hidden successfully');
//     });
//   }, []);

//   return (
//     <GlobalContext>
//       {stackName !== undefined && <RootNavigation stackName={stackName} />}
//     </GlobalContext>
//   );
// };
const styles = StyleSheet.create({
  textcard: {fontSize: 15, textAlign: 'center'},
});
export default App;
