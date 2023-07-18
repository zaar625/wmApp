import { createContext } from 'react';
import { ColorSchemeName } from 'react-native';

type TTheme = {
  theme: { mode: ColorSchemeName };
  updateTheme: (changeMode: string) => void;
};

export const ThemeContext = createContext<TTheme>({
  theme: { mode: 'dark' },
  updateTheme: Function
});
