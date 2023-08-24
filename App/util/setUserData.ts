import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const saveData = async (data: any) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (e) {
    // saving error
  }
  console.log('스토리지 저장');
};

export async function setUserData(id: string) {
  if (id) {
    const userCollection = firestore().collection('users').doc(id);

    const userProfileFiled = (await userCollection.get()).data();

    saveData(userProfileFiled);
  }
}
