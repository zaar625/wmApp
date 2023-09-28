import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceheight } = Dimensions.get('window');

const colors: any = {
  light: {
    primary: '#EFEFEF',
    secondary: '#FFF',
    tertiary: '#',
    subTint: '#454545',
    tint: '#000',
    card: '#F2F3F5',
    pressIcon: '#5C6269',
    main: '#326273',
    refresh: '#D4D4D4'
  },
  dark: {
    primary: '#101012',
    secondary: '#191A1E',
    tertiary: '#',
    subTint: '#868787',
    tint: '#fff',
    card: '#25252B',
    pressIcon: '#BAC0CE',
    refresh: '#BDBDBD',
    main: '#326273'
  }
};

const fontSizes = {
  title: 24
};

const fontWeight = {
  bold: '700' //semibold
};

export { colors, fontSizes, deviceWidth, deviceheight, fontWeight };
