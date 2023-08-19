import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { colors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { ThemeContext } from '../../theme/themeContext';
import AddedStore from './components/AddedStore';
import PayRoll from './components/PayRoll';
import { ScreenTitle } from '../../common-components/Title';
import WorkingStore from './components/WorkingStore';
import { useQueryClient } from '@tanstack/react-query';
import Loader from '../../common-components/Loader';

const StoreTabScreen = () => {
  const { theme } = useContext(ThemeContext);
  let activeColor = theme.mode && colors[theme.mode];
  const queryClient = useQueryClient();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    queryClient.refetchQueries({ queryKey: ['myStoreList', 'work-date'] });

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <SafeAreaView
        style={[styles.container, { backgroundColor: activeColor.primary }]}
        edges={['top']}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <ScreenTitle title={`안녕하세요. 이상윤님,${`\n`}오늘하루 화이팅입니다 :)`} />
          <AddedStore />
          <WorkingStore />
          <PayRoll />
        </ScrollView>
      </SafeAreaView>
      <Loader />
    </>
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
