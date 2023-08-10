import {
  StyleSheet,
  Text,
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputEndEditingEventData
} from 'react-native';
import React, { useRef } from 'react';
import CircleSubTitle from '../../../common-components/CircleSubTitle';
import themeChange from '../../../util/theme';
import { useDispatch } from 'react-redux';
import { shareInfoSave } from '../../../state/slice/share';
import { deviceheight } from '../../../theme';

const ShareForm = () => {
  const themeMode = themeChange();
  const dispatch = useDispatch();
  const titleInputRef = useRef<TextInput>(null);

  const onEndTitleEditing = (event: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    const title = event.nativeEvent.text;
    titleInputRef.current?.focus();
    dispatch(shareInfoSave({ title: title }));
  };

  const onEndContentsEditing = (event: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    const shareContent = event.nativeEvent.text;
    dispatch(shareInfoSave({ content: shareContent }));
  };

  return (
    <View>
      <CircleSubTitle title="공유 제목" />
      <TextInput
        onEndEditing={onEndTitleEditing}
        style={[styles.titleInput, { borderColor: themeMode.card, color: themeMode.tint }]}
        placeholder="제목을 입력해주세요."
        placeholderTextColor={'#797979'}
      />

      <CircleSubTitle title="공유 내용 입력" />
      <TextInput
        ref={titleInputRef}
        onEndEditing={onEndContentsEditing}
        style={[styles.contentInput, { borderColor: themeMode.card, color: themeMode.tint }]}
        placeholder="내용을 150자 이내로 작성해주세요."
        multiline
        placeholderTextColor={'#797979'}
        maxLength={150}
      />
    </View>
  );
};

export default ShareForm;

const styles = StyleSheet.create({
  titleInput: {
    padding: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 10
  },
  contentInput: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: deviceheight * 0.328
  }
});
