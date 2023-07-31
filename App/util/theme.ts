import { useContext } from 'react';
import { ThemeContext } from '../theme/themeContext';

import { colors } from '../theme';

export default function themeChange() {
  const { theme } = useContext(ThemeContext);
  let themeMode = theme.mode && colors[theme.mode];

  return themeMode;
}
