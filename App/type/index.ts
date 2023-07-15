import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  onBoardingPage: undefined;
  categorySelectPage: undefined;
  employeeLoginPage: undefined;
  joinPage: undefined;
};

export type NavigationScreenProps = NativeStackScreenProps<RootStackParamList>;
