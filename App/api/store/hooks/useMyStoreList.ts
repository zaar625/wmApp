import { useQuery } from '@tanstack/react-query';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

async function fetchStoreList() {
  console.log('리패치');
  const users = firestore().collection('users');
  const storeList: FirebaseFirestoreTypes.DocumentData[] = [];

  try {
    const storeRef = await users.doc('DMWrTCluLrhJMrI01BVhJK6byFs1').collection('storeList').get();
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
