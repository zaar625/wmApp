import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import SvgIcon from '../../../common-components/SvgIcon';
import { deviceWidth } from '../../../theme';
import themeChange from '../../../util/theme';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { onLaunchImageLibrary } from '../../../util/onLaunchImageLibrary';
import { onImageResizer } from '../../../util/onImageResizer';
import type { Response } from '@bam.tech/react-native-image-resizer';

const PADDING = 20;
const IMAGEGAP = 10;
const IMAGE_WIDHT = (deviceWidth - PADDING * 2 - IMAGEGAP * 2) / 3;

const ImageSelect = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const themeMode = themeChange();
  const [pickImages, setPickImages] = useState<Response[] | undefined>();

  const handleButtonPress = async () => {
    const imagedata = await onLaunchImageLibrary();

    if (imagedata) {
      const resizingImages = await onImageResizer(imagedata);
      // console.log(resizingImages);

      setPickImages(resizingImages);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: themeMode.pressIcon }}>사진 첨부하기</Text>
      <Pressable style={styles.imagePickBtn} onPress={handleButtonPress}>
        <View style={styles.iconWrapper}>
          <SvgIcon color={'#326273'} name="camera" style={styles.icon} />
          <Text style={[styles.imagePickBtnText, { color: themeMode.subTint }]}>
            공유할 이미지 선택
          </Text>
        </View>
      </Pressable>

      <View style={{ marginBottom: 30 }}>
        {pickImages ? (
          <View style={styles.imagesWrapper}>
            {pickImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.path }}
                style={styles.imgContainer}
                resizeMode="cover"
              />
            ))}
          </View>
        ) : (
          <View style={styles.noImageWrapper}>
            <Text style={{ color: themeMode.subTint }}>공유할 이미지가 없습니다.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ImageSelect;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  imagePickBtn: {
    paddingVertical: 13,
    borderWidth: 2,
    borderColor: '#326273',
    borderRadius: 10,
    marginVertical: 15
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginRight: 8
  },
  imagePickBtnText: {
    marginRight: 8,
    fontWeight: '600'
  },
  imagesWrapper: {
    flexDirection: 'row',
    gap: 10,
    height: IMAGE_WIDHT
  },
  imgContainer: {
    borderRadius: 10,
    width: IMAGE_WIDHT,
    height: IMAGE_WIDHT
  },
  noImageWrapper: {
    height: IMAGE_WIDHT,
    justifyContent: 'center',
    alignItems: 'center'
  },

  lengthText: {
    textAlign: 'right',
    fontWeight: '600',
    fontSize: 12,
    marginTop: 10
  }
});
