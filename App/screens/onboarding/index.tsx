import {
  View,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, NavigationScreenProps } from '../../type';

import { onBoadingDATA, OnBoadingSlideItem } from './onboardingData';

const { width } = Dimensions.get('window');

export default function OnboardingPage({ navigation }: NavigationScreenProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef(null);

  const updateCurrentSlideIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);

    setCurrentSlideIndex(currentIndex);
  };

  return (
    <SafeAreaView style={styles.bg}>
      <FlatList
        onMomentumScrollEnd={updateCurrentSlideIndex}
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        data={onBoadingDATA}
        renderItem={({ item }) => <OnBoadingSlideItem data={item} />}
      />
      <View style={styles.indicatorWrapper}>
        {onBoadingDATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex === index && {
                backgroundColor: '#326273',
                width: 30
              }
            ]}
          />
        ))}
      </View>
      <Pressable
        style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.5 : 1 }]}
        onPress={() => navigation.navigate('categorySelectPage')}
      >
        <Text
          style={{
            color: '#fff',
            alignSelf: 'center',
            fontSize: 16,
            fontWeight: '700'
          }}
        >
          시작하기
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#30394B',
    flex: 1
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36
  },
  indicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 82
  },
  indicator: {
    height: 6,
    width: 6,
    backgroundColor: '#326273',
    marginHorizontal: 3,
    borderRadius: 50
  },
  btn: {
    backgroundColor: '#326273',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 21,
    marginHorizontal: 20,
    borderRadius: 10
  }
});
