import { StyleSheet, TouchableWithoutFeedback, Keyboard, View, Image, Text } from 'react-native';
import React, { useState } from 'react';
import themeChange from '../../util/theme';
import NavigationHeader from '../../common-components/NavigationHeader';
import ImageSelect from './components/ImageSelect';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../common-components/buttons/Button';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NavigationScreenProps, RootStackParamList } from '../../type';
import { SemiTitle } from '../../common-components/Title';
import type { Response } from '@bam.tech/react-native-image-resizer';
import { useDispatch } from 'react-redux';
import { shareInfoSave } from '../../state/slice/share';

type WriteScreenRouteProp = RouteProp<RootStackParamList, 'writeScreenStep2'>;

const WriteScreenStep2 = ({ navigation }: NavigationScreenProps) => {
  const themeMode = themeChange();
  const dispatch = useDispatch();
  const [pickImages, setPickImages] = useState<Response[] | undefined>();

  const nextBtn = () => {
    if (pickImages) {
      dispatch(shareInfoSave({ images: pickImages }));
    }
    navigation.navigate('writeScreenStep3');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
        <NavigationHeader header="사진 선택하기" />
        <View style={styles.layout}>
          <View>
            <View style={styles.header}>
              <SemiTitle title="공유할 사진이 있으신가요?" style={{ marginBottom: 20 }} />
              <View style={styles.imageWrapper}>
                <Image source={require('../../assets/img/picture.png')} style={styles.image} />
                <View>
                  <Text style={{ color: themeMode.subTint }}>공유할 사진은 필수가 아니예요!</Text>
                  <Text style={{ color: themeMode.subTint }}>
                    사진은 최대 3장까지만 공유할 수 있어요.
                  </Text>
                </View>
              </View>
            </View>
            <ImageSelect pickImages={pickImages} setPickImages={setPickImages} />
          </View>
          <Button name="다음" onPress={nextBtn} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default WriteScreenStep2;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 20
  },
  imageWrapper: {
    flexDirection: 'row',
    marginBottom: 30
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  layout: {
    justifyContent: 'space-between',
    flex: 1
  }
});
