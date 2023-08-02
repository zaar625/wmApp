import { StyleSheet, Text, View, Pressable } from 'react-native';
import themeChange from '../../../util/theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';
import React, { useEffect } from 'react';
import SvgIcon from '../../../components/SvgIcon';

type TThemeType = {
  name: string;
  state: boolean;
  mode: string;
};

type TProps = {
  themeType: TThemeType;
  index: number;
  themeTypeOnPress: (index: number, mode: string) => void;
};

const ThemeTypeBtn = ({ themeType, index, themeTypeOnPress }: TProps) => {
  const themeMode = themeChange();
  const scaleAni = useSharedValue(1);
  const backgound = useSharedValue(themeMode.secondary);

  useEffect(() => {
    //테마변경이 될 때마다 기본값 변경해줘야합니다.
    backgound.value = themeMode.secondary;
  }, [themeMode]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: backgound.value,
      transform: [
        {
          scale: withTiming(scaleAni.value, {
            duration: 200,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1)
          })
        }
      ]
    };
  }, []);

  return (
    <Pressable
      hitSlop={10}
      onPressIn={() => {
        console.log('onPressIn:', backgound.value);
        scaleAni.value = 0.95;
        backgound.value = themeMode.primary;
      }}
      onPressOut={() => {
        themeTypeOnPress(index, themeType.mode);
        console.log('onPressOut');
        scaleAni.value = 1;
        backgound.value = themeMode.secondary;
      }}
      delayLongPress={100}
    >
      <Animated.View style={[styles.themeBtnWrapper, animatedStyles]}>
        <Text style={[styles.themeText, { color: themeMode.tint }]}>{themeType.name}</Text>
        {themeType.state && <SvgIcon name="check" />}
      </Animated.View>
    </Pressable>
  );
};

export default ThemeTypeBtn;

const styles = StyleSheet.create({
  themeBtnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  themeText: {
    fontSize: 16,
    fontWeight: '500'
  }
});
