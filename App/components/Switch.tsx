import { StyleSheet, Pressable, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
  Easing
} from 'react-native-reanimated';

const Switch = () => {
  const switchTranslate = useSharedValue(0);
  const circleAni = useSharedValue(18);

  const [active, setActive] = useState(false);

  const progress = useDerivedValue(() => {
    return withTiming(active ? 22 : 0);
  });

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 22], ['#6B6F78', '#326273']);
    return {
      backgroundColor
    };
  });

  useEffect(() => {
    if (active) {
      switchTranslate.value = 24;
      circleAni.value = 24;
    } else {
      switchTranslate.value = 3;
      circleAni.value = 18;
    }
  }, [active, switchTranslate]);

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(switchTranslate.value, {
            mass: 1,
            damping: 15,
            stiffness: 120,
            overshootClamping: false,
            restSpeedThreshold: 0.001
          })
        }
      ],
      width: withTiming(circleAni.value, {
        duration: 200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1)
      }),
      height: withTiming(circleAni.value, {
        duration: 200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1)
      })
    };
  });

  return (
    <Pressable
      onPress={() => {
        setActive(!active);
      }}
    >
      <Animated.View style={[styles.container, backgroundColorStyle]}>
        <Animated.View style={[styles.circle, customSpringStyles]}></Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    backgroundColor: '#F2F5F7',
    borderRadius: 30,
    justifyContent: 'center'
  },

  circle: {
    width: 18,
    height: 18,
    backgroundColor: '#fff',
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4
  }
});
