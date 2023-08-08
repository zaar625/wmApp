import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('users');

export function createUser({ id, name, email, phone }: any) {
  return usersCollection.doc(id).set({
    id,
    name,
    email,
    phone
  });
}

export async function getUser(id: any) {
  const doc = await usersCollection.doc(id).get();

  return doc.data();
}
