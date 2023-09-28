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
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../state/slice/modal';
import { useQueryClient } from '@tanstack/react-query';
import ErrorGuide from '../../common-components/ErrorGuide';
import auth from '@react-native-firebase/auth';

const ShareEditScreen = ({
  navigation,
  route
}: NativeStackScreenProps<RootStackParamList, 'shareEditScreen'>) => {
  const { data } = route.params;
  const userID = auth().currentUser;

  const themeMode = themeChange();
  const { mutate } = useEditLog();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const scrollRef = useRef<ScrollView>(null);

  const [pickImages, setPickImages] = useState<Response[] | undefined>();
  const [contents, setContents] = useState({
    title: data.title,
    content: data.content
  });

  const [buttonActive, setButtonActive] = useState<boolean | null>(null);

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
    const isFilledForm = contents.title.length > 0 && contents.content.length > 0;

    if (!isFilledForm) {
      setButtonActive(isFilledForm);
      return;
    }

    const photosURL = await imageUpLoad(pickImages);

    const uploadData = {
      id: data.id,
      user: userID?.uid,
      photosURL,
      title: contents.title,
      content: contents.content,
      store: data.store,
      createAt: firestore.FieldValue.serverTimestamp()
    };

    mutate(uploadData, {
      onSuccess: editSuccess
    });
  };

  const editSuccess = () => {
    dispatch(
      openModal({
        modalType: 'OneBtnModal',
        isOpen: true,
        contents: {
          title: '수정이 완료되었습니다.',
          content: '공유 탭에서 내용을 확인해 주세요.',
          onPress() {
            queryClient.invalidateQueries({ queryKey: ['total-logs'] });
            dispatch(closeModal());
            navigation.navigate('shareTabScreen');
          }
        }
      })
    );
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
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <ShareForm contents={contents} setContents={setContents} />
            {buttonActive === false && (
              <ErrorGuide message="앗! 제목과 내용을 작성했는지 확인해주세요." />
            )}
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
