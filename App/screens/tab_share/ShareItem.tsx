import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

const ShareItem = () => {
  const scaleAni = useSharedValue(1);
  const backgound = useSharedValue('#202632');

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
  });

  return (
    <Pressable
      onPressIn={() => ((scaleAni.value = 0.95), (backgound.value = '#30394B'))}
      onPressOut={() => ((scaleAni.value = 1), (backgound.value = '#202632'))}
    >
      <Animated.View
        style={[
          { marginBottom: 10, paddingHorizontal: 20, borderRadius: 10, paddingVertical: 10 },
          animatedStyles
        ]}
      >
        <View style={styles.authorWrapper}>
          <View style={styles.round} />
          <Text style={styles.name}>이상윤</Text>
        </View>
        <View style={styles.content}>
          <Text
            style={[styles.baseText, { lineHeight: 20 }]}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            오늘 삼성카드 분실물이 들어왔습니다.
          </Text>
        </View>
        <Text style={styles.date}>23.07.23</Text>
      </Animated.View>
    </Pressable>
  );
};

export default ShareItem;

const styles = StyleSheet.create({
  baseText: {
    color: '#fff'
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
