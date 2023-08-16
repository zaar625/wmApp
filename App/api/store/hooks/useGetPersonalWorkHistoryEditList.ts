import firestore from '@react-native-firebase/firestore';
import { useQuery } from '@tanstack/react-query';

const personalWorkHistoryRequestCollection = firestore()
  .collection('users')
  .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
  .collection('request');

async function fetchRequestList() {
  const requestRef = await personalWorkHistoryRequestCollection.get();
  const logs = requestRef.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return logs;
}

export const useGetPersonalWorkHistoryEditList = () => {
  return useQuery(['request-personal'], fetchRequestList, {});
};
