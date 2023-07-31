import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceheight } = Dimensions.get('window');

const colors: any = {
  light: {
    primary: '#EFEFEF',
    secondary: '#FFF',
    tertiary: '#',
    subTint: '#454545',
    tint: '#000'
  },
  dark: {
    primary: '#30394B',
    secondary: '#202632',
    tertiary: '#',
    subTint: '#BAC0CE',
    tint: '#fff'
  },
  main: '#326273'
};

const fontSizes = {
  title: 24
};

const fontWeight = {
  bold: '700' //semibold
};

export { colors, fontSizes, deviceWidth, deviceheight, fontWeight };
