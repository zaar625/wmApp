import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import CircleSubTitle from '../../../common/CircleSubTitle';
import SvgIcon from '../../../components/SvgIcon';
import { deviceWidth, deviceheight } from '../../../theme';
import ErrorGuide from '../../../components/ErrorGuide';

const IMAGE_WIDHT = (deviceWidth - 40) / 3 - 10;

const ImagePick = () => {
  const [temp, setTemp] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  const onChangeText = (inputText: string) => {
    setShareMessage(inputText);
  };
  return (
    <View style={styles.container}>
      <CircleSubTitle title="사진 첨부" />

      <Pressable style={styles.imagePickBtn}>
        <View style={styles.iconWrapper}>
          <SvgIcon color={'#326273'} name="camera" style={styles.icon} />
          <Text style={styles.btnText}>공유할 이미지 선택</Text>
          <Text>
            0<Text>/3</Text>
          </Text>
        </View>
      </Pressable>

      <View>
        {temp ? (
          <View style={styles.imagesWrapper}>
            {[1, 2, 3].map(() => (
              <View style={styles.imgContainer}></View>
            ))}
          </View>
        ) : (
          <View style={styles.noImageWrapper}>
            <Text style={{ color: '#BAC0CE' }}>공유할 이미지가 없습니다.</Text>
          </View>
        )}
      </View>

      <CircleSubTitle title="공유 내용 입력" />
      <TextInput
        onChangeText={onChangeText}
        style={styles.inputBox}
        placeholder="내용을 150자 이내로 작성해주세요."
        multiline
        placeholderTextColor={'#797979'}
      />
      <Text style={styles.lengthText}>0/150</Text>
      <ErrorGuide message="공유할 내용을 입력해주세요." />
    </View>
  );
};

export default ImagePick;

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
  btnText: {
    marginRight: 8,
    color: '#fff'
  },
  imagesWrapper: {
    flexDirection: 'row',
    // width: deviceWidth - 40,
    height: IMAGE_WIDHT,
    backgroundColor: 'gray',
    justifyContent: 'space-between'
  },
  imgContainer: {
    borderRadius: 10,
    width: IMAGE_WIDHT,
    height: IMAGE_WIDHT,
    backgroundColor: 'red'
  },
  noImageWrapper: {
    height: IMAGE_WIDHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: '#D9D9D9',
    height: deviceheight * 0.328,
    marginVertical: 10
  },
  lengthText: {
    textAlign: 'right'
  }
});
