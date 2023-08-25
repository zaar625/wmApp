import firestore from '@react-native-firebase/firestore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';

function deleteRequirement({ requireId }: { requireId: string }) {
  console.log('requireId', requireId);

  const users = firestore().collection('users');
  const userId = auth().currentUser?.uid;

  const storeRef = users.doc(userId).collection('request').doc(requireId);
  return storeRef.delete();
}

export const useDeletRequirement = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteRequirement, {
    onSuccess: () => {
      // Invalidate and refetch
      console.log('삭제 성공');
      queryClient.invalidateQueries({ queryKey: ['request-personal'] });
    }
  });
};
