import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput
} from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import InputBox from '../InputBox';

export default function EmployeeLoginPage() {
  const inputBoxRef1 = useRef(null);
  const inputBoxRef2 = useRef<null | TextInput>(null);

  const handleInputBox01Submit = () => {
    console.log('click');
    inputBoxRef2.current?.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.bg}>
        <Text style={styles.titleText}>로그인하기</Text>
        {/* 인풋박스 */}
        <InputBox fn={handleInputBox01Submit} />
        <InputBox ref={inputBoxRef2} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#30394B',
    flex: 1,
    paddingHorizontal: 20
  },
  titleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginBottom: 40
  }
});
