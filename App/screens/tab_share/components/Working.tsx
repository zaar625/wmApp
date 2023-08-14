import { Image, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import themeChange from '../../../util/theme';
import SvgIcon from '../../../common-components/SvgIcon';
import { useDispatch } from 'react-redux';
import { openBottomSheet } from '../../../state/slice/bottomSheet';
import { useRoute } from '@react-navigation/native';
import WorkingCard from './WorkingCard';
import { deviceWidth } from '../../../theme';

const Working = () => {
  const themeMode = themeChange();
  const route = useRoute();
  const dispatch = useDispatch();

  const modifyRequestOnPress = () => {
    dispatch(openBottomSheet({ route: 'shareTabScreen' }));
  };

  const dumi = [1, 2, 3];

  const gap = 10;
  const offset = 16;

  return (
    <FlatList
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={{
        paddingHorizontal: offset + gap / 2
      }}
      decelerationRate="fast"
      horizontal
      pagingEnabled
      snapToInterval={deviceWidth - 60 + gap}
      snapToAlignment="start"
      showsHorizontalScrollIndicator={false}
      data={dumi}
      renderItem={({ item }) => <WorkingCard />}
    />
  );
};

export default Working;

const styles = StyleSheet.create({});
