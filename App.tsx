import React, { useEffect, useState } from 'react';
import { useColorScheme, Appearance, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './App/state/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';
import { getStorageTheme, setStorageTheme } from './App/util/storageTheme';
import messaging from '@react-native-firebase/messaging';

import OnboardingPage from './App/screens/onboarding';
import CategorySelectPage from './App/screens/select_category';
import EmployeeLoginPage from './App/screens/login/employee';
import SignInStep01Page from './App/screens/sign_up/SignInStep01Page';
import SignInStep02Page from './App/screens/sign_up/SignInStep02Page';
import GlobalModal from './App/common-components/modal/GlobalModal';
import BottomTab from './App/screens/bottom_tab';
import ScannerScreen from './App/screens/tab_store/ScannerScreen';
import GlobalBottomSheet from './App/common-components/bottom_sheet/GlobalBottomSheet';
import GlobalToast from './App/common-components/GlobalToast';

import WriteScreenStep1 from './App/screens/tab_share/WriteScreenStep1';
import WriteScreenStep2 from './App/screens/tab_share/WriteScreenStep2';
import ImagePickScreen from './App/screens/tab_share/ImagePickScreen';
import ShareDetailScreen from './App/screens/tab_share/ShareDetailScreen';
import ShareEditScreen from './App/screens/tab_share/ShareEditScreen';
import MyInfoModifyScreen from './App/screens/tab_setting/MyInfoModifyScreen';
import WriteScreenStep3 from './App/screens/tab_share/WriteScreenStep3';
import AttendanceScreen from './App/screens/tab_barcode/AttendanceScreen';
import { RootStackParamList } from './App/type';
import ShareListScreen from './App/screens/tab_share/ShareListScreen';
import ShakeDetector from './App/common-components/ShakeDetector';
import TimeEdittingListScreen from './App/screens/tab_setting/TimeEdittingListScreen';
import ThemeListScreen from './App/screens/tab_setting/ThemeListScreen';

import { ThemeContext } from './App/theme/themeContext';
import { TThemeMode } from './App/theme/themeContext';
import { requestUserPermission } from './App/util/notificationHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [theme, setTheme] = useState<TThemeMode>({ mode: 'dark', system: false });
  const [token, setToken] = useState();
  const Stack = createStackNavigator<RootStackParamList>();
  const queryClient = new QueryClient();

  useEffect(() => {
    requestUserPermission();
    getFcmToken();
  }, []);

  const getFcmToken = async () => {
    const token = await AsyncStorage.getItem('fcmToken');
    if (token) {
      setToken(token);
    }
  };
  console.log('token', token);

  const updateTheme = (newTheme: any) => {
    if (newTheme !== 'system') {
      setTheme({ ...newTheme, system: false });
      setStorageTheme({ ...newTheme, system: false });
    }

    if (newTheme.mode === 'system') {
      const colorScheme = Appearance.getColorScheme();
      setTheme({ mode: colorScheme, system: true });
      setStorageTheme({ mode: colorScheme, system: true });
    }
  };

  if (theme.system) {
    Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme({ mode: colorScheme, system: true });
      setStorageTheme({ mode: colorScheme, system: true });
    });
  }

  const getThemeStorage = async () => {
    const storageTheme = await getStorageTheme();

    if (storageTheme) {
      setTheme(storageTheme);
    }
  };

  useEffect(() => {
    getThemeStorage();
  }, []);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, updateTheme }}>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <GlobalModal />
              <GlobalBottomSheet />

              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="onBoardingPage" component={OnboardingPage} />
                <Stack.Screen name="categorySelectPage" component={CategorySelectPage} />
                <Stack.Screen name="employeeLoginPage" component={EmployeeLoginPage} />
                <Stack.Screen name="singInStep01Page" component={SignInStep01Page} />
                <Stack.Screen name="signInStep02Page" component={SignInStep02Page} /> */}
                <Stack.Screen name="bottomTab" component={BottomTab} />
                <Stack.Screen
                  name="scannerScreen"
                  component={ScannerScreen}
                  options={{ presentation: 'modal' }}
                />
                <Stack.Screen
                  name="attendanceScreen"
                  component={AttendanceScreen}
                  options={{ presentation: 'modal' }}
                />
                <Stack.Screen name="writeScreenStep1" component={WriteScreenStep1} />
                <Stack.Screen name="writeScreenStep2" component={WriteScreenStep2} />
                <Stack.Screen name="writeScreenStep3" component={WriteScreenStep3} />
                <Stack.Screen
                  name="imagePickScreen"
                  component={ImagePickScreen}
                  options={{ presentation: 'modal' }}
                />
                <Stack.Screen name="shareDetailScreen" component={ShareDetailScreen} />
                <Stack.Screen name="shareEditScreen" component={ShareEditScreen} />
                <Stack.Screen name="shareListScreen" component={ShareListScreen} />
                <Stack.Screen name="myInfoModifyScreen" component={MyInfoModifyScreen} />
                <Stack.Screen name="timeEdittingListScreen" component={TimeEdittingListScreen} />
                <Stack.Screen name="themeListScreen" component={ThemeListScreen} />
              </Stack.Navigator>
              <GlobalToast />
            </GestureHandlerRootView>
          </QueryClientProvider>
          <ShakeDetector />
        </NavigationContainer>
      </ThemeContext.Provider>
    </Provider>
  );
}
