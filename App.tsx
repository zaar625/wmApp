import React, { useEffect, useRef, useState } from 'react';
import { useColorScheme, Appearance, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingPage from './App/screens/onboarding';
import CategorySelectPage from './App/screens/select_category';
import EmployeeLoginPage from './App/screens/login/employee';
import SignInStep01Page from './App/screens/sign_up/SignInStep01Page';
import SignInStep02Page from './App/screens/sign_up/SignInStep02Page';
import { ThemeContext } from './App/theme/themeContext';
import { TThemeMode } from './App/theme/themeContext';
import { store } from './App/state/store';
import { Provider } from 'react-redux';
import GlobalModal from './App/components/modal/GlobalModal';
import BottomTab from './App/screens/bottom_tab';
import ScannerScreen from './App/screens/tab_store/ScannerScreen';
import GlobalBottomSheet from './App/components/bottom_sheet/GlobalBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WriteScreen from './App/screens/tab_share/WriteScreen';

export default function App() {
  const Stack = createStackNavigator();

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
              <Stack.Screen name="writeScreen" component={WriteScreen} />
            </Stack.Navigator>
          </GestureHandlerRootView>
        </NavigationContainer>
      </ThemeContext.Provider>
    </Provider>
  );
}
