import { useQuery } from '@tanstack/react-query';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export async function fetchStoreList() {
  const userID = auth().currentUser;
  const users = firestore().collection('users');
  const storeList: any = [];

  try {
    const storeRef = await users.doc(userID?.uid).collection('storeList').get();
    storeRef.forEach(data => {
      storeList.push(data.data());
    });

    return storeList;
  } catch (e) {
    console.log(e);
  }
}

export const useMyStoreList = () => {
  return useQuery(['myStoreList'], fetchStoreList, {});
};
