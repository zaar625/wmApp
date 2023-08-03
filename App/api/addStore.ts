import { usersCollection } from './users';
import firestore from '@react-native-firebase/firestore';

//.collection('storeList').doc(storeId);
//, storeId: string

const storeList = firestore().collection('store');

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
  const storeRef = await storeList.doc(storeId).get();
  const storeInfo = storeRef.data();

  if (storeInfo) {
    usersCollection.doc(userId).collection('storeList').doc(storeId).set(storeInfo);
  }
}
