import { Image, StyleSheet, View, ScrollView, Text } from 'react-native';
import React from 'react';
import { colors } from '../../theme';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenTitle } from '../../components/Title';
import AddedStore from './AddedStore';
import PayRoll from './PayRoll';

import { deviceWidth } from '../../theme';

const StoreTabScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.titleWrapper}>
        <View style={{ flex: 2 }}>
          <ScreenTitle title={`안녕하세요.${`\n`}돈모아님, 오늘하루도 화이팅입니다 :)`} />
        </View>
        <Image
          source={require('../../assets/img/store_banner.png')}
          style={{
            maxWidth: deviceWidth * 0.35,
            maxHeight: deviceWidth * 0.35
          }}
          resizeMode="contain"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AddedStore />
        <PayRoll />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoreTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
