import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import themeChange from '../../util/theme';
import { ScreenTitle, SemiTitle } from '../../common-components/Title';
import Working from './components/Working';
import ShareContents from './components/ShareContents';
import ShareWriten from './components/ShareWriten';
import { useQueryClient } from '@tanstack/react-query';

const ShareTabScreen = () => {
  const themeMode = themeChange();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    queryClient.refetchQueries({ queryKey: ['total-logs', 'work-date'] });

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
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
          title={`공유된 내용 확인하고${`\n`}나도 공유하고`}
          style={{ paddingHorizontal: 20 }}
        />
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
    flex: 1
  },
  title: {
    marginBottom: 20,
    paddingHorizontal: 20
  }
});
