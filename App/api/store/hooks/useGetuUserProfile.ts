import firestore from '@react-native-firebase/firestore';
import { useQuery } from '@tanstack/react-query';

async function fetchUserProfile(id: any) {
  if (id) {
    const userCollection = firestore().collection('users').doc(id);

    const userProfileFiled = (await userCollection.get()).data();

    return userProfileFiled;
  }
}

export const useGetUserProfile = (id: any) => {
  return useQuery(['userProfile'], () => fetchUserProfile(id), {});
};
