import { useMutation } from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';

async function editLog(data: any) {
  const { store, id } = data;

  const storeLogRef = firestore().collection('store').doc(store.id).collection('log').doc(id);

  const findShareLogDoc = firestore()
    .collection('users')
    .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
    .collection('shareLog')
    .where('id', '==', id);

  const shareLogDoc = await findShareLogDoc.get();

  if (!shareLogDoc.empty) {
    shareLogDoc.docs[0].ref.update(data);
  }

  await storeLogRef.update(data);
}

export const useEditLog = () => {
  return useMutation({ mutationFn: editLog });
};
