import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryBtn from './CategoryBtn';

export default function CategorySelectPage() {
  const { width, height } = Dimensions.get('window');
  return (
    <SafeAreaView style={{ backgroundColor: '#30394B', flex: 1 }}>
      <Text style={styles.titleText}>유형을{'\n'}선택해주세요</Text>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={styles.categoryBtnWrapper}>
          <CategoryBtn title={`매장에서 ${'\n'} 일해요`} />
          <CategoryBtn title={`매장을 ${'\n'} 운영해요`} />
        </View>
        <Image
          source={require('../../assets/img/category-select.png')}
          style={{ width, height: width * 0.877 }}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  categoryBtnWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 36,
    paddingHorizontal: 20,
    marginBottom: 79
    // marginTop: 20
  }
});
