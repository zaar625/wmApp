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
  writeScreenStep1: undefined;
  writeScreenStep2: undefined;
  writeScreenStep3: undefined;
  imagePickScreen: undefined;
  shareDetailScreen: { header: string };
  myInfoModifyScreen: { header: string };
};

export type NavigationScreenProps = NativeStackScreenProps<RootStackParamList>;
