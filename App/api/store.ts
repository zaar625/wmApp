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

export function deleteStore(id: string) {
  const storeRef = users.doc('DMWrTCluLrhJMrI01BVhJK6byFs1').collection('storeList').doc(id);

  return storeRef.delete();
}
