import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../type';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

import themeChange from '../../../util/theme';
import SvgIcon from '../../../common-components/SvgIcon';

const ShareItem = () => {
  const themeMode = themeChange();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
      onPress={() => navigation.navigate('shareDetailScreen', { header: '공유 내용 상세' })}
      onPressIn={() => ((scaleAni.value = 0.95), (backgound.value = themeMode.card))}
      onPressOut={() => ((scaleAni.value = 1), (backgound.value = themeMode.secondary))}
    >
      <Animated.View style={[styles.cardContainer, animatedStyles]}>
        <View>
          <Text
            style={[{ color: themeMode.tint }, styles.content]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            오늘 삼성카드 분실물이 들어왔습니다.오늘 삼성카드 분실물이 들어왔습니다.
          </Text>
          <Text style={[styles.author, { color: themeMode.subTint }]}>이상윤</Text>
        </View>
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
  name: { color: '#BAC0CE' },
  content: {
    marginBottom: 5
  },
  author: {
    fontSize: 12
  }
});
