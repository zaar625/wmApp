import React, { useState } from 'react';
import { useColorScheme, Appearance } from 'react-native';
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
import BottomTab from './App/screens/BottomTab';

export default function App() {
  const Stack = createStackNavigator();
  const scheme = useColorScheme();

  const [theme, setTheme] = useState<TThemeMode>({ mode: scheme });

  Appearance.addChangeListener(({ colorScheme }) => {
    setTheme({ mode: colorScheme }); // "light" or "dark"
  });

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
          <GlobalModal />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="onBoardingPage" component={OnboardingPage} />
            <Stack.Screen name="categorySelectPage" component={CategorySelectPage} />
            <Stack.Screen name="employeeLoginPage" component={EmployeeLoginPage} />
            <Stack.Screen name="singInStep01Page" component={SignInStep01Page} />
            <Stack.Screen name="signInStep02Page" component={SignInStep02Page} />
            <Stack.Screen name="bottomTab" component={BottomTab} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    </Provider>
  );
}
