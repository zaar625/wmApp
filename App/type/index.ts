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
  attendanceScreen: undefined;
  calendarTabScreen: undefined;
  settingTabScreen: undefined;
  scannerScreen: undefined;
  writeScreenStep1: undefined;
  writeScreenStep2: undefined;
  writeScreenStep3: undefined;
  imagePickScreen: undefined;
  shareDetailScreen: { header: string; data: any };
  shareEditScreen: { data: any };
  shareListScreen: undefined;
  myInfoModifyScreen: { header: string };
};

export type NavigationScreenProps = NativeStackScreenProps<RootStackParamList>;

export type TStoreInfo = {
  class: string;
  name: string;
  id: string;
};

export interface IUserInfo {
  name: string;
  phone: string;
  email: string;
  image: string | null;
}
