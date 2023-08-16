import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

type Props = {
  name: string;
  onPress: () => void;
};

//모달이나 바텀시트에 들어가는 버튼입니다.
const NomalButton = ({ name, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.5 : 1 }]}
    >
      <Text style={styles.btnText}>{name}</Text>
    </Pressable>
  );
};

export default NomalButton;

const styles = StyleSheet.create({
  btn: {
    // flex: 1,
    backgroundColor: '#326273',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '500'
  }
});
