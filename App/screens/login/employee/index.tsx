import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable
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
        {/* 버튼 */}
        <Pressable style={({ pressed }) => [styles.Btn, { opacity: pressed ? 0.6 : 1 }]}>
          <Text style={styles.btnText}>로그인</Text>
        </Pressable>
        {/* 회원가입 및 비밀번호 */}
        <View style={styles.subBtn}>
          <Text style={[styles.subBtnText]}>회원가입</Text>
          <View
            style={{ height: '60%', backgroundColor: '#C9C9C9', width: 1, marginHorizontal: 10 }}
          />
          <Text style={styles.subBtnText}>비밀번호찾기</Text>
        </View>
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
  },
  Btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#326273',
    borderRadius: 10
  },
  btnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff'
  },
  subBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  subBtnText: {
    color: '#fff'
  }
});
