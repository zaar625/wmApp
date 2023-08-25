import firestore from '@react-native-firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { TWorkData } from '../../../util/time';

const workHourCollection = firestore()
  .collection('users')
  .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
  .collection('workHour');

async function fetchWorkingDate(query: string): Promise<TWorkData[] | undefined> {
  const workHourRef = await workHourCollection.doc(query).get();
  const data = workHourRef.data();

  if (!data) {
    return;
  }

  return data.work;
}

export const useWorkingDate = (query: string) => {
  return useQuery(['work-date', query], () => fetchWorkingDate(query), {});
};
