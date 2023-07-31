import { StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { colors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { ThemeContext } from '../../theme/themeContext';

import AddedStore from './AddedStore';
import PayRoll from './PayRoll';
import TabHeader from '../../components/TabHeader';

const StoreTabScreen = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = theme.mode && colors[theme.mode];

  const tabHeaderProps = {
    title: `안녕하세요.${`\n`}돈모아님, 오늘하루 화이팅입니다 :)`,
    image: require('../../assets/img/store_banner.png')
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColor.primary }]}
      edges={['top']}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TabHeader contents={tabHeaderProps} />
        <AddedStore />
        <PayRoll />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoreTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
