import firestore from '@react-native-firebase/firestore';
import { usersCollection } from '../../users';

const storeList = firestore().collection('store');

export async function muTateaddStore({ storeId, userId }: any) {
  console.log(storeId, userId);
  const storeListRef = await storeList.doc(storeId).get();
  const storeInfo = storeListRef.data();

  if (storeInfo) {
    usersCollection.doc(userId).collection('storeList').doc(storeId).set(storeInfo);
  }
}
