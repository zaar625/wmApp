import firestore from '@react-native-firebase/firestore';
import { useQuery } from '@tanstack/react-query';

const shareLogCollection = firestore()
  .collection('users')
  .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
  .collection('request');

async function fetchshareLogDate() {
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
