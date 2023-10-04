import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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

export function deleteStore(id: string) {
  const userID = auth().currentUser;
  const storeRef = users.doc(userID?.uid).collection('storeList').doc(id);

  return storeRef.delete();
}

export async function getStoreInfo(storeId: string) {
  try {
    const docSnapshot = await storeList.doc(storeId).get();

    return docSnapshot.data();
  } catch (error) {
    console.error('Error fetching store data:', error);

    return null;
  }
}
