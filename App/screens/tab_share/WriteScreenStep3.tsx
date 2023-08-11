import { StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import themeChange from '../../util/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationHeader from '../../common-components/NavigationHeader';
import ShareForm from './components/ShareForm';
import Button from '../../common-components/buttons/Button';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { NavigationScreenProps } from '../../type';

const WriteScreenStep3 = ({ navigation }: NavigationScreenProps) => {
  const themeMode = themeChange();
  const { images, store } = useSelector((state: RootState) => state.share);
  const [contents, setContents] = useState({
    title: '',
    content: ''
  });

  const onSubmit = async () => {
    const reference = storage().ref(`/photo/DMWrTCluLrhJMrI01BVhJK6byFs1/`);
    const photosURL: string[] = [];

    if (images) {
      await Promise.all(
        images.map(async (image, index) => {
          const imageRef = reference.child(`image${index}.jpg`);
          await imageRef.putFile(image.uri);
          const photoURL = await imageRef.getDownloadURL(); // 여기서 imageRef를 사용합니다

          photosURL.push(photoURL);
        })
      );
    }

    // 파이어베이스 저장
    const shareLogCollection = firestore()
      .collection('users')
      .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
      .collection('shareLog');

    await shareLogCollection.add({
      user: 'DMWrTCluLrhJMrI01BVhJK6byFs1',
      photosURL,
      content: contents.content,
      store,
      createAt: firestore.FieldValue.serverTimestamp()
    });
    // 매장 로그 저장
    const storeLogCollection = firestore().collection('store').doc(store?.id).collection('log');
    await storeLogCollection.add({
      user: 'DMWrTCluLrhJMrI01BVhJK6byFs1',
      photosURL,
      content: contents.content,
      store,
      createAt: firestore.FieldValue.serverTimestamp()
    });

    navigation.navigate('bottomTab');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
      <NavigationHeader header="공유 내용 작성하기" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View style={styles.contents}>
            <View style={styles.header}>
              <Image source={require('../../assets/img/store.png')} style={styles.image} />
              <Text style={[styles.title, { color: themeMode.tint }]}>
                현재 공유할 매장은 <Text style={styles.titleBold}>카페이루</Text>입니다.
              </Text>
            </View>
            <ShareForm setContents={setContents} contents={contents} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Button name="공유하기" onPress={onSubmit} />
    </SafeAreaView>
  );
};

export default WriteScreenStep3;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 16
  },
  titleBold: {
    fontWeight: '700',
    fontSize: 20
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 30
  },
  contents: {
    paddingHorizontal: 20
  },
  layout: {
    flex: 1,
    justifyContent: 'space-between'
  }
});
