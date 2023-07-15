import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

export default React.forwardRef(function InputBox({ fn }: any, ref: any) {
  console.log(ref);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>이메일</Text>
      <TextInput
        ref={ref}
        placeholder="이메일을 입력해주세요"
        style={styles.input}
        onSubmitEditing={fn}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    marginBottom: 20
  },
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
  focusedInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#326273'
  }
});
