import { StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import themeChange from '../../util/theme';
import { ScreenTitle, SemiTitle } from '../../components/Title';
import TabHeader from '../../components/TabHeader';
import Working from './components/Working';
import ShareContents from './components/ShareContents';
import ShareWriten from './components/ShareWriten';

const ShareTabScreen = () => {
  const themeMode = themeChange();
  const headerProps = {
    title: `공유된 내용${`\n`}확인하고,  나도${`\n`}공유하고`,
    image: require('../../assets/img/share_banner.png')
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeMode.primary }]}
      edges={['top']}
    >
      <ScrollView>
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
