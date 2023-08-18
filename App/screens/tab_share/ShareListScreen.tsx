import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import themeChange from '../../util/theme';
import NavigationHeader from '../../common-components/NavigationHeader';
import { useTotalLogsData } from '../../api/store/hooks/useLogsData';
import ShareItem from './components/ShareItem';

const ShareListScreen = () => {
  const themeMode = themeChange();
  const { data } = useTotalLogsData();

  const render = () => {
    if (data && data.length > 0) {
      return data.map((item, index) => <ShareItem key={index} item={item} />);
    } else {
      return <Text style={{ color: themeMode.subTint }}>금일 전달사항이 없습니다.</Text>;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
      <NavigationHeader header="매장별 전달 사항" />
      <View style={styles.listContainer}>{render()}</View>
    </SafeAreaView>
  );
};

export default ShareListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    paddingHorizontal: 20
  }
});
