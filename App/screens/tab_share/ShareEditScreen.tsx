import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../type';
import themeChange from '../../util/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationHeader from '../../common-components/NavigationHeader';
import ImageSelect from './components/ImageSelect';
import type { Response } from '@bam.tech/react-native-image-resizer';
import ShareForm from './components/ShareForm';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../common-components/buttons/Button';
import { imageUpLoad } from '../../util/imageUpLoad';
import firestore from '@react-native-firebase/firestore';
import { useEditLog } from '../../api/store/hooks/useEditLog';

const ShareEditScreen = ({
  route
}: NativeStackScreenProps<RootStackParamList, 'shareEditScreen'>) => {
  const { data } = route.params;

  const themeMode = themeChange();
  const { mutate } = useEditLog();
  const scrollRef = useRef<ScrollView>(null);

  const [pickImages, setPickImages] = useState<Response[] | undefined>();
  const [contents, setContents] = useState({
    title: data.title,
    content: data.content
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => {
      const TOP_OFFSET = 200;
      scrollRef?.current?.scrollTo({ y: TOP_OFFSET });
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const onSubmit = async () => {
    const photosURL = await imageUpLoad(pickImages);

    const uploadData = {
      id: data.id,
      user: 'DMWrTCluLrhJMrI01BVhJK6byFs1',
      photosURL,
      title: contents.title,
      content: contents.content,
      store: data.store,
      createAt: firestore.FieldValue.serverTimestamp()
    };

    mutate(uploadData);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
      <NavigationHeader header="공유 내용 수정하기" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView ref={scrollRef}>
          <ImageSelect pickImages={pickImages} setPickImages={setPickImages} />
          <View style={{ paddingHorizontal: 20 }}>
            <ShareForm contents={contents} setContents={setContents} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Button name="수정하기" onPress={onSubmit} />
    </SafeAreaView>
  );
};

export default ShareEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
