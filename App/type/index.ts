import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  onBoardingPage: undefined;
  categorySelectPage: undefined;
  employeeLoginPage: undefined;
  singInStep01Page: undefined;
  signInStep02Page: undefined;
  bottomTab: undefined;
  storeTabScreen: undefined;
  shareTabScreen: undefined;
  barcodeTabScreen: undefined;
  calendarTabScreen: undefined;
  settingTabScreen: undefined;
  scannerScreen: undefined;
};

export type NavigationScreenProps = NativeStackScreenProps<RootStackParamList>;
