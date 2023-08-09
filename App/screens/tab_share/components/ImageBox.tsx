import { StyleSheet, View, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import SvgIcon from '../../../common-components/SvgIcon';
import { deviceWidth } from '../../../theme';
import { RootState } from '../../../state/store';
import { useSelector, useDispatch } from 'react-redux';
import { shareInfoSave } from '../../../state/slice/share';
import { openModal } from '../../../state/slice/modal';

const ImageBox = ({ item, index }: { item: PhotoIdentifier; index: number }) => {
  const itemUri = item.node.image.uri;
  const { uri: stateURIList } = useSelector((state: RootState) => state.share);
  const isSameURI = stateURIList.some(uri => uri === item.node.image.uri);

  return (
    <View
      style={{
        width: (deviceWidth - 8) / 4,
        height: (deviceWidth - 8) / 4,
        margin: 1
      }}
    >
      <Image
        key={index}
        resizeMode="cover"
        style={{
          width: (deviceWidth - 8) / 4,
          height: (deviceWidth - 8) / 4
        }}
        source={{ uri: item.node.image.uri }}
      />
      {isSameURI && (
        <SvgIcon
          name="check_round"
          style={{ position: 'absolute', top: 0, right: 0 }}
          color={'#00B712'}
        />
      )}
    </View>
  );
};

export default ImageBox;

const styles = StyleSheet.create({});
