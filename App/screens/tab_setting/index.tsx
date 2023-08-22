import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import React from 'react';
import themeChange from '../../util/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInfo from './components/UserInfo';
import Request from './components/Request';
import { ScreenTitle } from '../../common-components/Title';
import Notification from './components/Notification';
import ThemeSetting from './components/ThemeSetting';
import Terms from './components/Terms';
import MyWorkingLog from './components/MyWorkingLog';

const SettingTabScreen = () => {
  const themeMode = themeChange();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeMode.primary }]}
      edges={['top']}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenTitle title={`앱과 내 정보를${`\n`}나에게 맞춰보세요.`} />
        <UserInfo />
        <Request />
        <MyWorkingLog />
        <Notification />
        <ThemeSetting />
        <Terms />

        <Pressable style={styles.openSourceBtn}>
          <Text style={[styles.openSourceText, { color: themeMode.subTint }]}>
            오픈소스 라이선스 보기
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  openSourceBtn: {
    marginVertical: 20
  },
  openSourceText: {
    textDecorationLine: 'underline'
  }
});
