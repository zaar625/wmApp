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

  const themeTypeOnPress = (mode: string) => {
    updateTheme({ mode });
    changeBackgroundColor(mode);
  };

  return (
    <Animated.View style={[styles.container, animatedBackgroundColor]}>
      <SafeAreaView>
        <NavigationHeader header="화면 색상 모드" />
        <View>
          <ThemeTypeBtn
            label="밝은 화면"
            img="light"
            onPress={() => themeTypeOnPress('light')}
            isActive={theme.mode === 'light' && !theme.system}
          />
          <ThemeTypeBtn
            label="어두운 화면"
            img="dark"
            onPress={() => themeTypeOnPress('dark')}
            isActive={theme.mode === 'dark' && !theme.system}
          />
          <ThemeTypeBtn
            label="시스셈 설정과 같이"
            img="dark"
            onPress={() => themeTypeOnPress('system')}
            isActive={theme.system}
          />
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
