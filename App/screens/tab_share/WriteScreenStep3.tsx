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
import { useQueryClient } from '@tanstack/react-query';
import ErrorGuide from '../../common-components/ErrorGuide';
import { imageUpLoad } from '../../util/imageUpLoad';
import { useAddLog } from '../../api/store/hooks/useAddLog';

const WriteScreenStep3 = ({ navigation }: NavigationScreenProps) => {
  const themeMode = themeChange();
  const queryClient = useQueryClient();
  const { mutate } = useAddLog();
  const { images, store } = useSelector((state: RootState) => state.share);
  const [contents, setContents] = useState({
    title: '',
    content: ''
  });

  const [buttonActive, setButtonActive] = useState<boolean | null>(null);

  const onSubmit = async () => {
    const isFilledForm = contents.title.length > 0 && contents.content.length > 0;

    if (!isFilledForm) {
      setButtonActive(isFilledForm);
      return;
    }

    const photosURL = await imageUpLoad(images);

    const uploadData = {
      user: 'DMWrTCluLrhJMrI01BVhJK6byFs1',
      photosURL,
      title: contents.title,
      content: contents.content,
      store,
      createAt: firestore.FieldValue.serverTimestamp()
    };

    mutate(
      { store, data: uploadData },
      {
        onSuccess: () => {
          navigation.navigate('bottomTab');
          queryClient.invalidateQueries({ queryKey: ['total-logs'] });
        }
      }
    );
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
            {buttonActive === false && (
              <ErrorGuide message="앗! 제목과 내용을 작성했는지 확인해주세요." />
            )}
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
