import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

export const setThemeMode = async (value: string) => {
  try {
    if (value) {
      await AsyncStorage.setItem('theme', value);
    }
  } catch (e) {
    // saving error
  }
};

export const getThemeMode = async () => {
  try {
    const value = await AsyncStorage.getItem('theme');

    if (value === 'system') {
      const colorScheme = Appearance.getColorScheme();

      return colorScheme;
    }

    return value;
  } catch (e) {
    // error reading value
  }
};
