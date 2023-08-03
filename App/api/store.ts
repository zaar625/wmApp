import { usersCollection } from './users';
import firestore from '@react-native-firebase/firestore';

const storeList = firestore().collection('store');
const users = firestore().collection('users');

export async function searchStore(storeId: string) {
  try {
    const docSnapshot = await storeList.doc(storeId).get();
    const isData = docSnapshot.exists;

    return isData;
  } catch (error) {
    console.error('Error fetching store data:', error);

    return false;
  }
}

export async function addStore(storeId: string, userId: string) {
  const storeListRef = await storeList.doc(storeId).get();
  const storeInfo = storeListRef.data();

  if (storeInfo) {
    usersCollection.doc(userId).collection('storeList').doc(storeId).set(storeInfo);
  }
}

export async function myStoreList() {
  const storeList: any = [];

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

export function deleteStore(id: string) {
  const storeRef = users.doc('DMWrTCluLrhJMrI01BVhJK6byFs1').collection('storeList').doc(id);

  return storeRef.delete();
}
