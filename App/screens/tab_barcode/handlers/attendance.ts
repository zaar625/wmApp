import firestore from '@react-native-firebase/firestore';
import format from 'date-fns/format';

const workHourCollection = firestore()
  .collection('users')
  .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
  .collection('workHour');

//lFddsTVznYG9ZNstQYo9
//ItGwR9Tj8BNlgxR37Nrp
export const addWorkingTime = async (currentDate: Date, attendanceType: string) => {
  const storeCode = 'ItGwR9Tj8BNlgxR37Nrp';
  const monthQuery = format(currentDate, 'yyyy-MM');

  const workHourRef = workHourCollection.doc(monthQuery);

  const workData = await workHourRef.get();

  const worksArray = await workData.data()?.work; // undefined || item[]

  if (worksArray) {
    const hasWorkDate = worksArray.some(
      (work: any) => format(work.date.toDate(), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
    );

    const hasStoreInworksArray = worksArray.some(
      (work: any) =>
        work.storeName === storeCode &&
        format(work.date.toDate(), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
    );

    if (hasWorkDate && hasStoreInworksArray) {
      const updateWorkArray = worksArray.map((worksItem: any) => {
        if (worksItem.storeName === storeCode && hasWorkDate) {
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
          date: new Date(),
          end: null,
          start: new Date(),
          storeName: storeCode
        })
      });
    }

    if (!hasWorkDate) {
      workHourCollection.doc(format(currentDate, 'yyyy-MM')).update({
        work: firestore.FieldValue.arrayUnion({
          date: new Date(),
          end: null,
          start: new Date(),
          storeName: storeCode
        })
      });
    }
  } else {
    workHourCollection.doc(format(currentDate, 'yyyy-MM')).set({
      work: firestore.FieldValue.arrayUnion({
        date: new Date(),
        end: null,
        start: new Date(),
        storeName: storeCode
      })
    });
  }
};
