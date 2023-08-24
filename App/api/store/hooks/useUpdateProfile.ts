import { useMutation } from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

async function updateUserProfile(data: any) {
  const user = auth().currentUser;

  if (user !== null) {
    const userCollection = firestore().collection('users').doc(user.uid);
    userCollection.update(data);

    auth().currentUser?.updateProfile({
      displayName: data.name,
      photoURL: data.photoURL
    });
  }
}

export const useUpdateProfile = () => {
  return useMutation({ mutationFn: updateUserProfile });
};
