import { useMutation, useQueryClient } from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';

const personalRequestCollection = firestore()
  .collection('users')
  .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
  .collection('request');

function addPersonalWorkHistoryEditList({ data }: any) {
  return personalRequestCollection.doc(data.id).set(data);
}

export const useAddPersonalWorkHistoryEdit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPersonalWorkHistoryEditList,
    onSuccess: () => queryClient.invalidateQueries(['requestPersonal'])
  });
};
