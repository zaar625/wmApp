import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useQuery } from '@tanstack/react-query';

const workHourCollection = firestore()
  .collection('users')
  .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
  .collection('workHour');

async function fetchWorkingDate(
  query: string
): Promise<FirebaseFirestoreTypes.DocumentData | undefined> {
  const workHourRef = await workHourCollection.doc(query).get();
  const data = workHourRef.data();

  if (!data) {
    return undefined;
  }

  return data.work;
}

export const useWorkingDate = (query: string) => {
  return useQuery(['work-date'], () => fetchWorkingDate(query), {});
};
