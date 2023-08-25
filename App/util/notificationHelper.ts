// import AsyncStorage from '@react-native-async-storage/async-storage';
// // import messaging from '@react-native-firebase/messaging';

// export const requestUserPermission = async () => {
//   const authStatus = await messaging().requestPermission();

//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     getFcmToken();
//   }
// };

// //get fcmToken to send notification
// export const getFcmToken = async () => {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');

//   if (!fcmToken) {
//     try {
//       const token = await messaging().getToken();
//       console.log(token);

//       if (token) {
//         await AsyncStorage.setItem('fcmTken', token);
//       }
//     } catch (error) {
//       console.log(`Can not get fcm token ${error}`);
//     }
//   }
// };
