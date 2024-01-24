import COLORS from 'common/colors';
import common from 'common/common.styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tost: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    zIndex: 9999999,
    height: 60,
  },
  toastMsg: {
    ...common.font_16_20,
    marginLeft: 10,
    color: COLORS.white,
    fontWeight: 'bold',
  },

  container: {
    width: '90%',
    position: 'absolute',
    top: 40,
    minHeight: 40,
    backgroundColor: COLORS.green,
    zIndex: 1000,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    padding: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.27,
    elevation: 10,
  },
  message: {
    ...common.font_16_20,
    marginHorizontal: 10,
    paddingVertical: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
