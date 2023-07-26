import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreTabScreen from './tab_store';
import ShareTabScreen from './tab_share';
import BarcodeTabScreen from './tab_barcode';
import CalendarTabScreen from './tab_calendar';
import SettingTabScreen from './tab_setting';
import Animated from 'react-native-reanimated';

import StoreIcon from '../assets/icon/store.svg';
import NoteIcon from '../assets/icon/note.svg';
import BarcodeIcon from '../assets/icon/code.svg';
import CalendarIcon from '../assets/icon/calendar.svg';
import SettingIcon from '../assets/icon/settings.svg';

import { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

import { trigger } from 'react-native-haptic-feedback';
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

import { colors, deviceheight } from '../theme';
import themeChange from '../util/theme';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const themeMode = themeChange();
  const scaleAni = useSharedValue(1);
  const backgound = useSharedValue(themeMode.secondary);

  useEffect(() => {
    //테마변경이 될 때마다 기본값 변경해줘야합니다.
    backgound.value = themeMode.secondary;
  }, [themeMode]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: backgound.value,
      transform: [
        {
          scale: withTiming(scaleAni.value, {
            duration: 200,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1)
          })
        }
      ]
    };
  }, []);
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
          tabBarShowLabel: false,
          tabBarButton: ({ accessibilityState, onPress }) => {
            const focused = accessibilityState?.selected;
            return (
              <Pressable
                onPress={onPress}
                onPressIn={() => {
                  trigger('impactMedium', options);
                  (scaleAni.value = 0.95), (backgound.value = themeMode.primary);
                }}
                onPressOut={() => ((scaleAni.value = 1), (backgound.value = themeMode.secondary))}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1
                }}
              >
                <Animated.View
                  style={[
                    {
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                      borderRadius: 10
                    },
                    animatedStyles
                  ]}
                >
                  <StoreIcon color={focused ? '#fff' : '#6B6F78'} />
                  <Text>근무지</Text>
                </Animated.View>
              </Pressable>
            );
          }
        }}
      />
      <Tab.Screen
        name="shareTabScreen"
        component={ShareTabScreen}
        options={{
          tabBarLabel: '공유',
          tabBarButton: ({ onPress, accessibilityState }) => {
            const focused = accessibilityState?.selected;
            return (
              <Pressable
                onPress={onPress}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1
                }}
              >
                <View style={{ alignItems: 'center' }}>
                  <NoteIcon color={focused ? '#fff' : '#6B6F78'} />
                  <Text>공유</Text>
                </View>
              </Pressable>
            );
          }
        }}
      />
      <Tab.Screen
        name="barcodeTabScreen"
        component={BarcodeTabScreen}
        options={{
          tabBarLabel: '출퇴근',
          tabBarButton: () => (
            <Pressable style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <View>
                <BarcodeIcon />
                <Text>출퇴근</Text>
              </View>
            </Pressable>
          )
        }}
      />
      <Tab.Screen
        name="calendarTabScreen"
        component={CalendarTabScreen}
        options={{
          tabBarLabel: '캘린더',
          tabBarButton: () => (
            <Pressable style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <View>
                <CalendarIcon />
                <Text>캘린더</Text>
              </View>
            </Pressable>
          )
        }}
      />
      <Tab.Screen
        name="settingTabScreen"
        component={SettingTabScreen}
        options={{
          tabBarLabel: '설정',
          tabBarButton: () => (
            <Pressable style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <View>
                <SettingIcon />
                <Text>설정</Text>
              </View>
            </Pressable>
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
