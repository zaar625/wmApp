import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, deviceWidth } from '../../theme';
import { SemiTitle } from '../../components/Title';
import TabHeader from '../../components/TabHeader';
import Working from './Working';
import ShareContents from './ShareContents';

const ShareTabScreen = () => {
  const headerProps = {
    title: `공유된 내용${`\n`}확인하고,  나도${`\n`}공유하고`,
    image: require('../../assets/img/share_banner.png')
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TabHeader contents={headerProps} />
      <ScrollView>
        <SemiTitle title="오늘" />
        <Working />
        <ShareContents />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShareTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary
  }
});
