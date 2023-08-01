import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable } from 'react-native';
import React, { useState, forwardRef } from 'react';
import SvgIcon from '../SvgIcon';
import DatePicker from 'react-native-date-picker';
import NomalButton from '../buttons/NomarButton';
import format from 'date-fns/format';

const TimeModifySheet = () => {
  const [workModifyInfo, setWorkModifyInfo] = useState({
    reason: '',
    출근: '',
    퇴근: ''
  });

  const onChangeText = (inputText: string) => {
    setWorkModifyInfo({ ...workModifyInfo, reason: inputText });
  };

  return (
    <View style={{ paddingBottom: 20 }}>
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>출퇴근 등록 수정</Text>
        <View style={styles.checkWrapper}>
          <SvgIcon name="check" style={styles.icon} />
          <Text style={styles.text}>사유를 간단하게 작성해주세요.</Text>
        </View>
        <TextInput
          onChangeText={onChangeText}
          placeholder="100자 이내로 작성해주세요."
          placeholderTextColor={'#797979'}
          multiline
          maxLength={100}
          style={styles.textInput}
        />
        <Text style={styles.lengthText}>{workModifyInfo.reason.length} / 100</Text>
        <View style={styles.checkWrapper}>
          <SvgIcon name="check" style={styles.icon} />
          <Text style={styles.text}>수정 시간을 작성해주세요.</Text>
        </View>
        {['출근', '퇴근'].map((item, index) => (
          <WorkTime
            key={index}
            title={item}
            timeHandler={setWorkModifyInfo}
            workModifyInfo={workModifyInfo}
          />
        ))}
      </View>
      <NomalButton name="수정" onPress={() => console.log('수정')} />
    </View>
  );
};

const WorkTime = ({ title, timeHandler, workModifyInfo }: any) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const today = new Date();

  const workHourOnpress = () => {
    setDatePickerOpen(true);
  };

  return (
    <>
      <Pressable style={styles.workHour} onPress={workHourOnpress}>
        <Text style={styles.text}>{title} :</Text>
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
          timeHandler({ ...workModifyInfo, [title]: format(date, 'HH : mm aaa') });
        }}
        onCancel={() => {
          setDatePickerOpen(false);
        }}
      />
    </>
  );
};

export default forwardRef(TimeModifySheet);

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 20
  },
  checkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  text: {
    color: '#FFF'
  },
  icon: {
    marginRight: 10
  },
  textInput: {
    backgroundColor: '#202632',
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
    backgroundColor: '#202632',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  }
});