import { StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { colors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { ThemeContext } from '../../theme/themeContext';
import AddedStore from './components/AddedStore';
import PayRoll from './components/PayRoll';
import { ScreenTitle } from '../../common-components/Title';
import WorkingStore from './components/WorkingStore';

const StoreTabScreen = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = theme.mode && colors[theme.mode];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColor.primary }]}
      edges={['top']}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenTitle title={`안녕하세요. 이상윤님,${`\n`}오늘하루 화이팅입니다 :)`} />
        <AddedStore />
        <WorkingStore />
        <PayRoll />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoreTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
