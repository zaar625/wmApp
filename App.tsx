import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingPage from './App/screens/onboarding';
import CategorySelectPage from './App/screens/select-category';
import EmployeeLoginPage from './App/screens/login/employee';
import JoinPage from './App/screens/join';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onBoardingPage" component={OnboardingPage} />
        <Stack.Screen name="categorySelectPage" component={CategorySelectPage} />
        <Stack.Screen name="employeeLoginPage" component={EmployeeLoginPage} />
        <Stack.Screen name="joinPage" component={JoinPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
