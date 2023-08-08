import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

import { ScreenTitle } from './Title';

import { colors, deviceWidth } from '../theme';

type TProps = {
  title: string;
  image: any;
};

const TabHeader = ({ contents }: { contents: TProps }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <ScreenTitle title={contents.title} />
    </View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({});
