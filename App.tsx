import React, { useEffect, useState } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './App/state/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import OnboardingPage from './App/screens/onboarding';
import CategorySelectPage from './App/screens/select_category';
import EmployeeLoginPage from './App/screens/login/employee';
import SignInStep01Page from './App/screens/sign_up/SignInStep01Page';
import SignInStep02Page from './App/screens/sign_up/SignInStep02Page';
import GlobalModal from './App/common-components/modal/GlobalModal';
import BottomTab from './App/screens/bottom_tab';
import ScannerScreen from './App/screens/tab_store/ScannerScreen';
import GlobalBottomSheet from './App/common-components/bottom_sheet/GlobalBottomSheet';

import WriteScreenStep1 from './App/screens/tab_share/WriteScreenStep1';
import WriteScreenStep2 from './App/screens/tab_share/WriteScreenStep2';
import WriteScreen from './App/screens/tab_share/WriteScreenStep2';
import ImagePickScreen from './App/screens/tab_share/ImagePickScreen';
import ShareDetailScreen from './App/screens/tab_share/ShareDetailScreen';
import MyInfoModifyScreen from './App/screens/tab_setting/MyInfoModifyScreen';
import WriteScreenStep3 from './App/screens/tab_share/WriteScreenStep3';
import AttendanceScreen from './App/screens/tab_barcode/AttendanceScreen';
import { RootStackParamList } from './App/type';

import { ThemeContext } from './App/theme/themeContext';
import { TThemeMode } from './App/theme/themeContext';

const queryClient = new QueryClient();

export default function App() {
  const Stack = createStackNavigator<RootStackParamList>();

  const [theme, setTheme] = useState<TThemeMode>({ mode: 'dark' });

  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      setTheme({ mode: colorScheme });
    });

    return () => {
      Appearance.addChangeListener(({ colorScheme }) => {
        setTheme({ mode: colorScheme });
      });
    };
  }, []);

  /**
   * newTheme : 라이트, 다크, 시스템모드
   * 형태 : {mode : string}
   */
  const updateTheme = (newTheme: any) => {
    if (newTheme !== 'system') {
      setTheme(newTheme);
    }
  };

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
                <Stack.Screen name="myInfoModifyScreen" component={MyInfoModifyScreen} />
              </Stack.Navigator>
            </GestureHandlerRootView>
          </QueryClientProvider>
        </NavigationContainer>
      </ThemeContext.Provider>
    </Provider>
  );
}
