import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import themeChange from '../../util/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import NavigationHeader from '../../common-components/NavigationHeader';
import RequestDetailCard from './components/RequestDetailCard';
import { RootStackParamList } from '../../type';
import { FlatList } from 'react-native-gesture-handler';

type TimeEdittingListScreenRouteProp = RouteProp<RootStackParamList, 'timeEdittingListScreen'>;

const TimeEdittingListScreen = () => {
  const themeMode = themeChange();
  const { params } = useRoute<TimeEdittingListScreenRouteProp>();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
      <NavigationHeader header="근태 수정 현황" />
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20 }}
        bounces={false}
        data={params.data}
        renderItem={({ item }) => <RequestDetailCard data={item} />}
      />
    </SafeAreaView>
  );
};

export default TimeEdittingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
