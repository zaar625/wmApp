import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import CircleSubTitle from '../../../common-components/CircleSubTitle';
import SvgIcon from '../../../common-components/SvgIcon';
import { deviceWidth } from '../../../theme';
import themeChange from '../../../util/theme';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { useDispatch } from 'react-redux';
import ShareForm from './ShareForm';
import { FlatList } from 'react-native-gesture-handler';

const PADDING = 20;
const IMAGEGAP = 10;
const IMAGE_WIDHT = (deviceWidth - PADDING * 2 - IMAGEGAP * 2) / 3;

const ImageSelect = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const themeMode = themeChange();
  const dispatch = useDispatch();
  const { uris: selectedImages, content } = useSelector((state: RootState) => state.share);

  const handleButtonPress = () => {
    navigation.navigate('imagePickScreen');
  };

  return (
    <View style={styles.container}>
      <CircleSubTitle title="사진 첨부" />

      <Pressable style={styles.imagePickBtn} onPress={handleButtonPress}>
        <View style={styles.iconWrapper}>
          <SvgIcon color={'#326273'} name="camera" style={styles.icon} />
          <Text style={[styles.imagePickBtnText, { color: themeMode.subTint }]}>
            공유할 이미지 선택
          </Text>
          <Text style={{ color: themeMode.subTint }}>
            <Text style={{ fontWeight: 'bold' }}>{selectedImages.length}</Text> / 3
          </Text>
        </View>
      </Pressable>

      <View style={{ marginBottom: 30 }}>
        {selectedImages.length > 0 ? (
          <View style={styles.imagesWrapper}>
            {selectedImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
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
      <ShareForm />
    </View>
  );
};

export default ImageSelect;

const styles = StyleSheet.create({
  container: {
    padding: 20
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
