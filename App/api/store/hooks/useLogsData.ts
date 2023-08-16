import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useQuery } from '@tanstack/react-query';

// 함수를 비동기로 정의
export const fetchAndMergeLogs = async () => {
  // 1. 내가 등록한 스토어 리스트를 인자로 받아옵니다.
  const storeList = ['ItGwR9Tj8BNlgxR37Nrp', 'lFddsTVznYG9ZNstQYo9'];
  const mergedLogs = [];

  for (const store of storeList) {
    const storeId = store; // 동적으로 가져온 매장 ID
    const logSnapshot = await firestore()
      .collection('store')
      .doc(storeId)
      .collection('log')
      .orderBy('createAt', 'desc')
      .get();

    mergedLogs.push(...logSnapshot.docs);
  }

  // 가져온 로그를 하나의 배열로 합침

  // 로그를 시간순으로 정렬
  mergedLogs.sort((a, b) => {
    const aTimestamp = a.data().createAt.toMillis();
    const bTimestamp = b.data().createAt.toMillis();
    return bTimestamp - aTimestamp;
  });

  // 정렬된 로그를 출력하거나 화면에 표시

  return mergedLogs;
};

export const useTotalLogsData = () => {
  return useQuery(['total-logs'], fetchAndMergeLogs, {});
};

// 함수 호출
