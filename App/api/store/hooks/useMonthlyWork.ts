import firestore from '@react-native-firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { TWorkData } from '../../../util/time';
import auth from '@react-native-firebase/auth';

async function fetchWorkingDate(query: string): Promise<TWorkData[] | undefined> {
  const userID = auth().currentUser;

  const workHourCollection = firestore()
    .collection('users')
    .doc(userID?.uid)
    .collection('workHour');

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
