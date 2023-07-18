import React, { useEffect, useState } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingPage from './App/screens/onboarding';
import CategorySelectPage from './App/screens/select-category';
import EmployeeLoginPage from './App/screens/login/employee';
import JoinPage from './App/screens/join';
import { ThemeContext } from './App/theme/themeContext';

export default function App() {
  const Stack = createStackNavigator();
  const scheme = useColorScheme();

  const [theme, setTheme] = useState<any>({ mode: scheme });

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
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="onBoardingPage" component={OnboardingPage} />
          <Stack.Screen name="categorySelectPage" component={CategorySelectPage} />
          <Stack.Screen name="employeeLoginPage" component={EmployeeLoginPage} />
          <Stack.Screen name="joinPage" component={JoinPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
