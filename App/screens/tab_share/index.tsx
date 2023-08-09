import { StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import themeChange from '../../util/theme';
import { ScreenTitle, SemiTitle } from '../../common-components/Title';
import Working from './components/Working';
import ShareContents from './components/ShareContents';
import ShareWriten from './components/ShareWriten';

const ShareTabScreen = () => {
  const themeMode = themeChange();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeMode.primary }]}
      edges={['top']}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenTitle title={`공유된 내용 확인하고${`\n`}나도 공유하고`} />
        <SemiTitle title="오늘" style={styles.title} />
        <Working />
        <ShareContents />
        <ShareWriten />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShareTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  title: {
    marginBottom: 20
  }
});
