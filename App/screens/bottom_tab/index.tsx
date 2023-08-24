import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreTabScreen from '../tab_store';
import ShareTabScreen from '../tab_share';
import BarcodeTabScreen from '../tab_barcode';
import CalendarTabScreen from '../tab_calendar';
import SettingTabScreen from '../tab_setting';
import TabButton from './TabButton';
import { Shadow } from 'react-native-shadow-2';
import auth from '@react-native-firebase/auth';
import AttendanceScreen from '../tab_barcode/AttendanceScreen';
import { useGetUserProfile } from '../../api/store/hooks/useGetuUserProfile';

import themeChange from '../../util/theme';
import { deviceWidth } from '../../theme';

import { createStackNavigator } from '@react-navigation/stack';

const NAVIGATION_HEIGHT = 34 + 70;

const BottomTab = () => {
  const themeMode = themeChange();
  const user = auth().currentUser;

  const { data } = useGetUserProfile(user?.uid);

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const screens = [
    {
      name: 'storeTabScreen',
      component: StoreTabScreen,
      icon: 'store',
      label: '근무지'
    },
    {
      name: 'shareTabScreen',
      component: ShareTabScreen,
      icon: 'note',
      label: '공유'
    },
    {
      name: 'barcodeTabScreen',
      component: BarcodeTabScreen,
      icon: 'code',
      label: '출퇴근'
    },
    {
      name: 'calendarTabScreen',
      component: CalendarTabScreen,
      icon: 'calendar',
      label: '달력'
    },
    {
      name: 'settingTabScreen',
      component: SettingTabScreen,
      icon: 'settings',
      label: '설정'
    }
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: themeMode.secondary,
          height: NAVIGATION_HEIGHT,
          borderWidth: 0.8,
          borderTopColor: themeMode.secondary
        },
        tabBarBackground: () => (
          <Shadow distance={10} startColor={themeMode.primary} style={styles.shadow} />
        )
      }}
    >
      {screens.map((screenItem, index) => (
        <Tab.Screen
          key={index}
          name={screenItem.name}
          component={screenItem.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => <TabButton {...props} item={screenItem} />
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  shadow: {
    width: deviceWidth,
    height: NAVIGATION_HEIGHT
  }
});
