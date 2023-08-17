import {
  StyleSheet,
  Text,
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputEndEditingEventData
} from 'react-native';
import React, { useRef, forwardRef } from 'react';

import themeChange from '../../../util/theme';
import { useDispatch } from 'react-redux';
import { shareInfoSave } from '../../../state/slice/share';
import { deviceheight } from '../../../theme';

type PropsContent = {
  title: string;
  content: string;
};

type Props = {
  setContents: React.Dispatch<React.SetStateAction<PropsContent>>;
  contents: PropsContent;
};

const ShareForm = ({ setContents, contents }: Props) => {
  const themeMode = themeChange();
  const dispatch = useDispatch();
  const titleInputRef = useRef<TextInput>(null);

  const onEndTitleEditing = (event: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    const title = event.nativeEvent.text;
    setContents({ ...contents, title });
    titleInputRef.current?.focus();
  };

  const onEndContentsEditing = (event: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    const content = event.nativeEvent.text;
    setContents({ ...contents, content });
  };

  return (
    <View>
      <Text style={[styles.subTitle, { color: themeMode.pressIcon }]}>제목</Text>
      <TextInput
        // onBlur={onBlur}
        onEndEditing={onEndTitleEditing}
        style={[styles.titleInput, { borderColor: themeMode.card, color: themeMode.tint }]}
        placeholder="제목을 입력해주세요."
        placeholderTextColor={'#797979'}
        defaultValue={contents.title}
      />

      <Text style={[styles.subTitle, { color: themeMode.pressIcon }]}>공유 내용</Text>
      <TextInput
        ref={titleInputRef}
        onEndEditing={onEndContentsEditing}
        style={[styles.contentInput, { borderColor: themeMode.card, color: themeMode.tint }]}
        placeholder="내용을 150자 이내로 작성해주세요."
        multiline
        placeholderTextColor={'#797979'}
        defaultValue={contents.content}
        maxLength={150}
      />
    </View>
  );
};

export default ShareForm;

const styles = StyleSheet.create({
  subTitle: {
    marginBottom: 20
  },
  titleInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 50
  },
  contentInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: deviceheight * 0.328
  },
  titleInputFocused: {
    borderColor: 'blue' // 원하는 포커스된 상태의 스타일
  },
  contentInputFocused: {
    borderColor: 'green' // 원하는 포커스된 상태의 스타일
  }
});
