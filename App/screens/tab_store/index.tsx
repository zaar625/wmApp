import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddedStore from './components/AddedStore';
import PayRoll from './components/PayRoll';
import { ScreenTitle } from '../../common-components/Title';
import WorkingStore from './components/WorkingStore';
import { useQueryClient } from '@tanstack/react-query';
import themeChange from '../../util/theme';

import auth from '@react-native-firebase/auth';

const StoreTabScreen = () => {
  const themeMode = themeChange();

  const queryClient = useQueryClient();
  const user = auth().currentUser;
  console.log(user);

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
        style={[styles.container, { backgroundColor: themeMode.primary }]}
        edges={['top']}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={themeMode.refresh}
            />
          }
        >
          <ScreenTitle
            title={`안녕하세요. ${user?.displayName}님,${`\n`}오늘하루 화이팅입니다 :)`}
          />
          <AddedStore />
          <WorkingStore name={user?.displayName} />
          <PayRoll />
        </ScrollView>
      </SafeAreaView>
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
