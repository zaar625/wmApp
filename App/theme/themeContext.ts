import { createContext } from 'react';
import { ColorSchemeName } from 'react-native';

export type TThemeMode = {
  mode: ColorSchemeName;
};

type TTheme = {
  theme: TThemeMode;
  updateTheme: (changeMode: any) => void;
};

export const ThemeContext = createContext<TTheme>({
  theme: { mode: 'dark' },
  updateTheme: Function
});
