import {
  Image,
  StyleSheet,
  Text,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { deviceWidth, deviceheight } from '../../../theme';
import FastImage from 'react-native-fast-image';

const ImageCarousel = ({ photosURL, imageHeigt }: { photosURL: string[]; imageHeigt: number }) => {
  const [page, setPage] = useState(0);

  const updateCurrentSlidePage = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / deviceWidth);

    setPage(currentIndex);
  };
  return (
    <View style={styles.container}>
      <FlatList
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlidePage}
        data={photosURL}
        horizontal
        pagingEnabled
        renderItem={({ item, index }) => (
          <Image
            resizeMode="cover"
            source={{ uri: photosURL[index] }}
            style={{
              width: deviceWidth,
              height: deviceheight * 0.307 - imageHeigt
            }}
          />
        )}
      />
      <View style={styles.indicatorWrapper}>
        {photosURL.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              page === index && {
                backgroundColor: '#fff'
              }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  indicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center'
  },
  indicator: {
    height: 6,
    width: 6,
    backgroundColor: 'gray',
    marginHorizontal: 3,
    borderRadius: 50
  }
});
