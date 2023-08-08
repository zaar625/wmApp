import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import CategoryBtn from './CategoryBtn';
import { ScreenTitle } from '../../components/Title';

import { colors, deviceWidth } from '../../theme';
import { ThemeContext } from '../../theme/themeContext';

export default function CategorySelectPage() {
  const { theme } = useContext(ThemeContext);
  let activeColor = theme.mode && colors[theme.mode];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: activeColor.primary }]}>
      <ScreenTitle title={`유형을${'\n'}선택해주세요`} style={{ paddingHorizontal: 20 }} />
      <View style={styles.categoryBtnWrapper}>
        <CategoryBtn title={`매장에서 ${'\n'} 일해요`} />
        <CategoryBtn title={`매장을 ${'\n'} 운영해요`} />
      </View>
      <Image
        source={require('../../assets/img/category-select.png')}
        style={styles.img}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  categoryBtnWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  img: {
    width: deviceWidth,
    height: deviceWidth * 0.877
  }
});
