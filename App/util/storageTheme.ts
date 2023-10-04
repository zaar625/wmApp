import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { ColorSchemeName } from 'react-native';

type TThemeMode = {
  mode: ColorSchemeName | string;
  system: boolean;
};

export const getStorageTheme = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('theme');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const setStorageTheme = async (value: TThemeMode) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('theme', jsonValue);
  } catch (e) {
    // saving error
  }
};
