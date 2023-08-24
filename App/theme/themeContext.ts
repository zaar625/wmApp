import { createContext } from 'react';
import { ColorSchemeName } from 'react-native';

export type TThemeMode = {
  mode: ColorSchemeName | string;
  system: boolean;
};

type TTheme = {
  theme: TThemeMode;
  updateTheme: (changeMode: any) => void;
};

export const ThemeContext = createContext<TTheme>({
  theme: { mode: 'dark', system: false },
  updateTheme: Function
});
