import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import CautionIcon from '../../assets/icon/caution.svg';

const Certification = () => {
  return (
    <View>
      <Text>본인 인증</Text>
      <View>
        <TextInput />
        <Pressable>
          <Text>인증 요청</Text>
        </Pressable>
      </View>
      <TextInput />
      <View>
        <Text>인증번호를 못받으셨나요?</Text>
        <Pressable>
          <Text>인증번호 재전송</Text>
          <CautionIcon width={15} height={15} fill={'#fff'} />
        </Pressable>
      </View>
    </View>
  );
};

export default Certification;

const styles = StyleSheet.create({});
