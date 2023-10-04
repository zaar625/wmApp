import { useMutation } from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';

async function addLog({ store, data }: any) {
  const shareLogCollection = firestore()
    .collection('users')
    .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
    .collection('shareLog')
    .doc();

  const storeLogCollection = firestore().collection('store').doc(store.id).collection('log').doc();

  try {
    await Promise.all([
      shareLogCollection.set({ ...data, id: storeLogCollection.id }),
      storeLogCollection.set({ ...data, id: storeLogCollection.id })
    ]);
  } catch {
    console.log('error');
  }
}

export const useAddLog = () => {
  return useMutation({ mutationFn: addLog, mutationKey: ['addLog'] });
};
