import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import Styles from './NoInternet.style';

const NoInternet = (): JSX.Element => {

  const [showMessage, setShowMessage] = useState(true);

  const styles = Styles();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!showMessage) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{'No Internet Connection'}</Text>
    </View>
  );
};

export default NoInternet;
