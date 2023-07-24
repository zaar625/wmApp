import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreTabScreen from './tab_store';
import ShareTabScreen from './tab_share';
import BarcodeTabScreen from './tab_barcode';
import CalendarTabScreen from './tab_calendar';
import SettingTabScreen from './tab_setting';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import StoreIcon from '../assets/icon/store.svg';
import NoteIcon from '../assets/icon/note.svg';
import BarcodeIcon from '../assets/icon/code.svg';
import CalendarIcon from '../assets/icon/calendar.svg';
import SettingIcon from '../assets/icon/settings.svg';

import { colors, deviceheight } from '../theme';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const inset = useSafeAreaInsets();
  console.log(inset.bottom);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#6B6F78',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
        tabBarItemStyle: {
          paddingBottom: 10
        },
        tabBarStyle: {
          backgroundColor: colors.dark.secondary,
          borderTopColor: '#202632',
          borderTopWidth: 1.5,
          height: 34 + 60
        }
      }}
    >
      <Tab.Screen
        name="storeTabScreen"
        component={StoreTabScreen}
        options={{
          tabBarLabel: '근무지',
          tabBarIcon: ({ color, size }) => <StoreIcon color={color} />
        }}
      />
      <Tab.Screen
        name="shareTabScreen"
        component={ShareTabScreen}
        options={{
          tabBarLabel: '공유',
          tabBarIcon: ({ color, size }) => <NoteIcon color={color} />
        }}
      />
      <Tab.Screen
        name="barcodeTabScreen"
        component={BarcodeTabScreen}
        options={{
          tabBarLabel: '출퇴근',
          tabBarIcon: ({ color, size }) => <BarcodeIcon color={color} />
        }}
      />
      <Tab.Screen
        name="calendarTabScreen"
        component={CalendarTabScreen}
        options={{
          tabBarLabel: '캘린더',
          tabBarIcon: ({ color, size }) => <CalendarIcon color={color} />
        }}
      />
      <Tab.Screen
        name="settingTabScreen"
        component={SettingTabScreen}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: ({ color, size }) => <SettingIcon color={color} />
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
