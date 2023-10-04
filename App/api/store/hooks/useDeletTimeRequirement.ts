import firestore from '@react-native-firebase/firestore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import auth from '@react-native-firebase/auth';

function deleteRequirement({ requireId }: { requireId: string }) {
  const users = firestore().collection('users');
  const userId = auth().currentUser?.uid;

  const storeRef = users.doc(userId).collection('request').doc(requireId);
  return storeRef.delete();
}

export const useDeletRequirement = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteRequirement, {
    onSuccess: () => queryClient.invalidateQueries(['requestPersonal'])
  });
};
