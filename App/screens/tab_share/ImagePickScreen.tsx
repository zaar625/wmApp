import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

import { deviceWidth } from '../../theme';

type TPhotos = {
  photos: Array<PhotoIdentifier>;
};

const ImagePickScreen = () => {
  const [images, setImages] = useState<TPhotos>();
  console.log(images);

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos'
    })
      .then(res => {
        setImages({ photos: res.edges });
      })
      .catch(err => {
        //Error Loading Images
      });
  }, []);
  return (
    <>
      {images && (
        <FlatList
          data={images.photos}
          numColumns={4}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: (deviceWidth - 8) / 4,
                height: (deviceWidth - 8) / 4,
                backgroundColor: 'red',
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
            </View>
          )}
        />
      )}
    </>
  );
};

export default ImagePickScreen;

const styles = StyleSheet.create({});
