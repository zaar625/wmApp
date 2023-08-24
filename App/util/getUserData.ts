import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
  try {
    const value = await AsyncStorage.getItem('user');
    const data = value != null ? value : null;

    return data;
  } catch (e) {
    // error reading value
  }
};
