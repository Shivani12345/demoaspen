import React from 'react';
import {View, Text, StatusBar, Platform, TouchableOpacity} from 'react-native';
import {DrawerHeaderProps} from '@react-navigation/drawer';

import {ITheme} from 'interfaces/common';

import CustomImage from 'components/customImage';
import CONSTANTS from 'common/constants';
import IMAGES from 'common/images';
import COLORS from 'common/colors';

import STYLES from './Footer.style';

import common from 'common/common.styles';
import FastImage from 'react-native-fast-image';
import STRINGS from 'common/strings';
import responsivePixels from 'utils/responsivePixels';
import {openPhone, openWithEmail, openWithPhone} from 'utils/functions';

interface IProps extends DrawerHeaderProps {
  // children?: JSX.Element | JSX.Element[] | undefined;
  // isAuthStack: boolean;
  theme: ITheme;
}

const Footer = (props: IProps) => {
  const {theme} = props;

  const styles = STYLES({...theme});

  return (
    <View style={styles.container}>
      <View style={styles.horizontalview} />
      <View style={styles.renderLeft}>
        <TouchableOpacity
          style={styles.rowView}
          onPress={() => openWithEmail(CONSTANTS.EMAIL_ID)}>
          <FastImage
            source={IMAGES.ic_sms}
            style={styles.leftIcon}
            // tintColor={COLORS.white}
            resizeMode="contain"
          />
          <Text style={styles.title}>{CONSTANTS.EMAIL_ID}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.rowView, {justifyContent: 'center'}]}
          onPress={() => openWithPhone(CONSTANTS.PHONE_NUMBER)}>
          <FastImage
            source={IMAGES.ic_phone}
            style={styles.leftIcon}
            // tintColor={COLORS.white}
            resizeMode="contain"
          />
          <Text style={styles.title}>{CONSTANTS.PHONE_NUMBER}</Text>
        </TouchableOpacity>
      </View>
      <View style={[{marginTop: responsivePixels.size4, flex: 1}]}>
        <Text
          style={{
            ...common.font_13_15_23_RR,
            fontWeight: '500',
            color: COLORS.white,
            textAlign: 'center',
          }}>
          © {new Date().getFullYear()}
          {STRINGS.copyrightFooter}
        </Text>
      </View>
    </View>
  );
};

const DefaultProps = {
  isAuthStack: false,
};

Footer.defaultProps = DefaultProps;

export default Footer;
