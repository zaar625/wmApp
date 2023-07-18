import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  onBoardingPage: undefined;
  categorySelectPage: undefined;
  employeeLoginPage: undefined;
  singInStep01Page: undefined;
};

export type NavigationScreenProps = NativeStackScreenProps<RootStackParamList>;
