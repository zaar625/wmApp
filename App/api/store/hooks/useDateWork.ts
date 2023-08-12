import firestore from '@react-native-firebase/firestore';
import { useQuery } from '@tanstack/react-query';

const workHourCollection = firestore()
  .collection('users')
  .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
  .collection('workHour');

async function fetchWorkingDate(query: string) {
  const workHourRef = await workHourCollection.doc(query).get();

  return workHourRef.data()?.work;
}

export const useWorkingDate = (query: string) => {
  return useQuery(['work-date'], () => fetchWorkingDate(query), {});
};
