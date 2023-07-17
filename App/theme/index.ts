import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceheight } = Dimensions.get('window');

const colors = {
  light: {
    primary: '#',
    secondary: '#',
    tertiary: '#',
    tint: '#fff'
  },
  dark: {
    primary: '#30394B',
    secondary: '#',
    tertiary: '#',
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
