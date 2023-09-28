import firestore from '@react-native-firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';

async function fetchRequestList() {
  const userID = auth().currentUser;

  const personalWorkHistoryRequestCollection = firestore()
    .collection('users')
    .doc(userID?.uid)
    .collection('request');

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
