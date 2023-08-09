import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import SvgIcon from '../../common-components/SvgIcon';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import haptic from '../../util/haptic';
import themeChange from '../../util/theme';

const TabButton = (props: any) => {
  const themeMode = themeChange();

  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState?.selected;
  const activeColor = focused ? themeMode.tint : '#6B6F78';

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
      style={styles.btnContainer}
      onPress={onPress}
      onPressIn={() => {
        haptic('impactMedium');
        (scaleAni.value = 0.95), (backgound.value = themeMode.card);
      }}
      onPressOut={() => ((scaleAni.value = 1), (backgound.value = themeMode.secondary))}
    >
      <Animated.View style={[styles.btnAniWrapper, animatedStyles]}>
        <SvgIcon name={item.icon} color={activeColor} width={25} />
        <Text style={[styles.label, { color: activeColor }]}>{item.label}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  btnAniWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 60,
    padding: 5
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 5
  }
});
