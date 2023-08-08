import { Image, StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { SemiTitle, SmallTitle } from '../../../components/Title';
import { useContext } from 'react';
import { ThemeContext } from '../../../theme/themeContext';
import ThemeTypeBtn from './ThemeTypeBtn';
import { useColorScheme } from 'react-native';

import themeChange from '../../../util/theme';

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
      mode: 'dark'
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
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.header}>
        <Image source={require('../../../assets/img/palette.png')} style={styles.image} />
        <View>
          <SmallTitle title="화면색상" style={{ marginBottom: 5 }} />
          <Text style={[styles.subText, { color: themeMode.subTint }]}>
            화면 색상을 환경에 맞춰 눈의 피로도를 낮춰보세요.
          </Text>
        </View>
      </View>
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
  container: {
    marginBottom: 20,
    paddingTop: 15,
    paddingBottom: 5,
    borderRadius: 15
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginBottom: 10
  },
  subText: {
    fontSize: 12
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  }
});
