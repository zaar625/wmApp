import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationScreenProps } from '../../type';
import Button from '../../components/Button';
import { onBoadingDATA, OnBoadingSlideItem } from './onboardingData';
import { colors, deviceheight, deviceWidth } from '../../theme';
import { ThemeContext } from '../../theme/themeContext';
import { useContext } from 'react';

export default function OnboardingPage({ navigation }: NavigationScreenProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef(null);

  const { theme } = useContext(ThemeContext);
  let activeColor = theme.mode && colors[theme.mode];

  const updateCurrentSlideIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / deviceWidth);

    setCurrentSlideIndex(currentIndex);
  };

  return (
    <SafeAreaView style={[styles.bg, { backgroundColor: activeColor.primary }]}>
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
                backgroundColor: colors.main,
                width: 30
              }
            ]}
          />
        ))}
      </View>

      <Button name="시작하기" onPress={() => navigation.navigate('categorySelectPage')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    // backgroundColor: colors.dark.primary,
    flex: 1
  },
  text: {
    color: colors.dark.tint,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36
  },
  indicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: deviceheight * 0.09
  },
  indicator: {
    height: 6,
    width: 6,
    backgroundColor: colors.main,
    marginHorizontal: 3,
    borderRadius: 50
  },
  btn: {
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 21,
    marginHorizontal: 20,
    borderRadius: 10
  }
});
