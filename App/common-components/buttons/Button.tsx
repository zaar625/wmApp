import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

type Props = {
  name: string;
  onPress: () => void;
};

//높이가 높은 버튼입니다.
const Button = ({ name, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.5 : 1 }]}
    >
      <Text style={styles.btnText}>{name}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#326273',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 21,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700'
  }
});
