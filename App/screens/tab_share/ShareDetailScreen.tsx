import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import NavigationHeader from '../../common-components/NavigationHeader';
import themeChange from '../../util/theme';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../type';
import CircleSubTitle from '../../common-components/CircleSubTitle';

import { deviceWidth, deviceheight } from '../../theme';
import Button from '../../common-components/buttons/Button';

type ShareDetailScreenRouteProp = RouteProp<RootStackParamList, 'shareDetailScreen'>;

const IMAGE_WIDHT = (deviceWidth - 40) / 3 - 10;

const ShareDetailScreen = () => {
  const themeMode = themeChange();
  const { params } = useRoute<ShareDetailScreenRouteProp>();
  const [temp, setTemp] = useState(true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
      <View>
        <NavigationHeader header={params.header} />
        <View style={styles.contents}>
          <View style={styles.shareImageContainer}>
            <CircleSubTitle title="공유된 사진" />

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
          <CircleSubTitle title="공유 내용" />
          <TextInput
            style={styles.inputBox}
            value={'예시입니다.'}
            multiline
            editable={false}
            placeholderTextColor={'#797979'}
          />
        </View>
      </View>

      <Button name="확인" onPress={() => {}} />
    </SafeAreaView>
  );
};

export default ShareDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  contents: {
    paddingHorizontal: 20
  },
  shareImageContainer: { marginVertical: 20 },
  imagesWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
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
    marginVertical: 10,
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
    marginVertical: 10,
    color: '#fff'
  }
});
