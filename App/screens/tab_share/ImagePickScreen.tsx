import { StyleSheet, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import ImageBox from './components/ImageBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { shareInfoSave } from '../../state/slice/share';
import { openModal } from '../../state/slice/modal';

type TPhotos = {
  photos: Array<PhotoIdentifier>;
};

const ImagePickScreen = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState<TPhotos>();
  const [pageCount, setPageCount] = useState(1);
  const { uri: stateURI } = useSelector((state: RootState) => state.share);

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 50 * pageCount,
      assetType: 'Photos'
    })
      .then(res => {
        // console.log(res);
        setImages({ photos: res.edges });
      })
      .catch(err => {
        //Error Loading Images
      });
  }, [pageCount]);

  const onImageTouchHandler = (item: PhotoIdentifier) => {
    const imageURI = item.node.image.uri;
    const isSameURI = stateURI.some(uri => uri === imageURI);

    if (isSameURI) {
      const removeURI = stateURI.filter(uri => uri !== imageURI);
      dispatch(shareInfoSave(removeURI));

      return;
    }

    const stateURILength = stateURI.length;

    if (stateURILength > 2) {
      dispatch(
        openModal({
          modalType: 'OneBtnModal',
          contents: {
            title: '이미지 최대 3장 첨부',
            content: '이미지는 최대 3장까지 첨부할 수 있습니다.',
            onPress() {}
          }
        })
      );
      return;
    }
    dispatch(shareInfoSave([...stateURI, imageURI]));
  };

  return (
    <>
      {images && (
        <FlatList
          bounces={false}
          data={images.photos}
          numColumns={4}
          onEndReached={() => setPageCount(pageCount + 1)}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => onImageTouchHandler(item)}>
              <ImageBox item={item} index={index} />
            </Pressable>
          )}
        />
      )}
    </>
  );
};

export default ImagePickScreen;

const styles = StyleSheet.create({});
