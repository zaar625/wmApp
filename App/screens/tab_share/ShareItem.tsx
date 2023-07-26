import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

import themeChange from '../../util/theme';

const ShareItem = () => {
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
      onPressIn={() => ((scaleAni.value = 0.95), (backgound.value = themeMode.primary))}
      onPressOut={() => ((scaleAni.value = 1), (backgound.value = themeMode.secondary))}
    >
      <Animated.View style={[styles.cardContainer, animatedStyles]}>
        <View style={styles.authorWrapper}>
          <View style={styles.round} />
          <Text style={{ color: themeMode.subTint }}>이상윤</Text>
        </View>
        <View style={styles.content}>
          <Text
            style={[{ color: themeMode.tint }, { lineHeight: 20 }]}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            오늘 삼성카드 분실물이 들어왔습니다.
          </Text>
        </View>
        <Text style={[styles.date, { color: themeMode.subTint }]}>23.07.23</Text>
      </Animated.View>
    </Pressable>
  );
};

export default ShareItem;

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10
  },

  round: {
    borderRadius: 100,
    backgroundColor: '#BAC0CE',
    width: 8,
    height: 8,
    marginRight: 10
  },
  authorWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: { color: '#BAC0CE' },
  content: {
    flexDirection: 'row',
    marginVertical: 15
  },
  date: {
    color: '#BAC0CE',
    textAlign: 'right'
  }
});
