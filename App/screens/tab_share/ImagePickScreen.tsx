import { StyleSheet, FlatList, Pressable, View, Text, Image } from 'react-native';
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
import { onLaunchImageLibrary } from '../../util/onLaunchImageLibrary';

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
    onLaunchImageLibrary();
  }, []);

  const onComplateBtn = async () => {
    // dispatch(shareInfoSave({ uris: selectImage }));
    // navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: themeMode.primary }}>
      <NavigationHeader header="공유할 사진 선택하기">
        <Pressable onPress={onComplateBtn}>
          <Text style={[{ color: themeMode.subTint }, styles.headerRightBtn]}>선택완료</Text>
        </Pressable>
      </NavigationHeader>
      {/* {phoneImages && (
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
      )} */}
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
