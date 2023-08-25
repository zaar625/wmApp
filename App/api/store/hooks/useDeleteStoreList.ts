import firestore from '@react-native-firebase/firestore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
const users = firestore().collection('users');

function deleteStore({ storeId }: any) {
  const storeRef = users.doc('DMWrTCluLrhJMrI01BVhJK6byFs1').collection('storeList').doc(storeId);

  return storeRef.delete();
}

export const useDeletStore = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteStore, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myStoreList'] });
    }
  });
};
