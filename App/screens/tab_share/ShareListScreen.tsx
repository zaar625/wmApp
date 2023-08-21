import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import themeChange from '../../util/theme';
import NavigationHeader from '../../common-components/NavigationHeader';
import { useTotalLogsData } from '../../api/store/hooks/useLogsData';
import ShareListItem from './components/ShareListItem';

const ShareListScreen = () => {
  const themeMode = themeChange();

  const { data } = useTotalLogsData();

  const render = () => {
    if (data && data.length > 0) {
      return <FlatList data={data} renderItem={({ item }) => <ShareListItem item={item} />} />;
    } else {
      return (
        <View style={styles.noneList}>
          <Text style={{ color: themeMode.subTint }}>금일 전달사항이 없습니다.</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
      <NavigationHeader header="매장별 전달 사항" />
      {render()}
      {/* <Button title="다음장" color={'#fff'} onPress={() => setPage(page + 1)} /> */}
    </SafeAreaView>
  );
};

export default ShareListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  noneList: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
