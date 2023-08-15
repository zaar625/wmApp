import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import SvgIcon from '../SvgIcon';
import DatePicker from 'react-native-date-picker';
import NomalButton from '../buttons/NomarButton';
import format from 'date-fns/format';
import themeChange from '../../util/theme';
import firestore from '@react-native-firebase/firestore';
import { useAddTimeEditing } from '../../api/store/hooks/useTimeEditing';
import { useDispatch } from 'react-redux';
import { closeBottomSheet } from '../../state/slice/bottomSheet';
const TimeModifySheet = ({ data }: any, ref: any) => {
  const themeMode = themeChange();

  const { mutate } = useAddTimeEditing();
  const dispatch = useDispatch();
  const [workModifyInfo, setWorkModifyInfo] = useState({
    reason: '',
    start: '-',
    end: '-'
  });

  const onChangeText = (inputText: string) => {
    setWorkModifyInfo({ ...workModifyInfo, reason: inputText });
  };

  const onsubmit = () => {
    const afterData = {
      date: data.date,
      storeName: data.storeName,
      start: workModifyInfo.start,
      end: workModifyInfo.end
    };

    const queryData = {
      before: data,
      after: afterData,
      createAt: firestore.FieldValue.serverTimestamp(),
      user: 'DMWrTCluLrhJMrI01BVhJK6byFs1',
      reason: workModifyInfo.reason,
      confirm: false
    };

    mutate(
      { storeId: data.storeName, data: queryData },
      {
        onSuccess: () => dispatch(closeBottomSheet())
      }
    );
  };

  return (
    <View style={{ paddingBottom: 20 }}>
      <View style={{ padding: 20 }}>
        <Text style={[styles.title, { color: themeMode.tint }]}>출퇴근 등록 수정</Text>
        <View style={styles.checkWrapper}>
          <SvgIcon name="check" style={styles.icon} color={themeMode.pressIcon} />
          <Text style={{ color: themeMode.tint }}>사유를 간단하게 작성해주세요.</Text>
        </View>
        <TextInput
          onChangeText={onChangeText}
          placeholder="100자 이내로 작성해주세요."
          placeholderTextColor={'#797979'}
          multiline
          maxLength={100}
          style={[styles.textInput, { backgroundColor: themeMode.card }]}
        />
        <Text style={styles.lengthText}>{workModifyInfo.reason.length} / 100</Text>
        <View style={styles.checkWrapper}>
          <SvgIcon name="check" style={styles.icon} color={themeMode.pressIcon} />
          <Text style={{ color: themeMode.tint }}>수정 시간을 작성해주세요.</Text>
        </View>
        {['start', 'end'].map((item, index) => (
          <WorkTime
            key={index}
            title={item}
            timeHandler={setWorkModifyInfo}
            workModifyInfo={workModifyInfo}
          />
        ))}
      </View>
      <NomalButton name="수정" onPress={onsubmit} />
    </View>
  );
};

const WorkTime = ({ title, timeHandler, workModifyInfo }: any) => {
  const themeMode = themeChange();
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const today = new Date();

  const titleName = title === 'start' ? '출근' : '퇴근';

  const formatTime =
    workModifyInfo[title] !== '-' ? format(workModifyInfo[title], 'HH : mm aaa') : '-';

  const workHourOnpress = () => {
    setDatePickerOpen(true);
  };

  return (
    <>
      <Pressable
        style={[styles.workHour, { backgroundColor: themeMode.card }]}
        onPress={workHourOnpress}
      >
        <Text style={{ color: themeMode.tint }}>
          {titleName} : {formatTime}
        </Text>
      </Pressable>
      <DatePicker
        modal
        title={null}
        mode="time"
        confirmText="확인"
        cancelText="취소"
        open={datePickerOpen}
        date={today}
        onConfirm={date => {
          setDatePickerOpen(false);
          timeHandler({ ...workModifyInfo, [title]: date });
        }}
        onCancel={() => {
          setDatePickerOpen(false);
        }}
      />
    </>
  );
};

export default TimeModifySheet;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 20
  },
  checkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },

  icon: {
    marginRight: 10
  },
  textInput: {
    padding: 10,
    borderRadius: 10,
    minHeight: 100,
    color: '#fff'
  },
  lengthText: {
    textAlign: 'right',
    color: '#fff'
  },
  workHour: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  }
});
