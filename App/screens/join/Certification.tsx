import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import CautionIcon from '../../assets/icon/caution.svg';
import Button from '../../components/Button';

const Certification = () => {
  const phoneAuthFn = () => {
    console.log('인증하기');
  };
  return (
    <View>
      <Text style={styles.label}>본인 인증</Text>
      <View style={styles.requestWrapper}>
        <TextInput
          style={[styles.input, styles.requestInput]}
          placeholder="휴대전화 번호를 입력해주세요"
          inputMode="numeric"
        />
        <Pressable style={({ pressed }) => [styles.requestBtn, { opacity: pressed ? 0.7 : 1 }]}>
          <Text style={styles.BtnText}>인증 요청</Text>
        </Pressable>
      </View>
      <TextInput style={styles.input} placeholder="인증번호를 입력해주세요" inputMode="numeric" />
      <View style={styles.resendWrapper}>
        <View style={styles.cautionIconWrapper}>
          <CautionIcon width={12} height={12} color={'#777B83'} style={{ marginRight: 5 }} />
          <Text style={styles.cautionText}>인증번호를 못받으셨나요?</Text>
        </View>
        <Pressable>
          <Text style={styles.BtnText}>인증번호 재전송</Text>
        </Pressable>
      </View>
      <Button name="인증하기" onPress={phoneAuthFn} />
    </View>
  );
};

export default Certification;

const styles = StyleSheet.create({
  label: {
    marginBottom: 20,
    color: '#fff'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#202632',
    paddingBottom: 10,
    color: '#fff',
    fontSize: 16
  },
  requestInput: {
    flex: 1,
    marginRight: 10
  },
  focusedInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#326273'
  },
  requestWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 30
  },
  requestBtn: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#326273',
    borderRadius: 7
  },
  BtnText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '400'
  },
  cautionText: {
    color: '#777B83',
    fontSize: 12
  },
  resendWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30
  },
  cautionIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
