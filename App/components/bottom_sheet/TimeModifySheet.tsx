import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Keyboard, Pressable } from 'react-native';
import BottomSheet, { BottomSheetTextInput, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { deviceheight } from '../../theme';
import SvgIcon from '../SvgIcon';
import DatePicker from 'react-native-date-picker';

const TimeModifySheet = () => {
  const [inputText, setInputText] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [100, 500], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const onChangeText = (inputText: string) => {
    setInputText(inputText);
  };

  // renders
  return (
    // <View style={styles.container}>
    <View
      style={{
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}
    >
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        keyboardBehavior="extend"
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: '#30394B' }}
        handleIndicatorStyle={{ backgroundColor: '#fff' }}
        style={{ backgroundColor: 'red' }}
      >
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>출퇴근 등록 수정</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SvgIcon name="check" color={'#979696'} style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff' }}>사유를 간단하게 작성해주세요.</Text>
          </View>
          <BottomSheetTextInput
            style={[styles.input, { backgroundColor: '#202632' }]}
            onEndEditing={() => Keyboard.dismiss()}
            placeholder="100자 이내로 작성해주세요."
            multiline
            placeholderTextColor={'#797979'}
            value={inputText}
            onChangeText={onChangeText}
            maxLength={100}
          />
          <Text style={{ textAlign: 'right', color: '#fff', fontWeight: '600' }}>
            {inputText.length} / 100
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SvgIcon name="check" color={'#979696'} style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff' }}>수정 시간을 작성해 주세요.</Text>
          </View>
          <View>
            <Pressable
              onPress={() => setOpen(!open)}
              style={{
                padding: 10,
                backgroundColor: '#202632',
                borderRadius: 10,
                marginBottom: 10
              }}
            >
              <Text>출근:</Text>
            </Pressable>
            <Pressable style={{ padding: 10, backgroundColor: '#202632', borderRadius: 10 }}>
              <Text>퇴근:</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
      <DatePicker
        title={null}
        confirmText="확인"
        cancelText="취소"
        theme="auto"
        modal
        textColor="#fff"
        mode="time"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>

    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
    position: 'absolute',
    width: '100%',
    height: deviceheight
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    borderRadius: 10,
    fontSize: 14,
    lineHeight: 20,
    padding: 10,
    height: 100,
    color: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center'
  }
});

export default TimeModifySheet;
