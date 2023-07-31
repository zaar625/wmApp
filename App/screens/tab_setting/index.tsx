import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import themeChange from '../../util/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInfo from './UserInfo';
import User from '../../state/slice/user';
import TabHeader from '../../components/TabHeader';

const SettingTabScreen = () => {
  const themeMode = themeChange();
  const headerContents = {
    title: `앱과 내정보를${`\n`}나에게 맞춰보세요.`,
    image: require('../../assets/img/setting_banner.png')
  };
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeMode.primary }]}
      edges={['top']}
    >
      <TabHeader contents={headerContents} />
      <ScrollView>
        <UserInfo />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
