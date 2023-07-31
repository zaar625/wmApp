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
      <View style={{ flex: 2 }}>
        <ScreenTitle title={contents.title} />
      </View>
      <Image
        source={contents.image}
        style={{
          maxWidth: deviceWidth * 0.35,
          maxHeight: deviceWidth * 0.35,
          marginRight: 20
        }}
        resizeMode="cover"
      />
    </View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({});
