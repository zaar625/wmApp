import firestore from '@react-native-firebase/firestore';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { closeBottomSheet } from '../../../state/slice/bottomSheet';

const storeCollection = firestore().collection('store');

function deleteShare({ storeId, logId }: any) {
  const logRef = storeCollection.doc(storeId).collection('log').doc(logId);

  return logRef.delete();
}

export const useDeletShare = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteShare, {});
};
