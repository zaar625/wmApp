import React, { useRef, useState } from 'react';
import { View, StyleSheet, Button, Pressable, Text } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';
import themeChange from '../../util/theme';
import { useContext } from 'react';
import { ThemeContext } from '../../theme/themeContext';
import ThemeTypeBtn from './components/ThemeTypeBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationHeader from '../../common-components/NavigationHeader';

const ThemeListScreen = () => {
  const themeMode = themeChange();
  const { updateTheme, theme } = useContext(ThemeContext);
  const backgroundColorValue = useSharedValue(0); // 0: dark, 1: light

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

  const changeBackgroundColor = (type: string) => {
    updateTheme({ mode: type });
    backgroundColorValue.value = backgroundColorValue.value === 0 ? 1 : 0;
  };

  const animatedBackgroundColor = useAnimatedStyle(() => {
    if (theme.mode === 'light') {
      backgroundColorValue.value = 1;
    } else {
      backgroundColorValue.value = 0;
    }
    const backgroundColor = themeMode.primary;

    return {
      backgroundColor: withTiming(backgroundColor, {
        duration: 500
      })
    };
  });

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
    changeBackgroundColor(mode);
  };

  return (
    <Animated.View style={[styles.container, animatedBackgroundColor]}>
      <SafeAreaView>
        <NavigationHeader header="화면 색상 모드" />
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
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ color: themeMode.subTint }}>
            다크모드를 기본으로 제공하고 있으며, 설정에 따라 자동 전환됩니다.
          </Text>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default ThemeListScreen;
