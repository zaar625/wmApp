import { useMutation } from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';

const personalRequestCollection = firestore()
  .collection('users')
  .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
  .collection('request');

function addPersonalWorkHistoryEditList({ data }: any) {
  return personalRequestCollection.add(data);
}

export const useAddPersonalWorkHistoryEdit = () => {
  return useMutation({ mutationFn: addPersonalWorkHistoryEditList });
};
