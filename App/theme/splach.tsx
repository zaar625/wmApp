import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Animated, Dimensions } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import themeChange from '../util/theme';
import {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
  Easing
} from 'react-native-reanimated';

type Props = {
  onAnimationEnd: () => void;
};

export const AnimatedBootSplash = ({ onAnimationEnd }: Props) => {
  const [opacity] = useState(() => new Animated.Value(1));
  const [translateY] = useState(() => new Animated.Value(0));
  const [backgroundColor] = useState(new Animated.Value(0));
  const themeMode = themeChange();

  const backgroundColorInterpolate = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#101012', `${themeMode.primary}`]
  });

  const animatedStyle = {
    backgroundColor: backgroundColorInterpolate
  };

  const { container, logo /*, brand */ } = BootSplash.useHideAnimation({
    manifest: require('../assets/splash/bootsplash_manifest.json'),

    logo: require('../assets/splash/bootsplash_logo.png'),
    // darkLogo: require("../assets/bootsplash_dark_logo.png"),
    // brand: require("../assets/bootsplash_brand.png"),
    // darkBrand: require("../assets/bootsplash_dark_brand.png"),

    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      const { height } = Dimensions.get('window');

      Animated.stagger(450, [
        Animated.spring(translateY, {
          useNativeDriver: true,
          toValue: -50
        }),
        Animated.spring(translateY, {
          useNativeDriver: true,
          toValue: height
        })
      ]).start();

      Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 0,
        duration: 250,
        delay: 350
      }).start(() => {
        onAnimationEnd();
      });

      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 350,
        easing: Easing.linear,
        useNativeDriver: true
      }).start();
    }
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: backgroundColorInterpolate }]}>
      <Animated.View
        {...container}
        style={[container.style, { opacity, backgroundColor: backgroundColorInterpolate }]}
      >
        <Animated.Image {...logo} style={[logo.style, { transform: [{ translateY }] }]} />

        {/* {brand && (
        <Animated.Image {...brand} style={[brand.style, { opacity }]} />
      )} */}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#FFF'
  }
});
