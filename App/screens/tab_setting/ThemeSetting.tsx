import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { SemiTitle } from '../../components/Title';
import { useContext } from 'react';
import { ThemeContext } from '../../theme/themeContext';
import ThemeTypeBtn from './ThemeTypeBtn';
import { useColorScheme } from 'react-native';

import themeChange from '../../util/theme';

const ThemeSetting = () => {
  const themeMode = themeChange();
  const scheme = useColorScheme();

  const themeTypes = [
    {
      name: '밝은 화면',
      state: false,
      mode: 'light'
    },
    {
      name: '어두운 화면',
      state: true,
      mode: 'dark'
    },
    {
      name: '시스템 설정과 같이',
      state: false,
      mode: 'system'
    }
  ];

  const { updateTheme } = useContext(ThemeContext);

  const [themeType, setThemeType] = useState(themeTypes);

  const themeTypeOnPress = (typeIndex: number, mode: string) => {
    const changeThemeTypes = themeType.map((type, index) => {
      if (index === typeIndex) {
        return { ...type, state: true };
      } else {
        return { ...type, state: false };
      }
    });
    setThemeType(changeThemeTypes);
    updateTheme({ mode });
  };

  return (
    <View style={{ backgroundColor: themeMode.secondary, marginBottom: 10 }}>
      <SemiTitle title="화면색상" style={styles.title} />
      <View>
        {themeType.map((themeType, index) => (
          <ThemeTypeBtn
            key={index}
            themeType={themeType}
            index={index}
            themeTypeOnPress={themeTypeOnPress}
          />
        ))}
      </View>
    </View>
  );
};

export default ThemeSetting;

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 20,
    marginVertical: 10
  }
});
