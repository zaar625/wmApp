import firestore from '@react-native-firebase/firestore';
import format from 'date-fns/format';
import { useMutation } from '@tanstack/react-query';
import uuid from 'react-native-uuid';

const workHourCollection = firestore()
  .collection('users')
  .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
  .collection('workHour');

//lFddsTVznYG9ZNstQYo9
//ItGwR9Tj8BNlgxR37Nrp

/**
 * 1. 근무이력(배열)에 날짜가 없습니다. -> 새로운 근태등록을 합니다.
 * 2. 근무이력(배열)에 날짜가 있습니다.
 *    ㄴ매장이 같을 경우 출근/퇴근 등록을 합니다.(업데이트)
 *    ㄴ매장이 다를 경우 새로운 근태 등록을 해야합니다.
 */

export const addWorkingTime = async ({ currentDate, attendanceType, storeInfo }: any) => {
  const storeCode = storeInfo.id;
  const today = format(currentDate, 'yyyy-MM-dd');
  const monthQuery = format(currentDate, 'yyyy-MM');

  const workHourRef = workHourCollection.doc(monthQuery);

  const workData = await workHourRef.get();

  const worksArray = await workData.data()?.work; // undefined || item[]

  if (worksArray) {
    //근무이력배열에 날짜가 있는지 판별
    const hasWorkDate = worksArray.some(
      (work: any) => format(work.date.toDate(), 'yyyy-MM-dd') === today
    );

    //근무이력배열에 출근한 기록(날짜)이 있으며, 해당 날짜에 동일한 매장인지 판별
    const hasStoreInworksArray = worksArray.some(
      (work: any) =>
        work.storeInfo.id === storeCode && format(work.date.toDate(), 'yyyy-MM-dd') === today
    );

    if (hasWorkDate && hasStoreInworksArray) {
      const updateWorkArray = worksArray.map((worksItem: any) => {
        if (
          worksItem.storeInfo.id === storeCode &&
          today === format(worksItem.date.toDate(), 'yyyy-MM-dd')
        ) {
          return {
            ...worksItem,
            [attendanceType]: new Date()
          };
        }
        return worksItem;
      });

      workHourCollection.doc(format(currentDate, 'yyyy-MM')).update({ work: updateWorkArray });
    }

    if (hasWorkDate && !hasStoreInworksArray) {
      workHourCollection.doc(format(currentDate, 'yyyy-MM')).update({
        work: firestore.FieldValue.arrayUnion({
          id: uuid.v4(),
          date: new Date(),
          start: new Date(),
          end: null,
          storeInfo
        })
      });
    }

    if (!hasWorkDate) {
      workHourCollection.doc(format(currentDate, 'yyyy-MM')).update({
        work: firestore.FieldValue.arrayUnion({
          id: uuid.v4(),
          date: new Date(),
          start: new Date(),
          end: null,
          storeInfo
        })
      });
    }
  } else {
    workHourCollection.doc(format(currentDate, 'yyyy-MM')).set({
      work: firestore.FieldValue.arrayUnion({
        date: new Date(),
        storeInfo,
        start: new Date(),
        end: null
      })
    });
  }
};

export const useAddAttendance = () => {
  return useMutation({ mutationFn: addWorkingTime });
};
