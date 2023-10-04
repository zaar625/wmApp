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
import { useAddPersonalWorkHistoryEdit } from '../../api/store/hooks/useAddPersonalWorkHistoryEditList';
import ErrorGuide from '../ErrorGuide';
import { openToast } from '../../state/slice/toast';
import auth from '@react-native-firebase/auth';
import { useQueryClient } from '@tanstack/react-query';

const TimeModifySheet = ({ data }: any) => {
  const themeMode = themeChange();
  const queryClient = useQueryClient();
  const userID = auth().currentUser;
  const { mutate: timeEdittingToManager } = useAddTimeEditing();
  const { mutate: timeEdittingToUser, isLoading } = useAddPersonalWorkHistoryEdit();

  const dispatch = useDispatch();

  const [workModifyInfo, setWorkModifyInfo] = useState({
    reason: '',
    start: null,
    end: null
  });

  const [buttonActive, setButtonActive] = useState<null | boolean>(null);

  const onChangeText = (text: string) => {
    setWorkModifyInfo({ ...workModifyInfo, reason: text });
  };

  const isFilledForm = () => {
    const hasReason = workModifyInfo.reason.length > 0;
    const hasTime = workModifyInfo.start && workModifyInfo.end;
    setButtonActive(hasReason && !!hasTime);

    return hasReason && !!hasTime;
  };

  const onsubmit = async () => {
    const isFilled = isFilledForm();

    const afterData = {
      id: data.id,
      date: data.date,
      storeInfo: data.storeInfo,
      start: workModifyInfo.start,
      end: workModifyInfo.end
    };

    const queryData = {
      before: data,
      after: afterData,
      createAt: firestore.FieldValue.serverTimestamp(),
      user: userID?.uid,
      reason: workModifyInfo.reason,
      confirm: false,
      id: data.id
    };

    if (isFilled) {
      try {
        await Promise.all([
          timeEdittingToManager({ storeId: data.storeName, data: queryData }),
          timeEdittingToUser({ data: queryData })
        ]).then(() => {
          dispatch(closeBottomSheet());
          queryClient.invalidateQueries({ queryKey: ['request-personal'] });
          setTimeout(() => {
            dispatch(openToast({ message: `근태수정 요청이 완료되었습니다.` }));
          }, 500);
        });
      } catch {
        console.log('error');
      }
    }
  };

  return (
    <View style={{ paddingBottom: 20 }}>
      <View style={{ padding: 20 }}>
        <Text style={[styles.title, { color: themeMode.tint }]}>출퇴근 등록 수정</Text>
        <View style={styles.checkWrapper}>
          <SvgIcon
            name="check"
            style={styles.icon}
            color={workModifyInfo.reason.length > 0 ? '#52C648' : themeMode.pressIcon}
          />
          <Text style={{ color: themeMode.tint }}>사유를 간단하게 작성해주세요.</Text>
        </View>
        <TextInput
          onFocus={() => setButtonActive(null)}
          onChangeText={onChangeText}
          placeholder="100자 이내로 작성해주세요."
          placeholderTextColor={'#797979'}
          multiline
          maxLength={100}
          style={[styles.textInput, { backgroundColor: themeMode.card }]}
        />

        <View style={styles.checkWrapper}>
          <SvgIcon
            name="check"
            style={styles.icon}
            color={workModifyInfo.start && workModifyInfo.end ? '#52C648' : themeMode.pressIcon}
          />
          <Text style={{ color: themeMode.tint }}>수정 시간을 작성해주세요.</Text>
        </View>
        {['start', 'end'].map((item, index) => (
          <WorkTime
            key={index}
            title={item}
            timeHandler={setWorkModifyInfo}
            workModifyInfo={workModifyInfo}
            setButtonActive={setButtonActive}
          />
        ))}

        {buttonActive === false && <ErrorGuide message="입력되지 않은 항목이 있습니다." />}
      </View>
      <NomalButton name="수정" onPress={onsubmit} isActive={isLoading} />
    </View>
  );
};

const WorkTime = ({ title, timeHandler, workModifyInfo, setButtonActive }: any) => {
  const themeMode = themeChange();
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const today = new Date();

  const titleName = title === 'start' ? '출근' : '퇴근';

  const formatTime = workModifyInfo[title] ? format(workModifyInfo[title], 'HH : mm aaa') : '-';

  const workHourOnpress = () => {
    setButtonActive(null);
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
    marginBottom: 10,
    marginTop: 20
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
