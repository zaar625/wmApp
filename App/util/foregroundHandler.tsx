import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 앱을 실행 중일 때도 푸쉬알림을 띄우기 위한 함수 입니다.
export default function ForegroundHandler() {
  useEffect(() => {
    const msg = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage:', remoteMessage);
      if (Platform.OS === 'android') {
        PushNotification.createChannel(
          {
            channelId: 'foreground-fcm',
            channelName: 'Foreground_FCM_Channel',
            channelDescription: 'A Channel For Foreground FCM',
            soundName: 'default',
            importance: 4,
            vibrate: true
          },
          created => console.log(`createChannel returned '${created}'`)
        );

        PushNotification.configure({
          onNotification: function (notification) {
            // 알림을 처리하는 코드
            console.log('notification:', notification);
          }
        });
      }
    });

    return msg;
  }, []);

  return null;
}
