import firestore from '@react-native-firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';

async function fetchshareLogDate() {
  const userID = auth().currentUser;

  const shareLogCollection = firestore()
    .collection('users')
    .doc(userID?.uid)
    .collection('shareLog');

  const shareLogRef = await shareLogCollection.get();
  const logs = shareLogRef.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return logs;
}

export const useShareLogDate = () => {
  return useQuery(['shareLog'], fetchshareLogDate, {});
};
