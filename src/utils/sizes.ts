import { Dimensions } from 'react-native';
import deviceInfoModule from 'react-native-device-info';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

const SIZES = {
  deviceWidth: width,
  deviceHeight: height,
  isIPod: width < 350,
  isNotch: deviceInfoModule.hasNotch() || deviceInfoModule.hasDynamicIsland(),
  isTab: deviceInfoModule.isTablet(),

  //! Toaster Params
  tostHight: 1,
  tostBackHight: 0,
  tostTime: 3000,
};

export default SIZES;
