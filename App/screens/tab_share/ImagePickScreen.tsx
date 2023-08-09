import { StyleSheet, FlatList, Pressable, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import ImageBox from './components/ImageBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { shareInfoSave } from '../../state/slice/share';
import { openModal } from '../../state/slice/modal';
import NavigationHeader from '../../common-components/NavigationHeader';
import themeChange from '../../util/theme';
import { NavigationScreenProps } from '../../type';

type TPhotos = {
  photos: Array<PhotoIdentifier>;
};

const ImagePickScreen = ({ navigation }: NavigationScreenProps) => {
  const dispatch = useDispatch();
  const themeMode = themeChange();
  const [phoneImages, setPhoneImages] = useState<TPhotos>();
  const [pageCount, setPageCount] = useState(1);
  const { uris: stateURIList } = useSelector((state: RootState) => state.share);
  const [selectImage, setSelectImage] = useState(stateURIList);

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 50 * pageCount,
      assetType: 'Photos'
    })
      .then(res => {
        setPhoneImages({ photos: res.edges });
      })
      .catch(err => {
        //Error Loading Images
      });
  }, [pageCount]);

  const onImageTouchHandler = (item: PhotoIdentifier) => {
    const imageURI = item.node.image.uri;
    const isSameURI = selectImage.some(uri => uri === imageURI);

    if (isSameURI) {
      const removeURI = selectImage.filter(uri => uri !== imageURI);
      setSelectImage(removeURI);
      return;
    }

    const stateURILength = selectImage.length;

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
    setSelectImage([...selectImage, imageURI]);
  };

  const onComplateBtn = () => {
    dispatch(shareInfoSave({ uris: selectImage }));
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: themeMode.primary }}>
      <NavigationHeader header="공유할 사진 선택하기">
        <Pressable onPress={onComplateBtn}>
          <Text style={[{ color: themeMode.subTint }, styles.headerRightBtn]}>선택완료</Text>
        </Pressable>
      </NavigationHeader>
      {phoneImages && (
        <FlatList
          bounces={false}
          data={phoneImages.photos}
          numColumns={4}
          onEndReached={() => setPageCount(pageCount + 1)}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => onImageTouchHandler(item)}>
              <ImageBox item={item} index={index} selectImage={selectImage} />
            </Pressable>
          )}
        />
      )}
    </View>
  );
};

export default ImagePickScreen;

const styles = StyleSheet.create({
  container: {},
  headerRightBtn: {
    fontWeight: '700',
    fontSize: 12,
    textDecorationLine: 'underline'
  }
});
