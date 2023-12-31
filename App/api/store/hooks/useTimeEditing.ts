import { useMutation } from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';

const storeList = firestore().collection('store');

function addTimeEditing({ storeId, data }: any) {
  const requestModifierCollection = storeList.doc(storeId).collection('requestModifierTime');

  return requestModifierCollection.doc(data.id).set(data);
}

export const useAddTimeEditing = () => {
  return useMutation({ mutationFn: addTimeEditing, mutationKey: ['timeEditToUser'] });
};
