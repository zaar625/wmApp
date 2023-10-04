/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import { name as appName } from './app.json';
import notifee from './App/util/notifee';

messaging().setBackgroundMessageHandler(async message => {
  // console.log(message);
});
messaging().onMessage(message => {
  // console.log('message:', message);

  notifee.displayNoti(message);
});

AppRegistry.registerComponent(appName, () => App);
