import firestore from '@react-native-firebase/firestore';

const workHourCollection = firestore()
  .collection('users')
  .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
  .collection('workHour');

export const onAttendance = async (currentDate: any, worktime: string) => {
  const code = 'lFddsTVznYG9ZNstQYo9';
  const workHourRef = workHourCollection.doc(currentDate);

  const workData = await workHourRef.get();

  const workArray = await workData.data()?.work; // undefined || [item]

  if (workArray) {
    const updateWorkArray = workArray.map((work: any) => {
      if (work.storeName === code) {
        return {
          ...work,
          [worktime]: new Date()
        };
      }
      return work;
    });

    const isNewStore = workArray.some((work: any) => work.storeName === code);

    if (!isNewStore) {
      workHourCollection.doc(currentDate).update({
        work: firestore.FieldValue.arrayUnion({
          date: new Date(),
          end: null,
          start: new Date(),
          storeName: code
        })
      });
    } else {
      workHourCollection.doc(currentDate).update({ work: updateWorkArray });
    }
  } else {
    workHourCollection.doc(currentDate).set({
      work: firestore.FieldValue.arrayUnion({
        date: new Date(),
        end: null,
        start: new Date(),
        storeName: code
      })
    });
  }
};
