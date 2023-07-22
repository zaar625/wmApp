import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceheight } = Dimensions.get('window');

const colors: any = {
  light: {
    primary: '#EFEFEF',
    secondary: '#fff',
    tertiary: '#',
    tint: '#000'
  },
  dark: {
    primary: '#30394B',
    secondary: '#202632',
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
