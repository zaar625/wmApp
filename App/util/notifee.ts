import notifee, { AndroidImportance } from '@notifee/react-native';

const displayNotification = async (message: any) => {
  const channelAnoucement = await notifee.createChannel({
    id: 'wmApp',
    name: 'wmApp-log',
    importance: AndroidImportance.HIGH
  });

  await notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
    android: {
      channelId: channelAnoucement,
      smallIcon: 'ic_launcher' //
    }
  });
};

export default {
  displayNoti: (remoteMessage: any) => displayNotification(remoteMessage)
};
