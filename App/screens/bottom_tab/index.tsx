import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreTabScreen from '../tab_store';
import ShareTabScreen from '../tab_share';
import BarcodeTabScreen from '../tab_barcode';
import CalendarTabScreen from '../tab_calendar';
import SettingTabScreen from '../tab_setting';
import TabButton from './TabButton';
import { colors } from '../../theme';
import themeChange from '../../util/theme';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const themeMode = themeChange();

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
          borderTopColor: '#202632',
          borderTopWidth: 1.5,
          paddingTop: 10,
          height: 34 + 70
        }
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

const styles = StyleSheet.create({});
